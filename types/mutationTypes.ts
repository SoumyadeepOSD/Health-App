export type ProfileResponse = {
    id: string;
    full_name: string;
    avatar_url: string;
}[];


export type UploadProfileParams = {
    fileUri: string;
    fullName: string;
    is_profile_completed: boolean;
};
