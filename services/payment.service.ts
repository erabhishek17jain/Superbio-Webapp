import axios from "axios";
import BaseNetworkFramework from "./base.service";


interface IPaymentService {
    createOrder: (data: CreateOrderPayload) => Promise<OrderResponse>;
    getCrditTransaction: (page: number, limit: number) => Promise<CreditLedger[]>;
    getDebitTransaction: (page: number, limit: number) => Promise<DebitLedger[]>;
}


export default class PaymentService extends BaseNetworkFramework implements IPaymentService {
    private static instance: PaymentService = new PaymentService();
    private constructor() {
        super();
    }
    public static get fn(): PaymentService {
        return this.instance;
    }

    public createOrder = async (data: CreateOrderPayload): Promise<OrderResponse> => {
        const response = await axios.post<OrderResponse>(`${this.url}/payment/create-order`, data, {
            headers: this.get_auth_header()
        });

        return response.data;
    }

    public getCrditTransaction = async (page: number, limit: number): Promise<CreditLedger[]> => {
        const response = await axios.get<{data: CreditLedger[]}>(`${this.url}/payment/get-credit-ledgers?page=${page}&limit=${limit}`, {
            headers: this.get_auth_header()
        });
        return response.data.data;
    }

    public getDebitTransaction = async (page: number, limit: number): Promise<DebitLedger[]> => {
        const response = await axios.get<{data: DebitLedger[]}>(`${this.url}/payment/get-debit-ledgers?page=${page}&limit=${limit}`, {
            headers: this.get_auth_header()
        });
        return response.data.data;
    }

}

