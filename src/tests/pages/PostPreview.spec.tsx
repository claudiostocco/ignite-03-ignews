import { render, screen } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';
import { useSession } from 'next-auth/client';

import { getPrismicClient } from '../../services/prismic';
import Post, { getStaticProps } from '../../pages/posts/preview/[slug]';
import { useRouter } from 'next/router';

jest.mock('next/router');
jest.mock('next-auth/client');
jest.mock('../../services/prismic');

const post = { slug: 'my-new-post', title: 'My New Post', content: '<p>post content</p>', updatedAt: '10 de Abril' };

describe('Post page', () => {
    const useSessionMocked = mocked(useSession);
    it('renders correctly', () => {
        useSessionMocked.mockReturnValueOnce([null, false]);

        render(<Post post={post} />);
        expect(screen.getByText('My New Post')).toBeInTheDocument();
        expect(screen.getByText('post content')).toBeInTheDocument();
        expect(screen.getByText('Wanna continue reading!')).toBeInTheDocument();
    });

    it('redirects user to full post when user is subscribed', async () => {
        const useRouterMocked = mocked(useRouter);
        const pushMocked = jest.fn();
        useSessionMocked.mockReturnValueOnce([{activeSubscription: 'activeSubscription'}, false]);

        useRouterMocked.mockReturnValueOnce({ 
            push: pushMocked
        } as any)

        render(<Post post={post} />);
        expect(pushMocked).toHaveBeenCalledWith('/posts/my-new-post')
    });

    it('loads initial data', async () => {
        const getPrismicClientMocked = mocked(getPrismicClient);
        getPrismicClientMocked.mockReturnValueOnce({
            getByUID: jest.fn().mockResolvedValueOnce({
                data: {
                    title: [
                        { type: 'heading', text: 'My New Post' }
                    ],
                    content: [
                        { type: 'paragraph', text: 'Post content' }
                    ],
                },
                last_publication_date: '07-21-2021'
            })
        } as any);
   
        const response = await getStaticProps({ params: { slug: 'my-new-post' } } as any);
        expect(response).toEqual(
            expect.objectContaining({
                props: {
                    post: {
                        slug: 'my-new-post',
                        title: 'My New Post',
                        content: '<p>Post content</p>',
                        updatedAt: 'July 21, 2021'
                        // updatedAt: '21 de julho de 2021'
                    }
                }
            })
        )
    })
});