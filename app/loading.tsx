import { Loader2 } from "lucide-react";
import React from "react";

const Loading = () => {
    return (
        <div className="flex justify-center items-center w-dvw h-dvh">
            <Loader2 className="w-[5%] h-[5%] stroke-primary animate-spin" />
        </div>
    );
};

export default Loading;
