import BackgroundVideo from "../common/BgVid";

const Hero = () => {
  //https://www.pexels.com/download/video/27554375/
  //https://www.pexels.com/download/video/15671347/
  return (  
    <div className="relative h-screen">
      <div className="w-full h-full overflow-hidden absolute inset-0 -z-40">
        <BackgroundVideo source="https://www.pexels.com/download/video/27554375/" />
      </div>
      <div className="flex flex-col justify-around w-1/2 h-full pl-4 py-16  gap-4">
        <h1
          className="font-tag p-2 border border-(--gold-primary) w-fit font-bold bg-[rgba(11,17,22,0.8)] text-(--gold-primary) rounded-lg"
          style={{ fontSize: "var(--font-size-small)" }}
        >
          SHRESHTHA KHURANA / THE ARCHITECT OF TOMORROW
        </h1>

        <h1
          className="font-semibold text-(--gold-light) leading-tight font-display"
          style={{ fontSize: "var(--font-size-big)" }}
        >
          A global network, rooted in a young mind&apos;s vision.
        </h1>

        <p
          className="text-(--gold-highlight) font-semibold "
          style={{fontSize:"var(--font-size-medium)"}}
        >
          This is not impatience. It is a different timeline—one where vision
          arrives long before age does.
        </p>

        <p
          className="text-(--gold-dark) font-semibold leading-tight "
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
