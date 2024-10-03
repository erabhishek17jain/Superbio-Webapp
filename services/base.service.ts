import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';

export default class BaseNetworkFramework {
    public rustUrl: string = process.env.NEXT_PUBLIC_RUST_URL || '';
    public nodeUrl: string = process.env.NEXT_PUBLIC_NODE_URL || '';
    public javaUrl: string = process.env.NEXT_PUBLIC_JAVA_API || '';

    public get_auth_header_rust = (): { [key: string]: string } => {
        return {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Methods': '*',
            'Authorization': `Bearer ${getCookie('token')}`,
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        };
    };

    public get_auth_header_java = (): { [key: string]: any } => {
        return {
            headers: this.get_auth_header_rust(),
            withCredentials: true,
        };
    };
}
