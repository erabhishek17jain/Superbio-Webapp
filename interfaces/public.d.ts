export interface IPublicForm {
    campaignName: string;
    form: {
        id: { $oid: string };
        campaignId: { $oid: string };
        fields: [
            {
                fieldType: string;
                label: string;
                required: boolean;
                isLinkField: boolean;
            },
        ];
    };
}

export interface ISubmitPublicForm {
    formId: string;
    campaignId: string;
    fields: {
        fieldType: string;
        label: string;
        value: string;
        isLinkField: boolean;
    }[];
}
