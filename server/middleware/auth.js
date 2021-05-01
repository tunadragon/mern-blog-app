import jwt from 'jsonwebtoken'

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        // check if logged in with google or custom
        const isCustomAuth = token.length < 500;

        let decodedData;

        if (token && isCustomAuth) {
            // get username and id from token
            decodedData = jwt.verify(token, 'secret')
            req.userId = decodedData?.id
        } else {
            // google oauth
            decodedData = jwt.decode(token)
            req.userId = decodedData?.sub 
        }
        next()
    } catch (err) {
        console.log(err)
    }
}

export default auth;