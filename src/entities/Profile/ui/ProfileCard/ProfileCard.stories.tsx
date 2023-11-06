import { ComponentMeta, ComponentStory } from '@storybook/react';
import { CountryEnum } from '@/entities/Country';
import { CurrencyEnum } from '@/entities/Currency';
import AvatarImg from '@/shared/assets/tests/avatar.png';
import { ProfileCard } from './ProfileCard';

export default {
  title: 'entities/ProfileCard',
  component: ProfileCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => (
  <ProfileCard {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  data: {
    username: 'admin',
    age: 30,
    country: CountryEnum.Gorgia,
    firstname: 'Sarik',
    lastname: 'Hvanidze',
    avatar: AvatarImg,
    city: 'Batumi',
    currency: CurrencyEnum.EUR,
  },
};

export const WithError = Template.bind({});
WithError.args = {
  error: 'Test error',
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};
