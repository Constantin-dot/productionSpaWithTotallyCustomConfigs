import { FC } from 'react';
import { Button } from '@/shared/ui/deprecated/Button';
import { useCounterValue } from '../model/selectors/getCounterValue/getCounterValue';
import { useCounterActions } from '../model/slice/counterSlice';
import { HStack } from '@/shared/ui/Stack';

export const Counter: FC = () => {
  const counterValue = useCounterValue();
  const { add, decrement, increment } = useCounterActions();

  const incrementHandler = () => {
    increment();
  };

  const decrementHandler = () => {
    decrement();
  };

  const addFiveHandler = () => {
    add(5);
  };

  return (
    <HStack justify="start" gap="32" max>
      <h1 data-testid="value-title">{counterValue}</h1>
      <Button data-testid="increment-btn" onClick={incrementHandler}>
        increment
      </Button>
      <Button data-testid="decrement-btn" onClick={decrementHandler}>
        decrement
      </Button>
      <Button onClick={addFiveHandler}>add 5</Button>
    </HStack>
  );
};
