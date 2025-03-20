import Head from 'next/head';
import Link from 'next/link';

export default function EventManagement() {
  return (
    <div className="min-h-screen">
      <Head>
        <title>Event Management - KUG Advocacy Platform</title>
        <meta name="description" content="Manage Kotlin User Group events" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-kotlin-purple">
              KUG Advocacy Platform
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-200 rounded-full mr-2"></div>
              <span className="font-medium">John Doe</span>
            </div>
            <button className="kotlin-button-secondary">Logout</button>
          </div>
        </div>
      </header>

      <main>
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Event Management</h1>
            <Link href="/events/create" className="kotlin-button">
              Create New Event
            </Link>
          </div>

          {/* Create New Event Form */}
          <div className="kotlin-card mb-8">
            <h2 className="text-xl font-bold mb-4">Create New Event</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Event Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    className="kotlin-input w-full"
                    placeholder="Title of your event"
                  />
                </div>
                <div>
                  <label htmlFor="eventType" className="block text-sm font-medium text-gray-700 mb-1">
                    Event Type
                  </label>
                  <select
                    id="eventType"
                    name="eventType"
                    className="kotlin-input w-full"
                    defaultValue=""
                  >
                    <option value="" disabled>Select event type</option>
                    <option value="meetup">Meetup</option>
                    <option value="hackathon">Hackathon</option>
                    <option value="conference">Conference</option>
                    <option value="workshop">Workshop</option>
                    <option value="webinar">Webinar</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    id="startDate"
                    name="startDate"
                    className="kotlin-input w-full"
                  />
                </div>
                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                    End Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    id="endDate"
                    name="endDate"
                    className="kotlin-input w-full"
                  />
                </div>
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    className="kotlin-input w-full"
                    placeholder="Event location"
                  />
                </div>
                <div>
                  <label htmlFor="maxAttendees" className="block text-sm font-medium text-gray-700 mb-1">
                    Max Attendees
                  </label>
                  <input
                    type="number"
                    id="maxAttendees"
                    name="maxAttendees"
                    className="kotlin-input w-full"
                    placeholder="Maximum number of attendees"
                  />
                </div>
                <div className="md:col-span-2">
                  <div className="flex items-center">
                    <input
                      id="isVirtual"
                      name="isVirtual"
                      type="checkbox"
                      className="h-4 w-4 text-kotlin-purple focus:ring-kotlin-purple border-gray-300 rounded"
                    />
                    <label htmlFor="isVirtual" className="ml-2 block text-sm text-gray-700">
                      This is a virtual event
                    </label>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="virtualLink" className="block text-sm font-medium text-gray-700 mb-1">
                    Virtual Link (if applicable)
                  </label>
                  <input
                    type="url"
                    id="virtualLink"
                    name="virtualLink"
                    className="kotlin-input w-full"
                    placeholder="Link to virtual event"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Event Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  className="kotlin-input w-full"
                  placeholder="Provide details about your event"
                ></textarea>
              </div>
              <div className="flex justify-end space-x-3">
                <button type="button" className="kotlin-button-secondary">
                  Cancel
                </button>
                <button type="submit" className="kotlin-button">
                  Create Event
                </button>
              </div>
            </form>
          </div>

          {/* Upcoming Events */}
          <div className="kotlin-card mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Upcoming Events</h2>
              <div className="flex space-x-2">
                <select className="kotlin-input text-sm py-1">
                  <option value="all">All Types</option>
                  <option value="meetup">Meetups</option>
                  <option value="hackathon">Hackathons</option>
                  <option value="conference">Conferences</option>
                  <option value="workshop">Workshops</option>
                </select>
                <select className="kotlin-input text-sm py-1">
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                </select>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      RSVPs
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900">Kotlin Everywhere</div>
                          <div className="text-xs text-gray-500 flex items-center">
                            <span className="kotlin-badge-orange mr-2">Meetup</span>
                            <span>KUG Bangalore</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      April 15, 2025<br />
                      6:00 PM - 9:00 PM
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      TechHub, Bangalore
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      45 / 100
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <a href="#" className="text-kotlin-purple hover:text-kotlin-blue mr-3">View</a>
                      <a href="#" className="text-kotlin-blue hover:text-kotlin-purple mr-3">Edit</a>
                      <a href="#" className="text-red-600 hover:text-red-900">Cancel</a>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900">Kotlin Hackathon</div>
                          <div className="text-xs text-gray-500 flex items-center">
                            <span className="kotlin-badge-blue mr-2">Hackathon</span>
                            <span>KUG Delhi</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      May 10, 2025<br />
                      9:00 AM - 6:00 PM
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      CoWork Space, Delhi
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      32 / 50
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <a href="#" className="text-kotlin-purple hover:text-kotlin-blue mr-3">View</a>
                      <a href="#" className="text-kotlin-blue hover:text-kotlin-purple mr-3">Edit</a>
                      <a href="#" className="text-red-600 hover:text-red-900">Cancel</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Past Events */}
          <div className="kotlin-card mb-8">
            <h2 className="text-xl font-bold mb-4">Past Events</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Attendees
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900">Intro to Kotlin</div>
                          <div className="text-xs text-gray-500 flex items-center">
                            <span className="kotlin-badge-orange mr-2">Meetup</span>
                            <span>KUG Bangalore</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      January 15, 2025<br />
                      6:00 PM - 8:00 PM
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      TechHub, Bangalore
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      38 / 50
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <a href="#" className="text-kotlin-purple hover:text-kotlin-blue mr-3">View</a>
                      <a href="#" className="text-kotlin-blue hover:text-kotlin-purple mr-3">Report</a>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900">Kotlin Code Lab</div>
                          <div className="text-xs text-gray-500 flex items-center">
                            <span className="kotlin-badge mr-2">Workshop</span>
                            <span>KUG Bangalore</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      February 10, 2025<br />
                      10:00 AM - 4:00 PM
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      CoWork Space, Bangalore
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      25 / 30
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <a href="#" className="text-kotlin-purple hover:text-kotlin-blue mr-3">View</a>
                      <a href="#" className="text-kotlin-blue hover:text-kotlin-purple mr-3">Report</a>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900">Kotlin 2.0 Features</div>
                          <div className="text-xs text-gray-500 flex items-center">
                            <span className="kotlin-badge-orange mr-2">Meetup</span>
                            <span>KUG Bangalore</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      March 2, 2025<br />
                      6:30 PM - 8:30 PM
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Office Space, Bangalore
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      42 / 60
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <a href="#" className="text-kotlin-purple hover:text-kotlin-blue mr-3">View</a>
                      <a href="#" className="text-kotlin-blue hover:text-kotlin-purple mr-3">Report</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">3</span> of <span className="font-medium">12</span> past events
              </div>
              <div className="flex space-x-2">
                <button className="kotlin-button-secondary text-sm py-1 px-3 opacity-50 cursor-not-allowed">
                  Previous
                </button>
                <button className="kotlin-button-secondary text-sm py-1 px-3">
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* Event Details (when clicked) */}
          <div className="kotlin-card">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-xl font-bold">Event Details</h2>
              <div className="flex space-x-2">
                <button className="kotlin-button-secondary text-sm py-1 px-3">
                  Edit
                </button>
                <button className="kotlin-button text-sm py-1 px-3">
                  Manage RSVPs
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">Kotlin Everywhere</h3>
                  <div className="flex items-center mb-4">
                    <span className="kotlin-badge-orange mr-2">Meetup</span>
                    <span className="text-gray-600">KUG Bangalore</span>
                  </div>
                  <p className="text-gray-700 mb-4">
                    Join us for a deep dive into Kotlin's latest features and best practices. We'll have talks from experienced developers, networking opportunities, and hands-on coding sessions.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      <span>April 15, 2025</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      <span>6:00 PM - 9:00 PM</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span>TechHub, Bangalore</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                      </svg>
                      <span>45 / 100 RSVPs</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-3">Speakers</h4>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-gray-200 rounded-full mr-3 flex-shrink-0"></div>
                      <div>
                        <p className="font-medium">John Doe</p>
                        <p className="text-sm text-gray-600 mb-1">Coroutines in Production</p>
                        <p className="text-sm text-gray-500">45 minutes</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-gray-200 rounded-full mr-3 flex-shrink-0"></div>
                      <div>
                        <p className="font-medium">Jane Smith</p>
                        <p className="text-sm text-gray-600 mb-1">Kotlin Multiplatform</p>
                        <p className="text-sm text-gray-500">30 minutes</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="kotlin-card bg-gray-50">
                  <h4 className="text-lg font-semibold mb-3">Attendees</h4>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                    <div className="w-10 h-10 bg-kotlin-purple rounded-full flex items-center justify-center text-white text-xs">
                      +37
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Confirmed:</span>
                      <span className="font-medium">45</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Maybe:</span>
                      <span className="font-medium">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Declined:</span>
                      <span className="font-medium">5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Capacity:</span>
                      <span className="font-medium">100</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <a href="#" className="text-kotlin-purple font-medium hover:underline">
                      View all attendees →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold mb-4">KUG Advocacy Platform</h3>
              <p className="text-gray-400">
                A unified platform for all city-based Kotlin User Group chapters.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-3">Platform</h4>
                <ul className="space-y-2">
                  <li><Link href="/about" className="text-gray-400 hover:text-white">About</Link></li>
                  <li><Link href="/kugs" className="text-gray-400 hover:text-white">KUGs</Link></li>
                  <li><Link href="/events" className="text-gray-400 hover:text-white">Events</Link></li>
                  <li><Link href="/leaderboard" className="text-gray-400 hover:text-white">Leaderboard</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-3">Resources</h4>
                <ul className="space-y-2">
                  <li><Link href="/faq" className="text-gray-400 hover:text-white">FAQ</Link></li>
                  <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
                  <li><a href="https://kotlinlang.org" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">Kotlin</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-3">Legal</h4>
                <ul className="space-y-2">
                  <li><Link href="/terms" className="text-gray-400 hover:text-white">Terms</Link></li>
                  <li><Link href="/privacy" className="text-gray-400 hover:text-white">Privacy</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} KUG Advocacy Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
