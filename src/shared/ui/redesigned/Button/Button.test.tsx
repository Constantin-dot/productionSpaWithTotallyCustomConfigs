import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('custom button component', () => {
  test('base component testing', () => {
    render(<Button>TEST</Button>);
    expect(screen.getByText('TEST')).toBeInTheDocument();
  });

  test('testing component with clear variant', () => {
    render(<Button variant="clear">TEST</Button>);
    expect(screen.getByText('TEST')).toHaveClass('clear');
    // screen.debug();
  });
});
