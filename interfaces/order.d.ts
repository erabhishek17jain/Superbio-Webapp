
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
    offer_id: string;
    status: string;
    attempts: number;
    notes: any[];
    created_at: number;
}

declare type CreditLedger = {
    id: string;
    user_id: string;
    rz_order_id: string;
    amount: number;
    status: string;
    created_at: number;
    updated_at: number;
}

declare type DebitLedger = {
    id: string;
    user_id: string;
    amount: number;
    sheet_id: string;
    created_at: number;
    updated_at: number;
}
