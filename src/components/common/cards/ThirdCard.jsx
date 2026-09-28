const ThirdCard = ({ title, Ricon, body, footer }) => {
  return (
    <div className="flex flex-col justify-between p-3 relative border border-white/30 w-full h-full group hover:cursor-default bg-(--fground) hover:bg-(--fground-highlighted) hover:border-(--gold-light)">
        <div className="absolute w-1/6 bg-(--gold-light) h-1.25 left-0 top-0"></div>
      <div className="flex flex-col w-full justify-between gap-5">
        <div className="flex items-center justify-between w-full">
          <h3 className="text-(--font-color-s2) whitespace-nowrap">{title}</h3>
          <Ricon />
        </div>

        <h3 className="font-semibold text-(--font-color)" style={{fontSize:"var(--font-size-medium)"}}>{body}</h3>
      </div>
      <h3 className="text-(--font-color-s1)" style={{fontSize:"var(--font-size-xsmall)"}}>{footer}</h3>
    </div>
  );
};

export default ThirdCard;
