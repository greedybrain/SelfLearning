const authenticate = (req, res, next) => {
     console.log("Authenticating")
     next();
}

export default authenticate