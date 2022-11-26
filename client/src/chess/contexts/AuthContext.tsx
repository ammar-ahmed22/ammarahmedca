import { createContext, ReactNode } from "react";

export type AuthContextType = {
  user: User
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthContextProviderProps{
  children: ReactNode,
  user: User
}

const AuthContextProvider : React.FC<AuthContextProviderProps> = ({ children, user }) => {
  // const { user, loading, error } = useGetUser();


  return (
    <AuthContext.Provider value={{ user }}>
      {
        children
      }
    </AuthContext.Provider>
  )
}

export { AuthContext }
export default AuthContextProvider