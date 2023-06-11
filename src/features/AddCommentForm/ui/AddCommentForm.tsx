import { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersListType } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button } from '@/shared/ui/Button/Button';
import { Input } from '@/shared/ui/Input/Input';
import { HStack } from '@/shared/ui/Stack';
import { getAddCommentFormText } from '../model/selectors/addCommentFormSelectors';
import { addCommentFormActions, addCommentFormReducer } from '../model/slices/addCommentFormSlice';
import cls from './AddCommentForm.module.scss';

export type AddCommentFormPropsType = {
  className?: string,
  onSendComment: (text: string) => void,
};

const reducers: ReducersListType = {
  addCommentForm: addCommentFormReducer,
};

const AddCommentForm: FC<AddCommentFormPropsType> = (props) => {
  const {
    className,
    onSendComment,
  } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const text = useSelector(getAddCommentFormText);

  const onCommentTextChange = useCallback((value: string | number) => {
    dispatch(addCommentFormActions.setText(value.toString()));
  }, [dispatch]);

  const onSendHandler = useCallback(() => {
    onSendComment(text ?? '');
    onCommentTextChange('');
  }, [text, onSendComment, onCommentTextChange]);

  return (
    <DynamicModuleLoader reducers={reducers}>
      <HStack justify="between" max className={classNames(cls.AddCommentForm, {}, [className])}>
        <Input
          placeholder={t('enterComment') ?? ''}
          value={text}
          onChange={onCommentTextChange}
          wrapperClassName={cls.input}
        />
        <Button onClick={onSendHandler}>
          {t('sendComment')}
        </Button>
      </HStack>
    </DynamicModuleLoader>
  );
};

export default AddCommentForm;
