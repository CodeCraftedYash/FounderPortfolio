const MultiItemSection = ({ items, className = "" }) => {
    return (
        <section className={`absolute inset-0 multi-item-scene w-[90%] mx-auto h-screen flex items-center justify-center ${className}`}>
            <div className="relative w-full h-full flex items-center justify-center">
                {items.map((item, index) => (
                    <div
                        key={index}
                        data-item-index={index}
                        data-motion={item.animation || "float-up"}
                        className={`absolute opacity-0 ${item.className || ""}`}
                    >
                        {item.content}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default MultiItemSection;