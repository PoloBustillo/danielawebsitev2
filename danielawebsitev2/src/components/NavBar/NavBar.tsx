"use client";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import Link from "next/link";
import React from "react";

import { Logo } from "../icons/Logo";
import { ThemeSwitcher } from "./NavComponents/ThemeSwitcher";

import { TerapiasResponseType } from "@/lib/types";
import { useRouter } from "next/navigation";
import { DesktopMenu } from "./NavComponents/DesktopMenu";
import MenuMobile from "./NavComponents/MenuMobile";
import UserAvatar from "./NavComponents/UserAvatar";
interface NavBarProps {
  areasTerapias: TerapiasResponseType;
  pageName: string;
}

export default function NavBar({ areasTerapias, pageName }: NavBarProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const router = useRouter();
  return (
    <Navbar
      isBordered
      isBlurred={true}
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="sm:hidden"
      />
      <NavbarBrand>
        <div className="hidden md:block">
          <Logo />
        </div>

        <div>
          <span className="dark:border-white border-gray-600 border-b-1 w-[100%] top-6  relative block"></span>
          <Link
            href="/"
            className="hidden ml-1 text-2xl font-bold md:block text-content1-foreground font-italliano"
          >
            {pageName}
          </Link>
        </div>
      </NavbarBrand>
      <NavbarContent className="flex gap-4 sm:hidden" justify="center">
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
        <UserAvatar></UserAvatar>
      </NavbarContent>
      <MenuMobile
        closeMenu={setIsMenuOpen}
        areasTerapias={areasTerapias}
      ></MenuMobile>
    </Navbar>
  );
}
