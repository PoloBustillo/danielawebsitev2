"use client";
import { TerapiasResponseType } from "@/lib/types";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { HomeIcon } from "../icons/Home";
import { Logo } from "../icons/Logo";
import { DesktopMenu } from "./NavComponents/DesktopMenu";
import MenuMobile from "./NavComponents/MenuMobile";
import { ThemeSwitcher } from "./NavComponents/ThemeSwitcher";
import UserAvatar from "./NavComponents/UserAvatar";
interface NavBarProps {
  areasTerapias: TerapiasResponseType;
  pageName: string;
  logged: boolean;
}

export default function NavBar({
  areasTerapias,
  pageName,
  logged,
}: NavBarProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { theme } = useTheme();

  const router = useRouter();
  return (
    <Navbar
      isBordered
      shouldHideOnScroll
      isBlurred={true}
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="sm:hidden"
      />
      <NavbarMenu>
        <div className="flex mr-10 h-screen flex-col justify-between bg-transparent">
          <div className="px-4 py-10">
            <MenuMobile
              closeMenu={setIsMenuOpen}
              areasTerapias={areasTerapias}
            ></MenuMobile>
          </div>
        </div>
      </NavbarMenu>
      <Link href={"/"} className="pointer hidden md:flex">
        <HomeIcon
          width="34px"
          height="34px"
          color={theme == "dark" ? "#f69a67" : "#d42984"}
        ></HomeIcon>
      </Link>
      <NavbarBrand>
        <div>
          <Logo />
        </div>

        <div>
          <span className="dark:border-white border-gray-600 border-b-1 w-[100%] top-6  relative block"></span>
          <Link
            href="/"
            className="hidden ml-1 text-2xl font-bold lg:block text-content1-foreground font-italliano"
          >
            {pageName}
          </Link>
        </div>
      </NavbarBrand>
      <NavbarContent
        className=" max-[450px]:hidden flex gap-4 sm:hidden"
        justify="center"
      >
        <NavbarItem>
          <Button
            role="button"
            aria-label="Reserva tu cita"
            color={"secondary"}
            variant={"ghost"}
            className="font-extrabold capitalize"
            onClick={() => {
              router.push("/cita");
            }}
          >
            Reserva tu cita
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        <DesktopMenu areasTerapias={areasTerapias}></DesktopMenu>
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        <NavbarItem>
          <ThemeSwitcher></ThemeSwitcher>
        </NavbarItem>
        {logged == false ? (
          <UserAvatar></UserAvatar>
        ) : (
          <>
            <NavbarItem className="hidden lg:flex me-3  rounded px-2 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700 dark:text-secondary-600 dark:hover:text-secondary-500 dark:focus:text-secondary-500 dark:active:text-secondary-500">
              <Link href="#">Login</Link>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color="primary" href="#" variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
}
