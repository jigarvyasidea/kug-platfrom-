import { render, screen, fireEvent } from '@testing-library/react';
import Profile from '../pages/profile';

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

// Mock user data
const mockUserData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  role: 'member',
  profile_picture: '/images/avatar.png',
  bio: 'Kotlin enthusiast and Android developer',
  location: 'Bangalore, India',
  github_username: 'johndoe',
  twitter_username: 'johndoe',
  linkedin_url: 'https://linkedin.com/in/johndoe',
  website: 'https://johndoe.dev',
  joined_at: '2023-01-15T00:00:00.000Z',
  kugs: [
    { id: 1, name: 'KUG Bangalore', role: 'member' }
  ],
  contributions: [
    { id: 1, type: 'talk', title: 'Introduction to Kotlin Coroutines', date: '2023-03-10T00:00:00.000Z', points: 50 },
    { id: 2, type: 'blog', title: 'Kotlin Flow vs RxJava', date: '2023-04-15T00:00:00.000Z', points: 30 }
  ],
  badges: [
    { id: 1, name: 'First Contribution', description: 'Made your first contribution', awarded_at: '2023-03-10T00:00:00.000Z' }
  ],
  total_points: 80
};

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(mockUserData),
  })
);

describe('Profile Page', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('renders the profile page with user data', async () => {
    render(<Profile />);
    
    // Check for loading state first
    expect(screen.getByText(/Loading profile/i)).toBeInTheDocument();
    
    // Wait for user data to load
    const userName = await screen.findByText(mockUserData.name);
    expect(userName).toBeInTheDocument();
    
    // Check for user details
    expect(screen.getByText(mockUserData.email)).toBeInTheDocument();
    expect(screen.getByText(mockUserData.bio)).toBeInTheDocument();
    expect(screen.getByText(mockUserData.location)).toBeInTheDocument();
    
    // Check for KUG membership
    expect(screen.getByText(/KUG Bangalore/i)).toBeInTheDocument();
    
    // Check for contributions
    expect(screen.getByText(/Introduction to Kotlin Coroutines/i)).toBeInTheDocument();
    expect(screen.getByText(/Kotlin Flow vs RxJava/i)).toBeInTheDocument();
    
    // Check for badges
    expect(screen.getByText(/First Contribution/i)).toBeInTheDocument();
    
    // Check for total points
    expect(screen.getByText(/80 points/i)).toBeInTheDocument();
  });
  
  it('displays edit profile button for the user', async () => {
    render(<Profile />);
    
    // Wait for user data to load
    await screen.findByText(mockUserData.name);
    
    const editButton = screen.getByRole('button', { name: /Edit Profile/i });
    expect(editButton).toBeInTheDocument();
    
    fireEvent.click(editButton);
    // Since we've mocked the router, we just verify the button exists and can be clicked
    expect(editButton).toBeInTheDocument();
  });
  
  it('displays social media links', async () => {
    render(<Profile />);
    
    // Wait for user data to load
    await screen.findByText(mockUserData.name);
    
    // Check for social media links
    const githubLink = screen.getByRole('link', { name: /GitHub/i });
    const twitterLink = screen.getByRole('link', { name: /Twitter/i });
    const linkedinLink = screen.getByRole('link', { name: /LinkedIn/i });
    
    expect(githubLink).toBeInTheDocument();
    expect(twitterLink).toBeInTheDocument();
    expect(linkedinLink).toBeInTheDocument();
    
    expect(githubLink.getAttribute('href')).toContain(mockUserData.github_username);
    expect(twitterLink.getAttribute('href')).toContain(mockUserData.twitter_username);
    expect(linkedinLink.getAttribute('href')).toContain('linkedin.com');
  });
  
  it('displays contribution statistics', async () => {
    render(<Profile />);
    
    // Wait for user data to load
    await screen.findByText(mockUserData.name);
    
    // Check for contribution statistics
    expect(screen.getByText(/Total Contributions: 2/i)).toBeInTheDocument();
    expect(screen.getByText(/Talks: 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Blogs: 1/i)).toBeInTheDocument();
  });
});
