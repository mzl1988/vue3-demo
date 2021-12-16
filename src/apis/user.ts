import { request, API_URL } from "@/commons";

export const userLogin = async (username: string, password: String) => {
    const res: any = await request.post(API_URL.login, {
        username: username,
        password: password,
    });
    return res;
}