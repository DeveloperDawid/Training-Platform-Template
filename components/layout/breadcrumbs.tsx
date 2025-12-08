"use client";

import { usePathname } from "next/navigation";

import { Fragment } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const unslugify = (slug: string) => slug.replace(/-/g, " ");

// Map special breadcrumb segments to display names
const breadcrumbDisplayMap: Record<string, string> = {
  home: "Home",
  protected: "Protected Area",
  settings: "Settings",
  profile: "Profile",
  create: "Create",
  edit: "Edit",
};

export function AppBreadcrumbs({ maxDepth = 6 }: { maxDepth?: number }) {
  const pathname = usePathname();
  const splitPath = pathname.split("/").filter(Boolean);

  const visiblePaths =
    splitPath.length > maxDepth
      ? [splitPath[0], ...splitPath.slice(-maxDepth + 1)]
      : splitPath;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {visiblePaths.map((path, index) => {
          const isLast = index === visiblePaths.length - 1;
          const label = breadcrumbDisplayMap[path] || unslugify(path);

          // Build the href for this breadcrumb item
          // const actualIndex = splitPath.indexOf(path);
          // const href = "/" + splitPath.slice(0, actualIndex + 1).join("/");

          return (
            <Fragment key={index}>
              <BreadcrumbItem className="capitalize">
                <BreadcrumbLink asChild>
                  <span
                    className={
                      isLast
                        ? "text-foreground font-medium"
                        : "text-muted-foreground"
                    }
                  >
                    {label}
                  </span>
                  {/* <Link
                    href={href}
                    className={
                      isLast
                        ? "text-foreground font-medium"
                        : "text-muted-foreground hover:text-foreground"
                    }
                  >
                    {label}
                  </Link> */}
                </BreadcrumbLink>
              </BreadcrumbItem>

              {!isLast && <BreadcrumbSeparator />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
