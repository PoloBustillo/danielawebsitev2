import getURL from "@/lib/api";
import { TerapiaType, TerapiasResponseType } from "@/lib/types";
import { NavbarMenu } from "@nextui-org/react";
import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";

const MenuMobile = ({
  areasTerapias,
  closeMenu,
}: {
  areasTerapias: TerapiasResponseType;
  closeMenu: Dispatch<SetStateAction<boolean>>;
}) => {
  let arrayTerapias = Object.keys(areasTerapias) as [];
  return (
    <NavbarMenu>
      <div className="flex mr-10 h-screen flex-col justify-between bg-transparent">
        <div className="px-4 py-10">
          <ul>
            <li>
              <Link
                href="/"
                onClick={() => closeMenu(false)}
                className="block rounded-lg px-4  py-2 text-lg font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link
                href="/cita"
                onClick={() => closeMenu(false)}
                className="block rounded-lg px-4  py-2 text-lg font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                Reserva tu cita
              </Link>
            </li>
            <li>
              <Link
                onClick={() => closeMenu(false)}
                href="/blogs"
                className="block rounded-lg px-4  py-2 text-lg font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                onClick={() => closeMenu(false)}
                href="/servicios"
                className="block rounded-lg px-4  py-2 text-lg font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                Servicios
              </Link>
            </li>
            {(arrayTerapias as any).map(
              (item: keyof typeof areasTerapias, index: number) => {
                return (
                  <li key={item + index.toString()}>
                    <details className="group [&_summary::-webkit-details-marker]:hidden">
                      <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500">
                        <span className="text-lg font-medium">{item}</span>

                        <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      </summary>

                      <ul className="mt-2 space-y-1 px-4">
                        {areasTerapias[item].map((terapia: TerapiaType) => {
                          return (
                            <li key={terapia.name}>
                              <Link
                                onClick={() => closeMenu(false)}
                                href={getURL(
                                  `terapia/${encodeURIComponent(terapia.name!)}`
                                )}
                                className="block rounded-lg px-4 py-2 text-lg font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                              >
                                {terapia.name}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </details>
                  </li>
                );
              }
            )}
          </ul>
        </div>
      </div>
    </NavbarMenu>
  );
};

export default MenuMobile;
