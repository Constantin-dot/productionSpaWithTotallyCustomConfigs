import { FC, lazy } from 'react';
import { LoginFormPropsType } from './LoginForm';

export const LoginFormAsync = lazy<FC<LoginFormPropsType>>(() => import('./LoginForm'));
