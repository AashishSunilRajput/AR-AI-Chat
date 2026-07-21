function Card({ children, className = "" }) {
    return (
        <div
            className={`bg-white rounded-[20px] border border-slate-200 shadow-xl ${className}`}
        >
            {children}
        </div>
    );
}

export default Card;