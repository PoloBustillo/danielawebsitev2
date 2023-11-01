"use client";
import { Card, CardBody } from "@nextui-org/react";
import React from "react";
import Stars from "../../icons/Stars";

const Reviews = () => {
  return (
    <Card
      isBlurred
      className="border-none bg-[#37354b]  dark:bg-default-100/50 max-w-[380px] max-h-[680px] m-4 pt-3 "
      //className="bg-[#37354b] dark:bg-default-100/50 w-[100wv] m-4 p-10 pt-3 "
    >
      <CardBody className="flex flex-col my-3 justify-center align-middle">
        <div>
          <div className="bannerBorder sm:pl-8 flex justify-center flex-col items-center">
            <div className="flex flex-col justify-center align-middle ">
              <h3 className="text-2xl text-center text-[whitesmoke] font-semibold flex flex-col justify-center align-middle">
                4.8
              </h3>

              <Stars color={"yellow"}></Stars>
            </div>
            <div className="flex justify-center">
              <h3 className="text-sm text-[whitesmoke]">
                En Google y otras plataformas
              </h3>
            </div>
          </div>

          <div
            className="my-10 sk-ww-google-reviews flex"
            data-embed-id="214937"
          ></div>
        </div>
      </CardBody>
    </Card>
  );
};

export default Reviews;
