import { FC, useEffect, useState } from 'react';
import { Button } from '@/shared/ui/Button';

// компонет для тестирования
export const BugButton: FC = () => {
  const [isError, setIsError] = useState(false);

  const throwErrorHandler = () => setIsError(true);

  useEffect(() => {
    if (isError) throw new Error();
  }, [isError]);

  return <Button onClick={throwErrorHandler}>new error</Button>;
};
