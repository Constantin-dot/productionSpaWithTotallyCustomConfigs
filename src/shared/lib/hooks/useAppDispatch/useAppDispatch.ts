import { useDispatch } from 'react-redux';
import { AppDispatchType } from '@/app/providers/StoreProvider';

export const useAppDispatch = () => useDispatch<AppDispatchType>();
