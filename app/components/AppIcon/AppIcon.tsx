import Image from "next/image";

export const AppIcon = ({
  className,
}: {
  className?: string;
}) => {
  return (
    <Image
      src="/chefnotes-logo.png"
      alt="Chefnotes logo"
      className={className}
    />
  );
};
