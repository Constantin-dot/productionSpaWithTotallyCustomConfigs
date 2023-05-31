import { ComponentMeta, ComponentStory } from '@storybook/react';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { action } from '@storybook/addon-actions';
import { I18nextDecorator } from 'shared/config/storybook/I18nextDecorator/I18nextDecorator';
import AddCommentForm from './AddCommentForm';

export default {
  title: 'features/AddCommentForm',
  component: AddCommentForm,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [(Story) => I18nextDecorator(Story)],
} as ComponentMeta<typeof AddCommentForm>;

const Template: ComponentStory<typeof AddCommentForm> = (args) => <AddCommentForm {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  onSendComment: action('onSendComment'),
};
Primary.decorators = [
  StoreDecorator({}),
];
