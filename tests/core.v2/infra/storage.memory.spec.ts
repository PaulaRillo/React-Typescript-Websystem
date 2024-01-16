import { StorageInterface } from '../../../src/core.v2/drivers/utils/Storage/storage.interface';
import { StorageMemory } from '../../../src/core.v2/drivers/utils/Storage/storage-memory';

describe('StorageMemory', () => {
  let storageMemory: StorageInterface;

  beforeAll(async () => {
    storageMemory = StorageMemory.getInstance();
  });

  beforeEach(async () => {
    storageMemory.clear();
  });

  test('Should get a item on localStorage', () => {
    expect(storageMemory.get('key')).toBeNull();
    storageMemory.set('key', 'value');
    expect(storageMemory.get('key')).toBe('value');
  });

  test('Should remove a item on localStorage', () => {
    storageMemory.set('key', 'value');
    expect(storageMemory.get('key')).toBe('value');
    storageMemory.remove('key');
    expect(storageMemory.get('key')).toBeNull();
  });

  test('Should clear all items on localStorage', () => {
    storageMemory.set('key', 'value');
    storageMemory.set('key2', 'value2');
    expect(storageMemory.get('key')).toBe('value');
    expect(storageMemory.get('key2')).toBe('value2');
    storageMemory.clear();
    expect(storageMemory.get('key')).toBeNull();
    expect(storageMemory.get('key2')).toBeNull();
  });
});
