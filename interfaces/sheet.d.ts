declare interface ISheet {
    _id: { $oid: string };
    sheetId: string;
    name: string;
    title: string;
    linkColumn: string;
    campaignId: { $oid: string };
    socialmedias: string;
    range: string;
    lastSyncedAt: MongoDate;
    createdAt: MongoDate;
    updatedAt: MongoDate;
}