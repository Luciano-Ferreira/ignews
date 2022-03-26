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

  
});