import { cn } from "@/lib/utils";
import { Radio } from "@nextui-org/react";

type Props = {
  children: string | JSX.Element | JSX.Element[];
  description: string;
  value: string;
};
export const CustomRadio = ({ children, description, value }: Props) => {
  return (
    <Radio
      description={description}
      value={value}
      classNames={{
        base: cn(
          "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
          "flex-row-reverse max-w-[800px] cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
          "data-[selected=true]:border-primary"
        ),
      }}
    >
      {children}
    </Radio>
  );
};
