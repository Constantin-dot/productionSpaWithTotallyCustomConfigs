import { Theme } from '@/shared/const/theme';

export interface IJsonSettings {
  theme?: Theme;
  isFirstVisit?: boolean;
  isArticlePageWasOpened?: boolean;
  language?: 'ru' | 'en';
}
