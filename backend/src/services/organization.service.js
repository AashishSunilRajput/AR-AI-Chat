import organizationRepository from "../repositories/organization.repository.js";

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

}

export default new OrganizationService();