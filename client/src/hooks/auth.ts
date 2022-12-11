import {
  useMutation,
  DocumentNode,
  ApolloError,
  MutationFunctionOptions,
  DefaultContext,
  ApolloCache,
  gql,
  // useQuery,
} from "@apollo/client";
import { useEffect, useState } from "react";
import { useSessionStorage } from "./sessionStorage";

type CustomMutationOptions<T extends string, V> = MutationFunctionOptions<
  Record<T, AuthPayload>,
  V,
  DefaultContext,
  ApolloCache<any>
>;
type MutationFunction<T extends string, V> = (
  options?: CustomMutationOptions<T, V>
) => void;

const authMutations = [
  "register",
  "login",
  "newEmailCode",
  "confirmEmail",
  "resetPassword",
  "updateUser",
  "createGame",
  "addMove",
] as const;

type AuthMutations = typeof authMutations[number];

const userQuery = gql`
  query User {
    user {
      _id
      company
      createdAt
      currentGameID
      email
      emailConfirmed
      firstName
      foundBy
      gameIDs
      lastName
      middleName
      position
      profilePic
    }
  }
`;

export const useAuthMutation = <VariableType>(
  mutationName: AuthMutations,
  mutation: DocumentNode
): [
  MutationFunction<AuthMutations, VariableType>,
  { error: ApolloError | undefined; loading: boolean; submitted: boolean }
] => {
  const setAuthToken = useSessionStorage("authToken")[1];

  const [submitted, setSubmitted] = useState(false);

  const [call, { data, loading, error }] = useMutation<
    Record<AuthMutations, AuthPayload>,
    VariableType
  >(mutation);

  useEffect(() => {
    if (!loading && data) {
      console.log(`"${mutationName}" mutation success!`);
      setAuthToken(data[mutationName].token);
    }
  }, [data, loading, setAuthToken, mutationName]);

  const mutationFunction = (
    options?: MutationFunctionOptions<
      Record<AuthMutations, AuthPayload>,
      VariableType,
      DefaultContext,
      ApolloCache<any>
    >
  ) => {
    call({ ...options, refetchQueries: "all" });
    setSubmitted(true);
  };

  return [mutationFunction, { submitted, error, loading }];
};

// export const useGetUser = (): {
//   user?: User;
//   loading: boolean;
//   error?: ApolloError;
// } => {
//   const { data, loading, error } = useQuery<{ user: User }>(userQuery);
//   const [user, setUser] = useState();

//   // const user = data?.user;
//   useEffect(() => {
//     console.log(data);
//   }, [data])

//   return { user: data?.user, loading, error };
// };
