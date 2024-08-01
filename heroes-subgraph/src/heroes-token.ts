import {
  Account,
  Nft,
  Global,
  TransferHistory
} from "../generated/schema";

import { Transfer, BundlePurchased } from "../generated/HeroesToken/HeroesToken";
import { BigInt } from '@graphprotocol/graph-ts'


export function handleTransfer(event: Transfer): void {
  // Nft
  const nft = Nft.load(event.params.tokenId.toHex());
  if (nft) {
    nft.owner = event.params.to.toHex();
    nft.tokenId = event.params.tokenId;
    nft.lastTransfered = event.block.timestamp;
    nft.transferCount = nft.transferCount + 1;
    nft.save();
  } else {
    const newNft = new Nft(event.params.tokenId.toHex());
    newNft.owner = event.params.to.toHex();
    newNft.tokenId = event.params.tokenId;
    newNft.mintedAt = event.block.timestamp;
    newNft.lastTransfered = event.block.timestamp;
    newNft.transferCount = 0;
    newNft.save();
  }

  // Account
  const account = Account.load(event.params.to.toHex());
  if(account) {
    account.count = account.count + 1;
    account.save();
  } else {
    const newAccount = new Account(event.params.to.toHex());
    newAccount.count = 1;
    newAccount.save();
  }

  // Global
  if (event.params.from.toHexString() == '0x0000000000000000000000000000000000000000') {
    const global = Global.load("HeroesNft");
    if (global) {
      global.count = global.count + 1;
      global.save();
    } else {
      const newGlobal = new Global("HeroesNft");
      newGlobal.count = 1;
      newGlobal.bundleAmount = BigInt.fromI32(0);
      newGlobal.save();
    }
  }

  // Transfer history
  if (event.params.from.toHexString() != '0x0000000000000000000000000000000000000000') {
    const transfer = new TransferHistory(event.transaction.hash.toHex());
    transfer.from = event.params.from;
    transfer.to = event.params.to;
    transfer.transferedAt = event.block.timestamp;
    transfer.tokenID = event.params.tokenId;
    transfer.save();
  }
}

export function handleBundlePurchased(event: BundlePurchased): void {
  const global = Global.load("HeroesNft");
  if (global) {
    global.bundleAmount = global.bundleAmount.plus(event.params._amount);
    global.save();
  } else {
    const newGlobal = new Global("HeroesNft");
    newGlobal.count = 0;
    newGlobal.bundleAmount = event.params._amount;
    newGlobal.save();
  } 
}