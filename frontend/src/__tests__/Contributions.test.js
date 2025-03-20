import { render, screen, fireEvent } from '@testing-library/react';
import Contributions from '../pages/contributions';

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

// Mock contributions data
const mockContributions = [
  { 
    id: 1, 
    type: 'talk', 
    title: 'Introduction to Kotlin Coroutines', 
    description: 'A deep dive into Kotlin Coroutines',
    date: '2023-03-10T00:00:00.000Z', 
    points: 50,
    status: 'approved',
    user: { id: 1, name: 'John Doe', profile_picture: '/images/avatar.png' },
    kug: { id: 1, name: 'KUG Bangalore' }
  },
  { 
    id: 2, 
    type: 'blog', 
    title: 'Kotlin Flow vs RxJava', 
    description: 'Comparing Kotlin Flow with RxJava',
    date: '2023-04-15T00:00:00.000Z', 
    points: 30,
    status: 'approved',
    user: { id: 1, name: 'John Doe', profile_picture: '/images/avatar.png' },
    kug: { id: 1, name: 'KUG Bangalore' }
  },
  { 
    id: 3, 
    type: 'code', 
    title: 'Kotlin Multiplatform Library', 
    description: 'A shared library for Android and iOS',
    date: '2023-05-20T00:00:00.000Z', 
    points: 40,
    status: 'pending',
    user: { id: 2, name: 'Jane Smith', profile_picture: '/images/avatar2.png' },
    kug: { id: 2, name: 'KUG Delhi' }
  }
];

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(mockContributions),
  })
);

describe('Contributions Page', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('renders the contributions page with data', async () => {
    render(<Contributions />);
    
    // Check for loading state first
    expect(screen.getByText(/Loading contributions/i)).toBeInTheDocument();
    
    // Wait for contributions data to load
    const firstContribution = await screen.findByText(mockContributions[0].title);
    expect(firstContribution).toBeInTheDocument();
    
    // Check for other contributions
    expect(screen.getByText(mockContributions[1].title)).toBeInTheDocument();
    expect(screen.getByText(mockContributions[2].title)).toBeInTheDocument();
  });
  
  it('displays contribution details correctly', async () => {
    render(<Contributions />);
    
    // Wait for contributions data to load
    await screen.findByText(mockContributions[0].title);
    
    // Check for contribution details
    expect(screen.getByText(mockContributions[0].description)).toBeInTheDocument();
    expect(screen.getByText(mockContributions[0].user.name)).toBeInTheDocument();
    expect(screen.getByText(mockContributions[0].kug.name)).toBeInTheDocument();
    expect(screen.getByText(`${mockContributions[0].points} points`)).toBeInTheDocument();
  });
  
  it('allows filtering contributions by type', async () => {
    render(<Contributions />);
    
    // Wait for contributions data to load
    await screen.findByText(mockContributions[0].title);
    
    // Find filter buttons
    const talkFilterButton = screen.getByRole('button', { name: /Talks/i });
    const blogFilterButton = screen.getByRole('button', { name: /Blogs/i });
    const codeFilterButton = screen.getByRole('button', { name: /Code/i });
    
    // Click on talks filter
    fireEvent.click(talkFilterButton);
    
    // Should show only talk contributions
    expect(screen.getByText(mockContributions[0].title)).toBeInTheDocument();
    expect(screen.queryByText(mockContributions[1].title)).not.toBeInTheDocument();
    expect(screen.queryByText(mockContributions[2].title)).not.toBeInTheDocument();
    
    // Click on blogs filter
    fireEvent.click(blogFilterButton);
    
    // Should show only blog contributions
    expect(screen.queryByText(mockContributions[0].title)).not.toBeInTheDocument();
    expect(screen.getByText(mockContributions[1].title)).toBeInTheDocument();
    expect(screen.queryByText(mockContributions[2].title)).not.toBeInTheDocument();
    
    // Click on code filter
    fireEvent.click(codeFilterButton);
    
    // Should show only code contributions
    expect(screen.queryByText(mockContributions[0].title)).not.toBeInTheDocument();
    expect(screen.queryByText(mockContributions[1].title)).not.toBeInTheDocument();
    expect(screen.getByText(mockContributions[2].title)).toBeInTheDocument();
  });
  
  it('allows filtering contributions by status', async () => {
    render(<Contributions />);
    
    // Wait for contributions data to load
    await screen.findByText(mockContributions[0].title);
    
    // Find status filter buttons
    const approvedFilterButton = screen.getByRole('button', { name: /Approved/i });
    const pendingFilterButton = screen.getByRole('button', { name: /Pending/i });
    
    // Click on approved filter
    fireEvent.click(approvedFilterButton);
    
    // Should show only approved contributions
    expect(screen.getByText(mockContributions[0].title)).toBeInTheDocument();
    expect(screen.getByText(mockContributions[1].title)).toBeInTheDocument();
    expect(screen.queryByText(mockContributions[2].title)).not.toBeInTheDocument();
    
    // Click on pending filter
    fireEvent.click(pendingFilterButton);
    
    // Should show only pending contributions
    expect(screen.queryByText(mockContributions[0].title)).not.toBeInTheDocument();
    expect(screen.queryByText(mockContributions[1].title)).not.toBeInTheDocument();
    expect(screen.getByText(mockContributions[2].title)).toBeInTheDocument();
  });
  
  it('displays add contribution button', async () => {
    render(<Contributions />);
    
    // Wait for contributions data to load
    await screen.findByText(mockContributions[0].title);
    
    const addButton = screen.getByRole('button', { name: /Add Contribution/i });
    expect(addButton).toBeInTheDocument();
    
    fireEvent.click(addButton);
    // Since we've mocked the router, we just verify the button exists and can be clicked
    expect(addButton).toBeInTheDocument();
  });
});
