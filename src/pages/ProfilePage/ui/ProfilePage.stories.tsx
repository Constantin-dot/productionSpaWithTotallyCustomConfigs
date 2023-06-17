import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Theme } from '@/shared/const/theme';
import { CountryEnum } from '@/entities/Country';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import AvatarImg from '@/shared/assets/tests/avatar.png';
import { CurrencyEnum } from '@/entities/Currency';
import ProfilePage from './ProfilePage';

export default {
  title: 'pages/ProfilePage',
  component: ProfilePage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ProfilePage>;

const Template: ComponentStory<typeof ProfilePage> = () => <ProfilePage />;

export const LightTheme = Template.bind({});
LightTheme.args = {};
LightTheme.decorators = [StoreDecorator({
  profile: {
    form: {
      username: 'admin',
      age: 30,
      country: CountryEnum.Gorgia,
      firstname: 'Sarik',
      lastname: 'Hvanidze',
      avatar: AvatarImg,
      city: 'Batumi',
      currency: CurrencyEnum.EUR,
    },
  },
})];

export const DarkTheme = Template.bind({});
DarkTheme.args = {};
DarkTheme.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({
  profile: {
    form: {
      username: 'admin',
      age: 30,
      country: CountryEnum.Gorgia,
      firstname: 'Sarik',
      lastname: 'Hvanidze',
      avatar: AvatarImg,
      city: 'Batumi',
      currency: CurrencyEnum.EUR,
    },
  },
})];
