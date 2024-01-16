export class DomainEvent {
  public readonly occurredAt!: Date;

  constructor(readonly name: string, readonly data: any) {
    this.occurredAt = new Date();
  }
}
