import CartItem from './cart-item';
import { screen, render, fireEvent } from '@testing-library/react';

const mockProduct = {
  title: 'Clock',
  price: '80.00',
  image: 'https://images-na.ssl-images-amazon.com/images/I/618MEYCaUQL._AC_SX522_.jpg',
};

const makeSut = () => {
  render(<CartItem product={mockProduct} />);
};

describe('Cart', () => {
  it('Should render component', () => {
    makeSut();
    const component = screen.getByTestId('cart-item-component');
    expect(component).toBeInTheDocument();
  });

  it('Should display proper content', () => {
    makeSut();

    const title = screen.getByTestId('cart-item-title');
    const price = screen.getByTestId('cart-item-price');
    const image = screen.getByRole('img');

    expect(title).toBeInTheDocument(mockProduct.title);
    expect(price).toBeInTheDocument(new RegExp(mockProduct.price, 'i'));
    expect(image).toHaveProperty('src', mockProduct.image);
    expect(image).toHaveProperty('alt', mockProduct.title);
  });

  describe('Buttons', () => {
    it('Should display 1 as initial quantity', () => {
      makeSut();
      const quantity = screen.getByTestId('cart-item-quantity');
      expect(quantity.textContent).toEqual('1');
    });

    it('Should increase quantity by 1 when add() button is clicked', async () => {
      makeSut();
      const quantity = screen.getByTestId('cart-item-quantity');
      const [increaseButton] = screen.getAllByRole('button');
      await fireEvent.click(increaseButton);
      expect(quantity.textContent).toEqual('2');
    });

    it('Should decrease quantity by 1 when less() button is clicked', async () => {
      makeSut();
      const quantity = screen.getByTestId('cart-item-quantity');
      const [_, decreaseButton] = screen.getAllByRole('button');
      await fireEvent.click(decreaseButton);
      expect(quantity.textContent).toEqual('0');
    });

    it('Should not go below zero in the quantity', async () => {
      makeSut();
      const quantity = screen.getByTestId('cart-item-quantity');
      const [_, decreaseButton] = screen.getAllByRole('button');
      await fireEvent.click(decreaseButton);
      await fireEvent.click(decreaseButton);
      expect(quantity.textContent).toEqual('0');
    });
  });
});
