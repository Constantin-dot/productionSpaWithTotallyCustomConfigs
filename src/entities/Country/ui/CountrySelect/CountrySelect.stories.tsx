import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CountrySelect } from './CountrySelect';

export default {
  title: 'entities/CountrySelect',
  component: CountrySelect,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '300px 200px' }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof CountrySelect>;

const Template: ComponentStory<typeof CountrySelect> = (args) => (
  <CountrySelect {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  label: 'Select country',
};
