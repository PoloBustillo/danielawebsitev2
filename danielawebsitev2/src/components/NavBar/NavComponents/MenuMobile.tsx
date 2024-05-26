import getURL from "@/lib/api";
import { TerapiaType, TerapiasResponseType } from "@/lib/types";
import { NavbarMenuItem } from "@nextui-org/react";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { HomeIcon } from "../../icons/Home";
const MenuMobile = ({
  areasTerapias,
  closeMenu,
}: {
  areasTerapias: TerapiasResponseType;
  closeMenu: Dispatch<SetStateAction<boolean>>;
}) => {
  let arrayTerapias = Object.keys(areasTerapias) as [];
  return (
    <>
      <NavbarMenuItem>
        <Link
          href="/"
          onClick={() => closeMenu(false)}
          className="block rounded-lg px-4  py-2 text-lg font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
        >
          <div className="flex content-start gap-2">
            <HomeIcon></HomeIcon>
            Inicio
          </div>
        </Link>
      </NavbarMenuItem>
      <NavbarMenuItem>
        <Link
          href="/cita"
          onClick={() => closeMenu(false)}
          className="block rounded-lg px-4  py-2 text-lg font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
        >
          Reserva tu cita
        </Link>
      </NavbarMenuItem>
      <NavbarMenuItem>
        <Link
          onClick={() => closeMenu(false)}
          href="/blogs"
          className="block rounded-lg px-4  py-2 text-lg font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
        >
          Blog
        </Link>
      </NavbarMenuItem>
      <NavbarMenuItem>
        <Link
          onClick={() => closeMenu(false)}
          href="/servicios"
          className="block rounded-lg px-4  py-2 text-lg font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
        >
          Servicios
        </Link>
      </NavbarMenuItem>
      {(arrayTerapias as any).map(
        (item: keyof typeof areasTerapias, index: number) => {
          return (
            <NavbarMenuItem key={item + index.toString()}>
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
                      <NavbarMenuItem key={terapia.name}>
                        <Link
                          onClick={() => closeMenu(false)}
                          href={getURL(
                            `terapia/${encodeURIComponent(terapia.name!)}`
                          )}
                          className="block rounded-lg px-4 py-2 text-lg font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                        >
                          {terapia.name}
                        </Link>
                      </NavbarMenuItem>
                    );
                  })}
                </ul>
              </details>
            </NavbarMenuItem>
          );
        }
      )}
    </>
  );
};

export default MenuMobile;
