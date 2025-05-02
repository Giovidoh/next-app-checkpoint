import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { FC } from "react";

interface BaseInputProps extends React.ComponentProps<"input"> {
    placeholder?: string;
    className?: string;
}

const BaseInput: FC<BaseInputProps> = ({
    placeholder,
    className,
    ...props
}) => {
    return (
        <Input
            placeholder={placeholder}
            className={cn(
                "text-[clamp(14px,_2vw,_16px)] bg-white px-5 py-6",
                className
            )}
            {...props}
        />
    );
};

export default BaseInput;
