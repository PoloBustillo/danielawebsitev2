import { getFile, saveAvatarImageToStorage, saveImageForUser } from "@/lib/api";
import { Avatar, Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { ImageUpIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

function PhotoCard() {
  const { data: session, status, update: sessionUpdate } = useSession();
  const [touched, setTouched] = useState<boolean>(false);
  const [imageAvatarURL, setImageAvatarURL] = useState<string>(
    session?.user?.image!
  );
  const [imageAvatar, setImageAvatar] = useState<File>();
  const {
    getRootProps,
    getInputProps,
    open: dragOpen,
  } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      let files = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      setImageAvatarURL(files[0].preview);
      setImageAvatar(files[0]);
    },
  });

  useEffect(() => {
    if (imageAvatar) setTouched(true);
  });

  const handleSubmit = async () => {
    if ((imageAvatar as File).name != undefined) {
      let user = { ...session?.user };
      let imagePath = await saveAvatarImageToStorage(
        imageAvatar,
        session?.user?.id!
      );
      let imageUrl = await getFile(imagePath);
      setImageAvatarURL(imageUrl);
      saveImageForUser(session?.user?.id!, imageUrl);
      user = { ...user, image: imageUrl };
      await sessionUpdate({
        user: {
          ...session?.user!,
          image: imageUrl,
        },
      });
      setTouched(false);
      setImageAvatar(undefined);
    }
  };
  return (
    <Card className="my-4 p-4">
      <CardHeader className="pb-0 py-2 p-4 flex-col items-start">
        <h4 className="font-bold text-large">Mi Foto:</h4>
        <small className="text-default-500">
          {session?.user.name
            ? `Nombre:${session?.user?.name}`
            : `ID:${session?.user?.id}`}
        </small>
        <div className="text-center  absolute right-[10%] md:right-[5%] w-[10%] top-[5%]">
          <Button
            color={touched ? "success" : "secondary"}
            isIconOnly
            type="submit"
            className=" h-12 w-12"
            endContent={<ImageUpIcon className="w-8 h-8" />}
            onClick={handleSubmit}
          ></Button>
          {touched && (
            <small className="hidden lg:block text-default-500">
              No olvides guardar
            </small>
          )}
        </div>
      </CardHeader>
      <CardBody className="pb-0 pt-2 p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 align-middle justify-around content-center">
        <div className="grid justify-center h-36px">
          <Avatar
            onClick={() => {
              dragOpen();
            }}
            isBordered
            as="button"
            className="transition-all w-32 h-32 text-large"
            color="secondary"
            name={session?.user?.name!}
            src={imageAvatarURL || session?.user?.image!}
          />
        </div>
        <div className="grid">
          <div {...getRootProps({ className: "dropzone" })}>
            <label className="flex flex-col items-center w-[100%] p-5 mx-auto mt-2 text-center bg-white border-2 border-gray-300 border-dashed cursor-pointer dark:bg-gray-900 dark:border-gray-700 rounded-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-8 h-8 text-gray-500 dark:text-gray-400"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                />
              </svg>
              <h2 className="mt-1 font-medium tracking-wide text-gray-700 dark:text-gray-200">
                Da click o arrastra tu foto aquí.
              </h2>
              <p className="mt-2 text-xs tracking-wide text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 5MB)
              </p>

              <input {...getInputProps()} />
            </label>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export default PhotoCard;
