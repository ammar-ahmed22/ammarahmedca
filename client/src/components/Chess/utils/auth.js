class Auth{
    constructor(token=null){
        if (token){
            localStorage.setItem("chessAuthJWT", token)
        }
        this.token = localStorage.getItem("chessAuthJWT");
        this.authenticated = !!localStorage.getItem("chessAuthJWT");
    }

    setToken = token => {
        localStorage.setItem("chessAuthJWT", token);
        this.token = token;
        this.authenticated = true;
    }

    unAuthenticate = () => {
        localStorage.setItem("chessAuthJWT", null);
        this.token = null;
        this.authenticated = false;
    }

    getToken = () => {
        if (this.isAuthenticated()){
            return localStorage.getItem("chessAuthJWT");
        }

        return null;
    }

    isAuthenticated = () => {
        return this.authenticated;
    }
}

export default Auth;