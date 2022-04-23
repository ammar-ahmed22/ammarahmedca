import { and, or, rule, shield } from "graphql-shield"

const checkPermission = (auth, permission) => {
    if (auth && auth.permissions){
        return auth.permissions.includes(permission)
    };

    return false;
}


const isAuthenticated = rule()((p, a, { auth }) => {
    return auth !== null
})

const canReadAnyUser = rule()(( p, a, { auth }) => {
    return checkPermission(auth, "read:any_user")
})

const canReadOwnUser = rule()(( p, a, { auth }) => {
    return checkPermission(auth, "read:own_user")
})

const canWriteAnyUser = rule()((p, a, { auth }) => {
    return checkPermission(auth, "write:any_user")
})

const canWriteOwnUser = rule()((p, a, { auth }) => {
    return checkPermission(auth, "write:own_user")
})

const isReadingOwnUser = rule()((p, { id }, { auth }) => {
    return auth && auth.id === id;
})

const isAccessingOwnGame = rule()((p, { gameID }, { auth }) => {
    return auth && auth.allGameIDs && auth.allGameIDs.includes(gameID)
})

const isSuperUser = rule()((p, a, { auth }) => {
    return checkPermission(auth, "super_user")
})

export default shield({
    Query: {
        getPlayerById: or(and(canReadOwnUser, isReadingOwnUser), canReadAnyUser),
        getAllPlayers: canReadAnyUser,
        getGame: or(isSuperUser, isAccessingOwnGame)
    },
    Mutation: {
        addMove: or(isSuperUser, isAccessingOwnGame)
    }
})


