import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import { Calendar, Question, Settings, Task } from "../../icons/Icons";
import { useRouter } from "next/navigation";

const UserAvatar = () => {
  const { data: session, status } = useSession();
  const route = useRouter();
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-all"
          color="secondary"
          name={session?.user?.name!}
          size="md"
          src={session?.user?.image!}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2 ">
          <p className="font-semibold">Accediste como:</p>
          <p className="font-semibold text-bgpurple dark:text-success">
            {session?.user?.email != undefined
              ? session?.user?.email
              : session?.user?.name!}
          </p>
        </DropdownItem>
        <DropdownItem
          startContent={<Settings fill="currentColor" size={30}></Settings>}
          key="settings"
          onPress={() => {
            route.push(`/protected/profile/${session?.user?.id}?tab=settings`);
          }}
        >
          Mis configuraciones
        </DropdownItem>
        <DropdownItem
          startContent={<Task fill="currentColor" size={30}></Task>}
          key="system"
          onPress={() => {
            route.push(`/protected/tareas/${session?.user?.id}`);
          }}
        >
          Tareas
        </DropdownItem>
        <DropdownItem
          startContent={<Calendar fill="currentColor" size={30}></Calendar>}
          key="configurations"
          onPress={() => {
            route.push("/cita");
          }}
        >
          Citas
        </DropdownItem>
        <DropdownItem
          startContent={<Question fill="currentColor" size={30}></Question>}
          key="help_and_feedback"
          onPress={() => {
            route.push("/help");
          }}
        >
          Ayuda & Reseñas
        </DropdownItem>
        <DropdownItem key="logout">
          <Button
            role="button"
            onPress={async () => {
              await signOut({ callbackUrl: "/" });
            }}
            className="w-full bg-danger-400 border-none text-white justify-center flex"
          >
            Salir
          </Button>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserAvatar;
