class ApiResponse {

    success(res, message, data = {}, statusCode = 200) {

        return res.status(statusCode).json({
            success: true,
            message,
            data
        });

    }

    error(res, message, statusCode = 500, errors = null) {

        return res.status(statusCode).json({
            success: false,
            message,
            errors
        });

    }

}

export default new ApiResponse();