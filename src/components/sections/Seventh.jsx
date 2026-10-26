import image from "../../assets/chap7.jpg";
import BackgroundImage from "../common/BgPic";

const Seventh = () => {
  return (
    <div
      className="h-screen relative flex items-center "
      data-motion="float-top"
    >
      <div
        data-motion="fade"
        className="brightness-60 absolute w-full h-full scale-105 hidden md:block -z-40"
      >
        <BackgroundImage source={image} />
      </div>
      <div className="flex flex-col justify-around md:h-2/3 h-full">
        <h3
          className="font-tag text-(--gold-primary) border rounded-xl border-(--gold-primary) w-fit p-1 px-2 bg-(--fground-highlighted)"
          style={{ fontSize: "" }}
          data-motion="float-down"
        >
          ACT 7 // ARCHIVAL FOLIO 912 • THE EMERGENCE
        </h3>

        <div className="my-6">
          <div className="relative pl-3" data-motion="float-left">
            <div className="w-2 h-2 bg-(--gold-primary) absolute top-1.5 -left-0.5"></div>
            <h2
              style={{ fontSize: "var(--font-size-small)" }}
              className="text-(--font-color-s1)"
              data-motion="float-left"
            >
              RECOGNITION
            </h2>
          </div>
          <h2
            className="font-display font-semibold text-(--font-color) leading-12 md:leading-20"
            style={{ fontSize: "var(--font-size-big)" }}
            data-motion="float-right"
          >
            The work began
            <br />
            to<span className="text-(--font-color-s2)"> speak.</span>
          </h2>
          <p
            className="mt-3 md:mt-2 md:w-1/3 font-light text-gray-400"
            data-motion="float-left"
          >
            Recognition is a byproduct, not the goal. The goal is scale — real,
            global, generational scale that outlives the founder.
          </p>
        </div>
        <div
          className="w-full pl-3 border-l-2 border-(--gold-highlight) mt-3"
          data-motion="float-right"
        >
          <h3
            style={{ fontSize: "var(--font-size-small)" }}
            className="font-thin text-(--gold-primary) mt-8 md:mt-0"
          >
            “ The world was beginning to notice. But the building wasn't slowing
            down. ”
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Seventh;
