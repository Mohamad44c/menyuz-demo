import * as migration_20260225_231905_add_base_price from './20260225_231905_add_base_price';

export const migrations = [
  {
    up: migration_20260225_231905_add_base_price.up,
    down: migration_20260225_231905_add_base_price.down,
    name: '20260225_231905_add_base_price'
  },
];
