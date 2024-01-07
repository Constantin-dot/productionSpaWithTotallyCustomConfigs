import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Theme } from '@/shared/const/theme';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Text, TextSizeEnum, TextVariantEnum } from './Text';

export default {
  title: 'shared/Text',
  component: Text,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: 'Title',
  text: 'Text',
};

export const Error = Template.bind({});
Error.args = {
  title: 'Title',
  text: 'Text',
  variant: TextVariantEnum.ERROR,
};

export const OnlyTitle = Template.bind({});
OnlyTitle.args = {
  title: 'Only title',
};

export const OnlyText = Template.bind({});
OnlyText.args = {
  text: 'Only text',
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
  title: 'Title',
  text: 'Text',
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const ErrorDark = Template.bind({});
ErrorDark.args = {
  title: 'Title',
  text: 'Text',
  variant: TextVariantEnum.ERROR,
};
ErrorDark.decorators = [ThemeDecorator(Theme.DARK)];

export const OnlyTitleDark = Template.bind({});
OnlyTitleDark.args = {
  title: 'Only title',
};
OnlyTitleDark.decorators = [ThemeDecorator(Theme.DARK)];

export const OnlyTextDark = Template.bind({});
OnlyTextDark.args = {
  text: 'Only text',
};
OnlyTextDark.decorators = [ThemeDecorator(Theme.DARK)];

export const SizeS = Template.bind({});
SizeS.args = {
  title: 'Title',
  text: 'Text',
  size: TextSizeEnum.S,
};

export const SizeL = Template.bind({});
SizeL.args = {
  title: 'Title',
  text: 'Text',
  size: TextSizeEnum.L,
};

export const SizeXL = Template.bind({});
SizeXL.args = {
  title: 'Title',
  text: 'Text',
  size: TextSizeEnum.XL,
};
