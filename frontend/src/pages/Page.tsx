import React from "react";
import { TopBar } from "../components/TopBar";

type PageProps = {
    children: React.ReactNode
}

export const Page: React.FC<PageProps> = ({ children }) => {
    return <>
        <TopBar />
        {children}
    </>
}