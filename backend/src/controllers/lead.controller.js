import leadService from "../services/lead.service.js";



export const createLead = async(req,res)=>{

try{

    console.log("LEAD REQUEST BODY:", req.body);


    const lead =
    await leadService.createLead(
        req.body
    );


    res.status(201).json({

        success:true,

        message:"Lead created successfully",

        data:lead

    });


}catch(error){

    res.status(500).json({

        success:false,

        message:error.message

    });

}

};





export const getLeads = async (req, res) => {

    try {

        const leads =
            await leadService.getLeads(
                req.user
            );

        res.json({

            success: true,

            data: leads

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};





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


    }catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }

};





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


    }catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }

};





export const deleteLead = async(req,res)=>{

    try{


        await leadService.deleteLead(

            Number(req.params.id)

        );


        res.json({

            success:true,

            message:"Lead deleted"

        });


    }catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }

   

};
 export const getStats = async (req, res) => {

    console.log("USER:", req.user);

    try {

        const stats = await leadService.getStats(
            req.user
        );

        res.json({
            success: true,
            data: stats
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

