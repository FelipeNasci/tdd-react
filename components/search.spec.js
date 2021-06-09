import Search from './search.js';
import { render, screen, fireEvent } from '@testing-library/react';

const doSearch = jest.fn();

describe('Search', () => {
  it('should render a form', () => {
    render(<Search doSearch={doSearch} />);
    const form = screen.getByRole('form');
    expect(form).toBeInTheDocument();
  });

  it('should call props.doSearch() when form is submitted', async () => {
    render(<Search doSearch={doSearch} />);
    const form = screen.getByRole('form');
    await fireEvent.submit(form);
    expect(doSearch).toHaveBeenCalledTimes(1);
  });
});
