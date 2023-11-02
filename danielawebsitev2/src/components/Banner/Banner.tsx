import { MensajeType } from "@/lib/types";

import Bio from "./Bio/Bio";
import Reviews from "./Reviews/Reviews";
import { WithSkeleton } from "../WithSkeleton";
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

            <p className="mt-6 text-lg sm:text-2xl leading-8 mx-10 capitalize dark:text-slate-300">
              {frase?.enable ? frase?.message : ""}
            </p>
            <div className="flex mt-10 md:flex-row flex-col">
              <Bio></Bio>
              <Reviews></Reviews>
            </div>
            <section className="py-6 dark:bg-gray-800 dark:text-gray-50">
              <div className="grid max-w-6xl grid-cols-1 px-6 mx-auto lg:px-8 md:grid-cols-2 md:divide-x">
                <div className="py-6 md:py-0 md:px-6">
                  <h1 className="text-4xl font-bold">Get in touch</h1>
                  <p className="pt-2 pb-4">
                    Fill in the form to start a conversation
                  </p>
                  <div className="space-y-4">
                    <p className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-5 h-5 mr-2 sm:mr-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span>Fake address, 9999 City</span>
                    </p>
                    <p className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-5 h-5 mr-2 sm:mr-6"
                      >
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                      </svg>
                      <span>123456789</span>
                    </p>
                    <p className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-5 h-5 mr-2 sm:mr-6"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                      </svg>
                      <span>contact@business.com</span>
                    </p>
                  </div>
                </div>
                <form className="flex flex-col py-6 space-y-6 md:py-0 md:px-6">
                  <label className="block">
                    <span className="mb-1">Full name</span>
                    <input
                      type="text"
                      placeholder="Leroy Jenkins"
                      className="block w-full rounded-md shadow-sm focus:ring focus:ri focus:ri dark:bg-gray-800"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1">Email address</span>
                    <input
                      type="email"
                      placeholder="leroy@jenkins.com"
                      className="block w-full rounded-md shadow-sm focus:ring focus:ri focus:ri dark:bg-gray-800"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1">Message</span>
                    <textarea
                      rows={3}
                      className="block w-full rounded-md focus:ring focus:ri focus:ri dark:bg-gray-800"
                    ></textarea>
                  </label>
                  <button
                    type="button"
                    className="self-center px-8 py-3 text-lg rounded focus:ring hover:ring focus:ri dark:bg-violet-400 dark:text-gray-900 focus:ri hover:ri"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </section>
            <section className="dark:bg-gray-800 dark:text-gray-100">
              <div className="container flex flex-col justify-center px-4 py-8 mx-auto md:p-8">
                <h2 className="mb-12 text-4xl font-bold leadi text-center sm:text-5xl">
                  Frequently Asked Questions
                </h2>
                <div className="divide-y divide-gray-700">
                  <div className="py-6 space-y-2 md:grid md:grid-cols-12 md:gap-8 md:space-y-0">
                    <h3 className="font-semibold md:col-span-5">
                      Optio maiores eligendi molestiae totam dolores similique?
                    </h3>
                    <p className="md:pl-0 md:col-span-7">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Unde neque in fugiat magni, quas animi enim veritatis
                      deleniti ex. Impedit.
                    </p>
                  </div>
                  <div className="py-6 space-y-2 md:grid md:grid-cols-12 md:gap-8 md:space-y-0">
                    <h3 className="font-semibold md:col-span-5">
                      Optio maiores eligendi molestiae totam dolores similique?
                    </h3>
                    <p className="md:pl-0 md:col-span-7">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Est aspernatur quae, eos explicabo odit minima libero
                      veniam similique quibusdam doloribus facilis ipsa
                      accusantium vel maiores corrupti! Libero voluptate a
                      doloribus?
                    </p>
                  </div>
                  <div className="py-6 space-y-2 md:grid md:grid-cols-12 md:gap-8 md:space-y-0">
                    <h3 className="font-semibold md:col-span-5">
                      Modi dolorem veritatis culpa quos consequuntur beatae
                      itaque excepturi perspiciatis?
                    </h3>
                    <p className="md:pl-0 md:col-span-7">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Ut voluptates aspernatur dolores in consequatur doloremque
                      inventore reprehenderit, consequuntur perspiciatis
                      architecto.
                    </p>
                  </div>
                  <div className="py-6 space-y-2 md:grid md:grid-cols-12 md:gap-8 md:space-y-0">
                    <h3 className="font-semibold md:col-span-5">
                      Magni reprehenderit possimus debitis?
                    </h3>
                    <p className="md:pl-0 md:col-span-7">
                      Sed consectetur quod tenetur! Voluptatibus culpa incidunt
                      veritatis velit quasi cupiditate unde eaque! Iure,
                      voluptatibus autem eaque unde possimus quae.
                    </p>
                  </div>
                </div>
              </div>
            </section>
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
