"use client";

import Image from "next/image";
import Link from "next/link"; //
import { usePathname } from "next/navigation";
import React from "react";

import { SheetClose } from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";

// Define the NavLinks component
// Accepts a prop `isMobileNav` to determine whether the navigation is mobile-specific
const NavLinks = ({ isMobileNav = false }: { isMobileNax?: boolean }) => {
  const pathname = usePathname(); // Get the current route's pathname
  const userId = 1; // Simulated user ID (could come from user context or props)

  return (
    <>
      {sidebarLinks.map((item) => {
        // Check if the current route matches or includes the item's route
        const isActive =
          (pathname.includes(item.route) && item.route.length > 1) ||
          pathname === item.route;

        // Dynamically append userId to the profile route, if applicable
        if (item.route === "/profile") {
          if (userId) item.route = `${item.route}/${userId}`;
          else return null; // Skip rendering if no user ID
        }

        // Create the main Link component
        const LinkComponent = (
          <Link
            className={cn(
              isActive
                ? "primary-gradient rounded-lg text-light-900" // Active link styling
                : "text-dark300_light900", // Inactive link styling
              "flex items-center justify-start gap-4 bg-transparent p-4" // Common styles
            )}
            href={item.route}
            key={item.label}
          >
            {/* Render the item's icon */}
            <Image
              className={cn({ "invert-colors": !isActive })} // Invert icon colors if inactive
              src={item.imgURL}
              alt={item.label}
              width={20}
              height={20}
            />
            {/* Render the item's label */}
            <p
              className={cn(
                isActive ? "base-bold" : "base-medium", // Font style based on active state
                !isMobileNav && " max-lg:hidden" // Hide text on smaller screens if not mobile nav
              )}
            >
              {item.label}
            </p>
          </Link>
        );

        // Handle rendering differently based on `isMobileNav`
        return isMobileNav ? (
          // Wrap LinkComponent in SheetClose for mobile navigation
          <SheetClose asChild key={item.route}>
            {LinkComponent}
          </SheetClose>
        ) : (
          // Use React.Fragment for desktop navigation
          <React.Fragment key={item.route}>{LinkComponent}</React.Fragment>
        );
      })}
    </>
  );
};

export default NavLinks; // Export the NavLinks component for use in other files
