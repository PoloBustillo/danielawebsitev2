import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Calendar, Question, Settings, Task } from "../../icons/Icons";

const UserAvatar = () => {
  const { data: session, status } = useSession();

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
            {session?.user?.email!}
          </p>
        </DropdownItem>
        <DropdownItem
          startContent={<Settings fill="currentColor" size={30}></Settings>}
          key="settings"
        >
          Mis configuraciones
        </DropdownItem>
        <DropdownItem
          startContent={<Task fill="currentColor" size={30}></Task>}
          key="system"
        >
          Tareas
        </DropdownItem>
        <DropdownItem
          startContent={<Calendar fill="currentColor" size={30}></Calendar>}
          key="configurations"
        >
          Citas
        </DropdownItem>
        <DropdownItem
          startContent={<Question fill="currentColor" size={30}></Question>}
          key="help_and_feedback"
        >
          Ayuda & Reseñas
        </DropdownItem>
        <DropdownItem key="logout">
          <Button
            role="button"
            onPress={() => {
              signOut();
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
