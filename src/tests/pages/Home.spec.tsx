import { render, screen } from '@testing-library/react';
import { mocked } from 'jest-mock';

import { useSession } from 'next-auth/react';
import Home from '../../pages';

jest.mock('next/router');
jest.mock('next-auth/react');


const useSessionMocked = mocked(useSession);
useSessionMocked.mockReturnValueOnce({ data: null, status: 'unauthenticated' })


describe('Home page', () => {
  it('render correctly', () => {
    render(<Home product={{ priceId: 'fake-price-id', amount: 'R$ 50,00' }} />)

    expect(screen.getByText('for R$ 50,00 months')).toBeInTheDocument()
  })
})