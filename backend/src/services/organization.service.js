import organizationRepository from "../repositories/organization.repository.js";
import bcrypt from "bcrypt";

class OrganizationService {

    async getProfile(user) {

        const organization = await organizationRepository.findOrganizationById(
            user.organizationId
        );

        if (!organization) {
            throw new Error("Organization not found");
        }

        return organization;

    }

    async updateProfile(user, data) {

        const {

            name,
            phone,
            website,
            logo,

            timezone,
            language,

            companyAddress,
            companyCity,
            companyState,
            companyCountry

        } = data;

        // Update Organization
        await organizationRepository.updateOrganization(

            user.organizationId,

            {

                name,
                phone,
                website,
                logo

            }

        );

        // Update Organization Settings
        await organizationRepository.updateOrganizationSettings(

            user.organizationId,

            {

                timezone,
                language,

                companyAddress,
                companyCity,
                companyState,
                companyCountry

            }

        );

        // Return Updated Organization
        return await organizationRepository.findOrganizationById(
            user.organizationId
        );


       

    }

     async getOrganizations() {

    const organizations =
        await organizationRepository.getOrganizations();

    return organizations.map((organization) => ({

        id: organization.id,

        name: organization.name,

        email: organization.email,

        phone: organization.phone,

        website: organization.website,

        plan: organization.plan,

        status: organization.status,

        users: organization._count.users,

        chatbots: organization._count.chatbots,

        createdAt: organization.createdAt

    }));

}
async create(data){


    const {

        name,
        email,
        phone,
        website,
        plan,

        adminName,
        adminEmail,
        password


    } = data;




    const exist =
        await organizationRepository.findByEmail(
            email
        );



    if(exist){

        throw new Error(
            "Organization email already exists"
        );

    }



    const slug =
        name
        .toLowerCase()
        .replace(
            /\s+/g,
            "-"
        );




    const organization =
        await organizationRepository.createOrganization({

            name,

            slug,

            email,

            phone,

            website,

            plan: plan || "FREE"

        });





    await organizationRepository.createOrganizationSetting(

        organization.id

    );





    const hashPassword =
        await bcrypt.hash(
            password,
            10
        );





    const admin =
        await organizationRepository.createAdmin({

            organizationId:
            organization.id,


            name:
            adminName,


            email:
            adminEmail,


            password:
            hashPassword,


            role:
            "CLIENT_ADMIN"


        });





    return {


        organization,


        admin:{

            id:admin.id,

            name:admin.name,

            email:admin.email,

            role:admin.role

        }


    };


}


}

export default new OrganizationService();