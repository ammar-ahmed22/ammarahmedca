import React from "react";
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
  useToken,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { BiLogOut, BiUser } from "react-icons/bi";
import { useSessionStorage } from "../../hooks/sessionStorage";
import { useQuery, gql } from "@apollo/client";

interface AuthorizedRouteProps {
  children: React.ReactNode;
  redirectPath?: string;
}

const AuthorizedRoute: React.FC<AuthorizedRouteProps> = ({
  children,
  redirectPath,
}) => {
  const userQuery = gql`
    query User {
      user {
        _id
        company
        createdAt
        email
        emailConfirmed
        firstName
        foundBy
        gameIDs
        lastName
        middleName
        position
        profilePic
        record {
          wins
          losses
        }
      }
    }
  `;

  // const { user, loading, error } = useGetUser();
  const { data, loading, error, client } = useQuery<{ user: User }>(userQuery, {
    errorPolicy: "all",
  });
  const navigate = useNavigate();
  const removeAuthToken = useSessionStorage("authToken")[2];
  const loc = useLocation();
  const [size12] = useToken("sizes", ["12"]);
  console.log("auth route called at:", loc.pathname);

  if (loading) {
    return <Loading />;
  }

  if (!data || error) {
    const state: any = {};
    if (error?.graphQLErrors) {
      for (let err of error.graphQLErrors) {
        if (err.extensions.code === "UNAUTHENTICATED") {
          state.redirect = loc.pathname;
        }
      }
    }
    return <Navigate to={redirectPath ?? "/chess/login"} state={state} />;
  }

  // Route to /chess/confirm-email after register (authorized)
  // if they bypass this by closing the page after initial register and logging in, show a popup at the top saying
  // email is not confirmed.
  // Don't allow starting game until email is confirmed
  //
  // if (!user.emailConfirmed){
  //   return <Navigate to="/chess/confirm-email" />
  // }

  type Pages = "profile" | "game" | "home";
  const active = (page: Pages, loc: Location) => {
    const pathnameMap: Record<Pages, string> = {
      profile: "/chess/profile",
      game: "/chess/play",
      home: "/chess/home",
    };

    if (pathnameMap[page] === loc.pathname) {
      return {
        color: "brand.purple.400",
        fontWeight: "bold",
      };
    }

    return {};
  };

  const handleLogout = async () => {
    removeAuthToken();
    await client.clearStore();
    navigate("/chess");
  };

  return (
    <AuthContextProvider user={data.user}>
      <>
        <Menu>
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
          <MenuList zIndex={2000}>
            <MenuGroup title="Navigation">
              <MenuItem
                icon={<BiUser />}
                command="⌘H"
                {...active("home", loc)}
                onClick={() => navigate("/chess/home")}
              >
                Home
              </MenuItem>
              <MenuItem
                icon={<BiUser />}
                command="⌘P"
                {...active("profile", loc)}
                onClick={() => navigate("/chess/profile")}
              >
                Profile
              </MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuItem icon={<BiLogOut />} command="⌘L" onClick={handleLogout}>
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
        {children}
      </>
    </AuthContextProvider>
  );
};

export default AuthorizedRoute;
