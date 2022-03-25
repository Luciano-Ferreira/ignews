import { render, screen } from '@testing-library/react';
import { ActiveLink } from '../../components/ActiveLink';

jest.mock('next/router', () => {
  return{
    useRouter() {
      return {
        asPath: '/'
      }
    }
  }
});

describe('ActiveLink component', () => {
  it('should be able active link renders correctly', () => {
    render(
      <ActiveLink
        href='/'
        activeClassName='active'
      >
        <a>Home</a>
      </ActiveLink>
    )
  
    expect(screen.getByText('Home')).toBeInTheDocument()
  });
  
  it('should be able active link is receiving active class', () => {
    render(
      <ActiveLink
        href='/'
        activeClassName='active'
      >
        <a>Home</a>
      </ActiveLink>
    )
  
    expect(screen.getByText('Home')).toHaveClass('active')
  });
})

