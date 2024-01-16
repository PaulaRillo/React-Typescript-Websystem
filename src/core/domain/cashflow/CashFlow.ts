import { CashFlowInput } from './CashFlowInput';

export class CashFlow {
  execute(): any {
    throw new Error('Method not implemented.');
  }
  public readonly id: string;
  public readonly externalId: string;
  public readonly name: string;

  constructor(input: CashFlowInput) {
    this.id = input.id;
    this.externalId = input.external_id;
    this.name = input.name;
    Object.freeze(this);
  }
}
