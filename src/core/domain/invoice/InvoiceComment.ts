import { InvoiceCommentDTO } from './InvoiceCommentDTO';

export class InvoiceComment {
  private readonly _id: string;
  private readonly _content: string | null;
  private readonly _first_name: string | null;
  private readonly _last_name: string | null;
  private readonly _created_at: string | null;
  private readonly _created_by: string | null;

  constructor(input: InvoiceCommentDTO) {
    this._id = input.id;
    this._content = input.content;
    this._first_name = input.user_master_data.first_name;
    this._last_name = input.user_master_data.last_name;
    this._created_by = input.created_by;
    this._created_at = input.created_at;
  }

  get id(): string {
    return this._id;
  }

  get content(): string {
    return this._content || '';
  }

  get first_name(): string {
    return this._first_name || '';
  }

  get last_name(): string {
    return this._last_name || '';
  }

  get created_at(): string {
    return this._created_at || '';
  }

  get created_by(): string {
    return this._created_by || '';
  }
}
