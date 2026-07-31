import prisma from "../config/prisma.js";


class LeadRepository {


    async create(data) {

        return await prisma.lead.create({
            data
        });

    }



    async findAll(organizationId) {

        return await prisma.lead.findMany({

            where:{
                organizationId
            },

            include:{
                visitor:true,
                conversation:true
            },

            orderBy:{
                createdAt:"desc"
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


}


export default new LeadRepository();