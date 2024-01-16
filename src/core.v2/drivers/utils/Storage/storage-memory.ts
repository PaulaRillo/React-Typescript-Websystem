import { StorageInterface } from './storage.interface';

export class StorageMemory implements StorageInterface {
  private storage: Record<string, string>;

  private constructor() {
    this.storage = {};
  }

  get(key: string): string | null {
    return this.storage[key] ?? null;
  }

  set(key: string, value: string): void {
    this.storage[key] = value;
  }

  remove(key: string): void {
    delete this.storage[key];
  }

  clear(): void {
    this.storage = {};
  }

  static instance: StorageMemory | undefined;
  static getInstance(): StorageMemory {
    if (!StorageMemory.instance) {
      StorageMemory.instance = new StorageMemory();
    }
    return StorageMemory.instance;
  }
}

export const storageMemory = StorageMemory.getInstance();
