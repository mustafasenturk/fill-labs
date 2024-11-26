import * as React from "react";
import { TextInput } from "react-native";

import { cn } from "~/lib/utils";

const Textarea = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  React.ComponentPropsWithoutRef<typeof TextInput>
>(({ className, multiline = true, numberOfLines = 4, placeholderClassName, ...props }, ref) => {
  return (
    <TextInput
      className={cn(
        "web:flex native:text-lg native:leading-[1.25] web:ring-offset-background web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2 min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground lg:text-sm",
        props.editable === false && "web:cursor-not-allowed opacity-50",
        className,
      )}
      multiline={multiline}
      numberOfLines={numberOfLines}
      placeholderClassName={cn("text-muted-foreground", placeholderClassName)}
      ref={ref}
      textAlignVertical="top"
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

export { Textarea };