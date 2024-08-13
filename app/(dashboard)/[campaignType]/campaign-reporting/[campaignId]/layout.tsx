export interface SearchParams {
    page: string;
    size: string;
    sortBy: string;
    sortDirection: string;
    filter: string;
    value: string;
    campaignName: string;
    isPublic?: boolean;
}

export interface Params { campaignType: string; campaignId: string }

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: Params }) {
    return <>{children}</>;
}
