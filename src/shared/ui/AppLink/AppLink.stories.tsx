import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { AppLink, AppLinkVariantEnum } from './AppLink';

export default {
  title: 'shared/AppLink',
  component: AppLink,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    to: '/',
  },
} as ComponentMeta<typeof AppLink>;

const Template: ComponentStory<typeof AppLink> = (args) => <AppLink {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'Text',
  variant: AppLinkVariantEnum.PRIMARY,
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Text',
  variant: AppLinkVariantEnum.SECONDARY,
};

export const Red = Template.bind({});
Red.args = {
  children: 'Text',
  variant: AppLinkVariantEnum.RED,
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
  children: 'Text',
  variant: AppLinkVariantEnum.PRIMARY,
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const SecondaryDark = Template.bind({});
SecondaryDark.args = {
  children: 'Text',
  variant: AppLinkVariantEnum.SECONDARY,
};
SecondaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const RedDark = Template.bind({});
RedDark.args = {
  children: 'Text',
  variant: AppLinkVariantEnum.RED,
};
RedDark.decorators = [ThemeDecorator(Theme.DARK)];
