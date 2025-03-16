let globalCleanupTimer: NodeJS.Timeout | null = null;
let isCleanupTimerRunning = false;
const cacheInstances: Cache[] = [];

function cleanupExpiredCacheGlobally() {
  const now = Date.now();
  for (const cacheInstance of cacheInstances) {
    for (const key in cacheInstance['cache']) {
      if (cacheInstance['cache'].hasOwnProperty(key)) {
        const cachedItem = cacheInstance['cache'][key];
        if (cachedItem.expiry <= now) {
          delete cacheInstance['cache'][key];
        }
      }
    }
  }
}

class Cache {
  private cache: Record<string, { data: any; expiry: number }> = {};
  private cleanupInterval: number;

  constructor(cleanupIntervalSeconds: number = 60) {
    this.cleanupInterval = cleanupIntervalSeconds * 1000;
    cacheInstances.push(this);
    this.ensureGlobalCleanupTimer();
  }

  private ensureGlobalCleanupTimer() {
    if (!isCleanupTimerRunning) {
      globalCleanupTimer = setInterval(cleanupExpiredCacheGlobally, this.cleanupInterval);
      isCleanupTimerRunning = true;
    } else if (globalCleanupTimer && this.cleanupInterval !== (globalCleanupTimer as any)._repeat) {
      clearInterval(globalCleanupTimer);
      globalCleanupTimer = setInterval(cleanupExpiredCacheGlobally, this.cleanupInterval);
    }
  }

  async get<T>(key: string, fetchFunction: () => Promise<T>, ttlSeconds: number): Promise<T> {
    const cachedItem = this.cache[key];

    if (cachedItem && Date.now() < cachedItem.expiry) {
      return cachedItem.data as T;
    }

    const data = await fetchFunction();
    this.cache[key] = {
      data,
      expiry: Date.now() + ttlSeconds * 1000,
    };
    return data;
  }
}

export default Cache;