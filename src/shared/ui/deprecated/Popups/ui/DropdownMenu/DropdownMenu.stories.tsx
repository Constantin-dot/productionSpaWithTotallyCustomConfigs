import { ComponentMeta, ComponentStory } from '@storybook/react';
import { DropdownMenu } from './DropdownMenu';
import { Button } from '../../../Button/Button';

export default {
  title: 'shared/Popups/DropdownMenu',
  component: DropdownMenu,
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
} as ComponentMeta<typeof DropdownMenu>;

const Template: ComponentStory<typeof DropdownMenu> = (args) => (
  <DropdownMenu {...args} />
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
