"use client";
import { NavBarProps } from "@/lib/types";
import {
  Button,
  Checkbox,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle,
  useDisclosure,
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
import { signIn, useSession } from "next-auth/react";

export default function NavBar({
  areasTerapias,
  pageName,
  logged,
}: NavBarProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { theme } = useTheme();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data: session, status } = useSession();
  console.log(session, status);
  const router = useRouter();
  return (
    <Navbar
      isBordered
      shouldHideOnScroll
      isBlurred={true}
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  // endContent={
                  //   <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  // }
                  label="Email"
                  placeholder="Enter your email"
                  variant="bordered"
                />
                <Input
                  // endContent={
                  //   <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  // }
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  variant="bordered"
                />
                <div className="flex py-2 px-1 justify-between">
                  <Checkbox
                    classNames={{
                      label: "text-small",
                    }}
                  >
                    Remember me
                  </Checkbox>
                  <Link color="primary" href="#" size="sm">
                    Forgot password?
                  </Link>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={async () => {
                    let res = await signIn("credentials", {
                      redirect: false,
                      password: "123",
                      token: "alsldasd",
                      email: "admin@admin.com",
                    });
                    console.log(res);
                  }}
                >
                  Sign in
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
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
      <NavbarContent className=" max-[450px]:hidden flex gap-4 sm:hidden">
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
            Citas
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
        {logged == true ? (
          <UserAvatar></UserAvatar>
        ) : (
          <>
            <NavbarItem className="hidden lg:flex me-3  rounded px-2 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700 dark:text-secondary-600 dark:hover:text-secondary-500 dark:focus:text-secondary-500 dark:active:text-secondary-500">
              <Link onClick={onOpen} href="#">
                Login
              </Link>
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
