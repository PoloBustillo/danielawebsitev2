import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { Calendar, Question, Settings, Task } from "../../icons/Icons";

const UserAvatar = ({ logged = false }) => {
  return (
    <>
      {logged == false ? (
        <div className="items-center hidden lg:flex">
          <button
            type="button"
            data-twe-ripple-init
            data-twe-ripple-color="light"
            className="me-3 inline-block rounded px-2 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700 dark:text-secondary-600 dark:hover:text-secondary-500 dark:focus:text-secondary-500 dark:active:text-secondary-500"
          >
            Accede
          </button>
          <button className="me-3 inline-block rounded bg-secondary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
            Registrate
          </button>
        </div>
      ) : (
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
      )}
    </>
  );
};

export default UserAvatar;
