import { SubstrateEvent } from "@subql/types";
import { RecoveryVouched, RecoveryInitiated, RecoveryClosed } from "../types";

export async function handleVouche(event: SubstrateEvent): Promise<void> {
  // Get data from the event
  // RecoveryVouched(AccountId32, AccountId32, AccountId32)
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

export async function handleInitiation(event: SubstrateEvent): Promise<void> {
  // RecoveryInitiated(AccountId32, AccountId32)
  const lost = event.event.data[0];
  const rescuer = event.event.data[1];

  // Create the new initiation entity
  const initiation = new RecoveryInitiated(
    `${event.block.block.header.number.toNumber()}-${event.idx}`
  );
  initiation.blockNumber = event.block.block.header.number.toBigInt();
  initiation.lost = lost.toString();
  initiation.rescuer = rescuer.toString();
  await initiation.save();
}

export async function handleClose(event: SubstrateEvent): Promise<void> {
  // RecoveryClosed(AccountId32, AccountId32)
  const lost = event.event.data[0];
  const rescuer = event.event.data[1];

  // Create the new close entity
  const close = new RecoveryClosed(
    `${event.block.block.header.number.toNumber()}-${event.idx}`
  );
  close.blockNumber = event.block.block.header.number.toBigInt();
  close.lost = lost.toString();
  close.rescuer = rescuer.toString();
  await close.save();
}
