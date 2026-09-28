import chap2 from '../../assets/chap2.jpg';
import BackgroundImage from "../common/BgPic"
const Second = () => {
const SData = ["FREEDOM", "CREATIVITY", "PRACTICAL MASTERY", "GLOBAL PERSPECTIVE"];

  return (
    <div className="h-screen w-full flex flex-col items-left justify-center relative gap-4" data-motion="float-left">
        <div data-motion="fade" className="opacity-60 absolute w-full h-full"><BackgroundImage source={chap2}/></div>
        <div className="w-1/2 flex flex-col gap-5">
            <h3 className="font-tag text-(--gold-primary) border rounded-xl border-(--gold-primary) w-fit p-1 px-2 bg-(--fground-highlighted)" style={{fontSize:""}} data-motion="float-top-right">ACT 2/ THE OTHER PATH . AGE 09</h3>

            <h2 className="font-display font-semibold text-(--font-color-s1) leading-20" style={{fontSize:"var(--font-size-big)"}} data-motion="float-bottom-left">He chose a different path.</h2>

            <h2 className="text-(--font-color-s2) leading-16 " style={{fontSize:"var(--font-size-semi-large)"}} data-motion="float-bottom-right">Online schooling over traditional limits.</h2>

            <p className="font-light text-gray-400" data-motion="float-left">
              At nine, Shreshth chose online schooling, believing traditional systems could limit creativity and practical learning. With encouragement and unwavering support from his parents, he began turning that freedom into something of his own.
            </p>
          <div className="w-full pl-3 border-l-2 border-(--gold-highlight)" data-motion="float-left"><h3 style={{fontSize:"var(--font-size-small)"}} className="font-thin text-(--gold-primary)">
               “ The world was getting bigger. So was the vision. ”
            </h3></div>
        </div>

          <ul className=' w-full flex gap-6'>
            {SData.map((item,index)=>(
              <div key={index} className="font-tag flex gap-5 items-center"><li className='p-1 px-2 border rounded-xl border-white/30 bg-(--fground) hover:bg-(--fground-highlighted) hover:text-(--gold-light) text-white hover:cursor-default' style={{fontSize:"var(--font-size-xsmall)"}} data-motion="float-right">{item}</li>
                {index !== SData.length - 1 && (
                  <div className="w-2 aspect-square bg-(--gold-primary) rounded-full"></div>
                )}
              </div>
            ))}
          </ul>
        
    </div>
  )
}

export default Second