const jwt = require('jsonwebtoken')

const handleAuthorization = (req, res, next) => {
    const token = extractToken(req)

    if (!token) {
        res.setHeader('WWW-Authenticate', 'Bearer token_type="JWT"')
        res.status(401).json({ message: "É necessário se autenticar!" })
    } else {
        jwt.verify(token, process.env.AUTH_SECRET, (err, decoded) => {
            if (err) {
                res.status(500).json({ message: "Houve um erro ao processar sua requisição! Tente novamente mais tarde" })
            } else {
                if (decoded) {
                    next()
                } else {
                    res.status(403).json({ message: "Não autorizado!" })
                }
            }
        })
    }
}

function extractToken(req) {
    let token

    if (req.headers && req.headers.authorization) {
        const parts = req.headers.authorization.split(' ')
        if (parts.length === 2 && parts[0] === 'Bearer') {
            token = parts[1]
        }
    }
    return token
}

module.exports = handleAuthorization