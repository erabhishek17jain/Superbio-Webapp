import { getCookie } from "cookies-next";

export default class BaseNetworkFramework {

    public url: string = process.env.NEXT_PUBLIC_NETWORK_URL || "";
    public nodeUrl: string = process.env.NEXT_PUBLIC_NODE_URL || "";

    public get_auth_header = (): {[key: string]: string} => {
        return {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getCookie("token")}`,
            "Accpet": "application/json"
        }
    }
}
