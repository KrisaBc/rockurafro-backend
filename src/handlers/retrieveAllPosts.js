const { retrieveAllPosts } = require("../../logic/src")
const { errors: { FormatError, AuthError, NotFoundError } } = require("../../commons/src")
const extractUserIdFromToken = require('./helpers/extractUserIdFromToken')

module.exports = (req, res) => {
    try {
        const userId = extractUserIdFromToken(req)

        retrieveAllPosts(userId)
            .then(posts => res.status(200).send(posts))
            .catch(error => {
                let status = 500

                if (error instanceof NotFoundError)
                    status = 404

                res.status(status).json({ error: error.message })
            })

    } catch (error) {
        let status = 500

        if (error instanceof AuthError)
            status = 401

        if (error instanceof TypeError || error instanceof FormatError)
            status = 400

        res.status(status).json({ error: error.message })
    }

}

