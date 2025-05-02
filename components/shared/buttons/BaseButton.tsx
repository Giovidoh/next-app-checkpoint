import { FC, ReactNode } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";

interface BaseButtonProps
    extends React.ComponentPropsWithoutRef<typeof Button>,
        VariantProps<typeof buttonVariants> {
    className?: string;
    children?: ReactNode;
}

const BaseButton: FC<BaseButtonProps> = ({ className, children, ...props }) => {
    return (
        <Button
            className={cn(
                "text-[clamp(16px,_2vw,_20px)] cursor-pointer",
                className
            )}
            {...props}
        >
            {children}
        </Button>
    );
};

export default BaseButton;
