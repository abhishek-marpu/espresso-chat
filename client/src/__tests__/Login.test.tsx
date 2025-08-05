import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '../contexts/AuthContext'
import Login from '../components/Login'

// Mock the auth context
jest.mock('../contexts/AuthContext', () => ({
  useAuth: () => ({
    login: jest.fn(),
    user: null,
    loading: false
  }),
  AuthProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}))

const renderLogin = () => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </BrowserRouter>
  )
}

describe('Login Component', () => {
  it('renders login form', () => {
    renderLogin()
    
    expect(screen.getByText('Espresso Chat')).toBeInTheDocument()
    expect(screen.getByText('Welcome Back')).toBeInTheDocument()
    expect(screen.getByText('Continue with Google')).toBeInTheDocument()
  })

  it('displays Google sign-in button', () => {
    renderLogin()
    
    const googleButton = screen.getByText('Continue with Google')
    expect(googleButton).toBeInTheDocument()
  })

  it('shows terms of service text', () => {
    renderLogin()
    
    expect(screen.getByText(/By signing in, you agree to our Terms of Service/)).toBeInTheDocument()
  })
}) 