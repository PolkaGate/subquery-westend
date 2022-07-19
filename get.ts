import request from 'umi-request';

export async function query(): Promise<void> {
  // const query = 'query {transfers(first:2) {nodes {nodeId, id, from, to, amount, blockNumber}}}';
  const query = 'query {recoveryVoucheds(first: 2) {nodes {nodeId, id, lost, rescuer, friend, blockNumber}}}';
  const res = await postReq(`https://api.subquery.network/sq/Nick-1979/polkagate-westend-queries`, { query });

  console.log('res:', res.data.recoveryVoucheds.nodes);
}

function postReq(api: string, data: Record<string, any> = {}, option?: Record<string, any>): Promise<Record<string, any>> {
  return request.post(api, {
    data,
    ...option
  });
}
function getReq(api: string, data: Record<string, any> = {}, option?: Record<string, any>): Promise<Record<string, any>> {
  return request.get(api, {
    data,
    ...option
  });
}

query();