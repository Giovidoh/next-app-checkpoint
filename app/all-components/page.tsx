"use client";

import BaseButton from "@/components/shared/buttons/BaseButton";
import PageContainer from "@/components/shared/containers/PageContainer";
import SectionContainer from "@/components/shared/containers/SectionContainer";
import BaseInput from "@/components/shared/inputs/BaseInput";
import BaseOtpInput from "@/components/shared/inputs/BaseOtpInput";

const AllComponents = () => {
    return (
        <PageContainer>
            <SectionContainer>
                <h1 className="text-[clamp(20px,_3vw,_28px)]">Buttons</h1>
                <div className="flex items-center gap-4">
                    <BaseButton>BaseButton</BaseButton>
                </div>
            </SectionContainer>
            <SectionContainer>
                <h1 className="text-[clamp(20px,_3vw,_28px)]">Inputs</h1>
                <div className="flex items-center gap-4">
                    <BaseInput placeholder="BaseInput" />
                    <BaseOtpInput />
                </div>
            </SectionContainer>
        </PageContainer>
    );
};

export default AllComponents;
