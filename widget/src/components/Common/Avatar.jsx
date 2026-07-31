function Avatar({

    assistant

}) {

    if (assistant) {

        return (

            <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shadow">

                AI

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