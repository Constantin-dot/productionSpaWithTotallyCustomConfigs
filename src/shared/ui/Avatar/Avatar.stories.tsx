import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Avatar } from './Avatar';
import AvatarImg from './avatar.png';

export default {
  title: 'shared/Avatar',
  component: Avatar,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  alt: 'Test',
  size: 150,
  src: AvatarImg,
};

export const Small = Template.bind({});
Small.args = {
  alt: 'Test',
  size: 50,
  src: AvatarImg,
};
