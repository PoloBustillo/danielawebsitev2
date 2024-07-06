"use client";
import { Tab, Tabs } from "@nextui-org/react";
import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";

import ProfileCard from "@/components/ProfileCard/ProfileCard";
import PreferencesCard from "@/components/PreferencesCard/PreferencesCard";

const page = () => {
  const xs = useMediaQuery({ query: "(max-width: 640px)" });
  const [selected, setSelected] = useState("settings");

  return (
    <div className="m-auto md:p-8 flex justify-evenly">
      <Tabs
        aria-label="Configuraciones"
        isVertical={xs ? false : true}
        size="md"
        color="secondary"
        selectedKey={selected}
        onSelectionChange={(key) => setSelected(key as string)}
        classNames={{
          tab: "md:w-[200px]",
          panel: "md:w-[70vw]",
        }}
      >
        <Tab key="settings" title="Perfil">
          <ProfileCard></ProfileCard>
        </Tab>
        <Tab key="preferences" title="Preferencias">
          <PreferencesCard></PreferencesCard>
        </Tab>
      </Tabs>
    </div>
  );
};

export default page;
