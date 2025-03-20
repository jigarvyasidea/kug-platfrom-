import Head from 'next/head';
import Link from 'next/link';

export default function UserProfile() {
  return (
    <div className="min-h-screen">
      <Head>
        <title>User Profile - KUG Advocacy Platform</title>
        <meta name="description" content="User profile on KUG Advocacy Platform" />
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Sidebar - Profile Info */}
            <div className="md:col-span-1">
              <div className="kotlin-card mb-8">
                <div className="flex flex-col items-center mb-6">
                  <div className="w-32 h-32 bg-gray-200 rounded-full mb-4"></div>
                  <h1 className="text-2xl font-bold">John Doe</h1>
                  <p className="text-gray-600">Bangalore, India</p>
                </div>
                
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-2">KUG Membership</h2>
                  <div className="flex items-center mb-2">
                    <div className="w-6 h-6 bg-kotlin-purple rounded-full flex items-center justify-center text-white text-xs font-bold mr-2">
                      B
                    </div>
                    <span>KUG Bangalore</span>
                    <span className="ml-auto kotlin-badge">Member</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-2">Advocacy Level</h2>
                  <div className="bg-gray-100 rounded-full h-4 mb-2">
                    <div className="kotlin-gradient rounded-full h-4 w-3/5"></div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Level: Intermediate</span>
                    <span>120/200 to Expert</span>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-lg font-semibold mb-2">Contact</h2>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      <span>john.doe@example.com</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                      </svg>
                      <span>Bangalore, India</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Link href="/profile/edit" className="kotlin-button w-full text-center">
                    Edit Profile
                  </Link>
                </div>
              </div>
              
              <div className="kotlin-card">
                <h2 className="text-lg font-semibold mb-4">Social Profiles</h2>
                <div className="space-y-3">
                  <a href="https://github.com/johndoe" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-kotlin-purple">
                    <svg className="w-5 h-5 mr-2 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    <span>github.com/johndoe</span>
                  </a>
                  <a href="https://twitter.com/johndoe" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-kotlin-purple">
                    <svg className="w-5 h-5 mr-2 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                    <span>@johndoe</span>
                  </a>
                  <a href="https://linkedin.com/in/johndoe" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-kotlin-purple">
                    <svg className="w-5 h-5 mr-2 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    <span>linkedin.com/in/johndoe</span>
                  </a>
                  <a href="https://medium.com/@johndoe" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-kotlin-purple">
                    <svg className="w-5 h-5 mr-2 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
                    </svg>
                    <span>@johndoe</span>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="md:col-span-2">
              {/* Badges & Achievements */}
              <div className="kotlin-card mb-8">
                <h2 className="text-xl font-bold mb-4">Badges & Achievements</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-kotlin-purple bg-opacity-10 rounded-full flex items-center justify-center mb-2">
                      <svg className="w-8 h-8 text-kotlin-purple" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium">Kotlin Beginner</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-kotlin-purple bg-opacity-10 rounded-full flex items-center justify-center mb-2">
                      <svg className="w-8 h-8 text-kotlin-purple" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium">Speaker</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-kotlin-purple bg-opacity-10 rounded-full flex items-center justify-center mb-2">
                      <svg className="w-8 h-8 text-kotlin-purple" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium">Writer</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-2 opacity-50">
                      <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-gray-400">Coder (Locked)</span>
                  </div>
                </div>
              </div>
              
              {/* Contribution History */}
              <div className="kotlin-card mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Contribution History</h2>
                  <Link href="/contributions/add" className="kotlin-button text-sm py-1 px-3">
                    Add Contribution
                  </Link>
                </div>
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
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Points
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
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
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="kotlin-badge-blue">Blog</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">Kotlin Flow</div>
                          <div className="text-sm text-gray-500">Medium</div>
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
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="kotlin-badge-orange">Code</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">PR #123</div>
                          <div className="text-sm text-gray-500">GitHub</div>
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
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 text-right">
                  <Link href="/contributions" className="text-kotlin-purple font-medium hover:underline">
                    View all contributions →
                  </Link>
                </div>
              </div>
              
              {/* Upcoming Events */}
              <div className="kotlin-card">
                <h2 className="text-xl font-bold mb-4">Upcoming Events</h2>
                <div className="space-y-4">
                  <div className="border-b border-gray-200 pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold mb-1">Kotlin Everywhere</h3>
                        <p className="text-sm text-gray-600 mb-2">April 15, 2025 • 6:00 PM - 9:00 PM</p>
                        <p className="text-sm text-gray-600">TechHub, Bangalore</p>
                      </div>
                      <span className="kotlin-badge-orange">Going</span>
                    </div>
                  </div>
                  <div className="border-b border-gray-200 pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold mb-1">Kotlin Hackathon</h3>
                        <p className="text-sm text-gray-600 mb-2">May 10, 2025 • 9:00 AM - 6:00 PM</p>
                        <p className="text-sm text-gray-600">CoWork Space, Delhi</p>
                      </div>
                      <span className="kotlin-badge">Maybe</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-right">
                  <Link href="/events" className="text-kotlin-purple font-medium hover:underline">
                    View all events →
                  </Link>
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
