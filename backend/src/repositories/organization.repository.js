import prisma from "../config/prisma.js";

class OrganizationRepository {

    async createOrganization(data) {

        return await prisma.organization.create({
            data
        });

    }

    async findByEmail(email) {

        return await prisma.organization.findUnique({
            where: {
                email
            }
        });

    }

    async findBySlug(slug) {

        return await prisma.organization.findUnique({
            where: {
                slug
            }
        });

    }

    async createOrganizationSetting(organizationId) {

        return await prisma.organizationSetting.create({

            data: {
                organizationId
            }

        });

    }

    async createAdmin(data) {

        return await prisma.user.create({

            data

        });

    }

    async findOrganizationById(id) {

        return await prisma.organization.findUnique({

            where: {
                id
            },

            include: {

                users: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true,
                        isActive: true
                    }
                },

                settings: true

            }

        });

    }

    async updateOrganization(id, data) {

        return await prisma.organization.update({

            where: {
                id
            },

            data

        });

    }

    // ==========================================
// Update Organization Logo
// ==========================================

async updateLogo(
    organizationId,
    logo
) {

    return await prisma.organization.update({

        where: {

            id: organizationId

        },

        data: {

            logo

        }

    });

}

    async updateOrganizationSettings(organizationId, data) {

        return await prisma.organizationSetting.update({

            where: {
                organizationId
            },

            data

        });

    }


    async getOrganizations() {

    return await prisma.organization.findMany({

        orderBy: {
            createdAt: "desc"
        },

        include: {

            _count: {

                select: {

                    users: true,

                    chatbots: true

                }

            }

        }

    });

}

async createOrganization(data){

    return await prisma.organization.create({

        data

    });

}



async createOrganizationSetting(id){


    return await prisma.organizationSetting.create({

        data:{

            organizationId:id

        }

    });


}




async createAdmin(data){


    return await prisma.user.create({

        data

    });


}

async findOrganizationDetailsById(id){

    return await prisma.organization.findUnique({

        where:{
            id:Number(id)
        },

        include:{

            settings:true,

            users:{
                select:{
                    id:true,
                    name:true,
                    email:true,
                    role:true,
                    isActive:true
                }
            },

            chatbots:true,

            knowledgeBases:true,

            _count:{
                select:{
                    users:true,
                    chatbots:true,
                    knowledgeBases:true,
                    visitors:true,
                    leads:true
                }
            }

        }

    });

}
// ==========================================
// Update Organization By Id
// ==========================================

async updateOrganizationById(id, organizationData, settingsData) {

    await prisma.organization.update({

        where: {
            id: Number(id)
        },

        data: organizationData

    });

    await prisma.organizationSetting.update({

        where: {
            organizationId: Number(id)
        },

        data: settingsData

    });

    return await this.findOrganizationDetailsById(id);

}


}
export default new OrganizationRepository();