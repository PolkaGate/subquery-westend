import { SubstrateEvent } from "@subql/types";
import { Transfer, RecoveryVouched } from "../types";
import { Balance } from "@polkadot/types/interfaces";

export async function handleTransfers(event: SubstrateEvent): Promise<void> {
  // Get data from the event
  // The balances.transfer event has the following payload \[from, to, value\]
  // logger.info(JSON.stringify(event));
  const from = event.event.data[0];
  const to = event.event.data[1];
  const amount = event.event.data[2];

  // Create the new transfer entity
  const transfer = new Transfer(
    `${event.block.block.header.number.toNumber()}-${event.idx}`
  );
  transfer.blockNumber = event.block.block.header.number.toBigInt();
  transfer.from = from.toString();
  transfer.to = to.toString();
  transfer.amount = (amount as Balance).toBigInt();
  await transfer.save();
}

export async function handleVouches(event: SubstrateEvent): Promise<void> {
  // Get data from the event
  // RecoveryVouched(AccountId32, AccountId32, AccountId32)
  logger.info(JSON.stringify(event));
  const lost = event.event.data[0];
  const rescuer = event.event.data[1];
  const friend = event.event.data[2];

  // Create the new vouch entity
  const vouch = new RecoveryVouched(
    `${event.block.block.header.number.toNumber()}-${event.idx}`
  );
  vouch.blockNumber = event.block.block.header.number.toBigInt();
  vouch.lost = lost.toString();
  vouch.rescuer = rescuer.toString();
  vouch.friend = friend.toString();
  await vouch.save();
}
