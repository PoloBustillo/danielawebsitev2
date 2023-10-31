"use client";
import React from "react";
import Link from "next/link";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  NavbarMenu,
  NavbarMenuToggle,
  DropdownSection,
} from "@nextui-org/react";
import {
  ChevronDown,
  Lock,
  Activity,
  Flash,
  Server,
  TagUser,
  Scale,
  Books,
  Settings,
  Task,
  Calendar,
  Question,
} from "../icons/Icons";
import { AcmeLogo } from "../icons/AcmeLogo";
import { ThemeSwitcher } from "./NavComponents/ThemeSwitcher";
import { usePathname, useRouter } from "next/navigation";
import { TerapiaType, TerapiasResponseType } from "@/lib/types";
import UserAvatar from "./NavComponents/UserAvatar";

interface NavBarProps {
  areasTerapias: TerapiasResponseType;
}

export default function NavBar({ areasTerapias }: NavBarProps) {
  const path = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  let arrayTerapias = Object.keys(areasTerapias) as [];

  const icons = {
    books: <Books className="text-success" fill="currentColor" size={16} />,
    chevron: <ChevronDown fill="currentColor" size={16} />,
    scale: <Scale className="text-warning" fill="currentColor" size={30} />,

    lock: <Lock className="text-success" fill="currentColor" size={30} />,
    activity: (
      <Activity className="text-secondary" fill="currentColor" size={30} />
    ),
    flash: <Flash className="text-primary" fill="currentColor" size={30} />,
    server: <Server className="text-success" fill="currentColor" size={30} />,
    user: <TagUser className="text-danger" fill="currentColor" size={30} />,
  };

  return (
    <Navbar isBordered isBlurred={true} onMenuOpenChange={setIsMenuOpen}>
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="sm:hidden"
      />
      <NavbarBrand>
        <AcmeLogo />
        <Link
          href="/"
          className="ml-1 font-bold hidden md:block text-content1-foreground"
        >
          Psic. Daniela Diaz
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem
          isActive={path == "/procesos"}
          className=" data-[active=true]:font-extrabold"
        >
          <Button
            color={"primary"}
            variant={"ghost"}
            className="capitalize font-extrabold"
            onClick={() => {
              router.push("/procesos");
            }}
          >
            Procesos
          </Button>
        </NavbarItem>
        <Dropdown
          shouldBlockScroll={false}
          backdrop="blur"
          showArrow
          classNames={{
            arrow: "bg-default-400",
          }}
        >
          <NavbarItem
            isActive={path == "/"}
            className=" data-[active=true]:font-extrabold"
          >
            <DropdownTrigger>
              <Button
                color={"secondary"}
                variant={"bordered"}
                className="capitalize font-extrabold"
                endContent={icons.chevron}
              >
                Servicios
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="Terapias por areas"
            className="w-[440px]"
            itemClasses={{
              base: [
                "rounded-md",
                "text-default-500",
                "transition-opacity",
                "data-[hover=true]:text-foreground",
                "data-[hover=true]:bg-default-100",
                "dark:data-[hover=true]:bg-default-50",
                "data-[selectable=true]:focus:bg-default-50",
                "data-[pressed=true]:opacity-70",
                "data-[focus-visible=true]:ring-default-500",
              ],
            }}
          >
            {(arrayTerapias as any).map(
              (area: string & keyof typeof areasTerapias) => {
                return (
                  <DropdownSection key={area} title={area} showDivider>
                    {areasTerapias[area].map((terapia: TerapiaType) => {
                      return (
                        <DropdownItem
                          key={terapia.type + terapia.name!}
                          description={terapia.description}
                          startContent={
                            area === "Educativa"
                              ? icons.books
                              : area === "Social"
                              ? icons.user
                              : icons.flash
                          }
                        >
                          <span className="block rounded-lg px-4 py-2 text-lg font-bold dark:text-gray-200 dark:hover:bg-gray-100 dark:hover:text-gray-700">
                            {terapia.name}
                          </span>
                        </DropdownItem>
                      );
                    })}
                  </DropdownSection>
                );
              }
            )}
          </DropdownMenu>
        </Dropdown>

        <NavbarItem
          isActive={path == "/blogs"}
          className=" data-[active=true]:font-extrabold"
        >
          <Button
            color={"primary"}
            variant={"ghost"}
            className="capitalize font-extrabold"
            onClick={() => {
              router.push("/procesos");
            }}
          >
            Blog
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        <NavbarItem>
          <ThemeSwitcher></ThemeSwitcher>
        </NavbarItem>
        {/* <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem> */}
        <UserAvatar></UserAvatar>
      </NavbarContent>
      <NavbarMenu>
        <div className="flex mr-10 h-screen flex-col justify-between bg-transparent">
          <div className="px-4 py-6">
            <ul className="mt-6 space-y-1">
              <li>
                <a
                  href=""
                  className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
                >
                  Blog: Cuida tu mente
                </a>
              </li>

              <li>
                <details className="group [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                    <span className="text-sm font-medium"> Procesos </span>

                    <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </span>
                  </summary>

                  <ul className="mt-2 space-y-1 px-4">
                    <li>
                      <a
                        href=""
                        className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                      >
                        Instituciones asociadas
                      </a>
                    </li>

                    <li>
                      <a
                        href=""
                        className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                      >
                        Estudio socioecomico
                      </a>
                    </li>
                  </ul>
                </details>
              </li>
              {(arrayTerapias as any).map(
                (item: keyof typeof areasTerapias, index: number) => {
                  return (
                    <li key={item + index.toString()}>
                      <details className="group [&_summary::-webkit-details-marker]:hidden">
                        <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                          <span className="text-sm font-medium">{item}</span>

                          <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clip-rule="evenodd"
                              />
                            </svg>
                          </span>
                        </summary>

                        <ul className="mt-2 space-y-1 px-4">
                          {areasTerapias[item].map((terapia: TerapiaType) => {
                            return (
                              <li key={terapia.name}>
                                <a
                                  href={`/terapias/${terapia.name}`}
                                  className="block rounded-lg px-4 py-2 text-lg font-bold text-gray-200 hover:bg-gray-100 hover:text-gray-700"
                                >
                                  {terapia.name}
                                </a>
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
    </Navbar>
  );
}
