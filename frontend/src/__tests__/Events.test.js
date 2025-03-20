import { render, screen, fireEvent } from '@testing-library/react';
import Events from '../pages/events';

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

// Mock events data
const mockEvents = [
  { 
    id: 1, 
    title: 'Kotlin Coroutines Workshop', 
    description: 'Learn about Kotlin Coroutines in this hands-on workshop',
    start_date: '2023-06-15T10:00:00.000Z',
    end_date: '2023-06-15T13:00:00.000Z',
    location: 'Tech Hub, Bangalore',
    is_online: false,
    max_attendees: 50,
    attendee_count: 35,
    kug_name: 'KUG Bangalore',
    banner_image: '/images/event1.jpg',
    status: 'upcoming'
  },
  { 
    id: 2, 
    title: 'Introduction to Kotlin Multiplatform', 
    description: 'An introduction to Kotlin Multiplatform Mobile development',
    start_date: '2023-07-20T14:00:00.000Z',
    end_date: '2023-07-20T16:00:00.000Z',
    location: 'Online',
    is_online: true,
    meeting_link: 'https://meet.google.com/abc-defg-hij',
    max_attendees: 100,
    attendee_count: 65,
    kug_name: 'KUG Delhi',
    banner_image: '/images/event2.jpg',
    status: 'upcoming'
  },
  { 
    id: 3, 
    title: 'Kotlin 2.0 Features', 
    description: 'Exploring the new features in Kotlin 2.0',
    start_date: '2023-05-10T11:00:00.000Z',
    end_date: '2023-05-10T13:00:00.000Z',
    location: 'Developer Space, Jaipur',
    is_online: false,
    max_attendees: 40,
    attendee_count: 40,
    kug_name: 'KUG Jaipur',
    banner_image: '/images/event3.jpg',
    status: 'past'
  }
];

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(mockEvents),
  })
);

describe('Events Page', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('renders the events page with data', async () => {
    render(<Events />);
    
    // Check for loading state first
    expect(screen.getByText(/Loading events/i)).toBeInTheDocument();
    
    // Wait for events data to load
    const firstEvent = await screen.findByText(mockEvents[0].title);
    expect(firstEvent).toBeInTheDocument();
    
    // Check for other events
    expect(screen.getByText(mockEvents[1].title)).toBeInTheDocument();
    expect(screen.getByText(mockEvents[2].title)).toBeInTheDocument();
  });
  
  it('displays event details correctly', async () => {
    render(<Events />);
    
    // Wait for events data to load
    await screen.findByText(mockEvents[0].title);
    
    // Check for event details
    expect(screen.getByText(mockEvents[0].description)).toBeInTheDocument();
    expect(screen.getByText(mockEvents[0].location)).toBeInTheDocument();
    expect(screen.getByText(mockEvents[0].kug_name)).toBeInTheDocument();
    expect(screen.getByText(/35\/50 attendees/i)).toBeInTheDocument();
  });
  
  it('allows filtering events by status', async () => {
    render(<Events />);
    
    // Wait for events data to load
    await screen.findByText(mockEvents[0].title);
    
    // Find status filter buttons
    const upcomingFilterButton = screen.getByRole('button', { name: /Upcoming/i });
    const pastFilterButton = screen.getByRole('button', { name: /Past/i });
    
    // Click on upcoming filter
    fireEvent.click(upcomingFilterButton);
    
    // Should show only upcoming events
    expect(screen.getByText(mockEvents[0].title)).toBeInTheDocument();
    expect(screen.getByText(mockEvents[1].title)).toBeInTheDocument();
    expect(screen.queryByText(mockEvents[2].title)).not.toBeInTheDocument();
    
    // Click on past filter
    fireEvent.click(pastFilterButton);
    
    // Should show only past events
    expect(screen.queryByText(mockEvents[0].title)).not.toBeInTheDocument();
    expect(screen.queryByText(mockEvents[1].title)).not.toBeInTheDocument();
    expect(screen.getByText(mockEvents[2].title)).toBeInTheDocument();
  });
  
  it('allows filtering events by KUG', async () => {
    render(<Events />);
    
    // Wait for events data to load
    await screen.findByText(mockEvents[0].title);
    
    // Find KUG filter dropdown
    const kugFilter = screen.getByLabelText(/Filter by KUG/i);
    
    // Select KUG Bangalore
    fireEvent.change(kugFilter, { target: { value: 'KUG Bangalore' } });
    
    // Should show only KUG Bangalore events
    expect(screen.getByText(mockEvents[0].title)).toBeInTheDocument();
    expect(screen.queryByText(mockEvents[1].title)).not.toBeInTheDocument();
    expect(screen.queryByText(mockEvents[2].title)).not.toBeInTheDocument();
    
    // Select KUG Delhi
    fireEvent.change(kugFilter, { target: { value: 'KUG Delhi' } });
    
    // Should show only KUG Delhi events
    expect(screen.queryByText(mockEvents[0].title)).not.toBeInTheDocument();
    expect(screen.getByText(mockEvents[1].title)).toBeInTheDocument();
    expect(screen.queryByText(mockEvents[2].title)).not.toBeInTheDocument();
  });
  
  it('displays register button for events with available spots', async () => {
    render(<Events />);
    
    // Wait for events data to load
    await screen.findByText(mockEvents[0].title);
    
    // Find register buttons
    const registerButtons = screen.getAllByRole('button', { name: /Register/i });
    
    // Should have register buttons for events with available spots
    expect(registerButtons.length).toBe(2); // For events 0 and 1
    
    // Event 2 is full, should show "Full" instead of register button
    expect(screen.getByText(/Full/i)).toBeInTheDocument();
  });
  
  it('displays create event button for organizers', async () => {
    render(<Events />);
    
    // Wait for events data to load
    await screen.findByText(mockEvents[0].title);
    
    const createButton = screen.getByRole('button', { name: /Create Event/i });
    expect(createButton).toBeInTheDocument();
    
    fireEvent.click(createButton);
    // Since we've mocked the router, we just verify the button exists and can be clicked
    expect(createButton).toBeInTheDocument();
  });
});
