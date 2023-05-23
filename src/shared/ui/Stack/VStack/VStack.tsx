import { Flex, FlexPropsType } from '../Flex/Flex';

type PropsType = Omit<FlexPropsType, 'direction'>;

export const VStack = (props: PropsType) => (
  <Flex direction="column" {...props} />
);
