import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { ThemeSwticher } from './ThemeSwticher';
import { Theme } from '@/shared/const/theme';

export default {
  title: 'shared/ThemeSwticher',
  component: ThemeSwticher,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ThemeSwticher>;

const Template: ComponentStory<typeof ThemeSwticher> = () => <ThemeSwticher />;

export const LightTheme = Template.bind({});
LightTheme.args = {};

export const DarkTheme = Template.bind({});
DarkTheme.args = {};
DarkTheme.decorators = [ThemeDecorator(Theme.DARK)];
