import { Theme } from '@/shared/const/theme';

export interface IJsonSettings {
  theme?: Theme;
  isFirstVisit?: boolean;
  settingsPageHasBeenOpened?: boolean;
  language?: 'ru' | 'en';
}
