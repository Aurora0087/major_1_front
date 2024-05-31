export type authProps = {
    data: {
        avatar: string,
        uid: string,
    } | null,
    afterLogin: () => void
}

export type videoContentsGetProps = {
    contents: {
        category: string,
        createAt: string,
        description: string,
        likeList: number[],
        price: number,
        thumbnailUrl: string,
        title: string,
        vid: number,
        author: {
            avatarUrl: string,
            firstName: string,
            lastName: string,
            profileId: number,
            userName: string,
        }
    }[]
    isMore: boolean,
    message: string,
}

export type contentCardProps = {
    category: string,
    createAt: string,
    description: string,
    likeList: number[],
    price: number,
    thumbnailUrl: string,
    title: string,
    vid: number,
    author: {
        avatarUrl: string,
        firstName: string,
        lastName: string,
        profileId: number,
        userName: string,
    }
}

export type contentFindByIdProps = {
    message: string,
    videoContent: {
        category: string,
        createAt: string,
        description: string,
        likeList: number[],
        price: number,
        thumbnailUrl: string,
        title: string,
        vid: number,
        isLiked: boolean,
        author: {
            avatarUrl: string,
            firstName: string,
            lastName: string,
            profileId: number,
            userName: string,
        }
    }
}

export type SearchParamProps = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

export type CommentSectionProps = {
    id: string
    contentType: "VIDEO" | "COMMENT"
}

export type Author = {
    profileId: number;
    userName: string;
    firstName: string;
    lastName: string;
    avatarUrl: string;
}

export type Comment = {
    isPrivate: boolean;
    message: string | null;
    commentId: number;
    text: string;
    author: Author;
    likeCount: number;
    isLiked: boolean;
}

export type commentResponseData = {
    message: string;
    commentList: Comment[];
    isMore: boolean;
}

export interface UserProfile {
    message: string;
    profileId: number;
    userName: string;
    firstName: string;
    lastName: string;
    avatarUrl: string;
    email: string;
    bgImage: string;
    bio: string;
    canChange: boolean;
}

export interface UserDetails {
    id: string;
    userName: string;
    email: string;
    firstName: string;
    lastName: string;
    locked: boolean;
    enabled: boolean;
    role: string;
}

export interface ContentAdmin {

    id: string;
    title: string;
    category: string;
    isBlocked: boolean;
    createdAt: string;
    price: number;
    authorId: string;

}

export interface OrderAdmin {

    id: string;
    razorpayOrderId: string;
    razorpayPaymentId: string | null;
    isPayed: boolean;
    orderedAt: string;
    contentId: string;
    amount: number;
    userId: string;
    
}
