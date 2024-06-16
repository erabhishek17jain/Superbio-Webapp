
export interface SearchParams {
    page: string;
    limit: string;
    sort: string;
    order: string;
    filter: string;
    value: string;
    campaignName: string;
    isPublic?: boolean;
}

export interface Params { campaignType: string; campaignId: string }

export default async function RootLayout({ children, params }: { children: React.ReactNode, params: Params}) {

    return (
        <>
            {children}
        </>
    );
}
