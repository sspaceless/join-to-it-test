import { SIDEBAR_ITEMS } from "~/shared/config/constants";
import { IconHome } from "~/shared/ui/icons/icon-home";

import { NavButton } from "./nav-button";

export const Sidebar: React.FC = () => {
  const items = SIDEBAR_ITEMS.map((item) => {
    const isActive = item === "Calendar";
    return (
      <NavButton key={item} icon={<IconHome />} isActive={isActive}>
        {item}
      </NavButton>
    );
  });

  return (
    <div className="h-screen w-full max-w-[260px] bg-[#43425D] font-sans text-[15px] text-white">
      <div className="bg-[#3c3b53] px-[20px] py-[25px] font-bold tracking-[3px] [box-shadow:0px_2px_3px_#0000000D]">
        IMPEKABLE
      </div>
      <div className="flex flex-col font-light">{items}</div>
    </div>
  );
};
