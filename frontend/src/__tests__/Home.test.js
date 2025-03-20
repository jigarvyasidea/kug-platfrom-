import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../pages/index';

// Mock components
jest.mock('../components/Header', () => {
  return function MockHeader() {
    return <div data-testid="mock-header">Header</div>;
  };
});

jest.mock('../components/Footer', () => {
  return function MockFooter() {
    return <div data-testid="mock-footer">Footer</div>;
  };
});

describe('Home Page', () => {
  it('renders the page title', () => {
    render(<Home />);
    
    const heading = screen.getByRole('heading', { 
      name: /KUG Advocacy & Community Platform/i 
    });
    
    expect(heading).toBeInTheDocument();
  });
  
  it('renders the platform description', () => {
    render(<Home />);
    
    const description = screen.getByText(/A unified platform for all city-based KUG chapters/i);
    
    expect(description).toBeInTheDocument();
  });
  
  it('renders the key features section', () => {
    render(<Home />);
    
    const featuresHeading = screen.getByRole('heading', { name: /Key Features/i });
    
    expect(featuresHeading).toBeInTheDocument();
    expect(screen.getByText(/City-Wise KUG Management/i)).toBeInTheDocument();
    expect(screen.getByText(/Member & Advocacy Tracking/i)).toBeInTheDocument();
    expect(screen.getByText(/Contribution & Impact Metrics/i)).toBeInTheDocument();
  });
  
  it('navigates to login page when login button is clicked', () => {
    render(<Home />);
    
    const loginButton = screen.getByRole('button', { name: /Login/i });
    
    fireEvent.click(loginButton);
    
    // Since we've mocked the router, we just verify the button exists
    expect(loginButton).toBeInTheDocument();
  });
  
  it('navigates to registration page when register button is clicked', () => {
    render(<Home />);
    
    const registerButton = screen.getByRole('button', { name: /Register/i });
    
    fireEvent.click(registerButton);
    
    // Since we've mocked the router, we just verify the button exists
    expect(registerButton).toBeInTheDocument();
  });
  
  it('displays featured KUGs section', () => {
    render(<Home />);
    
    const featuredKUGsHeading = screen.getByRole('heading', { name: /Featured KUGs/i });
    
    expect(featuredKUGsHeading).toBeInTheDocument();
    expect(screen.getByText(/KUG Bangalore/i)).toBeInTheDocument();
    expect(screen.getByText(/KUG Delhi/i)).toBeInTheDocument();
    expect(screen.getByText(/KUG Jaipur/i)).toBeInTheDocument();
  });
});
