import { createSelector } from '@reduxjs/toolkit';
import { ICounterState } from '../../types/counterSchema';
import { getCounter } from '../getCounter/getCounter';

export const getCounterValue = createSelector(
  getCounter,
  (counter: ICounterState) => counter.value,
);
