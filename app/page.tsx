import PageContainer from "@/components/shared/containers/PageContainer";
import SectionContainer from "@/components/shared/containers/SectionContainer";
import Link from "next/link";

export default function Home() {
    return (
        <PageContainer>
            <SectionContainer>
                Welcome back fella!{" "}
                <Link
                    href={"/all-components"}
                    className="text-blue-400 underline"
                >
                    See all components
                </Link>
            </SectionContainer>
        </PageContainer>
    );
}
