export interface SearchParams {
    page: string;
    size: string;
    sortBy: string;
    sortDirection: string;
    filter: string;
    value: string;
    isPublic?: boolean;
}

export interface Params { campaignType: string; campaignId: string }

export default async function RootLayout({ children, params }: { children: ReactNode; params: Params }) {
    return <>{children}</>;
}
