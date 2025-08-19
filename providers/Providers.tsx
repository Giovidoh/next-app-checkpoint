"use client";

import AuthProvider from "./AuthProvider";
import I18nProvider from "./I18nProvider";
import TanstackProvider from "./TanstackProvider";

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <I18nProvider>
                <TanstackProvider>
                    <AuthProvider>{children}</AuthProvider>
                </TanstackProvider>
            </I18nProvider>
        </>
    );
};

export default Providers;
