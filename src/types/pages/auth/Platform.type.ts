export default interface Platform {
    userPlatformId: number;
    platformId: number;
    platformName: string;

    connected: boolean;
    connectUrl: string;

    platformUserId: string;
    platformUserSecret: string;
}
