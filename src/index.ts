import * as express from 'express';
import { config } from './config';
import { json } from 'body-parser';
import { logger } from './utils/logger';
import { DbClient } from './service/db.client';

const app = express();
const dbClient = new DbClient();

app.use(json());

logger.info('Starting application...');
logger.info('Connecting to database...');

dbClient.init(logger);

app.listen(config.PORT);
