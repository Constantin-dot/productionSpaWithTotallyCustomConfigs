import { render, screen } from '@testing-library/react';
import { Button, ButtonVariantEnum } from 'shared/ui/Button/Button';

describe('custom button component', () => {
  test('base component testing', () => {
    render(<Button>TEST</Button>);
    expect(screen.getByText('TEST')).toBeInTheDocument();
  });

  test('testing component with clear variant', () => {
    render(<Button theme={ButtonVariantEnum.CLEAR}>TEST</Button>);
    expect(screen.getByText('TEST')).toHaveClass('clear');
    screen.debug();
  });
});
