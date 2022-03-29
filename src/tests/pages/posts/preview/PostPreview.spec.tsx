import { render, screen } from '@testing-library/react';
import { getPrismicClient } from '../../../../services/prismic';
import { mocked } from 'jest-mock';

import PostPreview, { getStaticProps } from '../../../../pages/posts/preview/[slug]';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const post = { 
    slug: 'my-new-post',
    title: 'My New Post',
    content: '<p>Post content</p>',
    updatedAt: '10 de Abril'
  };


jest.mock('next-auth/react');
jest.mock('next/router');
jest.mock('../../../../services/prismic');

describe('posts/preview/[slug] page', () => {
  it("renders correctly", () => {
    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce({
      activeSubscription: 'fake-active-subscription'
    } as any)

    const { getByText } = render(<PostPreview post={post} />);

    expect(getByText("My New Post")).toBeInTheDocument();
    expect(getByText("Post content")).toBeInTheDocument();
    expect(getByText("Wanna continue reading?")).toBeInTheDocument();
  });

  it("redirects user to full post when user is subscribed", () => {
    const useSessionMocked = mocked(useSession);
    const useRouterMocked = mocked(useRouter);

    useSessionMocked.mockReturnValueOnce({ 
      data: {
        activeSubscription: 'fake-active-subscription'
      }
    } as any);

    const pushMock = jest.fn()

    useRouterMocked.mockReturnValueOnce({ push: pushMock } as any)

    render(<PostPreview post={post} />);

    expect(pushMock).toHaveBeenCalledWith('/posts/my-new-post')
  });

  it('loads initial data', async () => {
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

    const response = await getStaticProps({
      params: { slug: 'my-new-post' }
    });

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