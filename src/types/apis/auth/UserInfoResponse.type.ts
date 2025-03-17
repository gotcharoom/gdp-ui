export interface UserInfoResponse {
    id: string;
    email: string;
    nickname: string;
    name: string;
    platforms: Record<string, string>;
    socials: Record<string, string>;
}
