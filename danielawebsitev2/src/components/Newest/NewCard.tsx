"use client";
import { BannerResponse } from "@/lib/types";
import { Button, Card, CardFooter, Image } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const NewCard = ({ banners }: { banners: BannerResponse[] }) => {
  const router = useRouter();
  const [indexImg, setIndexImg] = useState<number>(0);

  useEffect(() => {
    const timer = setTimeout(async () => {
      let index = Math.floor(Math.random() * banners.length);
      if (index == indexImg) index = Math.floor(Math.random() * banners.length);
      setIndexImg(index);
    }, 5000);
    return () => clearTimeout(timer);
  }, [indexImg]);

  return (
    <Card isFooterBlurred className="bg-transparent border-none">
      <motion.div
        initial={{ y: -2 }}
        animate={{ y: 2 }}
        transition={{
          type: "smooth",
          repeatType: "mirror",
          duration: 4,
          repeat: Infinity,
        }}
        className="hidden sm:block -space-x-2 overflow-hidden"
      >
        <Image
          width={"400px"}
          height={"400px"}
          alt={banners[indexImg]?.description}
          src={banners[indexImg]?.image}
        />
      </motion.div>
      <CardFooter className="mb-1  -bottom-1 justify-between bg-purple-900/60 border-purple-900/10 border-1  py-1 absolute before:rounded-xl rounded-large  w-full shadow-small  z-10">
        <p className="text-tiny text-[whitesmoke]">
          {banners[indexImg]?.description}
        </p>
        <Button
          role="button"
          className="text-tiny text-white bg-black/40"
          variant="flat"
          color="default"
          radius="lg"
          size="sm"
          onClick={() => {
            router.push(banners[indexImg]?.url!);
          }}
        >
          Conoce más
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NewCard;
