import { ComponentMeta, ComponentStory } from '@storybook/react';
import { CommentList } from './CommentList';

export default {
  title: 'entities/CommentList',
  component: CommentList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof CommentList>;

const Template: ComponentStory<typeof CommentList> = (args) => (
  <CommentList {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  comments: [
    {
      id: '1',
      text: 'Hello world!',
      user: { id: '1', username: 'Vasya', role: ['ADMIN'] },
    },
    {
      id: '2',
      text: 'Test comment 2',
      user: { id: '2', username: 'Dima', role: ['ADMIN'] },
    },
  ],
};

export const Loading = Template.bind({});
Loading.args = {
  comments: [
    {
      id: '1',
      text: 'Hello world!',
      user: { id: '1', username: 'Vasya', role: ['ADMIN'] },
    },
    {
      id: '2',
      text: 'Test comment 2',
      user: { id: '2', username: 'Dima', role: ['ADMIN'] },
    },
  ],
  isLoading: true,
};
