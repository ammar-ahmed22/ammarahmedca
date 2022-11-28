import React from "react";
import { useGetUser } from "../../hooks/auth";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import type { Location } from "react-router-dom";
import AuthContextProvider from "../contexts/AuthContext";
import Loading from "../components/Loading";
import { 
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  IconButton, 
  MenuDivider,
  useToken
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons"
import { BiLogOut, BiUser } from "react-icons/bi"
import { FaChessPawn } from "react-icons/fa"
import { useSessionStorage } from "../../hooks/sessionStorage"

interface AuthorizedRouteProps{
  children: React.ReactNode,
  redirectPath?: string
}

const AuthorizedRoute : React.FC<AuthorizedRouteProps> = ({ children, redirectPath }) => {

  const { user, loading, error } = useGetUser();
  const navigate = useNavigate();
  const removeAuthToken = useSessionStorage("authToken")[2];
  const loc = useLocation()
  const [size12] = useToken("sizes", ["12"])

  if (loading){
    return <Loading />
  }

  if ((!user || error)){
    console.log(error);
    return <Navigate to={redirectPath ?? "/chess/login"} />
  }

  // Route to /chess/confirm-email after register (authorized)
  // if they bypass this by closing the page after initial register and logging in, show a popup at the top saying
  // email is not confirmed.
  // Don't allow starting game until email is confirmed
  //
  // if (!user.emailConfirmed){
  //   return <Navigate to="/chess/confirm-email" />
  // }

  
  
  type Pages = "profile" | "game";
  const active = (page: "profile" | "game", loc: Location) => {
    const pathnameMap : Record<Pages, string> = {
      profile: "/chess/profile",
      game: "/chess/play"
    }

    if (pathnameMap[page] === loc.pathname){
      return {
        color: "brand.purple.400",
        fontWeight: "bold"
      }
    }

    return {}
  }

  const handleLogout = () => {
    removeAuthToken()
    navigate("/chess")
  }

  return (
    <AuthContextProvider user={user}>
      <>
      <Menu >
        <MenuButton
          as={IconButton}
          aria-label="Chess Navigation"
          icon={<HamburgerIcon />}
          variant="ghost"
          size="lg"
          pos="absolute"
          top="0"
          left={`-${size12}`}
        />
        <MenuList>
          <MenuGroup title="Navigation">
            <MenuItem icon={<BiUser />} command="⌘P" {...active("profile", loc)} disabled onClick={() => navigate("/chess/profile")}>
              Profile
            </MenuItem>
            <MenuItem icon={<FaChessPawn />} command="⌘G" {...active("game", loc)} onClick={() => navigate("/chess/play")}>
              Game
            </MenuItem>
          </MenuGroup>
          <MenuDivider />
          <MenuItem icon={<BiLogOut />} command="⌘L" onClick={handleLogout}>
            Logout
          </MenuItem>
        </MenuList>
      </Menu>
      {
        children
      }
      </>
    </AuthContextProvider>
  )
}

export default AuthorizedRoute;