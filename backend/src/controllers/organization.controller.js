import organizationService from "../services/organization.service.js";

class OrganizationController {

    // Get Organization Profile
    async getProfile(req, res) {

        try {

            const organization = await organizationService.getProfile(
                req.user
            );

            return res.status(200).json({

                success: true,

                message: "Organization profile fetched successfully",

                data: organization

            });

        } catch (error) {

            return res.status(500).json({

                success: false,

                message: error.message,

                errors: null

            });

        }

    }

    // Update Organization Profile
    async updateProfile(req, res) {

        try {

            const organization = await organizationService.updateProfile(

                req.user,

                req.body

            );

            return res.status(200).json({

                success: true,

                message: "Organization profile updated successfully",

                data: organization

            });

        } catch (error) {

            return res.status(500).json({

                success: false,

                message: error.message,

                errors: null

            });

        }

    }

}

export default new OrganizationController();