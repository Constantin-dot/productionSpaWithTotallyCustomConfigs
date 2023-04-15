import { useCallback, useMemo, useState } from 'react';

interface IUseHoverBind {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

type UseHoverResultType = [boolean, IUseHoverBind];

export const useHover = (): UseHoverResultType => {
  const [isHover, setIsHover] = useState(false);

  const onMouseEnter = useCallback(() => {
    setIsHover(true);
  }, []);

  const onMouseLeave = useCallback(() => {
    setIsHover(false);
  }, []);

  return useMemo(() => [isHover, { onMouseEnter, onMouseLeave }], [
    isHover, onMouseEnter, onMouseLeave,
  ]);
};
