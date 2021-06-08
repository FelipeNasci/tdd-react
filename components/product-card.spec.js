import ProductCard from './product-card';
import { screen, render, fireEvent } from '@testing-library/react';

const product = {
  title: 'Clock',
  price: '80.00',
  image: 'https://images-na.ssl-images-amazon.com/images/I/618MEYCaUQL._AC_SX522_.jpg',
};

const addToCart = jest.fn();

const makeSut = () => {
  render(<ProductCard addToCart={addToCart} product={product} />);
};

describe('ProductCard', () => {
  it('should render ProductCard component', () => {
    makeSut();
    expect(screen.getByTestId('product-card')).toBeInTheDocument();
  });

  it('should display proper content', () => {
    makeSut();

    expect(screen.getByText(product.title)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(product.price, 'i'))).toBeInTheDocument();
    expect(screen.getByTestId('image')).toHaveStyle({
      backgroundImage: product.image,
    });
  });

  it('should call props.addToCart() when button gets clicked', async () => {
    makeSut();

    const button = screen.getByRole('button');
    await fireEvent.click(button);

    expect(addToCart).toHaveBeenCalledTimes(1);
    expect(addToCart).toHaveBeenCalledWith(product);
  });
});
