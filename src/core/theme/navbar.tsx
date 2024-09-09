import { IconChevron } from "~/shared/ui/icons/icon-chevron";
import { IconHome } from "~/shared/ui/icons/icon-home";
import { IconSearch } from "~/shared/ui/icons/icon-search";

export const Navbar: React.FC = () => (
  <div className="flex h-[70px] w-full items-center justify-between bg-white px-[20px] py-[16px] font-sans text-[11px] font-light text-[#4D4F5C] [box-shadow:0px_2px_6px_#0000000A]">
    <div className="flex flex-row gap-2.5 text-[#BCBCCB]">
      <IconSearch />
      <input
        placeholder="Search transactions, invoices or help"
        type="text"
        className="w-[198px] outline-none"
      />
    </div>
    <div className="flex flex-row items-center">
      <div className="flex flex-row items-center gap-[30px] text-[#BCBCCB]">
        <IconHome />
        <IconHome />
        <IconHome />
      </div>
      <div className="mx-[20px] h-[28px] w-[1px] bg-[#EBEBF2]" />
      <div className="flex flex-row items-center gap-[15px]">
        <span>John Doe</span>
        <IconChevron />
        <img alt="avatar" src="/images/avatar.png" className="w-[38px] rounded-full" />
      </div>
    </div>
  </div>
);
