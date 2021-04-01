import { parser } from '../utils/parser';

// eslint-disable-next-line no-restricted-globals
const ctx: Worker = self as any;

ctx.onmessage = e => {
  const result = parser(e.data);
  ctx.postMessage(result);
};
