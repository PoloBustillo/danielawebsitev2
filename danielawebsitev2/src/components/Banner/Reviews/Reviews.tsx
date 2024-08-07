"use client";
import { Card, CardBody } from "@nextui-org/react";
import { useEffect } from "react";
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
      className="border-none m-auto md:bg-[#37354b] bg-[#37354b] dark:bg-default-100/50 min-w-[20vw] max-w-[90vw] md:max-w-[380px] md:max-h-[650px] max-h-[380px] md:m-0 pt-5 "
    >
      <CardBody className="overflow-hidden">
        <div>
          <div className="flex flex-col items-center justify-center overflow-hidden bannerBorder sm:pl-8">
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
            className="flex overflow-hidden sk-ww-google-reviews"
            data-embed-id="214937"
          ></div>
        </div>
      </CardBody>
    </Card>
  );
};

export default Reviews;
