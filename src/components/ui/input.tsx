import * as React from "react";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input"> & {
    startIcon?: LucideIcon;
  }
>(({ className, type, startIcon: StartIcon, ...props }, ref) => {
  return (
    <div className="relative w-full">
      {StartIcon && (
        <div className="absolute size-4 left-2.5 top-2.5 text-muted-foreground">
          <StartIcon className="size-4" />
        </div>
      )}
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className,
          { "pl-8": StartIcon },
        )}
        ref={ref}
        {...props}
      />
    </div>
  );
});
Input.displayName = "Input";

export { Input };
