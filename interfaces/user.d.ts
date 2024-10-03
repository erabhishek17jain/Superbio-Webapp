export declare type User = {
    name: string;
    email: string;
    role: string;
    isVerified?: boolean;
    password?: string;
    mobileNo?: string;
    profilePic?: string;
    orgsId: { $oid: string };
};

export declare type IUserListResponse = {
    data: User[];
    meta: {
        total: number;
        page: number;
        limit: number;
    };
};

export declare type Orgs = {
    name: string;
    description: string;
};

export declare interface MongoDate {
    $date: {
        $numberLong: string;
    };
}
export interface IUserState {
    user: User;
    token: string | null;
    loading: boolean;
    members: User[];
    meta: {
        total: number;
        page: number;
        limit: number;
    };
    campaignType: string;
}

export interface ILoginResponse {
    token: string;
    user: User;
}

export interface IUserReturn {
    user: User;
    token: string;
}

interface IRegisterPayload {
    name: string;
    email: string;
    password: string;
    role: string;
    mobileNo?: string;
}
