"use client";
import React from "react";
import Link from "next/link";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
} from "@nextui-org/react";

import { AcmeLogo } from "../icons/AcmeLogo";
import { ThemeSwitcher } from "./NavComponents/ThemeSwitcher";

import { TerapiasResponseType } from "@/lib/types";
import UserAvatar from "./NavComponents/UserAvatar";
import MenuMobile from "./NavComponents/MenuMobile";
import { DesktopMenu } from "./NavComponents/DesktopMenu";

interface NavBarProps {
  areasTerapias: TerapiasResponseType;
}

export default function NavBar({ areasTerapias }: NavBarProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

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
        <DesktopMenu areasTerapias={areasTerapias}></DesktopMenu>
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        <NavbarItem>
          <ThemeSwitcher></ThemeSwitcher>
        </NavbarItem>
        <UserAvatar></UserAvatar>
      </NavbarContent>
      <MenuMobile areasTerapias={areasTerapias}></MenuMobile>
    </Navbar>
  );
}
