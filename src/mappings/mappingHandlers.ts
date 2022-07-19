import { SubstrateEvent } from "@subql/types";
import { RecoveryVouched } from "../types";

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
