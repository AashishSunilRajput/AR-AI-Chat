import prisma from "../config/prisma.js";

class NotificationRepository {


// ==========================================
// Create Notification
// ==========================================

async create(data) {

    return await prisma.notification.create({

        data,

        include: {

            organization: {

                select: {

                    id: true,
                    name: true

                }

            },

            user: {

                select: {

                    id: true,
                    name: true,
                    email: true

                }

            }

        }

    });

}


// ==========================================
// Get Notification By Id
// ==========================================

async findById(id) {

    return await prisma.notification.findUnique({

        where: {

            id: Number(id)

        },

        include: {

            organization: {

                select: {

                    id: true,
                    name: true

                }

            },

            user: {

                select: {

                    id: true,
                    name: true,
                    email: true

                }

            }

        }

    });

}


// ==========================================
// Get All Notifications (SUPER ADMIN)
// ==========================================

async findAll(filters = {}) {


    const {

        page = 1,

        limit = 10,

        type,

        isRead

    } = filters;


    const where = {};



    // Type Filter

    if (
        type &&
        type !== "ALL"
    ) {

        where.type = type;

    }



    // Read Filter

    if (
        isRead &&
        isRead !== "ALL"
    ) {

        where.isRead =
            isRead === "true";

    }



    const skip =

        (Number(page) - 1) *

        Number(limit);



    const [

        notifications,

        total

    ] = await Promise.all([



        prisma.notification.findMany({

            where,

            skip,

            take: Number(limit),


            include: {

                organization: {

                    select: {

                        id: true,
                        name: true

                    }

                },

                user: {

                    select: {

                        id: true,
                        name: true

                    }

                }

            },


            orderBy: {

                createdAt: "desc"

            }

        }),



        prisma.notification.count({

            where

        })


    ]);



    return {


        data: notifications,


        pagination: {


            total,


            page: Number(page),


            limit: Number(limit),


            totalPages:

                Math.ceil(

                    total /

                    Number(limit)

                )

        }

    };

}



// ==========================================
// Get Organization Notifications
// ==========================================

async findByOrganization(

    organizationId,

    filters = {}

) {


    const {

        page = 1,

        limit = 10,

        type,

        isRead

    } = filters;



    const where = {


        organizationId:

            Number(organizationId)

    };




    // Type Filter

    if (

        type &&

        type !== "ALL"

    ) {

        where.type = type;

    }




    // Read Filter

    if (

        isRead &&

        isRead !== "ALL"

    ) {

        where.isRead =

            isRead === "true";

    }




    const skip =

        (Number(page) - 1) *

        Number(limit);



    const [

        notifications,

        total

    ] = await Promise.all([



        prisma.notification.findMany({


            where,


            skip,


            take: Number(limit),



            include: {


                organization: {


                    select: {


                        id: true,

                        name: true


                    }

                },


                user: {


                    select: {


                        id: true,

                        name: true


                    }

                }


            },



            orderBy: {


                createdAt: "desc"


            }


        }),



        prisma.notification.count({


            where


        })


    ]);



    return {


        data: notifications,


        pagination: {


            total,


            page: Number(page),


            limit: Number(limit),


            totalPages:

                Math.ceil(

                    total /

                    Number(limit)

                )

        }

    };

}



// ==========================================
// Mark As Read
// ==========================================

async markAsRead(id) {


    return await prisma.notification.update({


        where: {


            id: Number(id)


        },


        data: {


            isRead: true,


            readAt: new Date()


        }


    });


}



// ==========================================
// Mark All As Read
// ==========================================

async markAllAsRead(

    organizationId = null

) {


    const where = organizationId

        ? {

            organizationId:

                Number(organizationId),

            isRead: false

        }

        : {


            isRead: false

        };



    return await prisma.notification.updateMany({


        where,


        data: {


            isRead: true,


            readAt: new Date()


        }


    });


}



// ==========================================
// Delete Notification
// ==========================================

async delete(id) {


    return await prisma.notification.delete({


        where: {


            id: Number(id)


        }


    });


}



// ==========================================
// Notification Stats
// ==========================================

async getStats(

    organizationId = null

) {


    const where = organizationId

        ? {

            organizationId:

                Number(organizationId)

        }

        : {};



    const [

        total,

        unread,

        read

    ] = await Promise.all([



        prisma.notification.count({

            where

        }),



        prisma.notification.count({

            where: {

                ...where,

                isRead: false

            }

        }),



        prisma.notification.count({

            where: {

                ...where,

                isRead: true

            }

        })


    ]);



    return {


        total,


        unread,


        read


    };


}


}


export default new NotificationRepository();