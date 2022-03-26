import { render, screen } from '@testing-library/react';
import { getPrismicClient } from '../../services/prismic';
import { mocked } from 'jest-mock';


import Posts, { getStaticProps } from '../../pages/posts';

const posts = [
  { 
    slug: 'my-new-post',
    title: 'My new post',
    excerpt: 'Post excerpt',
    updatedAt: '10 de Abril'
  }
];



jest.mock('../../services/prismic');

describe('Posts page', () => {
  it('render correctly', () => {
    render(<Posts posts={posts} />)

    expect(screen.getByText('My new post')).toBeInTheDocument()
  });

  it('loads initial data', async () => {
    const getPrismicClientMocked = mocked(getPrismicClient);

    getPrismicClientMocked.mockReturnValueOnce({
      query: jest.fn().mockResolvedValueOnce({
        results: [
          {
            uid: 'my-new-post',
            data: {
              title: [
                { type: 'heading', text: 'My new post' }
              ],
              content: [
                { type: 'paragraph', text: 'Post excerpt' }
              ]
            },
            last_publication_date: '04-01-2021'
          }
        ]
      })
    } as any)


    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        prop: {
          posts: [{
            slug: 'my-new-post',
            title: 'My new post',
            excerpt: 'Post excerpt',
            updatedAt: '01 de Abril de 2021'
          }]
        }
      })
    )
  })

  
});