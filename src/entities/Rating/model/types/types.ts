export interface IRating {
  id: string;
  rate: number;
  feedback: string;
  userId: string;
  articleId?: string;
  profileId?: string;
}
