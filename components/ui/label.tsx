import * as React from "react";
import * as LabelPrimitive from "@rn-primitives/label";

import { cn } from "~/lib/utils";

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Text>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Text>
>(({ className, onPress, onLongPress, onPressIn, onPressOut, ...props }, ref) => (
  <LabelPrimitive.Root
    className="web:cursor-default"
    onLongPress={onLongPress}
    onPress={onPress}
    onPressIn={onPressIn}
    onPressOut={onPressOut}
  >
    <LabelPrimitive.Text
      className={cn(
        "native:text-base web:peer-disabled:cursor-not-allowed web:peer-disabled:opacity-70 text-sm font-medium leading-none text-foreground",
        className,
      )}
      ref={ref}
      {...props}
    />
  </LabelPrimitive.Root>
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
