import Head from 'next/head';
import Link from 'next/link';

export default function ContributionTracking() {
  return (
    <div className="min-h-screen">
      <Head>
        <title>Contribution Tracking - KUG Advocacy Platform</title>
        <meta name="description" content="Track your Kotlin contributions" />
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
            <h1 className="text-3xl font-bold">Contribution Tracking</h1>
            <Link href="/contributions/add" className="kotlin-button">
              Add New Contribution
            </Link>
          </div>

          {/* Add New Contribution Form */}
          <div className="kotlin-card mb-8">
            <h2 className="text-xl font-bold mb-4">Add New Contribution</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <select
                    id="type"
                    name="type"
                    className="kotlin-input w-full"
                    defaultValue=""
                  >
                    <option value="" disabled>Select contribution type</option>
                    <option value="talk">Talk</option>
                    <option value="blog">Blog Post</option>
                    <option value="code">Code Contribution</option>
                    <option value="event">Event Organization</option>
                    <option value="tutorial">Tutorial</option>
                    <option value="video">Video Content</option>
                    <option value="mentoring">Mentoring</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    className="kotlin-input w-full"
                    placeholder="Title of your contribution"
                  />
                </div>
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    className="kotlin-input w-full"
                  />
                </div>
                <div>
                  <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
                    URL
                  </label>
                  <input
                    type="url"
                    id="url"
                    name="url"
                    className="kotlin-input w-full"
                    placeholder="Link to your contribution"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="details" className="block text-sm font-medium text-gray-700 mb-1">
                  Details
                </label>
                <textarea
                  id="details"
                  name="details"
                  rows="3"
                  className="kotlin-input w-full"
                  placeholder="Provide details about your contribution"
                ></textarea>
              </div>
              <div className="flex justify-end space-x-3">
                <button type="button" className="kotlin-button-secondary">
                  Cancel
                </button>
                <button type="submit" className="kotlin-button">
                  Submit
                </button>
              </div>
            </form>
          </div>

          {/* My Contributions */}
          <div className="kotlin-card mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">My Contributions</h2>
              <div className="flex space-x-2">
                <select className="kotlin-input text-sm py-1">
                  <option value="all">All Types</option>
                  <option value="talk">Talks</option>
                  <option value="blog">Blogs</option>
                  <option value="code">Code</option>
                  <option value="event">Events</option>
                </select>
                <select className="kotlin-input text-sm py-1">
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="points-high">Highest Points</option>
                  <option value="points-low">Lowest Points</option>
                </select>
                <button className="kotlin-button-secondary text-sm py-1 px-3">
                  Export
                </button>
              </div>
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <a href="#" className="text-kotlin-purple hover:text-kotlin-blue mr-3">View</a>
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <a href="#" className="text-kotlin-purple hover:text-kotlin-blue mr-3">View</a>
                      <a href="#" className="text-red-600 hover:text-red-900">Cancel</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">3</span> of <span className="font-medium">3</span> contributions
              </div>
              <div className="flex space-x-2">
                <button className="kotlin-button-secondary text-sm py-1 px-3 opacity-50 cursor-not-allowed">
                  Previous
                </button>
                <button className="kotlin-button-secondary text-sm py-1 px-3 opacity-50 cursor-not-allowed">
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* Contribution Statistics */}
          <div className="kotlin-card mb-8">
            <h2 className="text-xl font-bold mb-4">Contribution Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">Contribution Types</h3>
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
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">Monthly Activity</h3>
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
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-3xl font-bold text-kotlin-purple">120</div>
                <div className="text-gray-600">Total Points</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-3xl font-bold text-kotlin-blue">Intermediate</div>
                <div className="text-gray-600">Current Level</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-3xl font-bold text-kotlin-orange">80/200</div>
                <div className="text-gray-600">Points to Next Level</div>
              </div>
            </div>
          </div>

          {/* Leaderboard Position */}
          <div className="kotlin-card">
            <h2 className="text-xl font-bold mb-4">Leaderboard Position</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">City Rank: Bangalore</h3>
                <div className="flex items-center justify-center space-x-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-2"></div>
                    <div className="text-sm font-medium">#11</div>
                    <div className="text-xs text-gray-500">Priya S.</div>
                  </div>
                  <div className="text-center">
                    <div className="w-20 h-20 bg-kotlin-purple rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold">
                      #12
                    </div>
                    <div className="text-sm font-medium">You</div>
                    <div className="text-xs text-gray-500">120 pts</div>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-2"></div>
                    <div className="text-sm font-medium">#13</div>
                    <div className="text-xs text-gray-500">Rahul V.</div>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <Link href="/leaderboard/bangalore" className="text-kotlin-purple font-medium hover:underline">
                    View full city leaderboard →
                  </Link>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">Global Rank</h3>
                <div className="flex items-center justify-center space-x-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-2"></div>
                    <div className="text-sm font-medium">#144</div>
                    <div className="text-xs text-gray-500">Alex K.</div>
                  </div>
                  <div className="text-center">
                    <div className="w-20 h-20 bg-kotlin-blue rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold">
                      #145
                    </div>
                    <div className="text-sm font-medium">You</div>
                    <div className="text-xs text-gray-500">120 pts</div>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-2"></div>
                    <div className="text-sm font-medium">#146</div>
                    <div className="text-xs text-gray-500">Jane S.</div>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <Link href="/leaderboard" className="text-kotlin-purple font-medium hover:underline">
                    View global leaderboard →
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
