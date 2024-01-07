import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Theme } from '@/shared/const/theme';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Button, ButtonSizeEnum, ButtonVariantEnum } from './Button';

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
  variant: ButtonVariantEnum.CLEAR,
};

export const ClearInverted = Template.bind({});
ClearInverted.args = {
  children: 'Text',
  variant: ButtonVariantEnum.CLEAR_INVERTED,
};

export const Outline = Template.bind({});
Outline.args = {
  children: 'Text',
  variant: ButtonVariantEnum.OUTLINE,
};

export const OutlineSizeL = Template.bind({});
OutlineSizeL.args = {
  children: 'Text',
  variant: ButtonVariantEnum.OUTLINE,
  size: ButtonSizeEnum.L,
};

export const OutlineDarkTheme = Template.bind({});
OutlineDarkTheme.args = {
  children: 'Text',
  variant: ButtonVariantEnum.OUTLINE,
};
OutlineDarkTheme.decorators = [ThemeDecorator(Theme.DARK)];

export const Background = Template.bind({});
Background.args = {
  children: 'Text',
  variant: ButtonVariantEnum.BACKGROUND,
};

export const InvertedBackground = Template.bind({});
InvertedBackground.args = {
  children: 'Text',
  variant: ButtonVariantEnum.INVERTED_BACKGROUND,
};

export const Square = Template.bind({});
Square.args = {
  children: '*',
  variant: ButtonVariantEnum.INVERTED_BACKGROUND,
  isSquare: true,
};

export const SquareSizeS = Template.bind({});
SquareSizeS.args = {
  children: '*',
  variant: ButtonVariantEnum.INVERTED_BACKGROUND,
  isSquare: true,
  size: ButtonSizeEnum.S,
};

export const SquareSizeL = Template.bind({});
SquareSizeL.args = {
  children: '*',
  variant: ButtonVariantEnum.INVERTED_BACKGROUND,
  isSquare: true,
  size: ButtonSizeEnum.L,
};

export const Disabled = Template.bind({});
Disabled.args = {
  children: 'BTN',
  variant: ButtonVariantEnum.OUTLINE,
  size: ButtonSizeEnum.L,
  disabled: true,
};
