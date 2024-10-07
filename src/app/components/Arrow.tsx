type ArrowStyleType = "default" | "left" | "right";

const ARROW_STYLES: Record<ArrowStyleType, string> = {
  default:
    "absolute rotate-[225deg] w-sp-[16] t-sp-[14] l-sp-[8] md:w-tablet-[24] md:t-tablet-[20] md:l-tablet-[18] lg:w-pc-[44] lg:t-pc-[30] lg:l-pc-[30]",
  left: "w-pc-[30]",
  right: "w-pc-[30] rotate-180",
};

interface ArrowProps {
  style?: ArrowStyleType;
}

export default function Arrow({ style = "default" }: ArrowProps) {
  const arrowStyle = ARROW_STYLES[style];

  return (
    <div className={`${arrowStyle}`}>
      <svg
        className="w-full h-full"
        viewBox="0 0 34 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.00009 15.6022L34.0001 15.6022V16.6022L1.00009 16.6022L1.00009 15.6022Z"
          className="fill-light"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.75259 16.2272L16.6263 31.101L15.9192 31.8081L0.338379 16.2272L15.9192 0.646362L16.6263 1.35347L1.75259 16.2272Z"
          className="fill-light"
        />
      </svg>
    </div>
  );
}
