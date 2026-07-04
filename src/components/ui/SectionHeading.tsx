import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
  className,
}: Props) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <span className="label-eyebrow">
        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
        {eyebrow}
      </span>
      <h2
        className={cn(
          "heading-lg mt-4",
          light ? "text-white" : "text-ink"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-lg leading-relaxed",
            light ? "text-white/70" : "text-muted"
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
