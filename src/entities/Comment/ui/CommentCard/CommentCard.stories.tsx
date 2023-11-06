import { ComponentMeta, ComponentStory } from '@storybook/react';
import { CommentCard } from './CommentCard';

export default {
  title: 'entities/CommentCard',
  component: CommentCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof CommentCard>;

const Template: ComponentStory<typeof CommentCard> = (args) => (
  <CommentCard {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  comment: {
    id: '1',
    text: 'Hello world!',
    user: { id: '1', username: 'Vasya', role: ['ADMIN'] },
  },
};

export const Loading = Template.bind({});
Loading.args = {
  comment: {
    id: '2',
    text: 'Test comment 2',
    user: { id: '2', username: 'Dima', role: ['ADMIN'] },
  },
  isLoading: true,
};
