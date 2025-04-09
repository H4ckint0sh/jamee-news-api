export interface ArticleQuery {
    sort_by?: string;
    order?: string;
    topic?: string;
    limit?: number;
    p?: number;
}

export interface UserQuery {
    sort_by?: string;
    order?: string;
    limit?: number;
    p?: number;
}
