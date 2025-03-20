import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  return (
    <div className="min-h-screen">
      <Head>
        <title>Admin Panel - KUG Advocacy Platform</title>
        <meta name="description" content="Admin panel for KUG leads" />
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
              <span className="ml-2 kotlin-badge">KUG Lead</span>
            </div>
            <button className="kotlin-button-secondary">Logout</button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">KUG Bangalore Admin Panel</h1>
          <div className="flex space-x-2">
            <button className="kotlin-button-secondary">
              <svg className="w-5 h-5 mr-1 inline" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Export Data
            </button>
            <button className="kotlin-button">
              <svg className="w-5 h-5 mr-1 inline" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Create Announcement
            </button>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button 
            className={`py-2 px-4 border-b-2 font-medium ${activeTab === 'dashboard' ? 'border-kotlin-purple text-kotlin-purple' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
          <button 
            className={`py-2 px-4 border-b-2 font-medium ${activeTab === 'members' ? 'border-kotlin-purple text-kotlin-purple' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('members')}
          >
            Members
          </button>
          <button 
            className={`py-2 px-4 border-b-2 font-medium ${activeTab === 'events' ? 'border-kotlin-purple text-kotlin-purple' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('events')}
          >
            Events
          </button>
          <button 
            className={`py-2 px-4 border-b-2 font-medium ${activeTab === 'contributions' ? 'border-kotlin-purple text-kotlin-purple' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('contributions')}
          >
            Contributions
          </button>
          <button 
            className={`py-2 px-4 border-b-2 font-medium ${activeTab === 'settings' ? 'border-kotlin-purple text-kotlin-purple' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </button>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div>
            {/* KUG Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="kotlin-card bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Total Members</h3>
                  <svg className="w-8 h-8 text-kotlin-purple" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                </div>
                <div className="text-3xl font-bold">248</div>
                <div className="text-sm text-green-600 mt-2">
                  <span className="font-medium">↑ 12%</span> from last month
                </div>
              </div>
              <div className="kotlin-card bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Active Contributors</h3>
                  <svg className="w-8 h-8 text-kotlin-blue" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="text-3xl font-bold">86</div>
                <div className="text-sm text-green-600 mt-2">
                  <span className="font-medium">↑ 8%</span> from last month
                </div>
              </div>
              <div className="kotlin-card bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Total Events</h3>
                  <svg className="w-8 h-8 text-kotlin-orange" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="text-3xl font-bold">24</div>
                <div className="text-sm text-green-600 mt-2">
                  <span className="font-medium">↑ 20%</span> from last month
                </div>
              </div>
              <div className="kotlin-card bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Total Contributions</h3>
                  <svg className="w-8 h-8 text-kotlin-purple" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="text-3xl font-bold">156</div>
                <div className="text-sm text-green-600 mt-2">
                  <span className="font-medium">↑ 15%</span> from last month
                </div>
              </div>
            </div>

            {/* Recent Activity & Pending Approvals */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="kotlin-card">
                <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-gray-200 rounded-full mr-3 flex-shrink-0"></div>
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">Jane Smith</span> submitted a new contribution: <span className="text-kotlin-purple">Kotlin Coroutines Talk</span>
                      </p>
                      <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-gray-200 rounded-full mr-3 flex-shrink-0"></div>
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">Rahul Verma</span> registered for event: <span className="text-kotlin-purple">Kotlin Everywhere</span>
                      </p>
                      <p className="text-xs text-gray-500 mt-1">5 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-gray-200 rounded-full mr-3 flex-shrink-0"></div>
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">Priya Sharma</span> joined KUG Bangalore
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Yesterday</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-gray-200 rounded-full mr-3 flex-shrink-0"></div>
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">Alex Kumar</span> created a new event: <span className="text-kotlin-purple">Kotlin Workshop</span>
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Yesterday</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-right">
                  <a href="#" className="text-kotlin-purple font-medium hover:underline">
                    View all activity →
                  </a>
                </div>
              </div>
              
              <div className="kotlin-card">
                <h3 className="text-xl font-bold mb-4">Pending Approvals</h3>
                <div className="space-y-4">
                  <div className="border-b border-gray-200 pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">Contribution Approval</p>
                        <p className="text-sm text-gray-600 mb-1">Rahul Verma: PR #123 to Kotlin Library</p>
                        <p className="text-xs text-gray-500">Submitted 2 days ago</p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-red-600 hover:text-red-800 text-sm">Reject</button>
                        <button className="text-kotlin-purple hover:text-kotlin-blue text-sm">Approve</button>
                      </div>
                    </div>
                  </div>
                  <div className="border-b border-gray-200 pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">Event Approval</p>
                        <p className="text-sm text-gray-600 mb-1">Kotlin Multiplatform Workshop</p>
                        <p className="text-xs text-gray-500">Submitted by Ananya Patel</p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-red-600 hover:text-red-800 text-sm">Reject</button>
                        <button className="text-kotlin-purple hover:text-kotlin-blue text-sm">Approve</button>
                      </div>
                    </div>
                  </div>
                  <div className="border-b border-gray-200 pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">Member Role Change</p>
                        <p className="text-sm text-gray-600 mb-1">Promote Jane Smith to Co-Lead</p>
                        <p className="text-xs text-gray-500">Requested by John Doe</p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-red-600 hover:text-red-800 text-sm">Reject</button>
                        <button className="text-kotlin-purple hover:text-kotlin-blue text-sm">Approve</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-right">
                  <a href="#" className="text-kotlin-purple font-medium hover:underline">
                    View all pending approvals →
                  </a>
                </div>
              </div>
            </div>

            {/* Analytics */}
            <div className="kotlin-card mb-8">
              <h3 className="text-xl font-bold mb-4">KUG Analytics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold mb-3">Member Growth</h4>
                  <div className="h-64 flex items-end justify-between space-x-2 px-4">
                    <div className="w-1/12">
                      <div className="bg-kotlin-purple h-12 rounded-t-md"></div>
                      <div className="text-xs text-center mt-1">Jan</div>
                    </div>
                    <div className="w-1/12">
                      <div className="bg-kotlin-purple h-24 rounded-t-md"></div>
                      <div className="text-xs text-center mt-1">Feb</div>
                    </div>
                    <div className="w-1/12">
                      <div className="bg-kotlin-purple h-16 rounded-t-md"></div>
                      <div className="text-xs text-center mt-1">Mar</div>
                    </div>
                    <div className="w-1/12">
                      <div className="bg-kotlin-purple h-32 rounded-t-md"></div>
                      <div className="text-xs text-center mt-1">Apr</div>
                    </div>
                    <div className="w-1/12">
                      <div className="bg-kotlin-purple h-20 rounded-t-md"></div>
                      <div className="text-xs text-center mt-1">May</div>
                    </div>
                    <div className="w-1/12">
                      <div className="bg-kotlin-purple h-40 rounded-t-md"></div>
                      <div className="text-xs text-center mt-1">Jun</div>
                    </div>
                    <div className="w-1/12">
                      <div className="bg-kotlin-purple h-28 rounded-t-md"></div>
                      <div className="text-xs text-center mt-1">Jul</div>
                    </div>
                    <div className="w-1/12">
                      <div className="bg-kotlin-purple h-36 rounded-t-md"></div>
                      <div className="text-xs text-center mt-1">Aug</div>
                    </div>
                    <div className="w-1/12">
                      <div className="bg-kotlin-purple h-24 rounded-t-md"></div>
                      <div className="text-xs text-center mt-1">Sep</div>
                    </div>
                    <div className="w-1/12">
                      <div className="bg-kotlin-purple h-16 rounded-t-md"></div>
                      <div className="text-xs text-center mt-1">Oct</div>
                    </div>
                    <div className="w-1/12">
                      <div className="bg-kotlin-purple h-20 rounded-t-md"></div>
                      <div className="text-xs text-center mt-1">Nov</div>
                    </div>
                    <div className="w-1/12">
                      <div className="bg-kotlin-purple h-32 rounded-t-md"></div>
                      <div className="text-xs text-center mt-1">Dec</div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-3">Contribution Types</h4>
                  <div className="h-64 flex items-center justify-center">
                    <div className="w-48 h-48 rounded-full border-8 border-gray-200 relative">
                      <div className="absolute inset-0 border-8 border-transparent border-t-kotlin-purple rounded-full transform -rotate-90"></div>
                      <div className="absolute inset-0 border-8 border-transparent border-l-kotlin-blue border-t-kotlin-blue rounded-full transform -rotate-180"></div>
                      <div className="absolute inset-0 border-8 border-transparent border-b-kotlin-orange border-l-kotlin-orange rounded-full transform -rotate-270"></div>
                    </div>
                  </div>
                  <div className="flex justify-center space-x-4 text-sm">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-kotlin-purple rounded-full mr-1"></div>
                      <span>Talks (40%)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-kotlin-blue rounded-full mr-1"></div>
                      <span>Blogs (30%)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-kotlin-orange rounded-full mr-1"></div>
                      <span>Code (30%)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="kotlin-card">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Upcoming Events</h3>
                <Link href="/events/create" className="text-kotlin-purple font-medium hover:underline">
                  Create new event →
                </Link>
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
                        Status
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
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Published
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <a href="#" className="text-kotlin-purple hover:text-kotlin-blue mr-3">View</a>
                        <a href="#" className="text-kotlin-blue hover:text-kotlin-purple mr-3">Edit</a>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-medium text-gray-900">Kotlin Multiplatform Workshop</div>
                            <div className="text-xs text-gray-500 flex items-center">
                              <span className="kotlin-badge mr-2">Workshop</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        May 5, 2025<br />
                        10:00 AM - 4:00 PM
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        CoWork Space, Bangalore
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        12 / 30
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          Draft
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <a href="#" className="text-kotlin-purple hover:text-kotlin-blue mr-3">View</a>
                        <a href="#" className="text-kotlin-blue hover:text-kotlin-purple mr-3">Edit</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Members Tab */}
        {activeTab === 'members' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Members Management</h2>
              <div className="flex space-x-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search members..."
                    className="kotlin-input text-sm py-1 pl-8"
                  />
                  <svg className="w-4 h-4 absolute left-2 top-2 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <select className="kotlin-input text-sm py-1">
                  <option value="all">All Roles</option>
                  <option value="lead">Lead</option>
                  <option value="co-lead">Co-Lead</option>
                  <option value="organizer">Organizer</option>
                  <option value="member">Member</option>
                </select>
                <button className="kotlin-button">
                  <svg className="w-5 h-5 mr-1 inline" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Add Member
                </button>
              </div>
            </div>

            <div className="kotlin-card">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Member
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Joined
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contributions
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">John Doe</div>
                            <div className="text-xs text-gray-500">john.doe@example.com</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="kotlin-badge-purple">Lead</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Jan 10, 2023
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        28
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <a href="#" className="text-kotlin-purple hover:text-kotlin-blue mr-3">View</a>
                        <a href="#" className="text-kotlin-blue hover:text-kotlin-purple mr-3">Edit</a>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">Jane Smith</div>
                            <div className="text-xs text-gray-500">jane.smith@example.com</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="kotlin-badge-blue">Co-Lead</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Feb 15, 2023
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        22
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <a href="#" className="text-kotlin-purple hover:text-kotlin-blue mr-3">View</a>
                        <a href="#" className="text-kotlin-blue hover:text-kotlin-purple mr-3">Edit</a>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">Rahul Verma</div>
                            <div className="text-xs text-gray-500">rahul.verma@example.com</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="kotlin-badge-orange">Organizer</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Mar 22, 2023
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        18
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <a href="#" className="text-kotlin-purple hover:text-kotlin-blue mr-3">View</a>
                        <a href="#" className="text-kotlin-blue hover:text-kotlin-purple mr-3">Edit</a>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">Priya Sharma</div>
                            <div className="text-xs text-gray-500">priya.sharma@example.com</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="kotlin-badge">Member</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Apr 5, 2023
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        12
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <a href="#" className="text-kotlin-purple hover:text-kotlin-blue mr-3">View</a>
                        <a href="#" className="text-kotlin-blue hover:text-kotlin-purple mr-3">Edit</a>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">Alex Kumar</div>
                            <div className="text-xs text-gray-500">alex.kumar@example.com</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="kotlin-badge">Member</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        May 18, 2023
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        8
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          Inactive
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <a href="#" className="text-kotlin-purple hover:text-kotlin-blue mr-3">View</a>
                        <a href="#" className="text-kotlin-blue hover:text-kotlin-purple mr-3">Edit</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of <span className="font-medium">248</span> members
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

            {/* Member Details Modal (would be shown when clicking View) */}
            <div className="hidden fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
              <div className="relative top-20 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold">Member Details</h3>
                  <button className="text-gray-500 hover:text-gray-700">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                {/* Modal content would go here */}
              </div>
            </div>
          </div>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Events Management</h2>
              <div className="flex space-x-2">
                <select className="kotlin-input text-sm py-1">
                  <option value="all">All Events</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="past">Past</option>
                  <option value="draft">Draft</option>
                </select>
                <button className="kotlin-button">
                  <svg className="w-5 h-5 mr-1 inline" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Create Event
                </button>
              </div>
            </div>

            <div className="kotlin-card">
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
                        Organizer
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        RSVPs
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
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
                        John Doe
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        45 / 100
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Published
                        </span>
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
                            <div className="text-sm font-medium text-gray-900">Kotlin Multiplatform Workshop</div>
                            <div className="text-xs text-gray-500 flex items-center">
                              <span className="kotlin-badge mr-2">Workshop</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        May 5, 2025<br />
                        10:00 AM - 4:00 PM
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        CoWork Space, Bangalore
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Ananya Patel
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        12 / 30
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          Draft
                        </span>
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
                            <div className="text-sm font-medium text-gray-900">Intro to Kotlin</div>
                            <div className="text-xs text-gray-500 flex items-center">
                              <span className="kotlin-badge-orange mr-2">Meetup</span>
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
                        Jane Smith
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        38 / 50
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                          Completed
                        </span>
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
                  Showing <span className="font-medium">1</span> to <span className="font-medium">3</span> of <span className="font-medium">24</span> events
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
          </div>
        )}

        {/* Contributions Tab */}
        {activeTab === 'contributions' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Contributions Management</h2>
              <div className="flex space-x-2">
                <select className="kotlin-input text-sm py-1">
                  <option value="all">All Types</option>
                  <option value="talk">Talks</option>
                  <option value="blog">Blogs</option>
                  <option value="code">Code</option>
                  <option value="event">Events</option>
                </select>
                <select className="kotlin-input text-sm py-1">
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>

            <div className="kotlin-card">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Member
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Points
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="kotlin-badge">Talk</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">Kotlin Coroutines</div>
                        <div className="text-sm text-gray-500">KUG Bangalore</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gray-200 rounded-full mr-2"></div>
                          <span className="text-sm">John Doe</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Jan 22, 2025
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        50
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Approved
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <a href="#" className="text-kotlin-purple hover:text-kotlin-blue mr-3">View</a>
                        <a href="#" className="text-kotlin-blue hover:text-kotlin-purple mr-3">Edit</a>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="kotlin-badge-blue">Blog</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">Kotlin Flow</div>
                        <div className="text-sm text-gray-500">Medium</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gray-200 rounded-full mr-2"></div>
                          <span className="text-sm">Jane Smith</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Feb 15, 2025
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        30
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Approved
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <a href="#" className="text-kotlin-purple hover:text-kotlin-blue mr-3">View</a>
                        <a href="#" className="text-kotlin-blue hover:text-kotlin-purple mr-3">Edit</a>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="kotlin-badge-orange">Code</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">PR #123</div>
                        <div className="text-sm text-gray-500">GitHub</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gray-200 rounded-full mr-2"></div>
                          <span className="text-sm">Rahul Verma</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Mar 05, 2025
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        40
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          Pending
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <a href="#" className="text-kotlin-purple hover:text-kotlin-blue mr-3">View</a>
                        <a href="#" className="text-green-600 hover:text-green-900 mr-3">Approve</a>
                        <a href="#" className="text-red-600 hover:text-red-900">Reject</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">3</span> of <span className="font-medium">156</span> contributions
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
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">KUG Settings</h2>
              <button className="kotlin-button">
                Save Changes
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <div className="kotlin-card mb-6">
                  <h3 className="text-xl font-bold mb-4">KUG Profile</h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="kugName" className="block text-sm font-medium text-gray-700 mb-1">
                        KUG Name
                      </label>
                      <input
                        type="text"
                        id="kugName"
                        name="kugName"
                        className="kotlin-input w-full"
                        defaultValue="KUG Bangalore"
                      />
                    </div>
                    <div>
                      <label htmlFor="kugDescription" className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        id="kugDescription"
                        name="kugDescription"
                        rows="4"
                        className="kotlin-input w-full"
                        defaultValue="Kotlin User Group Bangalore is a community of Kotlin enthusiasts in Bangalore, India. We organize regular meetups, workshops, and hackathons to promote Kotlin development."
                      ></textarea>
                    </div>
                    <div>
                      <label htmlFor="kugLocation" className="block text-sm font-medium text-gray-700 mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        id="kugLocation"
                        name="kugLocation"
                        className="kotlin-input w-full"
                        defaultValue="Bangalore, India"
                      />
                    </div>
                    <div>
                      <label htmlFor="kugWebsite" className="block text-sm font-medium text-gray-700 mb-1">
                        Website
                      </label>
                      <input
                        type="url"
                        id="kugWebsite"
                        name="kugWebsite"
                        className="kotlin-input w-full"
                        defaultValue="https://kug-bangalore.org"
                      />
                    </div>
                  </div>
                </div>

                <div className="kotlin-card">
                  <h3 className="text-xl font-bold mb-4">Social Media</h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="kugTwitter" className="block text-sm font-medium text-gray-700 mb-1">
                        Twitter
                      </label>
                      <input
                        type="text"
                        id="kugTwitter"
                        name="kugTwitter"
                        className="kotlin-input w-full"
                        defaultValue="@KUGBangalore"
                      />
                    </div>
                    <div>
                      <label htmlFor="kugLinkedIn" className="block text-sm font-medium text-gray-700 mb-1">
                        LinkedIn
                      </label>
                      <input
                        type="text"
                        id="kugLinkedIn"
                        name="kugLinkedIn"
                        className="kotlin-input w-full"
                        defaultValue="kotlin-user-group-bangalore"
                      />
                    </div>
                    <div>
                      <label htmlFor="kugGitHub" className="block text-sm font-medium text-gray-700 mb-1">
                        GitHub
                      </label>
                      <input
                        type="text"
                        id="kugGitHub"
                        name="kugGitHub"
                        className="kotlin-input w-full"
                        defaultValue="kug-bangalore"
                      />
                    </div>
                    <div>
                      <label htmlFor="kugDiscord" className="block text-sm font-medium text-gray-700 mb-1">
                        Discord
                      </label>
                      <input
                        type="text"
                        id="kugDiscord"
                        name="kugDiscord"
                        className="kotlin-input w-full"
                        defaultValue="kug-bangalore"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                <div className="kotlin-card mb-6">
                  <h3 className="text-xl font-bold mb-4">Notification Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">New Member Notifications</p>
                        <p className="text-sm text-gray-600">Notify admins when new members join</p>
                      </div>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input type="checkbox" id="newMemberNotifications" className="sr-only" defaultChecked />
                        <div className="block bg-gray-300 w-10 h-6 rounded-full"></div>
                        <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Contribution Approval Notifications</p>
                        <p className="text-sm text-gray-600">Notify admins when contributions need approval</p>
                      </div>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input type="checkbox" id="contributionNotifications" className="sr-only" defaultChecked />
                        <div className="block bg-gray-300 w-10 h-6 rounded-full"></div>
                        <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Event Reminder Emails</p>
                        <p className="text-sm text-gray-600">Send reminder emails to attendees before events</p>
                      </div>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input type="checkbox" id="eventReminderEmails" className="sr-only" defaultChecked />
                        <div className="block bg-gray-300 w-10 h-6 rounded-full"></div>
                        <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Monthly Newsletter</p>
                        <p className="text-sm text-gray-600">Send monthly newsletter to all members</p>
                      </div>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input type="checkbox" id="monthlyNewsletter" className="sr-only" defaultChecked />
                        <div className="block bg-gray-300 w-10 h-6 rounded-full"></div>
                        <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="kotlin-card mb-6">
                  <h3 className="text-xl font-bold mb-4">Contribution Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="talkPoints" className="block text-sm font-medium text-gray-700 mb-1">
                        Points for Talks
                      </label>
                      <input
                        type="number"
                        id="talkPoints"
                        name="talkPoints"
                        className="kotlin-input w-full"
                        defaultValue="50"
                      />
                    </div>
                    <div>
                      <label htmlFor="blogPoints" className="block text-sm font-medium text-gray-700 mb-1">
                        Points for Blog Posts
                      </label>
                      <input
                        type="number"
                        id="blogPoints"
                        name="blogPoints"
                        className="kotlin-input w-full"
                        defaultValue="30"
                      />
                    </div>
                    <div>
                      <label htmlFor="codePoints" className="block text-sm font-medium text-gray-700 mb-1">
                        Points for Code Contributions
                      </label>
                      <input
                        type="number"
                        id="codePoints"
                        name="codePoints"
                        className="kotlin-input w-full"
                        defaultValue="40"
                      />
                    </div>
                    <div>
                      <label htmlFor="eventPoints" className="block text-sm font-medium text-gray-700 mb-1">
                        Points for Event Organization
                      </label>
                      <input
                        type="number"
                        id="eventPoints"
                        name="eventPoints"
                        className="kotlin-input w-full"
                        defaultValue="60"
                      />
                    </div>
                    <div className="flex items-center">
                      <input
                        id="requireApproval"
                        name="requireApproval"
                        type="checkbox"
                        className="h-4 w-4 text-kotlin-purple focus:ring-kotlin-purple border-gray-300 rounded"
                        defaultChecked
                      />
                      <label htmlFor="requireApproval" className="ml-2 block text-sm text-gray-700">
                        Require admin approval for all contributions
                      </label>
                    </div>
                  </div>
                </div>

                <div className="kotlin-card">
                  <h3 className="text-xl font-bold mb-4">Advanced Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="membershipApproval" className="block text-sm font-medium text-gray-700 mb-1">
                        Membership Approval
                      </label>
                      <select
                        id="membershipApproval"
                        name="membershipApproval"
                        className="kotlin-input w-full"
                        defaultValue="automatic"
                      >
                        <option value="automatic">Automatic (Anyone can join)</option>
                        <option value="manual">Manual (Requires admin approval)</option>
                        <option value="invitation">Invitation Only</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="eventCreation" className="block text-sm font-medium text-gray-700 mb-1">
                        Event Creation
                      </label>
                      <select
                        id="eventCreation"
                        name="eventCreation"
                        className="kotlin-input w-full"
                        defaultValue="admins"
                      >
                        <option value="admins">Admins Only</option>
                        <option value="organizers">Admins & Organizers</option>
                        <option value="all">All Members (Requires Approval)</option>
                      </select>
                    </div>
                    <div className="pt-4 border-t border-gray-200">
                      <button className="text-red-600 hover:text-red-900 font-medium">
                        Archive KUG
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
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
