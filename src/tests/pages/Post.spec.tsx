import { render, screen } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';
import { getSession } from 'next-auth/client';

import { getPrismicClient } from '../../services/prismic';
import Post, { getServerSideProps } from '../../pages/posts/[slug]';

jest.mock('next-auth/client');
jest.mock('../../services/prismic');

const post = { slug: 'my-new-post', title: 'My New Post', content: '<p>post content</p>', updatedAt: '10 de Abril' };

describe('Post page', () => {
    it('renders correctly', () => {
        render(<Post post={post} />);
        expect(screen.getByText('My New Post')).toBeInTheDocument();
        expect(screen.getByText('post content')).toBeInTheDocument();
    });

    it('redirects user if no subscription is found', async () => {
        const getSessionMocked = mocked(getSession);
        getSessionMocked.mockResolvedValueOnce(null);

        const response = await getServerSideProps({ params: { slug: 'my-new-post' } } as any);
        expect(response).toEqual(
            expect.objectContaining({
                redirect: expect.objectContaining(
                    {
                        destination: '/posts',
                    }
                )
            })
        )
    });

    it('loads initial data', async () => {
        const getSessionMocked = mocked(getSession);
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
        getSessionMocked.mockResolvedValueOnce({ activeSubscription: 'activeSubscription' });

        const response = await getServerSideProps({ params: { slug: 'my-new-post' } } as any);
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