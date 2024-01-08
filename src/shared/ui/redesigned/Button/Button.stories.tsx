import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Theme } from '@/shared/const/theme';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Button } from './Button';

export default {
  title: 'shared/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Clear = Template.bind({});
Clear.args = {
  children: 'Text',
  variant: 'clear',
};

export const Outline = Template.bind({});
Outline.args = {
  children: 'Text',
  variant: 'outline',
};

export const OutlineSizeL = Template.bind({});
OutlineSizeL.args = {
  children: 'Text',
  variant: 'outline',
  size: 'l',
};

export const OutlineDarkTheme = Template.bind({});
OutlineDarkTheme.args = {
  children: 'Text',
  variant: 'outline',
};
OutlineDarkTheme.decorators = [ThemeDecorator(Theme.DARK)];

export const Square = Template.bind({});
Square.args = {
  children: '*',
  variant: 'clear',
  isSquare: true,
};

export const SquareSizeS = Template.bind({});
SquareSizeS.args = {
  children: '*',
  variant: 'clear',
  isSquare: true,
  size: 's',
};

export const SquareSizeL = Template.bind({});
SquareSizeL.args = {
  children: '*',
  variant: 'clear',
  isSquare: true,
  size: 'l',
};

export const Disabled = Template.bind({});
Disabled.args = {
  children: 'BTN',
  variant: 'outline',
  size: 'l',
  disabled: true,
};
