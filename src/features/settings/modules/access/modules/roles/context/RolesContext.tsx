import {
  createContext,
  Dispatch,
  ReactNode,
  useCallback,
  useEffect,
  useState
} from 'react';
import { useGetRoles } from '../../../../../../../shared/api/queries/useGetRoles';
import { Role } from '../types/Role';

type InitialState = {
  open: boolean;
  data: Role[];
  setData: Dispatch<React.SetStateAction<Role[]>>;
  activeRole: Role | undefined;
  setActiveRole: Dispatch<React.SetStateAction<Role | undefined>>;
  handleOpen: (rollId: string) => void;
  handleClose: () => void;
};

const RolesContext = createContext({ open: false } as InitialState);

type Props = {
  children: ReactNode;
};

const RolesProvider = ({ children }: Props) => {
  const [open, setOpen] = useState(false);
  const [activeRole, setActiveRole] = useState<Role | undefined>(undefined);
  const { data: queryData } = useGetRoles();

  const handleClose = useCallback(() => setOpen(false), []);

  const [data, setData] = useState<Role[]>(queryData);

  useEffect(() => {
    setData(queryData);
  }, [queryData]);

  const handleOpen = useCallback(
    (roleId: string) => {
      setActiveRole(data.find(({ id }) => id === roleId));
      setOpen(true);
    },
    [data]
  );

  return (
    <RolesContext.Provider
      value={{
        open,
        data,
        setData,
        activeRole,
        setActiveRole,
        handleOpen,
        handleClose
      }}
    >
      {children}
    </RolesContext.Provider>
  );
};

export { RolesContext, RolesProvider };
