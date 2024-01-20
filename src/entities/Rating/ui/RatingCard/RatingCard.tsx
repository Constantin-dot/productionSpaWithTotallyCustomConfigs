import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserView, MobileView } from 'react-device-detect';
import cls from './RatingCard.module.scss';
import { Card } from '@/shared/ui/deprecated/Card';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import {
  Text,
  TextSizeEnum,
  TextVariantEnum,
} from '@/shared/ui/deprecated/Text';
import { StarRating } from '@/shared/ui/deprecated/StarRating';
import { Modal } from '@/shared/ui/deprecated/Modal';
import { Input, InputVariantEnum } from '@/shared/ui/deprecated/Input';
import { Button, ButtonVariantEnum } from '@/shared/ui/deprecated/Button';
import { Drawer } from '@/shared/ui/deprecated/Drawer';

type PropsType = {
  className?: string;
  title?: string;
  feedbackTitle?: string;
  hasFeedback?: boolean;
  onCancel?: (starsCount: number) => void;
  onAccept?: (starsCount: number, feedback?: string) => void;
  rate?: number;
};

export const RatingCard = memo((props: PropsType) => {
  const {
    className,
    title,
    feedbackTitle,
    hasFeedback,
    onCancel,
    onAccept,
    rate = 0,
  } = props;
  const { t } = useTranslation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [starsCount, setStarsCount] = useState(rate);
  const [feedback, setFeedback] = useState<string | number>('');

  const onSelectStarsHandler = useCallback(
    (selectedStarsCount: number) => {
      setStarsCount(selectedStarsCount);
      if (hasFeedback) {
        setIsModalOpen(true);
      } else {
        onAccept?.(selectedStarsCount);
      }
    },
    [hasFeedback, onAccept],
  );

  const onCloseHandler = useCallback(() => {
    setIsModalOpen(false);
    onCancel?.(starsCount);
  }, [onCancel, starsCount]);

  const acceptHandler = useCallback(() => {
    setIsModalOpen(false);
    onAccept?.(starsCount, feedback.toString());
  }, [feedback, onAccept, starsCount]);

  const modalContent = (
    <>
      <Text
        title={feedbackTitle}
        variant={TextVariantEnum.INVERTED}
        size={TextSizeEnum.L}
      />
      <Input
        placeholder={t('yourFeedback') ?? ''}
        variant={InputVariantEnum.INVERTED}
        className={cls.input}
        value={feedback}
        onChange={setFeedback}
        data-testid="RatingCard.Input"
      />
    </>
  );

  return (
    <Card className={className} max data-testid="RatingCard">
      <VStack align="center" gap="8" max>
        <Text title={starsCount ? t('thanks') : title} />
        <StarRating
          selectedStars={starsCount}
          size={40}
          onSelect={onSelectStarsHandler}
        />
        <BrowserView>
          <Modal isOpen={isModalOpen} onClose={onCloseHandler} isLazy>
            <VStack max gap="32">
              {modalContent}
              <HStack max gap="16" justify="end">
                <Button
                  variant={ButtonVariantEnum.OUTLINE_RED}
                  onClick={onCloseHandler}
                  data-testid="RatingCard.Close"
                >
                  {t('close')}
                </Button>
                <Button
                  variant={ButtonVariantEnum.OUTLIN_INVERTED}
                  onClick={acceptHandler}
                  data-testid="RatingCard.Send"
                >
                  {t('send')}
                </Button>
              </HStack>
            </VStack>
          </Modal>
        </BrowserView>
        <MobileView>
          <Drawer isOpen={isModalOpen} onClose={onCloseHandler}>
            <VStack max gap="32" align="start">
              {modalContent}
              <Button
                variant={ButtonVariantEnum.OUTLINE_RED}
                onClick={onCloseHandler}
                className={cls.btn}
              >
                {t('close')}
              </Button>
              <Button
                variant={ButtonVariantEnum.OUTLIN_INVERTED}
                onClick={acceptHandler}
                className={cls.btn}
              >
                {t('send')}
              </Button>
            </VStack>
          </Drawer>
        </MobileView>
      </VStack>
    </Card>
  );
});
