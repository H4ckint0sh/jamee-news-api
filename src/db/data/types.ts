export interface User {
    user_id: number;
    userName: string;
    password: string;
    roleId: number;
    name: string;
    avatar_url: string;
    created_at: string;
    updated_at: string;
}

export interface Role {
    role_id: number;
    name: string;
    status: boolean;
}

export interface Topic {
    slug: string;
    description: string;
}

export interface Article {
    author: string;
    body: string;
    title: string;
    article_id: number;
    topic: string;
    created_at: string;
    votes: number;
    article_img_url: string;
    comment_count: number;
}

export interface Comment {
    comment_id: number;
    body: string;
    votes: number;
    author: string;
    article_id: number;
    created_at: string;
}
