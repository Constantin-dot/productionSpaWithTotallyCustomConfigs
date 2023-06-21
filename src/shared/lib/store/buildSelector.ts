import { useSelector } from 'react-redux';
import { IStateSchema } from '@/app/providers/StoreProvider';

type SelectorType<T> = (state: IStateSchema) => T;
type ResultType<T> = [() => T, SelectorType<T>];

export function buildSelector<T>(selector: SelectorType<T>): ResultType<T> {
  const useSelectorHook = () => useSelector(selector);

  return [useSelectorHook, selector];
}
