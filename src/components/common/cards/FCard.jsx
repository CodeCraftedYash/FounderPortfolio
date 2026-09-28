 const FCard = ({title,heading,body,tag1,tag2}) => {
    
    return (
        <div className="bg-(--fground) w-full border-2 border-gray-50/70 transition-all duration-100 ease-in-out p-4 rounded-xl  flex flex-col items-left justify-between gap-5 hover:border-(--gold-primary) hover:bg-(--fground-highlighted) group " style={{fontSize:"var(--font-size-xsmall)"}}>

            <h3 className="font-tag font-bold group-hover:text-(--gold-primary)">{title}</h3>

            <h2 className="font-bold group-hover:text-(--font-color) font-display" style={{fontSize:"var(--font-size-medium)"}}>{heading}</h2>

            <h3 className="group-hover:text-(--gold-light) font-semibold" style={{fontSize:"var(--font-size-small)"}}>{body}</h3>

            <div className="font-tag grow border-t-2 group-hover:border-(--gold-dark) p-4 flex flex-nowrap justify-between w-full  " style={{fontSize:"var(--font-size-xsmall)"}}>
                <h3 className="text-(--gold-light) group-hover:text-(--gold-dark)">{tag1}</h3>
                <h3 className="text-(--gold-light) group-hover:text-(--gold-dark)">{tag2}</h3>
            </div>

        </div>
    )
    }

    export default FCard