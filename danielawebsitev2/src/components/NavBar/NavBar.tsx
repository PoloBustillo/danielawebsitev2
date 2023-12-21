"use client";
import React from "react";
import Link from "next/link";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
} from "@nextui-org/react";

import { Logo } from "../icons/Logo";
import { ThemeSwitcher } from "./NavComponents/ThemeSwitcher";

import { TerapiasResponseType } from "@/lib/types";
import UserAvatar from "./NavComponents/UserAvatar";
import MenuMobile from "./NavComponents/MenuMobile";
import { DesktopMenu } from "./NavComponents/DesktopMenu";
import { useRouter } from "next/navigation";
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
        <Logo />
        <Link
          href="/"
          className="ml-1 font-bold hidden md:block text-content1-foreground"
        >
          {pageName}
        </Link>
      </NavbarBrand>
      <NavbarContent className="sm:hidden flex gap-4" justify="center">
        <NavbarItem>
          <Button
            role="button"
            aria-label="Reserva tu cita"
            color={"secondary"}
            variant={"ghost"}
            className="capitalize font-extrabold"
            onClick={() => {
              router.push("/cita");
            }}
          >
            Reserva tu cita
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
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
