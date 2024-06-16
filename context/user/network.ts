import { createAsyncThunk } from "@reduxjs/toolkit";
import UserNetworkService from "@/services/user.service";


export const login = createAsyncThunk(
    "user/login",
    async (props: { email: string, password: string }) => {
        return await UserNetworkService.instance.login(props.email, props.password);
    }
);

export const register = createAsyncThunk(
    "user/register",
    async (props: { name: string, email: string, password: string, role: string, mobileNo?: string, profilePic?: string }) => {
        return await UserNetworkService.instance.register(props);
    }
);

export const getUser = createAsyncThunk(
    "user/getUser",
    async () => {
        return await UserNetworkService.instance.getUser();
    }
);

export const loginUsingGoogle = createAsyncThunk(
    "user/loginUsingGoogle",
    async (props: { token: string, tokenType: string }) => {
        return await UserNetworkService.instance.loginUsingGoogle(props.token, props.tokenType);
    }
);

  