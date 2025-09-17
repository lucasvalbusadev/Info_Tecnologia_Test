import { PostgreSqlContainer } from '@testcontainers/postgresql';

export async function makeSequelizeTestSetup() {
  const container = await new PostgreSqlContainer('postgres:15')
    .withDatabase('testdb')
    .withUsername('test')
    .withPassword('test')
    .start();

  process.env.DB_HOST = container.getHost();
  process.env.DB_PORT = String(container.getPort());
  process.env.DB_USER = container.getUsername();
  process.env.DB_PASSWORD = container.getPassword();
  process.env.DB_NAME = container.getDatabase();
  process.env.NODE_ENV = 'dev';

  return {
    container,
  };
}
