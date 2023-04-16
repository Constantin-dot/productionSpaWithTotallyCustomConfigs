import { IUser } from 'entities/User';

export enum ArticleBlockTypeEnum {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  CODE = 'CODE',
}

export interface IArticleBaseBlock {
  id: string;
  type: ArticleBlockTypeEnum;
}

export interface IArticleCodeBlock extends IArticleBaseBlock {
  type: ArticleBlockTypeEnum.CODE;
  code: string;
}

export interface IArticleImageBlock extends IArticleBaseBlock {
  type: ArticleBlockTypeEnum.IMAGE;
  src: string;
  title: string;
}

export interface IArticleTextBlock extends IArticleBaseBlock {
  type: ArticleBlockTypeEnum.TEXT;
  title?: string;
  paragraphs: Array<string>;
}

export type ArticleBlockType = IArticleCodeBlock | IArticleImageBlock | IArticleTextBlock;

export enum ArticleTypeEnum {
  IT = 'it',
  SCIENCE = 'science',
  ECONOMICS = 'economics',
}

export interface IArticle {
  id: string;
  user: IUser;
  title: string;
  subtitle: string;
  img: string;
  views: number;
  createdAt: string;
  type: Array<ArticleTypeEnum>;
  blocks: Array<ArticleBlockType>;
}

export enum ArticleListViewVariantEnum {
  LIST = 'list',
  CARDS = 'cards'
}
