import { Flex, IFlexProps } from '../Flex/Flex';

type PropsType = Omit<IFlexProps, 'direction'>;

export const VStack = (props: PropsType) => (
  <Flex direction="column" {...props} />
);
