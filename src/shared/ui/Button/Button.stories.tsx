import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Button, ButtonVariantEnum } from './Button';

export default {
  title: 'shared/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'Text',
};

export const Clear = Template.bind({});
Clear.args = {
  children: 'Text',
  theme: ButtonVariantEnum.CLEAR,
};

export const Outline = Template.bind({});
Outline.args = {
  children: 'Text',
  theme: ButtonVariantEnum.OUTLINE,
};

export const OutlineDarkTheme = Template.bind({});
OutlineDarkTheme.args = {
  children: 'Text',
  theme: ButtonVariantEnum.OUTLINE,
};
OutlineDarkTheme.decorators = [ThemeDecorator(Theme.DARK)];