import getURL from "@/lib/api";
import { TerapiaType, TerapiasResponseType } from "@/lib/types";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  NavbarItem,
} from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import {
  Activity,
  Books,
  ChevronDown,
  Flash,
  Lock,
  Scale,
  Server,
  TagUser,
} from "../../icons/Icons";
import { HomeIcon } from "../../icons/Home";
import Link from "next/link";

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
        isActive={path == "/blogs"}
        className=" data-[active=true]:font-extrabold"
      >
        <Button
          role="button"
          aria-label="Reserva tu cita"
          color={"primary"}
          variant={path.includes("cita") ? "solid" : "ghost"}
          className="capitalize font-extrabold"
          onClick={() => {
            router.push("/cita");
          }}
        >
          Reserva tu cita
        </Button>
      </NavbarItem>
      <Dropdown
        shouldBlockScroll={false}
        backdrop="blur"
        showArrow
        classNames={{
          arrow: "bg-[#1B1B1B]",
        }}
      >
        <NavbarItem
          isActive={path == "/"}
          className=" data-[active=true]:font-extrabold  gap-4 hidden sm:flex"
        >
          <DropdownTrigger>
            <Button
              role="button"
              aria-label="Selector Servicios"
              color={"secondary"}
              variant={path.includes("terapia") ? "solid" : "bordered"}
              className="capitalize font-extrabold"
              endContent={icons.chevron}
            >
              Terapias
            </Button>
          </DropdownTrigger>
        </NavbarItem>
        <DropdownMenu
          aria-label="Terapias por areas"
          itemClasses={{
            base: ["text-current"],
          }}
        >
          {(arrayTerapias as any).map(
            (area: string & keyof typeof areasTerapias) => {
              return (
                <DropdownSection
                  className="text-lg"
                  key={area}
                  title={area}
                  showDivider
                >
                  {areasTerapias[area].map((terapia: TerapiaType) => {
                    return (
                      <DropdownItem
                        aria-label={terapia.name}
                        onClick={() => {
                          router.push(
                            getURL(
                              `terapia/${encodeURIComponent(terapia.name!)}`
                            )
                          );
                        }}
                        key={terapia.type + terapia.name!}
                        startContent={
                          area === "Educativa"
                            ? icons.books
                            : area === "Social"
                            ? icons.user
                            : icons.flash
                        }
                      >
                        <span className="block rounded-lg px-4 py-2 text-sm font-bold text-current  hover:bg-gray-100 hover:text-gray-700">
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
        className="hidden sm:flex data-[active=true]:font-extrabold"
      >
        <Button
          role="button"
          aria-label="Enlace a Blog"
          color={"primary"}
          variant={path.includes("blog") ? "solid" : "ghost"}
          className="capitalize font-extrabold"
          onClick={() => {
            router.push("/blogs");
          }}
        >
          Blog
        </Button>
      </NavbarItem>
      <NavbarItem
        isActive={path == "/servicios"}
        className="data-[active=true]:font-extrabold hidden lg:flex"
      >
        <Button
          role="button"
          aria-label="Procesos"
          color={"primary"}
          variant={path.includes("servicios") ? "solid" : "ghost"}
          className="capitalize font-extrabold"
          onClick={() => {
            router.push("/servicios");
          }}
        >
          Empresarial
        </Button>
      </NavbarItem>
    </>
  );
};
