import NodeCache from 'node-cache';

export const weatherCache = new NodeCache({
  stdTTL: 300, // 5 minutes
  checkperiod: 60,
});

export function clearLocationCache(location: string) {
  weatherCache.del(location);
}
