import mongoose, { Connection } from 'mongoose';
import { config } from '../config';
import { Logger } from 'pino';

export class DbClient {
  private connection: Connection;
  private logger: Logger;

  async init(logger: Logger): Promise<void> {
    if (!this.logger) {
      this.logger = logger.child({ name: 'DbClient' });
    }

    try {
      await mongoose.connect(config.MONGO_DB_URL);
      this.logger.info('Database connection established');

      this.connection = mongoose.connection;
    } catch (error) {
      this.logger.error(error.message);
    }
  }

  async getConnection(): Promise<Connection> {
    return this.connection;
  }

  async closeConnection(): Promise<void> {
    if (this.connection) {
      await this.connection.close();
    }
  }
}
