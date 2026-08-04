import prisma from "../config/prisma.js";


class LeadRepository {


    async create(data) {

        return await prisma.lead.create({
            data
        });

    }



// ==========================================
// Get All Leads (Filters + Pagination)
// ==========================================

async findAll(filters = {}) {

    const {

        organizationId,

        search,

        status,

        source,

        from,

        to,

        page = 1,

        limit = 20

    } = filters;



    const where = {};



    // Organization

    if (organizationId) {

        where.organizationId =
            Number(organizationId);

    }



    // Status

    if (

        status &&

        status !== "ALL"

    ) {

        where.status = status;

    }



    // Source

    if (

        source &&

        source !== "ALL"

    ) {

        where.source = source;

    }



    // Date Range

    if (from || to) {

        where.createdAt = {};


        if (from) {

            where.createdAt.gte =
                new Date(from);

        }


        if (to) {

            where.createdAt.lte =
                new Date(to);

        }

    }



    // Search

    if (search) {

        where.OR = [

            {
                name: {

                    contains: search,

                    mode: "insensitive"

                }

            },


            {
                email: {

                    contains: search,

                    mode: "insensitive"

                }

            },


            {
                phone: {

                    contains: search,

                    mode: "insensitive"

                }

            },


            {
                company: {

                    contains: search,

                    mode: "insensitive"

                }

            }

        ];

    }



    // Pagination

    const pageNumber =
        Number(page);


    const limitNumber =
        Number(limit);



    const skip =
        (pageNumber - 1)
        *
        limitNumber;



    const [
        leads,
        total
    ] = await Promise.all([


        prisma.lead.findMany({

            where,


            skip,


            take: limitNumber,


            include: {

                visitor:true,

                conversation:true

            },


            orderBy: {

                createdAt:"desc"

            }

        }),



        prisma.lead.count({

            where

        })

    ]);



    return {


        data: leads,


        pagination: {


            total,


            page: pageNumber,


            limit: limitNumber,


            totalPages:
                Math.ceil(
                    total /
                    limitNumber
                )

        }

    };

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