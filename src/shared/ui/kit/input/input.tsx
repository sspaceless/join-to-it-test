import { cn } from "~/shared/lib/utils";

export const Input: React.FC<React.HTMLProps<HTMLInputElement> & React.PropsWithChildren> = ({
  className,
  ...props
}) => {
  const textFieldClasses = cn(
    "w-full border-b-[0.5px] border-[#D6D6D6] font-sans text-[12px] font-light text-[#43425D] outline-none",
    className,
  );
  return <input className={textFieldClasses} {...props} />;
};
