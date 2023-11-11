"use client";
import { Card, CardBody } from "@nextui-org/react";
import React, { useEffect } from "react";
import Stars from "../../icons/Stars";

const Reviews = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://widgets.sociablekit.com/google-reviews/widget.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  return (
    <Card
      isBlurred
      className="border-none bg-[#37354b]  dark:bg-default-100/50 min-w-[20vw] max-w-[80vw] md:max-w-[380px] max-h-[650px] m-4 pt-3 "
      //className="bg-[#37354b] dark:bg-default-100/50 w-[100wv] m-4 p-10 pt-3 "
    >
      <CardBody className="flex overflow-hidden flex-col my-3 justify-center align-middle">
        <div>
          <div className="bannerBorder overflow-hidden sm:pl-8 flex justify-center flex-col items-center">
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
            className="my-10 sk-ww-google-reviews flex overflow-hidden"
            data-embed-id="214937"
          ></div>
        </div>
      </CardBody>
    </Card>
  );
};

export default Reviews;
