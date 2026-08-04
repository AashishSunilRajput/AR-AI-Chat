import leadService from "../services/lead.service.js";


// ==========================================
// Create Lead
// ==========================================

export const createLead = async(req,res)=>{

    try{


        console.log(
            "LEAD REQUEST BODY:",
            req.body
        );


        const lead =
            await leadService.createLead(
                req.body
            );


        res.status(201).json({

            success:true,

            message:"Lead created successfully",

            data:lead

        });


    }
    catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }

};




// ==========================================
// Get All Leads With Filters + Pagination
// ==========================================

export const getLeads = async(req,res)=>{


    try{


        const filters = {


            search:
                req.query.search,


            status:
                req.query.status,


            source:
                req.query.source,


            from:
                req.query.from,


            to:
                req.query.to,


            page:
                req.query.page || 1,


            limit:
                req.query.limit || 10


        };



        const leads =

            await leadService.getLeads(

                req.user,

                filters

            );



        res.json({

            success:true,


            data:leads.data,


            pagination:
                leads.pagination


        });



    }
    catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};




// ==========================================
// Get Single Lead
// ==========================================

export const getLead = async(req,res)=>{


    try{


        const lead =

            await leadService.getLeadById(

                Number(req.params.id)

            );



        res.json({

            success:true,

            data:lead

        });


    }
    catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};




// ==========================================
// Update Lead
// ==========================================

export const updateLead = async(req,res)=>{


    try{


        const lead =

            await leadService.updateLead(

                Number(req.params.id),

                req.body

            );



        res.json({

            success:true,

            data:lead

        });


    }
    catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};




// ==========================================
// Delete Lead
// ==========================================

export const deleteLead = async(req,res)=>{


    try{


        await leadService.deleteLead(

            Number(req.params.id)

        );



        res.json({

            success:true,

            message:"Lead deleted"

        });



    }
    catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};




// ==========================================
// Lead Stats
// ==========================================

export const getStats = async(req,res)=>{


    try{


        console.log(
            "USER:",
            req.user
        );


        const stats =

            await leadService.getStats(

                req.user

            );



        res.json({

            success:true,

            data:stats

        });



    }
    catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};