import { fireEvent, render, screen } from '@testing-library/react';
import { signIn, useSession } from 'next-auth/client';
import { mocked } from 'ts-jest/utils';
import { useRouter } from 'next/router';
import { SubscribeButton } from '.';

jest.mock('next-auth/client');
jest.mock('next/router');

describe('SubscribeButton component', () => {
    const useSessionMocked = mocked(useSession);
    it('renders correctly when user is not authenticated', () => {
        useSessionMocked.mockReturnValueOnce([null, false]);
        render(<SubscribeButton />);
        expect(screen.getByText('Subscribe now')).toBeInTheDocument();
    });

    it('redirect users to sign in when not authenticated', () => {
        useSessionMocked.mockReturnValueOnce([null, false]);
        render(<SubscribeButton />);
        const subscribeButton = screen.getByText('Subscribe now');
        fireEvent.click(subscribeButton);
        const signInMocked = mocked(signIn);
        expect(signInMocked).toHaveBeenCalled();
    });

    it('redirect to posts when user already has a subscription', () => {
        useSessionMocked.mockReturnValueOnce([{ user: { email: 'jhon@test.com', name: 'Jhon Doe' }, expires: 'expiries', activeSubscription: 'activeSubscription' }, false]);
        const useRouterMocked = mocked(useRouter);
        const pushMocked = jest.fn();
        useRouterMocked.mockReturnValueOnce({ push: pushMocked } as any);
        render(<SubscribeButton />);
        const subscribeButton = screen.getByText('Subscribe now');
        fireEvent.click(subscribeButton);
        
        expect(pushMocked).toHaveBeenCalledWith('/posts');
    })
})
