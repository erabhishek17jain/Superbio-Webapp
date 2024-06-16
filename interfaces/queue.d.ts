
declare interface IQueue {
    _id: { $oid: string };
    sheets: ISheet[];
    campaign: ICampaign;
    campaignId: { $oid: string };
    sheetIds: { $oid: string }[];
    status: string;
    user: {
        _id: { $oid: string };
        name: string;
        email: string;
        role: string;
    };
    createdAt: MongoDate;
    updatedAt: MongoDate;
}
