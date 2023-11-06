import { ComponentType, lazy } from 'react';
import { AddCommentFormPropsType } from './AddCommentForm';

export const AddCommentFormAsync = lazy<ComponentType<AddCommentFormPropsType>>(
  () => import('./AddCommentForm'),
);
