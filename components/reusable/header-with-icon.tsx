import { Heading } from "@/components/ui/heading";
import React from "react";

interface HeaderWithIconProps {
  title: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  description: string;
  Icon: React.ElementType;
  iconProps?: string;
}

const HeaderWithIcon = ({
  title,
  level,
  description,
  Icon,
  iconProps,
}: HeaderWithIconProps) => {
  return (
    <div className="flex items-center gap-3">
      <Icon className={`h-10 w-10 ${iconProps || "text-blue-600"}`} />
      <div>
        <Heading level={level}>{title}</Heading>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default HeaderWithIcon;
