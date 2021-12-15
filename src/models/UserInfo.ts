export interface UserInfo {
    id: string;
    token: string;
    name?: string;
    avatar?: string;
    roles?: string[];
}

export class UserInfoProxy {
    id: string;
    token: string;
    name?: string;
    avatar?: string;
    roles?: string[];

    constructor(d: any) {
        this.id = d.id;
        this.token = d.token;
        this.name = d.name;
        this.avatar = d.avatar;
        this.roles = d.roles ?? [];
    }
}