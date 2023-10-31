"use client";
import { getBannerImages } from "@/lib/api";
import { BannerResponse } from "@/lib/types";
import { Button, Card, CardFooter, Image } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React, { Suspense, Usable, use, useEffect, useState } from "react";

async function getBanners() {
  return await getBannerImages();
}

const NewCard = () => {
  const router = useRouter();
  const [indexImg, setIndexImg] = useState<number>(0);

  const banners = use(getBanners());

  useEffect(() => {
    const timer = setTimeout(async () => {
      let index = Math.floor(Math.random() * banners.length);
      if (index == indexImg) index = Math.floor(Math.random() * banners.length);
      setIndexImg(index);
    }, 5000);
    return () => clearTimeout(timer);
  }, [indexImg]);

  return (
    <Suspense fallback={<>loading</>}>
      <Card isFooterBlurred>
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
            isZoomed
            width={300}
            height={280}
            alt={banners[indexImg]?.description}
            src={banners[indexImg]?.image}
          />
        </motion.div>
        <CardFooter className="mb-1  -bottom-1 justify-between bg-purple-900/60 border-purple-900/10 border-1  py-1 absolute before:rounded-xl rounded-large  w-full shadow-small  z-10">
          <p className="text-tiny text-[whitesmoke]">
            {banners[indexImg]?.description}
          </p>
          <Button
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
    </Suspense>
  );
};

export default NewCard;
