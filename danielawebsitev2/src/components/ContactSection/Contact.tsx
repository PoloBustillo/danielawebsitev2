import { getWebData } from "@/lib/api";
import { WebDataType } from "@/lib/types";
import React from "react";

const Contact = async () => {
  const webData = (await getWebData()) as WebDataType;
  console.log(webData);
  return (
    <section className="py-6 mt-20 dark:bg-gray-800 dark:text-gray-50">
      <div className="grid max-w-6xl grid-cols-1 px-6 mx-auto lg:px-8 md:grid-cols-2 md:divide-x">
        <div className="py-6 md:py-0 md:px-6">
          <h1 className="text-4xl font-bold">Contactame</h1>
          <p className="pt-2 pb-4">
            Llama o manda un mensaje por alguna de mis redes sociales.
          </p>
          <div className="space-y-4">
            <p className="flex items-center flex-row">
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
                    <div className="capitalize">
                      <span className="font-bold">{address.type}</span>
                      {`:   ${address.values}`}
                    </div>
                  );
                })}
              </div>
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
              <span>
                <a href={`tel:+52${webData.telefono.replaceAll("·", "")}`}>
                  {webData.telefono}
                </a>
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
              <span>{webData.email}</span>
            </p>
          </div>
        </div>
        <div className="flex flex-col py-6 space-y-6 md:py-0 md:px-6">
          <iframe
            src={webData.googleMapUrl}
            style={{ border: "0", height: "35vh" }}
            className="ml-10"
            allowFullScreen={false}
            aria-hidden="false"
            tabIndex={0}
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Contact;
