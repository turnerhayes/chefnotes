import Image from "next/image";

export const AppIcon = ({
  width = 577,
  height = 577,
  className,
}: {
  width?: number;
  height?: number;
  className?: string;
}) => {
  return (
    <Image
      src="/chefnotes-logo.png"
      alt="Chefnotes logo"
      width={width}
      height={height}
      className={className}
      priority
    />
  );
};
