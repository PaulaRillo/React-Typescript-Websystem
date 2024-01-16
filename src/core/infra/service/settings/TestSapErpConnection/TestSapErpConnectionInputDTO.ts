export type TestSapErpConnectionInputDTO = {
  host: string;
  credentials: {
    dbname: string;
    username: string;
    password: string;
  };
};
