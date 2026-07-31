import prisma from "../config/prisma.js";


class LeadRepository {


    async create(data) {

        return await prisma.lead.create({
            data
        });

    }



   async findAll(organizationId = null) {

    return await prisma.lead.findMany({

        where: organizationId
            ? {
                  organizationId: Number(organizationId)
              }
            : {},

        include: {
            visitor: true,
            conversation: true
        },

        orderBy: {
            createdAt: "desc"
        }

    });

}



    async findById(id) {

        return await prisma.lead.findUnique({

            where:{
                id
            },

            include:{
                visitor:true,
                conversation:true
            }

        });

    }



    async update(id,data) {

        return await prisma.lead.update({

            where:{
                id
            },

            data

        });

    }



    async delete(id) {

        return await prisma.lead.delete({

            where:{
                id
            }

        });

    }

    // ==========================================
// Lead Stats
// ==========================================

async getStats(organizationId = null) {

    const where = organizationId
        ? {
              organizationId: Number(organizationId)
          }
        : {};

    const [

        total,

        newLeads,

        contacted,

        qualified,

        converted,

        lost

    ] = await Promise.all([

        prisma.lead.count({
            where
        }),

        prisma.lead.count({
            where: {
                ...where,
                status: "NEW"
            }
        }),

        prisma.lead.count({
            where: {
                ...where,
                status: "CONTACTED"
            }
        }),

        prisma.lead.count({
            where: {
                ...where,
                status: "QUALIFIED"
            }
        }),

        prisma.lead.count({
            where: {
                ...where,
                status: "CONVERTED"
            }
        }),

        prisma.lead.count({
            where: {
                ...where,
                status: "LOST"
            }
        })

    ]);

    return {

        total,

        new: newLeads,

        contacted,

        qualified,

        converted,

        lost

    };

}


}


export default new LeadRepository();