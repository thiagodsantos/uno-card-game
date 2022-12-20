// GENERAL
import * as process from 'process';

export const CORS_ORIGIN = process.env.CORS_ORIGIN ?? '*';
export const SOCKET_PORT = parseInt(process.env.SOCKET_PORT ?? '8003');
export const GRAPHQL_DEBUG = Boolean(process.env.GRAPHQL_DEBUG ?? false);
export const GRAPHQL_PLAYGROUND = Boolean(process.env.GRAPHQL_PLAYGROUND ?? false);

// REDIS
export const REDIS_HOST = process.env.REDIS_HOST ?? 'localhost';
export const REDIS_PORT = parseInt(process.env.REDIS_PORT ?? '6379');

// ROOM
export const ROOM_TTL    = parseInt(process.env.ROOM_TTL ?? '1000');
export const ROOM_PREFIX = process.env.ROOM_PREFIX ?? 'ROOM_';
export const MAX_PLAYERS = parseInt(process.env.MAX_PLAYERS ?? '10');

// MATCH
export const MATCH_TTL    = parseInt(process.env.MATCH_TTL ?? '1000');
export const MATCH_PREFIX = process.env.MATCH_PREFIX ?? 'MATCH_';
export const PLAYER_INITIAL_QTY_CARDS = parseInt(process.env.PLAYER_INITIAL_QTY_CARDS ?? '7');

// PLAYER
export const PLAYER_TTL = parseInt(process.env.PLAYER_TTL ?? '1000');
export const PLAYER_PREFIX = process.env.PLAYER_PREFIX ?? 'PLAYER_';