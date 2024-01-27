import { getWebData } from "@/lib/api";
import { WebDataType } from "@/lib/types";
import { Link } from "@nextui-org/react";
import SocialLink from "../SocialLinks/SocialLink";

const Contact = async () => {
  const webData = (await getWebData()) as WebDataType;

  return (
    <section
      id="contactame"
      className=" dark:bg-gray-800 dark:text-gray-50  pb-10"
    >
      <div className="relative px-6 lg:px-8 ">
        <div className="mx-auto max-w-7xl pt-4 sm:pt-20 ">
          <h1 className="text-4xl font-bold text-center">Contactame</h1>
          <div className=" grid max-w-6xl grid-cols-1 px-6 mx-auto lg:px-8 md:grid-cols-2 md:divide-x">
            <div className="py-6 md:py-0 md:px-6">
              <p className="pt-2 pb-4">
                Llama o manda un mensaje por alguna de mis redes sociales.
              </p>
              <div className="space-y-4">
                <div className="flex items-center flex-row">
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
                  <div>
                    {webData.address.map((address) => {
                      return (
                        <div className="capitalize" key={address.values}>
                          <span className="font-bold">{address.type}</span>
                          {`:   ${address.values}`}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <p className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5 mr-2 sm:mr-6"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                  </svg>
                  <span>
                    <Link
                      className=" text-current text-md font-normal"
                      showAnchorIcon
                      href={`tel:+52${webData.telefono.replaceAll("·", "")}`}
                    >
                      {webData.telefono}
                    </Link>
                  </span>
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
                  <span>
                    <Link
                      className=" text-current text-md font-normal"
                      showAnchorIcon
                      href={`mailto:${webData.email}`}
                    >
                      {webData.email}
                    </Link>
                  </span>
                </p>

                {webData.extraData?.length ? <h3>Información extra:</h3> : null}
                {webData.extraData?.map((extraData) => (
                  <p key={extraData.name} className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 mr-2 sm:mr-6"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      strokeWidth="2.3"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      dangerouslySetInnerHTML={{
                        __html: extraData.icon,
                      }}
                    ></svg>
                    <span>{`${extraData.name}: ${extraData.value}`}</span>
                  </p>
                ))}
              </div>
              <SocialLink socialData={webData.socialNetwork}></SocialLink>
            </div>
            <div className="flex justify-center flex-col ">
              <iframe
                src={webData.googleMapUrl}
                style={{ border: "0", height: "35vh" }}
                className="justify-center md:ml-20"
                allowFullScreen={false}
                aria-hidden="false"
                tabIndex={0}
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
