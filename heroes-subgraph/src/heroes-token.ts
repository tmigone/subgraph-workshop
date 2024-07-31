import {
  Account,
  Nft
} from "../generated/schema";

import { Transfer } from "../generated/HeroesToken/HeroesToken";

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
}