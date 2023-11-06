import { MensajeType } from "@/lib/types";

import Bio from "./Bio/Bio";
import Reviews from "./Reviews/Reviews";
import { WithSkeleton } from "../WithSkeleton";
import Contact from "../ContactSection/Contact";
interface BannerProps {
  lema?: MensajeType;
  frase?: MensajeType;
}
const Banner: React.FC<BannerProps> = ({ lema, frase }: BannerProps) => {
  return (
    <section>
      <div className="relative px-6 lg:px-8">
        <div className="mx-auto max-w-5xl pt-4 sm:pt-20 sm:pb-24">
          <div className="text-center">
            <h1 className="text-transparent bg-clip-text dark:bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] dark:from-red-900 dark:via-violet-200 dark:to-orange-500     bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-slate-900 via-purple-900 to-slate-900 text-4xl font-bold tracking-tight sm:text-75px md:4px">
              <p> {lema?.enable ? lema?.message : ""}</p>
            </h1>

            <p className="mt-6 text-lg sm:text-2xl leading-8 mx-10 dark:text-slate-300">
              {frase?.enable ? frase?.message : ""}
            </p>
            <div className="flex mt-10 md:flex-row flex-col">
              <Bio></Bio>
              <Reviews></Reviews>
            </div>

            <section className="dark:bg-gray-800 dark:text-gray-100">
              <div className="container flex flex-col-reverse mx-auto lg:flex-row">
                <div className="flex flex-col px-6 py-8 space-y-6 rounded-sm sm:p-8 lg:p-12 lg:w-1/2 xl:w-2/5 dark:bg-rose-400 dark:text-gray-900">
                  <div className="flex space-x-2 sm:space-x-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="flex-shrink-0 w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                      ></path>
                    </svg>
                    <div className="space-y-2">
                      <p className="text-lg font-medium leadi">
                        Lorem ipsum dolor sit amet
                      </p>
                      <p className="leadi">
                        Praesentium ea et neque distinctio quas eius repudiandae
                        quaerat obcaecati voluptatem similique!
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2 sm:space-x-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="flex-shrink-0 w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                      ></path>
                    </svg>
                    <div className="space-y-2">
                      <p className="text-lg font-medium leadi">
                        Lorem ipsum dolor sit amet
                      </p>
                      <p className="leadi">
                        Praesentium ea et neque distinctio quas eius repudiandae
                        quaerat obcaecati voluptatem similique!
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2 sm:space-x-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="flex-shrink-0 w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                      ></path>
                    </svg>
                    <div className="space-y-2">
                      <p className="text-lg font-medium leadi">
                        Lorem ipsum dolor sit amet
                      </p>
                      <p className="leadi">
                        Praesentium ea et neque distinctio quas eius repudiandae
                        quaerat obcaecati voluptatem similique!
                      </p>
                    </div>
                  </div>
                </div>
                <div className="lg:w-1/2 xl:w-3/5 dark:bg-gray-800">
                  <div className="flex items-center justify-center p-4 md:p-8 lg:p-12">
                    <img
                      src="https://source.unsplash.com/640x480/"
                      alt=""
                      className="rounded-lg shadow-lg dark:bg-gray-500 aspect-video sm:min-h-96"
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* <div className="mx-auto max-w-4xl mt-24 pt-6 pb-8 px-6 lg:max-w-4xl lg:px-8 bg-white rounded-lg boxshadow">
            <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-8 xl:gap-x-8">
              <div className="col-span-3 text-black">Sesiones</div>
              <div className="col-span-3 text-black">Terapias</div>
              <div className="col-span-3 sm:col-span-2 mt-2">
                <button
                  onClick={() => {
                    let element: HTMLElement = document.getElementsByClassName(
                      "simplybook-widget-button"
                    )[0] as HTMLElement;
                    element.click();
                    element.onload = function () {
                      document.body.scrollTop = 0;
                      document.documentElement.scrollTop = 0;
                    };
                  }}
                  className="bg-purple w-full hover:bg-pruple text-white font-bold py-4 px-3 rounded"
                >
                  Reserva ahora
                </button>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Banner;
