import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Dropdown } from './Dropdown';
import { Button } from '../../../Button/Button';

export default {
  title: 'shared/Popups/Dropdown',
  component: Dropdown,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 100 }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => (
  <Dropdown {...args} />
);

export const BottomLeft = Template.bind({});
BottomLeft.args = {
  trigger: <Button>Open</Button>,
  items: [{ content: 'first' }, { content: 'second' }, { content: 'third' }],
  direction: 'bottomLeft',
};

export const BottomRight = Template.bind({});
BottomRight.args = {
  direction: 'bottomRight',
  trigger: <Button>Open</Button>,
  items: [{ content: 'first' }, { content: 'second' }, { content: 'third' }],
};

export const TopLeft = Template.bind({});
TopLeft.args = {
  direction: 'topLeft',
  trigger: <Button>Open</Button>,
  items: [{ content: 'first' }, { content: 'second' }, { content: 'third' }],
};

export const TopRight = Template.bind({});
TopRight.args = {
  direction: 'topRight',
  trigger: <Button>Open</Button>,
  items: [{ content: 'first' }, { content: 'second' }, { content: 'third' }],
};
