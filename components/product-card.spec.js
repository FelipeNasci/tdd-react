import ProductCard from './product-card';
import { screen, render } from '@testing-library/react';

const product = {
  title: 'Clock',
  price: '80.00',
  image: 'https://images-na.ssl-images-amazon.com/images/I/618MEYCaUQL._AC_SX522_.jpg'
}

describe('ProductCard', () => {
  it('should render ProductCard component', () => {
    render(<ProductCard  product={product}/>);

    expect(screen.getByTestId('product-card')).toBeInTheDocument();
  });
  it('should display proper content', () => {
    render(<ProductCard  product={product}/>);

    expect(screen.getByText(product.title)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(product.price, 'i'))).toBeInTheDocument();
    expect(screen.getByTestId('image')).toHaveStyle({
      backgroundImage: product.image
    });
  });
});
