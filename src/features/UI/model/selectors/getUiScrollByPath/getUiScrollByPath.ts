import { createSelector } from '@reduxjs/toolkit';
import { IStateSchema } from 'app/providers/StoreProvider';
import { getUiScroll } from '../getUiScroll/getUiScroll';

export const getUiScrollByPath = createSelector(
  getUiScroll,
  (state: IStateSchema, path: string) => path,
  (scroll: Record<string, number>, path: string) => scroll[path] || 0,
);
