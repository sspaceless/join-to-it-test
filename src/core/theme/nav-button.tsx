import { cva, VariantProps } from "class-variance-authority";
import React from "react";

const navButtonDefaultClasses = "flex flex-row items-center gap-3 px-[25px] py-[17px]";
const navButtonIsActiveTrueClasses =
  "bg-[#3c3b53] text-[#A3A0FB] border-l-[5px] border-[#A3A0FB] pl-[20px]";

const navButtonVariants = cva(navButtonDefaultClasses, {
  variants: {
    isActive: {
      true: navButtonIsActiveTrueClasses,
    },
  },
});

export const NavButton: React.FC<
  VariantProps<typeof navButtonVariants> & {
    children: React.ReactNode;
    icon: React.ReactNode;
  }
> = ({ children, icon, isActive }) => {
  const navButtonClasses = navButtonVariants({ isActive });
  const iconClasses = isActive ? "text-[#A3A0FB]" : "text-[#A5A4BF]";

  return (
    <div className={navButtonClasses}>
      <span className={iconClasses}>{icon}</span>
      {children}
    </div>
  );
};
