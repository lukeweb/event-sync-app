import mongoose from 'mongoose';
import { DbClient } from './db.client';
import { Logger } from 'pino';

const mockLogger: Logger = {
  info: jest.fn(),
  error: jest.fn(),
  child: jest.fn(() => mockLogger),
} as unknown as Logger;

describe('DbClient', () => {
  let dbClient: DbClient;

  beforeEach(() => {
    dbClient = new DbClient();
  });

  afterEach(async () => {
    await dbClient.closeConnection();
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('init', () => {
    it('should open a db connection', async () => {
      const connectSpy = jest
        .spyOn(mongoose, 'connect')
        .mockResolvedValueOnce(mongoose);

      await dbClient.init(mockLogger);

      expect(connectSpy).toHaveBeenCalledWith(expect.any(String));
      expect(mockLogger.info).toHaveBeenCalledWith(
        'Database connection established',
      );
    });

    it('should log error if database connection fails', async () => {
      const error = new Error('Error');
      const mockError = jest
        .spyOn(mongoose, 'connect')
        .mockRejectedValueOnce(error);

      await dbClient.init(mockLogger);

      expect(mockError).toHaveBeenCalledWith(expect.any(String));
      expect(mockLogger.error).toHaveBeenCalledWith('Error');
    });
  });

  describe('getConnection', () => {
    it('should return database connection', async () => {
      const connectSpy = jest
        .spyOn(mongoose, 'connect')
        .mockResolvedValueOnce(mongoose);

      await dbClient.init(mockLogger);

      const connection = await dbClient.getConnection();

      expect(connection).toBeDefined();
      expect(connectSpy).toHaveBeenCalledWith(expect.any(String));
    });
  });

  describe('closeConnection', () => {
    it('should close database connection if connection is established', async () => {
      jest.spyOn(mongoose, 'connect').mockResolvedValueOnce(mongoose);

      const closeSpy = jest
        .spyOn(mongoose.connection, 'close')
        .mockResolvedValueOnce();

      await dbClient.init(mockLogger);
      await dbClient.closeConnection();

      expect(closeSpy).toHaveBeenCalled();
    });

    it('should do nothing when connection is not established', async () => {
      const closeSpy = jest
        .spyOn(mongoose.connection, 'close')
        .mockResolvedValueOnce();

      await dbClient.closeConnection();

      expect(closeSpy).toHaveBeenCalledTimes(0);
    });
  });
});
