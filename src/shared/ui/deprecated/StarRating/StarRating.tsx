import { memo, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './StarRating.module.scss';
import { Icon } from '../../Icon';
import StarIcon from '../../../assets/icons/star.svg';

type PropsType = {
  className?: string;
  onSelect?: (starsCount: number) => void;
  selectedStars?: number;
  size?: number;
};

const stars = [1, 2, 3, 4, 5];

export const StarRating = memo((props: PropsType) => {
  const { className, onSelect, selectedStars = 0, size = 30 } = props;

  const [currentStarCount, setCurrentStarCount] = useState(selectedStars);
  const [isSelected, setIsSelected] = useState(Boolean(selectedStars));

  const onHoverHandler = (starsCount: number) => () => {
    if (!isSelected) {
      setCurrentStarCount(starsCount);
    }
  };

  const onLeaveHandler = () => {
    if (!isSelected) {
      setCurrentStarCount(0);
    }
  };

  const onClickHandler = (starsCount: number) => () => {
    if (!isSelected) {
      onSelect?.(starsCount);
      setCurrentStarCount(starsCount);
      setIsSelected(true);
    }
  };

  return (
    <div className={classNames(cls.StarRating, {}, [className])}>
      {stars.map((starNumber) => (
        <Icon
          className={classNames(cls.starIcon, { [cls.selected]: isSelected }, [
            currentStarCount >= starNumber ? cls.hovered : cls.normal,
          ])}
          Svg={StarIcon}
          key={starNumber}
          width={size}
          height={size}
          onMouseLeave={onLeaveHandler}
          onMouseEnter={onHoverHandler(starNumber)}
          onClick={onClickHandler(starNumber)}
          data-testid={`StarRating.${starNumber}`}
          data-selected={currentStarCount >= starNumber}
        />
      ))}
    </div>
  );
});
