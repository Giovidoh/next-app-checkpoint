import { cn } from "@/lib/utils";
import { FC, ReactNode } from "react";

interface SectionContainerProps {
    children: ReactNode;
    className?: string;
}

const SectionContainer: FC<SectionContainerProps> = ({
    children,
    className,
}) => {
    return (
        <section
            className={cn(
                "flex flex-col bg-white w-full gap-7 p-5 rounded-xl",
                className
            )}
        >
            {children}
        </section>
    );
};

export default SectionContainer;
