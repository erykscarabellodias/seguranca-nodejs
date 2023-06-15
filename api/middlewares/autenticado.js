const { verify, decode } = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).send({ message: 'Token não enviado' });
    }

    const [bearer, accessToken] = token.split(' ');

    if (!bearer) {
        return res.status(401).send({ message: 'Token malformatado' });
    }

    try {
        verify(accessToken, process.env.JWT_SECRET);

        const { id, email } = decode(accessToken);

        req.usuarioId = id;
        req.usuarioEmail = email;

        return next();
    } catch (e) {
        return res.status(401).send({ message: 'Usuário não autorizado' });
    }
}