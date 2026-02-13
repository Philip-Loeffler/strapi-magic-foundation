import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const components = [
  {
    title: "RSS",
    href: "/Rss",
    description: null,
    isTrigger: true,
    isButton: false,

    items: [
      {
        title: "About us",
        href: "/docs",
      },
      {
        title: "History",
        href: "/docs/installation",
      },
      {
        title: "Staff",
        href: "/docs/primitives/typography",
      },
      {
        title: "Board of Directors",
        href: "/docs",
      },
      {
        title: "Division Consultants",
        href: "/docs/installation",
      },
      {
        title: "Medical Advisory Board",
        href: "/docs/primitives/typography",
      },
    ],
  },
  {
    title: "SGA",
    href: "/Sga",
    description: null,
    isTrigger: false,
    isButton: false,
    items: [],
  },
  {
    title: "Temple",
    href: "/Temple",
    description: null,
    isTrigger: false,
    isButton: false,
    items: [],
  },
];

export default function NavigationMenuDemo() {
  return (
    <div className="flex gap-2 py-5 px-5 justify-evenly border-b items-center">
      <Link href={"/"}>
        <Image
          src={"/foundation-logo.png"}
          width={182}
          height={48}
          alt="Magic Foundation Logo"
        />
      </Link>
      <NavigationMenu>
        <NavigationMenuList>
          {components.map((component) => (
            <NavigationMenuItem key={component.title}>
              <Link
                className=" px-[18px] py-[6px] gap-[10px] ="
                href={component.href}
              >
                {component.title}
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
        <Button className="w-[143px] bg-red-500 h-[32px] p-[6px_12px] gap-[10px] rounded-[60px]">
          <Link href={"/Emergency"}> Have Emergency?</Link>
        </Button>
      </NavigationMenu>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-primaryBlue">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
