import { Navbar } from "./navbar";
import { Sidebar } from "./sidebar";

export const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div className="flex flex-row">
    <Sidebar />
    <div className="flex h-screen w-full flex-col">
      <Navbar />
      {children}
    </div>
  </div>
);
