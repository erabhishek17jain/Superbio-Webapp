import { Params } from "@/interfaces/reporting";
import { ReactNode } from "react";

export default async function RootLayout({ children, params }: { children: ReactNode; params: Params }) {
    return <>{children}</>;
}
