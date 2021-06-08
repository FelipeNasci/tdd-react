import ProductCard from './product-card';
import { screen, render } from '@testing-library/react';

describe('ProductCard', () => {
  it('should render ProductCard component', () => {
    render(<ProductCard />);

    expect(screen.getByTestId('product-card')).toBeInTheDocument();
  });
});
