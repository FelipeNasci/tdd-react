import Search from './search.js';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
const doSearch = jest.fn();

const makeSut = ({ doSearch }) => {
  render(<Search doSearch={doSearch} />);
};

describe('Search', () => {
  it('should render a form', () => {
    makeSut({ doSearch });
    const form = screen.getByRole('form');
    expect(form).toBeInTheDocument();
  });

  it('should render a input type equals search', () => {
    makeSut({ doSearch });
    const input = screen.getByRole('searchbox');
    expect(input).toHaveProperty('type', 'search');
  });

  it('should render a input placeholder equals Search', () => {
    makeSut({ doSearch });
    const input = screen.getByRole('searchbox');
    expect(input).toHaveProperty('placeholder', 'Search');
  });

  it('should call props.doSearch() when form is submitted', async () => {
    makeSut({ doSearch });
    const form = screen.getByRole('form');
    await fireEvent.submit(form);
    expect(doSearch).toHaveBeenCalledTimes(1);
  });

  it('should call props.doSearch() with the user input', async () => {
    makeSut({ doSearch });
    const form = screen.getByRole('form');
    const input = screen.getByRole('searchbox');
    const inputText = 'any_text';

    await userEvent.type(input, inputText);
    await fireEvent.submit(form);

    expect(doSearch).toHaveBeenCalledWith(inputText);
  });
});
