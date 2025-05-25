import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "./breadcrumb";

export type LinkBreadcrumbItem = {
  content: React.ReactNode;
  href?: string;
};

export type LinkBreadcrumbProps = {
  items: LinkBreadcrumbItem[];
};

export default function LinkBreadcrumb({
  items,
}: LinkBreadcrumbProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, index, all) => {
          const isLast = index === all.length - 1;
          return (
            <React.Fragment key={`breadcrumb-item-${index}`}>
              <BreadcrumbItem>
                {item.href ? (
                  <BreadcrumbLink href={item.href}>
                    {item.content}
                  </BreadcrumbLink>
                ) : (
                  item.content
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
