import {fifthData} from '../../config/fifthConfig';
import BgPic from '../common/BgPic';
import chap5 from '../../assets/chap5.jpg';
const Fifth = () => {
  return (
    <div className="h-screen flex flex-col items-center pb-10 md:flex-row justify-around relative" data-motion="float-right">
      <div data-motion="fade" className="opacity-20 absolute w-full h-full scale-105 hidden md:block brightness-50"
      >
        <BgPic source={chap5}/>
      </div>
      <div className="md:w-1/2 flex flex-col gap-4">
        <h3
          className="text-(--gold-primary) border rounded-xl border-(--gold-primary) w-fit p-1 px-2 bg-(--fground-highlighted)"
          style={{ fontSize: "var(--font-size-small)" }}
          data-motion="float-down"
        >
          ACT 5/ WHAT DRIVES THIS BUILDING? . THE DOCTRINE
        </h3>
        <h3
          className="font-semibold text-(--font-color) leading-12 md:leading-16 mt-5 md:mt-0"
          style={{ fontSize: "var(--font-size-big)" }}
          data-motion="float-left"
        >
          Vision. Discipline.
          <br /> <span className="text-(--gold-primary)"> Execution </span>
        </h3>
        <h3
          className="text-(--font-color-s2) leading-8"
          style={{ fontSize: "var(--font-size-semi-large)" }}
          data-motion="float-right"
        >
          Vision without execution is only an idea. Discipline turns ambition
          into consistency. Relentless execution turns ideas into reality.
        </h3>
        <p className="text-(--gold-light) mb-3 md:mb-0" data-motion="float-right">
          The central belief: Vision, discipline and relentless execution will always beat pedigree.
        </p>
         <div
            className="w-full pl-3 border-l-2 border-(--gold-dark) font-display"
            data-motion="float-bottom-left"
          dation-motion="float-left">
            <h3
              style={{ fontSize: "var(--font-size-small)" }}
              className="font-thin text-(--gold-primary)"
            >
              “ ARCHIVAL DOSSIER // FOLID VII . THE FOUNDING DOCTRINE. ”
            </h3>
          </div>
      </div>

      {/** right section */}
      <div className="w-full md:w-1/3  h-fit flex flex-col gap-3 mt-10 md:mt-0">
        <div className="flex flex-row gap-3">
          {fifthData.filter((_,index)=>index<fifthData.length-1)
          .map((item,index)=>(
            <div key={index} className="border border-white/30 bg-(--fground) hover:bg-(--fground-highlighted) hover:cursor-default p-2 px-3 rounded-lg  w-1/2 group hover:border-(--gold-highlight)"
            data-motion={index==0?"float-top-left":"float-top-right"}
            >
              <h3 className='group-hover:text-(--font-color-s1)' style={{fontSize:"var(--font-size-medium)"}}>{item.title}</h3>
              <div className="flex flex-col gap-1.5 mt-1">
              {item.items.map((el,ind)=>(
                <div key={index+ind} className="flex relative px-1">
                  <div className="w-2 h-2 bg-(--gold-primary) absolute -left-2 top-1.5 rounded-xl"></div>
                  <h3 style={{fontSize:"var(--font-size-small)"}} className="text-(--font-color) font-thin ">{el}</h3>
                </div>
              ))}</div>
            </div>
))}
        </div>
        <div data-motion="float-up">
          {
            fifthData.filter((_,index)=>(index === fifthData.length-1))
            .map((item,index)=>(
              <div key={index} className="border border-white/30 bg-(--fground) hover:bg-(--fground-highlighted) hover:cursor-default p-2 px-3 rounded-lg  w-full group hover:border-(--gold-highlight)">
              <h3 className='group-hover:text-(--font-color-s1) ' style={{fontSize:"var(--font-size-medium)"}}>{item.title}</h3>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Fifth;
