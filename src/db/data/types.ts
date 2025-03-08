export interface User {
  name: string;
  username: string;
  avatar_url: string;
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
