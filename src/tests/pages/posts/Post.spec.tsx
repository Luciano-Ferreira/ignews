import { render, screen } from '@testing-library/react';
import { getPrismicClient } from '../../../services/prismic';
import { mocked } from 'jest-mock';


import Post, { getServerSideProps } from '../../../pages/posts/[slug]';
import { getSession } from 'next-auth/react';

const post = { 
    slug: 'my-new-post',
    title: 'My new post',
    content: '<p>Post excerpt</p>',
    updatedAt: '10 de Abril'
  };


jest.mock('next-auth/react');
jest.mock('../../../services/prismic');

describe('posts[slug] page', () => {
  it('render correctly', () => {
    render(<Post post={post} />)

    expect(screen.getByText('My new post')).toBeInTheDocument();
    expect(screen.getByText('Post excerpt')).toBeInTheDocument();

  });

  it('redirects user if no subscription found', async () => {
    const getSessionMocked = mocked(getSession);


    getSessionMocked.mockResolvedValueOnce(null);
    
    
    const response = await getServerSideProps({
      req: {
        cookies: {},
      },
      params: { slug: 'my-new-post' }
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        redirect: expect.objectContaining({
          destination: '/',
        })
      })
    )
  })

  it('loads initial data', async () => {
    const getSessionMocked = mocked(getSession);
    const getPrismicClientMocked = mocked(getPrismicClient);


    getPrismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: [
            { type: 'heading', text: 'My new post' }
          ],
          content: [
            { type: 'paragraph', text: 'Post excerpt' }
          ]
        },
        last_publication_date: '04-01-2021'
      })
    } as any);

    getSessionMocked.mockResolvedValueOnce({
      data: {},
      activeSubscription: 'fake-active-subscription'
    } as any);

    const response = await getServerSideProps({
      params: { slug: 'my-new-post' }
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: 'my-new-post',
            title: 'My new post',
            content: '<p>Post excerpt</p>',
            updatedAt: '01 de abril de 2021'
          }
        }
      })
    )
  })
});