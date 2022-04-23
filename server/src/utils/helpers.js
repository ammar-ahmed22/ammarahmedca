export const getPathPrefix = env => {
    if (env === 'development'){
        return "./src/"
    }else{
        return "./"
    }
}