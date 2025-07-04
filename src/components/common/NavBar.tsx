import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NavbarProps } from "@/types/types";

const Navbar = ({
  logo = {
    url: "#",
    src: "https://mswjs.io/_astro/msw.ChZQPzKa.svg",
    alt: "Logo",
    title: "MonitoCorp",
  },
  user = {
    name: "Sandeep Guttula",
    avatarUrl: "",
  },
}: NavbarProps) => {
  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  return (
    <header className="w-full border-b bg-background py-3">
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6">
        <a href={logo.url} className="flex items-center gap-2">
          <Image src={logo.src} alt={logo.alt} width={24} height={24} />
          <span className="text-sm font-medium text-muted-foreground hidden sm:inline">
            {logo.title}
          </span>
        </a>

        {/* Avatar + Name */}
        <div className="flex items-center gap-2">
          <span className="hidden text-sm text-muted-foreground sm:inline">
            {user.name}
          </span>
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export { Navbar };
