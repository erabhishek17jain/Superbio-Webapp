
declare type CreateOrderPayload = {
    amount: number;
    currency: string;
    receipt: string;
    notes?: any;
}

declare type OrderResponse = {
    id: string;
    entity: string;
    amount: number;
    amount_paid: number;
    amount_due: number;
    currency: string;
    receipt: string;
    offerid: string;
    status: string;
    attempts: number;
    notes: any[];
    created_at: number;
}

declare type CreditLedger = {
    id: string;
    userid: string;
    rz_orderid: string;
    amount: number;
    status: string;
    created_at: number;
    updated_at: number;
}

declare type DebitLedger = {
    id: string;
    userid: string;
    amount: number;
    sheetid: string;
    created_at: number;
    updated_at: number;
}
