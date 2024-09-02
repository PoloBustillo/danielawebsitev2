"use client";
import React, { SetStateAction, useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  Pagination,
  SortDescriptor,
} from "@nextui-org/react";
import { ChevronDownIcon, FileCog, SearchIcon } from "lucide-react";
import { getTareas } from "@/lib/api";
import { useSession } from "next-auth/react";
import { TareasType } from "@/lib/types";
import {
  capitalize,
  columns,
  statusColorMap,
  statusOptions,
} from "@/lib/utils";
import { useRouter } from "next/navigation";
import { doc, getDoc, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase-config";

const INITIAL_VISIBLE_COLUMNS = ["name", "status", "descripcion", "actions"];

export default function page() {
  const { data: session } = useSession();
  const router = useRouter();
  const [tareasData, setTareasData] = useState<TareasType[]>([
    {
      name: "Cargando...",
      id: "1",
      users: [],
      start: Timestamp.fromDate(new Date()),
      end: Timestamp.fromDate(new Date()),
      tareasContent: [{ type: ["string"] }],
      descripcion: "string",
      actions: ["string"],
      explicacion: "",
      status: "abierta|cerrada|completada",
    },
  ]);

  useEffect(() => {
    (async () => {
      if (session?.user.id) {
        let tareas = await getTareas(session.user.id);
        console.log(tareas);
        setTareasData(tareas);
      }
    })();
  }, [session]);
  const [filterValue, setFilterValue] = useState("");
  const [visibleColumns, setVisibleColumns] = useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "nombre",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (Array.from(visibleColumns).includes("all")) return columns;

    return columns.filter((column: any) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = tareasData;

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((tarea) =>
        tarea?.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((tarea) =>
        Array.from(statusFilter).includes(tarea.status)
      );
    }

    return filteredUsers;
  }, [tareasData, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    let sortedItemsData = items.sort((a, b) => {
      const first = a[sortDescriptor.column as keyof TareasType];
      const second = b[sortDescriptor.column as keyof TareasType];
      const cmp =
        (first ?? "") < (second ?? "")
          ? -1
          : (first ?? "") > (second ?? "")
          ? 1
          : 0;
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
    return sortedItemsData;
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback(
    (tarea: TareasType, columnKey: keyof TareasType) => {
      const cellValue = tarea[columnKey];

      switch (columnKey) {
        case "start":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">
                {typeof cellValue === "object" &&
                cellValue !== null &&
                "toDate" in cellValue
                  ? `${cellValue.toDate().toLocaleDateString()}-${cellValue
                      .toDate()
                      .toLocaleTimeString()}`
                  : ""}
              </p>
            </div>
          );
        case "end":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">
                {typeof cellValue === "object" &&
                cellValue !== null &&
                "toDate" in cellValue
                  ? `${cellValue.toDate().toLocaleDateString()}-${cellValue
                      .toDate()
                      .toLocaleTimeString()}`
                  : ""}
              </p>
            </div>
          );
        case "name":
          return (
            <div className="flex flex-col">
              <p
                className="text-bold text-medium capitalize cursor-pointer"
                onClick={() => {
                  router.push(`/protected/tareas/${tarea.id}`);
                }}
              >
                {cellValue?.toString()}
              </p>
            </div>
          );
        case "status":
          return (
            <Chip
              className="capitalize"
              color={
                statusColorMap[tarea.status as keyof typeof statusColorMap] as
                  | "success"
                  | "danger"
                  | "warning"
              }
              size="sm"
              variant="flat"
            >
              {cellValue?.toString()}
            </Chip>
          );
        case "actions":
          return (
            <div className="relative flex justify-center items-center gap-2">
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly size="sm" variant="light">
                    <FileCog className="text-slate-600" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem
                    onClick={() => {
                      router.push(`/protected/tareas/${tarea.id}`);
                    }}
                  >
                    Ver
                  </DropdownItem>
                  <DropdownItem
                    onClick={async () => {
                      let userId = session?.user.id!;
                      let userRef = await doc(db, "users", userId);
                      const userData = (await getDoc(userRef)).data();

                      if (userData?.tareas) {
                        let tareasActualizadas = userData.tareas.map(
                          (tareaUser: any) => {
                            if (tareaUser.tarea.id == tarea.id) {
                              return { ...tareaUser, status: "completada" };
                            }
                            return tareaUser;
                          }
                        );
                        let tareasActualizadasEstado = tareasData.map(
                          (task) => {
                            if (task.id == tarea.id) {
                              return { ...tarea, status: "completada" };
                            }
                            return tarea;
                          }
                        );
                        console.log(
                          "🚀 ~ onClick={ ~ tareasActulizadas:",
                          tareasActualizadas
                        );
                        await updateDoc(doc(db, "users", session?.user.id!), {
                          tareas: tareasActualizadas,
                        });
                        setTareasData(tareasActualizadasEstado);
                      }
                    }}
                  >
                    Entregar
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          );
        default:
          return cellValue?.toString();
      }
    },
    [session]
  );

  const onRowsPerPageChange = React.useCallback(
    (e: { target: { value: any } }) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = React.useCallback(
    (value: React.SetStateAction<string>) => {
      if (value) {
        setFilterValue(value);
        setPage(1);
      } else {
        setFilterValue("");
      }
    },
    []
  );

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex mt-20 mb-6 flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Busca por nombre..."
            startContent={<SearchIcon />}
            variant="bordered"
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Estado
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Tabla Columnas"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={(value) =>
                  setStatusFilter(value as SetStateAction<string>)
                }
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Columna
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={(value: any) =>
                  setVisibleColumns(new Set(value))
                }
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {tareasData.length} tareas
          </span>
          <label className="flex items-center text-default-400 text-small">
            Filas por página:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onRowsPerPageChange,
    tareasData.length,
    onSearchChange,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-20 flex justify-center items-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
      </div>
    );
  }, [items.length, page, pages, hasSearchFilter]);

  return (
    <div className="mx-4 md:mx-20">
      <Table
        aria-label="Tareas del usuario"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="inside"
        classNames={{
          wrapper: "max-h-[100%]",
        }}
        selectionMode="none"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSortChange={setSortDescriptor}
      >
        <TableHeader className="text-black" columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={"No hay tareas asignadas todavía"}
          items={sortedItems}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>
                  {renderCell(item, columnKey as keyof TareasType)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
