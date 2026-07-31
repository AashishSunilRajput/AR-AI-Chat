import userService from "../services/user.service.js";

class UserController {

    // ====================================
    // Create User
    // ====================================

    async create(req, res) {

        try {

            const user = await userService.create(

                req.user,

                req.body

            );

            return res.status(201).json({

                success: true,

                message: "User created successfully",

                data: user

            });

        } catch (error) {

            return res.status(400).json({

                success: false,

                message: error.message,

                errors: null

            });

        }

    }

    // ====================================
    // Get All Users
    // ====================================

   async getAll(req, res) {

    try {

       // console.log("REQ USER =====>", req.user);


        const users = await userService.getAll(
            req.user
        );


        return res.status(200).json({

            success:true,

            message:"Users fetched successfully",

            data:users

        });


    }
    catch(error){

        return res.status(500).json({

            success:false,

            message:error.message

        });

    }

}

    // ====================================
    // Get User By ID
    // ====================================

    async getById(req, res) {

        try {

            const user = await userService.getById(

                req.user,

                req.params.id

            );

            return res.status(200).json({

                success: true,

                message: "User fetched successfully",

                data: user

            });

        } catch (error) {

            return res.status(404).json({

                success: false,

                message: error.message,

                errors: null

            });

        }

    }

    // ====================================
    // Update User
    // ====================================

    async update(req, res) {

        try {

            const user = await userService.update(

                req.user,

                req.params.id,

                req.body

            );

            return res.status(200).json({

                success: true,

                message: "User updated successfully",

                data: user

            });

        } catch (error) {

            return res.status(400).json({

                success: false,

                message: error.message,

                errors: null

            });

        }

    }

    // ====================================
    // Update User Status
    // ====================================

    async updateStatus(req, res) {

        try {

            const user = await userService.updateStatus(

                req.user,

                req.params.id,

                req.body.isActive

            );

            return res.status(200).json({

                success: true,

                message: "User status updated successfully",

                data: user

            });

        } catch (error) {

            return res.status(400).json({

                success: false,

                message: error.message,

                errors: null

            });

        }

    }

    // ====================================
    // Delete User
    // ====================================

    async delete(req, res) {

        try {

            const result = await userService.delete(

                req.user,

                req.params.id

            );

            return res.status(200).json({

                success: true,

                message: result.message

            });

        } catch (error) {

            return res.status(400).json({

                success: false,

                message: error.message,

                errors: null

            });

        }

    }

}

export default new UserController();