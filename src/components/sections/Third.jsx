import { GiVikingLonghouse } from "react-icons/gi"
import { thirdData } from "../../config/thirdConfig"
import ThirdCard from "../common/cards/ThirdCard"
import GridBg from "../common/GridBg"
import { BiRightArrow } from "react-icons/bi"

const Third = () => {
  return (
    <div className="flex items-center justify-between w-full h-full relative">
       {/** Left Section */}
        <div className="border-r border-white/30 grow h-full pr-10 flex flex-col gap-8 items-left justify-center relative" data-motion="fade">
        <div className="absolute w-full h-full -z-20 opacity-3 pointer-events-none"><GridBg  cellSize={12} lineColor="white"/></div>
            <h3 className="text-(--gold-primary) border rounded-xl border-(--gold-primary) w-fit p-1 px-2 bg-(--fground-highlighted)" style={{fontSize:""}} data-motion="float-down">ACT 3/ THE SYSTEMIC WORKSHOP. THE FIRST BUILD</h3>
            
            <h3 className="font-semibold text-(--font-color) leading-16" style={{fontSize:"var(--font-size-large)"}} data-motion="float-left">What started with curiosity became a company.</h3>

            <h3 className="text-(--font-color-s2) leading-8" style={{fontSize:"var(--font-size-semi-large)"}} data-motion="float-right">Prowebmatrix: Built from the belief that technology must solve real problems.</h3>

            <p className="text-(--gold-light)" data-motion="float-right">Shreshth launched Prowebmatrix as his foundational venture. What began as a single build rapidly scaled into an interconnected suite across borders.</p>

            <div className="border-(--gold-dark) border-2 p-2 rounded-xl group hover:border-(--gold-light) transition-all duration-100 ease-in-out gap-2 flex flex-col w-[60%] items-center justify-center hover:bg-(--fground-highlighted) hover:cursor-default mt-10" data-motion="float-up">
                <h3 style={{fontSize:"var(--font-size-medium)"}} className="group-hover:text-(--font-color-s2) font-thin text-(--font-color)">
               “One company became a system. And this was only the first brick.”
            </h3>
            <div className="flex gap-3 items-center justify-between">
                <h3 className="text-(--font-color-s2) group-hover:text-(--font-color-s1)" style={{fontSize:"var(--font-size-xsmall)"}}>ARCHIVAL REGISTER // FOLIO 03</h3>
                <h3 className="text-white/30 group-hover:text-(--font-color-s1)" style={{fontSize:"var(--font-size-xsmall)"}}>100% ORGANIC GROWTH</h3>
            </div>
            </div>
        </div>

        {/** right Section */}
        <div className="flex flex-col pb-4 ">
            {/** upper container */}
            <div className="flex w-full h-full p-4 gap-4 justify-between">
                {/** first card */}
                <div className="flex flex-col items-center justify-between p-4 relative bg-(--fground) border-white/20 border hover:border-(--gold-primary) hover:cursor-default hover:bg-(--fground-highlighted)" data-motion="float-down">
                    <div className="w-1/8 border-t-4 border-(--gold-primary) absolute top-0 left-0"></div>
                <div className="flex w-full items-center justify-between">
                    <h3 className=" flex items-center gap-2 text-(--gold-primary)" style={{fontSize:"var(--font-size-xsmall)"}}><div className="w-2 aspect-square bg-(--gold-primary)"></div>IN-HOUSE // SYSTEM</h3>
                    <h3 className="text-white/60">EST. 2021</h3>
                </div>
                <div>
                    <h3 className="relative" style={{fontSize:'var(--font-size-large)'}}>matrix.
                        <div className="w-1/6 absolute bottom-2 bg-(--gold-primary) h-1"></div>
                    </h3>
                    
                    <h3 className="text-(--gold-primary)" style={{fontSize:"var(--font-size-medium)"}}>Built.</h3>
                </div>
                <div className="flex w-full items-center justify-between">
                    <h3>5 INTERLOCKING DISCIPLINES</h3>
                    <div className="border-(--gold-light) w-8 aspect-square rounded-full p-4 flex items-center justify-center"><div className="bg-(--gold-light) rounded-full"></div></div>
                </div>
                </div>
                <div className="flex flex-wrap gap-4 w-full">
                {
                    thirdData.map((item,index)=>(
                        <div key={index} className="grow" data-motion={(index+1)%2==0?"float-left":"float-right"}>
                            <ThirdCard title={item.title} Ricon={item.icon} body={item.body} footer={item.footer} />
                        </div>
                    ))
                }
                </div>
            </div>

                {/**bottom card section*/}

            <div className="min-h-32 border border-white/30 hover:border-(--gold-light) bg-(--fground) hover:bg-(--fground-highlighted) flex items-center hover:cursor-default w-[96%] mx-auto p-2" style={{fontSize:"var(--font-size-small)"}} data-motion="float-up">
                    <div className="border border-white/30"><GiVikingLonghouse className="text-(--gold-light)" style={{fontSize:"var(--font-size-medium)"}}/></div>
                    <div className=" flex flex-col gap-2 h-full w-[40%] p-4">
                        <div className="flex justify-between w-full gap-1" style={{fontSize:"var(--font-size-xsmall)"}}>
                            <h3 className="text-(--gold-highlight)">05 // <br /> 
                            INSTITUTIONAL <br />
                            REACH
                            </h3>
                            <h3 className="text-(--font-color-s1)">CAPITAL <br /> FOUNDATION</h3>
                        </div>
                        <div>
                            <h3 className="text-(--font-color)" style={{fontSize:"var(--fontsize-semi-large)"}}>NGO & Strategic Funding</h3>
                        </div>
                    </div>
                    <div className="flex flex-col grow h-full justify-center gap-3 items-end">
                        <h3 className="text-right">Securing long-term capital, systemic scalability, and societal dividend.</h3>
                        <h3 className="flex items-center gap-2 text-(--gold-primary)">UNIFIED ARCHIVAL REGISTER <span><BiRightArrow /></span></h3>
                    </div>
            </div>
        </div>

    </div>
  )
}

export default Third