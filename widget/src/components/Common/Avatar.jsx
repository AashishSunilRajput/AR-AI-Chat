function Avatar({
    assistant = false,
    avatar = null
}) {


    const avatarUrl = avatar
        ? `http://localhost:5000${avatar}`
        : null;


    if (assistant) {

        return (

            <div className="w-9 h-9 rounded-full overflow-hidden bg-blue-600 text-white flex items-center justify-center font-bold shadow">

                {
                    avatarUrl
                    ?
                    <img
                        src={avatarUrl}
                        alt="AI Avatar"
                        className="w-full h-full object-cover"
                    />
                    :
                    "AI"
                }

            </div>

        );

    }


    return (
        <div className="w-9 h-9 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold shadow">
            U
        </div>
    );

}


export default Avatar;