import * as React from "react";
import Image from "next/image";
import Link from "next/link";

interface ComponentItem {
  title: string;
  href: string;
  img?: string;
  alt?: string;
}

interface Component {
  title: string;
  src: string;
  href: string | null;
  description: string | null;
  isTrigger: boolean;
  items: ComponentItem[];
}

const components: Component[] = [
  {
    title: "",
    src: "/foundation-logo.png",
    href: null,
    description:
      "Please remember when contacting us, we are not medical professionals. We are parents of affected children. We will try to match you with the parent whose child most closely resembles you/your questions.",
    isTrigger: true,
    items: [],
  },
  {
    title: "Links",
    src: "",
    href: "/docs",
    description: null,
    isTrigger: false,
    items: [
      {
        title: "Terms of Use",
        href: "/docs",
      },
      {
        title: "Privacy Policy",
        href: "/docs/installation",
      },
      {
        title: "Accessibility",
        href: "/docs/primitives/typography",
      },
      {
        title: "Nondiscrimination Notice",
        href: "/docs",
      },
      {
        title: "Member Rights and Responsibilities",
        href: "/docs/installation",
      },
      {
        title: "Report Fraud",
        href: "/docs/primitives/typography",
      },
    ],
  },
  {
    title: "Contact",
    src: "",
    href: "/docs",
    description:
      "The MAGIC Foundation 4200 Cantera Dr. #106 Warrenville, IL 60555",
    isTrigger: false,
    items: [
      {
        title: "P:(800)362-4423",
        href: "/docs/primitives/alert-dialog",
      },
      {
        title: "P:(630)836-8200",
        href: "/docs/primitives/alert-dialog",
      },
      {
        title: "F:(800)836-8181",
        href: "/docs/primitives/alert-dialog",
      },
      {
        title: "E:contactus@magicfoundation.org",
        href: "/docs/primitives/alert-dialog",
      },
    ],
  },
  {
    title: "Social",
    src: "",
    href: null,
    description: null,
    isTrigger: true,
    items: [
      {
        title: "Facebook",
        href: "https://www.facebook.com/TheMAGICFoundation",
        img: "/facebook.png",
        alt: "facebook",
      },
      {
        title: "twitter",
        href: "https://x.com/magicfoundation",
        img: "/twitter.png",
        alt: "twitter",
      },
      {
        title: "instagram",
        href: "https://www.instagram.com/magicfoundation/",
        img: "/instagram.png",
        alt: "instagram",
      },

      {
        title: "youtube",
        href: "https://www.youtube.com/user/TheMAGICFoundation",
        img: "/youtube.png",
        alt: "youtube",
      },
    ],
  },
];
export default async function Footer() {
  return (
    <footer className="flex gap-2 py-5 px-5 w-full text-white bg-[#1A1A1A]">
      {components.map((component, i) => (
        <div key={i} className="flex w-full justify-around">
          <div className="flex flex-col gap-2">
            {component.src && (
              <Image
                src={component.src}
                width={182}
                height={48}
                alt="Magic Foundation Logo"
              />
            )}
            <div className="text-[20px] pb-4">{component.title}</div>

            <div className="text-[12px]">{component.description}</div>

            {component.items.map((item) => (
              <div className="flex gap-2 items-center" key={item.title}>
                {item.img && item.alt && (
                  <Image
                    src={item.img}
                    alt={item.alt}
                    width={20}
                    height={20}
                    unoptimized
                  />
                )}
                <Link
                  className="text-[12px] text-primaryLink"
                  href={item.href}
                  passHref
                >
                  {item.title}
                </Link>
              </div>
            ))}
          </div>
        </div>
      ))}
    </footer>
  );
}
