import { render, screen } from '@testing-library/react';
import { stripe }  from '../../services/stripe';
import { mocked } from 'jest-mock';

import { useSession } from 'next-auth/react';
import Home, { getStaticProps } from '../../pages';

jest.mock('next/router');
jest.mock('next-auth/react');

jest.mock('../../services/stripe');


const useSessionMocked = mocked(useSession);
useSessionMocked.mockReturnValueOnce({ data: null, status: 'unauthenticated' })

describe('Home page', () => {
  it('render correctly', () => {
    render(<Home product={{ priceId: 'fake-price-id', amount: 'R$ 50,00' }} />)

    expect(screen.getByText('for R$ 50,00 months')).toBeInTheDocument()
  });

  it('load initial data', async () => {
    const retrieveStripePriceMocked = mocked(stripe.prices.retrieve)

    retrieveStripePriceMocked.mockResolvedValueOnce({
      id: 'fake-price-id',
      unit_amount: 1000
    } as any)

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          product: {
            priceId: 'fake-price-id',
            amount: '$10.00'
          }
        }
      })
    )
  });
});