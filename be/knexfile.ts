// Update with your config settings.

import { Knex } from "knex";

interface KnexConfigs {
  [key: string]: Knex.Config;
}

/**
 * Normalize a port into a number, string, or false.
 */
export function normalizePort(val: any) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

const knexConfigs: KnexConfigs = {
  development: {
    client: 'postgresql',
    connection: {
      host: process.env.DB_HOSTNAME,
      port: normalizePort(process.env.DB_PORT),
      user:     process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.DB_NAME
    },
  },
};

export default knexConfigs;
