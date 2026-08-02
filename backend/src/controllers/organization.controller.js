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

    // ==========================================
// Upload Organization Logo
// ==========================================

async uploadLogo(req, res) {

    try {

        if (!req.file) {

            return res.status(400).json({

                success: false,

                message: "Logo file is required"

            });

        }

        const logo =
            `/uploads/images/${req.file.filename}`;

        const organization =
            await organizationService.updateLogo(

                Number(req.params.id),

                logo

            );

        return res.status(200).json({

            success: true,

            message: "Organization logo uploaded successfully",

            data: organization

        });

    }

    catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

}

    async getOrganizations(req, res, next) {

    try {

        const organizations =
            await organizationService.getOrganizations();

        return res.status(200).json({

            success: true,

            message: "Organizations fetched successfully",

            data: organizations

        });

    }

    catch (error) {

        next(error);

    }

}


async create(req,res){


    try {


        const organization =
            await organizationService.create(
                req.body
            );



        return res.status(201).json({


            success:true,


            message:
            "Organization created successfully",


            data: organization


        });



    }
    catch(error){


        return res.status(500).json({

            success:false,

            message:error.message

        });


    }


}

async getById(req,res){

    try{

        const organization =
            await organizationService.getOrganizationById(
                req.params.id
            );

        return res.status(200).json({

            success:true,

            message:"Organization fetched successfully",

            data:organization

        });

    }

    catch(error){

        return res.status(404).json({

            success:false,

            message:error.message

        });

    }

}

// ==========================================
// Update Organization
// ==========================================

async updateById(req, res) {

    try {

        const organization =
            await organizationService.updateOrganizationById(

                req.params.id,

                req.body

            );

        return res.status(200).json({

            success: true,

            message: "Organization updated successfully",

            data: organization

        });

    }

    catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

}



}

export default new OrganizationController();