// GENERAL
export const CORS_ORIGIN = process.env.CORS_ORIGIN ?? undefined;
export const SOCKET_PORT = (parseInt(process.env.SOCKET_PORT) ?? 8003) as number;

// REDIS
export const REDIS_HOST = (process.env.REDIS_HOST ?? 'localhost') as string;
export const REDIS_PORT = (parseInt(process.env.REDIS_PORT) ?? 6379) as number;

// ROOM
export const ROOM_TTL    = (parseInt(process.env.ROOM_TTL) ?? 1000) as number;
export const ROOM_PREFIX = (process.env.ROOM_PREFIX ?? 'ROOM_') as string;
export const MAX_PLAYERS = (parseInt(process.env.MAX_PLAYERS) ?? 10) as number;

// MATCH
export const MATCH_TTL    = (parseInt(process.env.MATCH_TTL) ?? 1000) as number;
export const MATCH_PREFIX = (process.env.MATCH_PREFIX ?? 'MATCH_') as string;