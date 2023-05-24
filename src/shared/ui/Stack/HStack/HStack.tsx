import { Flex, IFlexProps } from '../Flex/Flex';

type PropsType = Omit<IFlexProps, 'direction'>;

export const HStack = (props: PropsType) => (
  <Flex direction="row" {...props} />
);
