import { createContext, ReactNode, useEffect, useState } from "react";
import { useGetUser } from "../../hooks/auth";

export type AuthContextType = {
  user: User;
};

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthContextProviderProps {
  children: ReactNode;
  user: User;
}

const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
  user,
}) => {
  // const { user, loading, error } = useGetUser();
  const [userState, setUserState] = useState<User>(user);

  const { user: userQuery, loading, error } = useGetUser();

  useEffect(() => {
    if (!loading && !error && userQuery) {
      setUserState(userQuery);
    }
  }, [userQuery, loading, error]);

  return (
    <AuthContext.Provider value={{ user: userState }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
export default AuthContextProvider;
