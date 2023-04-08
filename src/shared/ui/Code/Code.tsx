import { memo, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import CopyIcon from 'shared/assets/icons/copy.svg';
import { Button, ButtonVariantEnum } from '../Button/Button';
import cls from './Code.module.scss';

type PropsType = {
  className?: string,
  text: string,
};

export const Code = memo((props: PropsType) => {
  const {
    className,
    text,
  } = props;

  const onCopyHandler = useCallback(() => {
    navigator.clipboard.writeText(text);
  }, [text]);

  return (
    <pre className={classNames(cls.Code, {}, [className])}>
      <Button className={cls.copyBtn} variant={ButtonVariantEnum.CLEAR} onClick={onCopyHandler}>
        <CopyIcon className={cls.copyIcon} />
      </Button>
      <code>
        {text}
      </code>
    </pre>
  );
});
