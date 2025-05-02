import { FC } from "react";
import { cn } from "@/lib/utils";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";

interface BaseOtpInputProps {
    inputOtpClassName?: string;
    inputOTPGroupClassName?: string;
    inputOTPSlotClassName?: string;
}

const BaseOtpInput: FC<BaseOtpInputProps> = ({
    inputOtpClassName,
    inputOTPGroupClassName = "justify-center w-full gap-4",
    inputOTPSlotClassName = "text-lg border border-gray-400 w-14 h-14 rounded-lg",
}) => {
    return (
        <InputOTP
            className={cn("", inputOtpClassName)}
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS}
        >
            <InputOTPGroup className={cn("", inputOTPGroupClassName)}>
                <InputOTPSlot
                    className={cn("", inputOTPSlotClassName)}
                    index={0}
                />
                <InputOTPSlot
                    className={cn("", inputOTPSlotClassName)}
                    index={1}
                />
                <InputOTPSlot
                    className={cn("", inputOTPSlotClassName)}
                    index={2}
                />
                <InputOTPSlot
                    className={cn("", inputOTPSlotClassName)}
                    index={3}
                />
                <InputOTPSlot
                    className={cn("", inputOTPSlotClassName)}
                    index={4}
                />
                <InputOTPSlot
                    className={cn("", inputOTPSlotClassName)}
                    index={5}
                />
            </InputOTPGroup>
        </InputOTP>
    );
};

export default BaseOtpInput;
