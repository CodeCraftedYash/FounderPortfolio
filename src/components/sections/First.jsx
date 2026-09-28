import FCard from "../common/cards/FCard"
import { fData } from "../../config/firstConfig"
import BackgroundImage from "../common/BgPic"

const First = () => {

  return (
    <div className="h-screen w-full flex items-center justify-between relative" data-motion="float-up" >
        
        <div data-motion="fade" className="absolute inset-0 -z-10 opacity-10 "><BackgroundImage source="https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/></div>

        <div className="w-[52%] h-full flex flex-col items-left gap-4 justify-center" data-motion="float-up">
            <h3 className="font-tag text-(--gold-primary) border rounded-xl border-(--gold-primary) w-fit p-1 px-2 bg-(--fground-highlighted)" style={{fontSize:"var(--font-size-small)"}} data-motion="float-top-right">ACT 1/ THE TURNING POINT . AGE 07</h3>

            <h2 className="font-display text-(--font-color-s1)" style={{fontSize:"var(--font-size-large)"}} data-motion="float-bottom-left">Before there was a company, there was curiosity</h2>

            <h2 className="text-(--font-color-s2) font-bold" data-motion="float-bottom-right">At seven, Shreshth's elder brother introduced him to coding.</h2>

            <p className="font-light text-gray-400" data-motion="float-bottom-right">A computer became more than a machine. It became a window into what was possible. Not an enterprise, not an empire. Just a child mesmerized by code.
            </p>

            <div className="w-full pl-3 border-l-2 border-(--gold-dark) font-display" data-motion="float-bottom-right"><h3 style={{fontSize:"var(--font-size-small)"}} className="font-thin text-(--gold-primary)">
               “ A sovereign journey grows like a seed: slowly, deliberately, from the purest soil. ”
            </h3></div>
        </div>

        <div className="w-[45%] h-full flex flex-col gap-3 justify-center" >
            <div className="w-full  flex gap-3">
                <div data-motion="float-bottom-left" className="grow"><FCard title={fData[0].title} heading={fData[0].heading} body={fData[0].body} tag1={fData[0].tag1} tag2={fData[0].tag2}/></div>
                <div data-motion="float-top-right" className="grow"><FCard title={fData[1].title} heading={fData[1].heading} body={fData[1].body} tag1={fData[1].tag1} tag2={fData[1].tag2}/></div>
            </div>
            <div data-motion="float-bottom-right"><FCard title={fData[2].title} heading={fData[2].heading} body={fData[2].body} tag1={fData[2].tag1} tag2={fData[2].tag2}/></div>
        </div>
    </div>
  )
}

export default First