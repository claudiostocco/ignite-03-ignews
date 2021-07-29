import { render, screen} from '@testing-library/react';
import { mocked } from 'ts-jest/utils';

import { stripe } from '../../services/stripe'
import Home, { getStaticProps } from '../../pages';

jest.mock('../../services/stripe');
jest.mock('next/router');
jest.mock('next-auth/client', () => {
    return {
        useSession() { return [null, false] }
    }
});

describe('Home page', () => {
    it('renders correctly', () => {
        render(<Home product={{ priceId: '123', amount: 10.43 }} />);
        expect(screen.getByText(/10.43/)).toBeInTheDocument();
    });

    it('loads initial data', async () => {
        const stripePricesRetrieveMocked = mocked(stripe.prices.retrieve);
        stripePricesRetrieveMocked.mockResolvedValueOnce({
            id: 'fake-price-id',
            unit_amount: 1000
        } as any);

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