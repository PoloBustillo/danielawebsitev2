"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { MoonIcon } from "../../icons/MoonIcon";
import { SunIcon } from "../../icons/SunIcon";
import { Switch } from "@nextui-org/react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Switch
      aria-label="Cambiar tema"
      aria-labelledby="Cambiar tema"
      aria-selected={theme == "light"}
      defaultSelected={theme == "light"}
      size="lg"
      color="primary"
      startContent={<SunIcon />}
      endContent={<MoonIcon />}
      onChange={(evt: any) => {
        const result = evt.target as HTMLInputElement;
        if (result.checked == false) {
          setTheme("dark");
        } else {
          setTheme("light");
        }
      }}
    ></Switch>
  );
}
