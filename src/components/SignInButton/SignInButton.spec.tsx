import { render, screen } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';
import { useSession } from 'next-auth/react';
import SignInButton from '.';

jest.mock('next-auth/react')

describe('SignInButton component', () => {
  it('renders correctly when user is not authenticated', () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValue({data: null, status: 'unauthenticated'})

    render(
      <SignInButton />
    )
  
    expect(screen.getByText('Sign in with Google Account')).toBeInTheDocument()

  });

  it('renders correctly when user is authenticated', () => {

    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValue(
    {
      data: { 
          expires: '202020', 
          user: { 
            name: 'John Doe', 
            email: 'email.example@test.io', 
            image:'https://avatars.githubusercontent.com/u/46464433?v=4' 
          }
        }, 
        status: 'authenticated'
    })

    render(
      <SignInButton />
    )
  
    expect(screen.getByText('John Doe')).toBeInTheDocument()

  });
})

