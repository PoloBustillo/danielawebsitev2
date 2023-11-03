import Image from "next/image";
import Link from "next/link";
import { Logo } from "../icons/Logo";
import { WebDataType } from "@/lib/types";

// MIDDLE LINKS DATA
interface ProductType {
  id: number;
  section: string;
  link: { name: string; value: string; target?: string }[];
}

const products: ProductType[] = [
  {
    id: 1,
    section: "Company",
    link: [
      { name: "About us", value: "" },
      { name: "Blog", value: "" },
      { name: "Contact us", value: "" },
      { name: "Pricing", value: "" },
      { name: "Testimonials", value: "" },
    ],
  },
  {
    id: 2,
    section: "Soporte",
    link: [
      { name: "Help center", value: "" },
      {
        name: "Terminos de servicios",
        value: "/TERMINOSSERVICIO.pdf",
        target: "_blank",
      },
      {
        name: "Declaración de privacidad",
        value: "/DECLARACIONPRIVACIDAD.pdf",
        target: "_blank",
      },
      { name: "Privacy Policy", value: "" },
      { name: "Status", value: "" },
    ],
  },
];

const Footer = ({ webData }: { webData: WebDataType }) => {
  return (
    <div className="bg-gradient-to-t from-pink-600 px-14" id="first-section">
      <div className="mx-auto max-w-2xl pt-36 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="mt-24 grid grid-cols-1 gap-y-10 gap-x-16 sm:grid-cols-2 lg:grid-cols-12 xl:gap-x-8">
          <div className=" flex flex-col  justify-center items-center col-span-4">
            <Logo width={100} height={100}></Logo>
            <h3 className="text-white text-md text-center font-medium leading-9 mb-4 lg:mb-20">
              {webData.slogan}
            </h3>
            <div className="flex gap-4">
              <Link href="/">
                <Image
                  src={"/assets/footer/insta.svg"}
                  alt="instagram"
                  width={33}
                  height={33}
                  className="footer-icons"
                />
              </Link>
              <Link href="/">
                <img
                  src={"/assets/footer/dribble.svg"}
                  alt="dribble"
                  className="footer-icons"
                />
              </Link>
              <Link href="/">
                <img
                  src={"/assets/footer/twitter.svg"}
                  alt="twitter"
                  className="footer-icons"
                />
              </Link>
              <Link href="/">
                <img
                  src={"/assets/footer/youtube.svg"}
                  alt="youtube"
                  className="footer-icons"
                />
              </Link>
            </div>
          </div>

          {/* CLOUMN-2/3 */}

          {products.map((product) => (
            <div key={product.id} className="group relative col-span-2">
              <p className="text-white text-xl font-semibold mb-9">
                {product.section}
              </p>
              <ul>
                {product.link.map(
                  (
                    link: { name: string; value: string; target?: string },
                    index: number
                  ) => (
                    <li key={index} className="mb-5">
                      <Link
                        rel="noopener noreferrer"
                        target={link.target}
                        href={link.value}
                        className="text-[#FDFDFD] text-sm font-normal mb-6 space-links"
                      >
                        {link.name}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}

          {/* CLOUMN-4 */}

          <div className="col-span-4">
            <h3 className="text-white text-xl font-semibold mb-6">
              Stay up to date
            </h3>
            <div className="relative text-white focus-within:text-white flex flex-row-reverse">
              <input
                type="Email address"
                name="q"
                className="py-4 text-sm w-full text-white bg-gray-900 rounded-md pl-4 focus:outline-none bg-emailbg focus:text-white"
                placeholder="Your email address"
                autoComplete="off"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                <button
                  role="button"
                  type="submit"
                  className="p-1 focus:outline-none focus:shadow-outline"
                >
                  <Image
                    width={33}
                    height={33}
                    src={"/assets/footer/inputIcon.svg"}
                    alt="inputicon"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* All Rights Reserved */}

      <div className="pb-24 px-4">
        <h3 className="text-center text-[whitesmoke]">
          @2023 - All Rights Reserved by{" "}
          <Link href="light-hub.com" target="_blank">
            {" "}
            TakitoCorp
          </Link>
        </h3>
      </div>
    </div>
  );
};

export default Footer;
