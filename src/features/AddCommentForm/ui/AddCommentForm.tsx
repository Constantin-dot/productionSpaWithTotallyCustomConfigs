import { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersListType } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { getAddCommentFormError, getAddCommentFormText } from '../model/selectors/addCommentFormSelectors';
import { sendComment } from '../model/services/sendComment/sendComment';
import { addCommentFormActions, addCommentFormReducer } from '../model/slices/addCommentFormSlice';
import cls from './AddCommentForm.module.scss';

type PropsType = {className?: string,};

const reducers: ReducersListType = {
  addCommentForm: addCommentFormReducer,
};

const AddCommentForm: FC<PropsType> = (props) => {
  const { className } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const text = useSelector(getAddCommentFormText);
  const error = useSelector(getAddCommentFormError);

  const onCommentTextChange = useCallback((value: string | number) => {
    dispatch(addCommentFormActions.setText(value.toString()));
  }, [dispatch]);

  const onSendComment = useCallback(() => {
    dispatch(sendComment());
  }, [dispatch]);

  return (
    <DynamicModuleLoader reducers={reducers}>
      <div className={classNames(cls.AddCommentForm, {}, [className])}>
        <Input
          placeholder={t('enterComment')}
          value={text}
          onChange={onCommentTextChange}
          wrapperClassName={cls.input}
        />
        <Button onClick={onSendComment}>
          {t('sendComment')}
        </Button>
      </div>
    </DynamicModuleLoader>
  );
};

export default AddCommentForm;
