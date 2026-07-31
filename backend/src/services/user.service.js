import bcrypt from "bcrypt";
import userRepository from "../repositories/user.repository.js";


class UserService {


// ==============================
// Create User
// ==============================

async create(user, data) {

    const {
        organizationId,
        name,
        email,
        password,
        role
    } = data;

    // Check Email
    const emailExists =
        await userRepository.findByEmail(email);

    if (emailExists) {

        throw new Error(
            "Email already exists"
        );

    }

    // Hash Password
    const hashedPassword =
        await bcrypt.hash(
            password,
            10
        );

    // =================================
    // Organization
    // =================================

    let orgId;

    if (user.role === "SUPER_ADMIN") {

        if (!organizationId) {

            throw new Error(
                "Organization is required"
            );

        }

        orgId = Number(
            organizationId
        );

    }
    else {

        orgId =
            user.organizationId;

    }

    // =================================
    // Create User
    // =================================

    return await userRepository.create({

        organizationId: orgId,

        name,

        email,

        password: hashedPassword,

        role,

        isActive: true

    });

}



// ==============================
// Get All Users
// ==============================

async getAll(user){


    // =================================
    // SUPER ADMIN
    // All Organization Users
    // =================================

    if(user.role === "SUPER_ADMIN"){


        return await userRepository.getAllUsers();


    }



    // =================================
    // CLIENT ADMIN
    // Only Own Organization Users
    // =================================


    return await userRepository.getUsersByOrganization(

        user.organizationId

    );


}





// ==============================
// Get User By ID
// ==============================

async getById(user,id){


    let existingUser;



    // SUPER ADMIN

    if(user.role === "SUPER_ADMIN"){


        existingUser =
        await userRepository.findById(

            Number(id)

        );


    }
    else{


        existingUser =
        await userRepository.findByIdAndOrganization(

            Number(id),

            user.organizationId

        );


    }




    if(!existingUser){

        throw new Error(
            "User not found"
        );

    }



    return existingUser;


}







// ==============================
// Update User
// ==============================

async update(user,id,data){


    let existingUser;



    if(user.role === "SUPER_ADMIN"){


        existingUser =
        await userRepository.findById(

            Number(id)

        );


    }
    else{


        existingUser =
        await userRepository.findByIdAndOrganization(

            Number(id),

            user.organizationId

        );


    }



    if(!existingUser){

        throw new Error(
            "User not found"
        );

    }




    const updateData = {


        name:data.name,

        email:data.email,

        role:data.role


    };




    if(
        data.password &&
        data.password.trim() !== ""
    ){


        updateData.password =
        await bcrypt.hash(

            data.password,

            10

        );


    }



    return await userRepository.update(

        Number(id),

        updateData

    );


}







// ==============================
// Update Status
// ==============================

async updateStatus(user,id,isActive){


    let existingUser;



    if(user.role === "SUPER_ADMIN"){


        existingUser =
        await userRepository.findById(

            Number(id)

        );


    }
    else{


        existingUser =
        await userRepository.findByIdAndOrganization(

            Number(id),

            user.organizationId

        );


    }




    if(!existingUser){

        throw new Error(
            "User not found"
        );

    }




    return await userRepository.updateStatus(

        Number(id),

        isActive

    );


}







// ==============================
// Delete User
// ==============================

async delete(user,id){


    let existingUser;



    if(user.role === "SUPER_ADMIN"){


        existingUser =
        await userRepository.findById(

            Number(id)

        );


    }
    else{


        existingUser =
        await userRepository.findByIdAndOrganization(

            Number(id),

            user.organizationId

        );


    }





    if(!existingUser){

        throw new Error(
            "User not found"
        );

    }





    await userRepository.delete(

        Number(id)

    );




    return {

        message:
        "User deleted successfully"

    };


}




}


export default new UserService();