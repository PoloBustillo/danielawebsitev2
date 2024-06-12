"use client";
import { NavBarProps } from "@/lib/types";
import {
  Button,
  Image,
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
import { signIn, signOut, useSession } from "next-auth/react";
import ModalSign from "@/components/ModalSignIn/ModalSign";
import { cn } from "@/utils/functions";

export default function NavBar({ areasTerapias, pageName }: NavBarProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [tabSelected, setTabSelected] = React.useState("");
  const { theme } = useTheme();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data: session, status } = useSession();
  const router = useRouter();

  console.log(session, status);
  async function onProviderLogin(provider: string) {
    let res = await signIn(provider, { redirect: false });
    console.log("ASDASDSADSADASD", res);
    if (res?.error != null || res?.status != 200) {
      console.log("Error en inicio de sesión");
    }
  }

  return (
    <Navbar
      isBordered
      shouldHideOnScroll
      isBlurred={true}
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <Modal
        backdrop="opaque"
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-900 to-blue-900/10 backdrop-opacity-20 dark:from-zinc-700 dark:to-pink-900/60 dark:backdrop-opacity-40",
        }}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader
                className={cn(
                  "flex flex-col gap-1 text-center",
                  "dark:bg-background dark:text-white bg-white text-black"
                )}
              >
                Bienvenido
              </ModalHeader>
              <ModalBody>
                <ModalSign
                  closeModal={() => onClose()}
                  tabInit={tabSelected}
                ></ModalSign>
              </ModalBody>
              <ModalFooter>
                <div
                  id="third-party-auth"
                  className="flex items-center justify-center m-auto gap-2 w-full"
                >
                  <Button
                    isIconOnly
                    variant="light"
                    onPress={() => {
                      onProviderLogin("google");
                    }}
                    className="hover:scale-105 hover:bg-transparent w-[40px] ease-in-out duration-300 shadow-lg p-2 rounded-lg m-1"
                  >
                    <Image
                      className="max-w-[25px]"
                      src="https://ucarecdn.com/8f25a2ba-bdcf-4ff1-b596-088f330416ef/"
                      alt="Google"
                    />
                  </Button>

                  <Button
                    isIconOnly
                    variant="light"
                    onPress={() => {
                      onProviderLogin("github");
                    }}
                    className="hover:scale-105 ease-in-out duration-300 shadow-lg p-2 rounded-lg m-1"
                  >
                    <Image
                      className="max-w-[25px] filter dark:invert"
                      src="https://ucarecdn.com/be5b0ffd-85e8-4639-83a6-5162dfa15a16/"
                      alt="Github"
                    />
                  </Button>
                  <Button
                    isIconOnly
                    variant="light"
                    className="hover:scale-105 ease-in-out duration-300 shadow-lg p-2 rounded-lg m-1"
                  >
                    <Image
                      className="max-w-[25px]"
                      src="https://ucarecdn.com/6f56c0f1-c9c0-4d72-b44d-51a79ff38ea9/"
                      alt="Facebook"
                    />
                  </Button>
                  <Button
                    isIconOnly
                    variant="light"
                    onPress={() => {
                      onProviderLogin("twitter");
                    }}
                    className="hover:scale-105 ease-in-out duration-300 shadow-lg p-2 rounded-lg m-1"
                  >
                    <Image
                      className="max-w-[25px] dark:gray-100"
                      src="https://ucarecdn.com/82d7ca0a-c380-44c4-ba24-658723e2ab07/"
                      alt="twitter"
                    />
                  </Button>
                </div>
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

      <Button
        isIconOnly
        onClick={(event) => {
          event.preventDefault();
          router.push("/");
        }}
        className={cn("bg-[#016fee] pointer hidden md:flex dark:bg-[#3f3f46]")}
        aria-label={pageName}
        radius="full"
      >
        <HomeIcon
          width="24px"
          height="24px"
          color={theme == "dark" ? "#d4d4d8" : "white"}
        ></HomeIcon>
      </Button>

      <NavbarBrand>
        <div>
          <Logo />
        </div>

        {/* <div>
          <span className="dark:border-white border-gray-600 border-b-1 w-[100%] top-6  relative block"></span>
          <Link
            href="/"
            className="hidden ml-1 text-2xl font-bold lg:block text-content1-foreground font-italliano"
          >
            {pageName}
          </Link>
        </div> */}
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
        {status == "authenticated" ? (
          <UserAvatar></UserAvatar>
        ) : (
          <>
            <NavbarItem className="hidden lg:flex me-3  rounded px-2 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700 dark:text-zinc-300 dark:hover:text-secondary-500 dark:focus:text-secondary-500 dark:active:text-secondary-500">
              <Link
                onClick={(event) => {
                  event.preventDefault();
                  setTabSelected("login");
                  onOpen();
                }}
                href={"#"}
              >
                Ingresa
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Button
                onClick={() => {
                  setTabSelected("sign-up");
                  onOpen();
                }}
                color="primary"
                href="#"
                variant="flat"
              >
                Registrate
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
}
