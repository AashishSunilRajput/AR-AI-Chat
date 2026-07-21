function Avatar() {
    return (
        <div className="relative">

            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-white flex items-center justify-center font-bold text-lg shadow-lg">

                AI

            </div>

            <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full bg-green-500 border-2 border-white"></span>

        </div>
    );
}

export default Avatar;