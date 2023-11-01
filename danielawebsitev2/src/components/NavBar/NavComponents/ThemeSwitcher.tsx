"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Switch } from "@nextui-org/switch";
import { MoonIcon } from "../../icons/MoonIcon";
import { SunIcon } from "../../icons/SunIcon";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* {theme == "dark" ? (
        <button onClick={() => setTheme("light")}>
          <SunIcon />{" "}
        </button>
      ) : (
        <button onClick={() => setTheme("dark")}>
          <MoonIcon />
        </button>
      )} */}
      <Switch
        defaultSelected={theme == "light"}
        size="lg"
        color="primary"
        startContent={<SunIcon />}
        endContent={<MoonIcon />}
        onChange={(evt) => {
          const result = evt.target as HTMLInputElement;
          if (result.checked == false) {
            setTheme("dark");
          } else {
            setTheme("light");
          }
        }}
      ></Switch>
    </>
  );
}
