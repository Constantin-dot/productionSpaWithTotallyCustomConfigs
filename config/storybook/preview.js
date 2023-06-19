import { addDecorator } from '@storybook/react';
import { StyleDecorator } from '../../src/shared/config/storybook/StyleDecorator/StyleDecorator';
import { RouterDecorator } from '../../src/shared/config/storybook/RouterDecorator/RouterDecorator';
import { SuspenseDecorator } from '../../src/shared/config/storybook/SuspenseDecorator/SuspenseDecorator';
import { Theme } from '../../src/app/providers/ThemeProvider';
import '../../src/shared/config/i18n/i18n';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: 'fullscreen',
  themes: {
    default: 'Light',
    list: [
      { name: 'Light', class: ['app', Theme.LIGHT], color: '#e8e8ea' },
      { name: 'Light', class: ['app', Theme.DARK], color: '#0e0e75' },
      { name: 'Light', class: ['app', Theme.GREEN], color: '#0e9e32' },
    ],
  },
};

addDecorator(StyleDecorator);
// addDecorator(ThemeDecorator(Theme.LIGHT));
addDecorator(RouterDecorator);
addDecorator(SuspenseDecorator);
