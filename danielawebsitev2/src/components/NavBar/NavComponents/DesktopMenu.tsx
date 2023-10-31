import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  NavbarItem,
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
} from "../../icons/Icons";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { TerapiaType, TerapiasResponseType } from "@/lib/types";

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
export const DesktopMenu = ({
  areasTerapias,
}: {
  areasTerapias: TerapiasResponseType;
}) => {
  const path = usePathname();
  const router = useRouter();
  let arrayTerapias = Object.keys(areasTerapias) as [];
  return (
    <>
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
    </>
  );
};
