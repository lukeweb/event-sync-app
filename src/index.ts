import * as express from 'express';
import { config } from './config';
import { json } from 'body-parser';
import { logger } from './utils/logger';

const app = express();

app.use(json());

logger.info('Starting application...');
app.listen(config.PORT);