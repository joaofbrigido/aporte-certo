import { Loader, Plus } from "lucide-react";
import { Button, buttonVariants } from "../ui/button";
import { VariantProps } from "class-variance-authority";

type ShadcnButton = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

type MainButtonProps = ShadcnButton & {
  children: React.ReactNode;
  isLoading?: boolean;
  isAddBtn?: boolean;
};

export const MainButton = ({
  isLoading,
  children,
  isAddBtn,
  ...props
}: MainButtonProps) => {
  return (
    <>
      {isLoading ? (
        <Button {...props} disabled>
          <Loader className="animate-spin" />
          Carregando...
        </Button>
      ) : (
        <Button {...props}>
          {isAddBtn && <Plus />}
          {children}
        </Button>
      )}
    </>
  );
};
