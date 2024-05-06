import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import clsx from "clsx";
import {
  CircleUser,
  Clapperboard,
  Film,
  Folders,
  Home,
  ShoppingCart,
} from "lucide-react";
import { Link } from "react-router-dom";

type Props = {
  activePage: "projects" | "exports";
};

export default function Sidebar({ activePage }: Props) {
  return (
    <div className="border-r bg-muted/40">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <Clapperboard className="h-6 w-6" />
            <span className="">TakeOne</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Link
              to="/projects"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                activePage === "projects" && "text-primary bg-muted"
              )}
            >
              <Folders className="h-4 w-4" />
              Projects
            </Link>
            <Link
              to="/exports"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                activePage === "exports" && "text-primary bg-muted"
              )}
            >
              <Film className="h-4 w-4" />
              Exports
            </Link>
          </nav>
        </div>
        <div className="border-t py-2">
          <nav className="flex flex-col px-2 text-sm font-medium">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Link
                  to="#"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <CircleUser className="h-4 w-4" />
                  Account
                </Link>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </div>
    </div>
  );
}
