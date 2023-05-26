import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ListBox } from './ListBox';

export default {
  title: 'shared/ListBox',
  component: ListBox,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [
    (Story) => <div style={{ padding: 100 }}><Story /></div>,
  ],
} as ComponentMeta<typeof ListBox>;

const Template: ComponentStory<typeof ListBox> = (args) => <ListBox {...args} />;

export const BottomLeft = Template.bind({});
BottomLeft.args = {
  direction: 'bottomLeft',
  items: [
    { content: 'test 1', value: '1' },
    { content: 'test 2', value: '2' },
  ],
  value: '2',
};

export const BottomRight = Template.bind({});
BottomRight.args = {
  direction: 'bottomRight',
  items: [
    { content: 'test 1', value: '1' },
    { content: 'test 2', value: '2' },
  ],
  value: '2',
};

export const TopLeft = Template.bind({});
TopLeft.args = {
  direction: 'topLeft',
  items: [
    { content: 'test 1', value: '1' },
    { content: 'test 2', value: '2' },
  ],
  value: '2',
};

export const TopRight = Template.bind({});
TopRight.args = {
  direction: 'topRight',
  items: [
    { content: 'test 1', value: '1' },
    { content: 'test 2', value: '2' },
  ],
  value: '2',
};
