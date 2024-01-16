import { createContext, ReactNode, useState } from 'react';

type InitialState = {
  data: any;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
  setData: React.Dispatch<any>;
  setIsLoading: React.Dispatch<any>;
  setIsError: React.Dispatch<any>;
  setIsSuccess: React.Dispatch<any>;
  setMessage: React.Dispatch<any>;
};

const NewUserContext = createContext({} as InitialState);

type Props = {
  children: ReactNode;
};

const NewUserProvider = ({ children }: Props) => {
  const [data, setData] = useState<any>(undefined);
  const [isLoading, setIsLoading] = useState<any>(false);
  const [isError, setIsError] = useState<any>(false);
  const [message, setMessage] = useState<any>(null);
  const [isSuccess, setIsSuccess] = useState<any>(false);

  return (
    <NewUserContext.Provider
      value={{
        data,
        isLoading,
        isError,
        isSuccess,
        message,
        setData,
        setIsLoading,
        setIsError,
        setIsSuccess,
        setMessage
      }}
    >
      {children}
    </NewUserContext.Provider>
  );
};

export { NewUserContext, NewUserProvider };
