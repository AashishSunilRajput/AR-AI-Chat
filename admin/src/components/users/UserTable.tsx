"use client";


import userService,{User} from "@/services/user.service";



interface Props{

    users:User[];

    refresh:()=>void;

}



export default function UserTable({
    users,
    refresh
}:Props){



const removeUser = async(id:number)=>{


    const confirmDelete =
        confirm(
            "Delete this user?"
        );


    if(!confirmDelete)
        return;



    await userService.delete(id);


    refresh();


};



const toggleStatus = async(
    user:User
)=>{


    await userService.updateStatus(

        user.id,

        !user.isActive

    );


    refresh();


};




return (

<div
className="
rounded-2xl
border
bg-white
overflow-hidden
"
>


<table className="w-full">


<thead
className="
bg-slate-50
border-b
"
>

<tr>


<th className="p-4 text-left">
Name
</th>


<th className="p-4 text-left">
Email
</th>


<th className="p-4 text-left">
Role
</th>


<th className="p-4 text-left">
Organization
</th>


<th className="p-4 text-left">
Status
</th>


<th className="p-4">
Action
</th>


</tr>


</thead>



<tbody>


{
users.map((user)=>(


<tr
key={user.id}
className="
border-b
hover:bg-slate-50
"
>


<td className="p-4 font-medium">

{user.name}

</td>



<td className="p-4">

{user.email}

</td>



<td className="p-4">

<span
className="
rounded-full
bg-blue-100
px-3
py-1
text-sm
"
>

{user.role}

</span>

</td>




<td className="p-4">

{
user.organization?.name
||
"System"
}

</td>




<td className="p-4">


<button

onClick={()=>toggleStatus(user)}

className={
user.isActive
?
"rounded-full bg-green-100 px-3 py-1 text-green-700"
:
"rounded-full bg-red-100 px-3 py-1 text-red-700"
}

>

{
user.isActive
?
"Active"
:
"Inactive"
}

</button>


</td>



<td className="p-4">


<button

onClick={()=>removeUser(user.id)}

className="
rounded-lg
bg-red-600
px-3
py-1
text-white
text-sm
"

>

Delete

</button>


</td>



</tr>


))
}



</tbody>



</table>


</div>

);


}