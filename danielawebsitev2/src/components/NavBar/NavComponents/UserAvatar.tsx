import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { Calendar, Question, Settings, Task } from "../../icons/Icons";

const UserAvatar = () => {
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-all"
          color="secondary"
          name="Jason Hughes"
          size="md"
          src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2 ">
          <p className="font-semibold">Accediste como:</p>
          <p className="font-semibold text-bgpurple dark:text-success">
            zoey@example.com
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
