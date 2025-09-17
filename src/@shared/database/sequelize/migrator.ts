import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { Sequelize } from 'sequelize';
import { SequelizeStorage, Umzug, UmzugOptions } from 'umzug';

export function migrator(
  sequelize: Sequelize,
  options?: Partial<UmzugOptions>,
) {
  return new Umzug({
    migrations: {
      glob: [
        './migrations/*.ts',
        {
          cwd: join(__dirname, '..'),
          ignore: ['**/*.d.ts', '**/index.ts', '**/index.js'],
        },
      ],
    },
    create: {
      folder: join(__dirname, '../migrations'),
      template: (path) => {
        const template = readFileSync(
          join(__dirname, 'migration.template.ts'),
          'utf-8',
        );
        return [[path, template]];
      },
    },
    context: sequelize,
    storage: new SequelizeStorage({ sequelize }),
    logger: console,
    ...(options || {}),
  });
}
