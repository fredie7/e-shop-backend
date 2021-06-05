import { Pool } from 'pg'
import db, {connectionString} from '../db'
import seedDatabase from './seed'
import logger from '../services/logger'

const queryText = `
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS products;

CREATE TABLE IF NOT EXISTS users (
    "id" UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) UNIQUE NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "isAdmin" BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS products (
    "id" UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    "title" VARCHAR(100) NOT NULL,
    "price" VARCHAR(100) NOT NULL,
    "description" VARCHAR(100) NOT NULL,
    "quantity" INT NOT NULL,
    "status" VARCHAR(100) NOT NULL,
    "count" INT NOT NULL,
    "producedBy" VARCHAR(100) NOT NULL,
    "image" VARCHAR(300) NOT NULL
);
`;

const dBase = new Pool({ connectionString });

dBase.on('connect', () => {
  logger.info('CONNECTED TO DATABASE');
});

db.query(queryText)
  .then((result) => {
    logger.info(result);
    seedDatabase().then(() => {
      process.exit(0);
    });
  })
  .catch((error) => {
    logger.info(error);
    process.exit(1);
  });
