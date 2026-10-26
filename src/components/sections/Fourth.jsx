import BackgroundImage from "../common/BgPic";
import image from "../../assets/chap4.jpg";
import { useRef } from "react";
import { companies } from "../../config/companyConfig";

const Fourth = () => {
  const tagData = [
    "TECHNOLOGY",
    "LEGAL",
    "EDUCATION",
    "CONSULTING",
    "SOCIAL IMPACT",
    " REAL ESTATE",
    " CONSUMER",
  ];
  const containerRef = useRef(null);

  return (
    <div
      className="w-full min-h-screen md:justify-center flex flex-col items-center relative"
      data-motion="float-down"
      ref={containerRef}
    >
      <div data-motion="fade" className="absolute inset-0 -z-50 opacity-10">
        <BackgroundImage source={image} />
      </div>

      <div className="w-full flex  flex-col items-left gap-6 md:gap-4 h-[60%]">
        <h3
          className="font-tag text-(--gold-primary) border rounded-xl border-(--gold-primary)  p-1 px-2 bg-(--fground-highlighted) text-wrap w-fit"
          style={{ fontSize: "var(--font-size-small)" }}
          data-motion="fade"
        >
          ACT 4 / ONE COMPANY WAS NEVER THE PLAN . EXPANSION RATION 9:1
        </h3>
        <div className="my-5 w-full">
          <h2
            className="font-display text-(--font-color)"
            style={{ fontSize: "var(--font-size-big)" }}
            data-motion="float-top-left"
          >
            The first company became a foundation.
          </h2>

          <h2
            className="font-display text-(--font-color-s2)"
            style={{ fontSize: "var(--font-size-large)" }}
            data-motion="float-top-right"
          >
            The foundation became an ecosystem.
          </h2>
        </div>
        <p
          className="font-light text-(--font-color-s1) text-left w-full"
          data-motion="float-bottom-left"
          style={{fontSize:"var(--font-size-medium)"}}
        >
          What began as one company was becoming a network of businesses,
          institutions and ideas.
        </p>
    <div className="w-full flex flex-col justify-center">
        <p className="font-light text-gray-400 w-2/3" data-motion="float-bottom-right">
          A deliberate refusal to build monocultures. Each venture established
          sovereign independence while feedingcross-disciplinary intelligence,
          capital efficiency, and systemic resilience across emerging
          industries.
        </p>
        </div>
        <div className="grow w-full flex flex-col justify-between gap-6">
          <div
            className="w-full pl-3 border-l-2 border-(--gold-dark) font-display"
            data-motion="float-bottom-left"
          >
            <h3
              style={{ fontSize: "var(--font-size-small)" }}
              className="font-thin text-(--gold-primary)"
            >
              “ This wasn't a portfolio. It was an ecosystem. ”
            </h3>
          </div>
          <div className="flex flex-wrap w-[90%] mx-auto md:mx-0 md:w-3/5 min-h-28 gap-2 md:justify-around items-center" data-motion="float-up" >
            {companies.map((item, index) => {
              const random = Math.random;
              return (
                <div
                  className="w-16 h-16 relative rounded-lg overflow-hidden border-gray-400 border hover:border-(--gold-primary) z-10"
                  key={index}
                  style={{ margin: `${random * 20}px` }}
                  data-motion="rotate-in"
                >
                  <img src={item.logo} alt={item.name} />
                </div>
              );
            })}
          </div>
          <ul className=" w-full flex gap-2 md:gap-6 flex-wrap items-start justify-left " data-motion="float-up">
            {tagData.map((item, index) => (
              <div
                key={index}
                className="font-tag mt-2 md:mt-0 flex gap-2 md:gap-5 items-center"
              >
                <li
                  className="p-1 px-2 border rounded-xl border-white/30 bg-(--fground) hover:bg-(--fground-highlighted) hover:text-(--gold-light) text-white hover:cursor-default"
                  style={{ fontSize: "var(--font-size-xsmall)" }}
                  data-motion="float-up"
                >
                  {item}
                </li>
                {index !== tagData.length - 1 && (
                  <div
                    className="w-2 aspect-square bg-(--gold-primary) rounded-full hidden md:block"
                    data-motion="float-up"
                  ></div>
                )}
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Fourth;
