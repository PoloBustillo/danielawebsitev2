import { MensajeType } from "@/lib/types";

import Bio from "./Bio/Bio";
import Reviews from "./Reviews/Reviews";

interface BannerProps {
  lema?: MensajeType;
  frase?: MensajeType;
}
const Banner: React.FC<BannerProps> = ({ lema, frase }: BannerProps) => {
  return (
    <section>
      <div className="relative">
        <div className="pt-4 mx-auto mt-4 max-w-7xl sm:pt-20 md:mt-0">
          <div className="text-center">
            <div className="px-6 py-4 lg:px-8">
              <h1 className="text-transparent bg-clip-text dark:bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] dark:from-red-900 dark:via-violet-200 dark:to-orange-500     bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-slate-900 via-purple-900 to-slate-900 text-4xl font-bold tracking-tight sm:text-75px md:4px">
                <p> {lema?.enable ? lema?.message : ""}</p>
              </h1>

              <p className="mx-10 mt-6 text-lg leading-3 sub-title sm:text-2xl dark:text-slate-300 font-barlow">
                <span className="relative text-xl">❝</span>
                {frase?.enable ? frase?.message : ""}{" "}
                <span className="relative text-xl">❞</span>
              </p>
            </div>
            <div className="flex flex-col m-auto md:px-6 lg:px-8 md:mt-10 md:flex-row">
              <Bio></Bio>
              <Reviews></Reviews>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
