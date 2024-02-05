import { config as loadEnv, configDotenv } from 'dotenv';
import { CleanedEnvAccessors, cleanEnv, str } from 'envalid';

if (process.env.NODE_ENV !== 'test') {
  configDotenv();
}

export const config: Readonly<{ [prop: string]: any } & CleanedEnvAccessors> =
  cleanEnv(
    { ...loadEnv().parsed, ...process.env },
    {
      PORT: str(),
      LOG_LEVEL: str({
        choices: ['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent'],
      }),
    },
  );
