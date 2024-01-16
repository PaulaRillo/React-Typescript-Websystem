type UserMasterData = {
  first_name: string | null;
  last_name: string | null;
};

export type InvoiceCommentDTO = {
  id: string;
  content: string | null;
  user_master_data: UserMasterData;
  created_at: string | null;
  created_by: string | null;
};
