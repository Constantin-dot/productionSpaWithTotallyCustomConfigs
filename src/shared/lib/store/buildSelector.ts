import { useSelector } from 'react-redux';
import { IStateSchema } from '@/app/providers/StoreProvider';

type TSelector<T, TArgs extends any[]> = (
  state: IStateSchema,
  ...args: TArgs
) => T;
type THook<T, TArgs extends any[]> = (...args: TArgs) => T;
type TResult<T, TArgs extends any[]> = [THook<T, TArgs>, TSelector<T, TArgs>];

export function buildSelector<T, TArgs extends any[]>(
  selector: TSelector<T, TArgs>,
): TResult<T, TArgs> {
  const useSelectorHook: THook<T, TArgs> = (...args: TArgs) =>
    useSelector((state: IStateSchema) => selector(state, ...args));

  return [useSelectorHook, selector];
}
