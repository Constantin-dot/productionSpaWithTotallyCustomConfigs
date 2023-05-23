import { Flex, FlexPropsType } from '../Flex/Flex';

type PropsType = Omit<FlexPropsType, 'direction'>;

export const HStack = (props: PropsType) => (
  <Flex direction="row" {...props} />
);
