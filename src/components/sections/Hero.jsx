import BackgroundVideo from "../common/BgVid";
import heroImg from "../../assets/mobile/hero.jpg";
import BackgroundImage from "../common/BgPic";

const Hero = () => {
  //https://www.pexels.com/download/video/27554375/
  //https://www.pexels.com/download/video/15671347/
  return (  
    <div className="relative h-screen flex flex-col md:block  justify-center">
     <div className="overflow-hidden hidden md:block absolute inset-0 -z-40">
        <BackgroundVideo source="https://www.pexels.com/download/video/27554375/"/>
      </div>
     <div className="overflow-hidden block md:hidden absolute inset-0 -z-40">
      <BackgroundImage source={heroImg} />
      </div>
      <div className="w-full flex flex-col gap-12 md:justify-center md:w-1/2 h-2/3 md:h-full pl-4 py-16  md:gap-8 items-center md:items-start">
        <h1
          className=" font-tag p-2 border border-(--gold-primary) w-fit font-bold bg-[rgba(11,17,22,0.8)] text-(--gold-primary) rounded-lg"
          style={{ fontSize: "var(--font-size-small)" }}
        >
          SHRESHTHA KHURANA / THE ARCHITECT OF TOMORROW
        </h1>

        <h1
          className="font-semibold text-(--gold-light) leading-tight font-display w-[90%] md:w-full"
          style={{ fontSize: "var(--font-size-big)" }}
        >
          A global network, rooted in a young mind&apos;s vision.
        </h1>

        <p
          className="text-(--gold-highlight) font-semibold w-[90%] md:w-full mx-auto "
          style={{fontSize:"var(--font-size-medium)"}}
        >
          This is not impatience. It is a different timeline—one where vision
          arrives long before age does.
        </p>

        <p
          className="text-(--gold-dark) font-semibold leading-tight md:w-full w-[90%]"
          style={{fontSize:"var(--font-size-medium)"}}
        >
          Before the world believed a connected ecosystem could be built from
          the ground up, there was a simpler decision: build businesses that
          work together while others built them apart.
        </p>

        <h2
          className="border w-fit border-(--gold-highlight) text-(--gold-primary) p-1 rounded-lg font-tag"
          style={{ fontSize: "var(--font-size-small)" }}
          data-motion="float-up"
        >
          Scroll to enter the field notebook.
        </h2>
      </div>
    </div>
  );
};

export default Hero;
