import { render, screen } from '@testing-library/react';
import App from './App';

test('renders App-Header text', () => {
  render(<App />);
  const appHeaderText = screen.getByText(/BitPay Invoice Generator/i);
  expect(appHeaderText).toBeInTheDocument();
});
