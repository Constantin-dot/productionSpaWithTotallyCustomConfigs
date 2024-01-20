import { DropdownDirection } from '@/shared/types/ui';
import cls from './popup.module.scss';

export const mapDirectionClass: Record<DropdownDirection, string> = {
  bottomRight: cls.itemBottomRight,
  bottomLeft: cls.itemBottomLeft,
  topRight: cls.itemTopRight,
  topLeft: cls.itemTopLeft,
};
