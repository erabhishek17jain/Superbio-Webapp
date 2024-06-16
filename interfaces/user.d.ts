declare type User = {
    name: string;
    email: string;
    role: string;
    isVerified?: boolean;
    password?: string;
    mobileNo?: string;
    profilePic?: string;
}

declare type IUserListResponse = {
    data: User[];
    meta: {
        total: number;
        page: number;
        limit: number;
    }
}

declare type Orgs = {
    name: string;
    description: string;
}

declare interface MongoDate {
    $date: {
       $numberLong: string;
    }; 
 }