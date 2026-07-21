import authService from "../services/auth.service.js";
import response from "../utils/response.js";

class AuthController {

    async login(req, res) {

        try {

            const result = await authService.login(req.body);

            return response.success(
                res,
                "Login successful",
                result
            );

        } catch (error) {

            return response.error(
                res,
                error.message,
                401
            );

        }

    }

}

export default new AuthController();