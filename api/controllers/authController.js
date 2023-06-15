const AuthService = require('../services/authService');

class AuthController {
    constructor() {
        this.service = new AuthService();
    }

    async login(req, res) {
        const { email, senha } = req.body;
        try {
            const login = await this.service.login({ email, senha });

            return res.status(200).send(login);
        } catch (e) {
            return res.status(401).send({ message: e.message });
        }
    }
}

module.exports = AuthController;