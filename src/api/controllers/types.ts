export interface ArticleQuery {
  sort_by: string | undefined;
  order: string | undefined;
  topic: string | undefined;
  limit: number;
  p: number;
}
