import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  OwnershipTransferred,
  Stake,
  Unstake
} from "../generated/HeroesVault/HeroesVault"

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createStakeEvent(
  staker: Address,
  tier: BigInt,
  honAmount: BigInt,
  hroId: BigInt,
  workerAmount: BigInt
): Stake {
  let stakeEvent = changetype<Stake>(newMockEvent())

  stakeEvent.parameters = new Array()

  stakeEvent.parameters.push(
    new ethereum.EventParam("staker", ethereum.Value.fromAddress(staker))
  )
  stakeEvent.parameters.push(
    new ethereum.EventParam("tier", ethereum.Value.fromUnsignedBigInt(tier))
  )
  stakeEvent.parameters.push(
    new ethereum.EventParam(
      "honAmount",
      ethereum.Value.fromUnsignedBigInt(honAmount)
    )
  )
  stakeEvent.parameters.push(
    new ethereum.EventParam("hroId", ethereum.Value.fromUnsignedBigInt(hroId))
  )
  stakeEvent.parameters.push(
    new ethereum.EventParam(
      "workerAmount",
      ethereum.Value.fromUnsignedBigInt(workerAmount)
    )
  )

  return stakeEvent
}

export function createUnstakeEvent(
  staker: Address,
  hroId: BigInt,
  fee: BigInt
): Unstake {
  let unstakeEvent = changetype<Unstake>(newMockEvent())

  unstakeEvent.parameters = new Array()

  unstakeEvent.parameters.push(
    new ethereum.EventParam("staker", ethereum.Value.fromAddress(staker))
  )
  unstakeEvent.parameters.push(
    new ethereum.EventParam("hroId", ethereum.Value.fromUnsignedBigInt(hroId))
  )
  unstakeEvent.parameters.push(
    new ethereum.EventParam("fee", ethereum.Value.fromUnsignedBigInt(fee))
  )

  return unstakeEvent
}
