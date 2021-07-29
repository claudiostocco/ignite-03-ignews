import { render, screen } from '@testing-library/react';
import { useSession } from 'next-auth/client';
import { mocked } from 'ts-jest/utils';
import { SignInButton } from '.';

jest.mock('next-auth/client');            

describe('SignInButton component', () => {
    const useSessionMocked = mocked(useSession);
    it('renders correctly when user is not authenticated', () => {
        useSessionMocked.mockReturnValueOnce([null, false]);
        render(
            <SignInButton />
        );
        expect(screen.getByText('Sign in with GitHub')).toBeInTheDocument();
    });

    it('renders correctly when user is authenticated', () => {
        useSessionMocked.mockReturnValueOnce([{ user: { email: 'jhon@test.com', name: 'Jhon Doe' }, expires: 'expiries' }, false]);
        render(
            <SignInButton />
        );
        expect(screen.getByText('Jhon Doe')).toBeInTheDocument();
    });
})
