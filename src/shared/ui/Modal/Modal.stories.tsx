import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Modal } from './Modal';

export default {
  title: 'shared/Modal',
  component: Modal,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  isOpen: true,
  children: `Lorem ipsum dolor, sit amet consectetur adipisicing
  elit. Voluptatum veniam sit nisi iusto eligendi,
  dolores sunt vitae ab officiis rerum velit quaerat
  reprehenderit harum nulla fuga atque impedit nobis?
  Adipisci odio quasi nemo vero expedita blanditiis,
  minus magni quibusdam alias ipsum illo unde omnis
  molestias deleniti magnam libero repudiandae commodi.`,
};

export const DarkTheme = Template.bind({});
DarkTheme.args = {
  isOpen: true,
  children: `Lorem ipsum dolor, sit amet consectetur adipisicing
  elit. Voluptatum veniam sit nisi iusto eligendi,
  dolores sunt vitae ab officiis rerum velit quaerat
  reprehenderit harum nulla fuga atque impedit nobis?
  Adipisci odio quasi nemo vero expedita blanditiis,
  minus magni quibusdam alias ipsum illo unde omnis
  molestias deleniti magnam libero repudiandae commodi.`,
};
DarkTheme.decorators = [ThemeDecorator(Theme.DARK)];
