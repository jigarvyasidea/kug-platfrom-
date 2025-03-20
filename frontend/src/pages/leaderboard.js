import Head from 'next/head';
import Link from 'next/link';

export default function Leaderboard() {
  return (
    <div className="min-h-screen">
      <Head>
        <title>Leaderboard - KUG Advocacy Platform</title>
        <meta name="description" content="Leaderboard for Kotlin User Groups" />
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
        <div className="kotlin-gradient text-white py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-2">Leaderboard</h1>
            <p className="text-xl">Recognizing top Kotlin advocates and contributors</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Leaderboard Tabs */}
          <div className="flex border-b border-gray-200 mb-8">
            <button className="py-2 px-4 border-b-2 border-kotlin-purple text-kotlin-purple font-medium">
              Global
            </button>
            <button className="py-2 px-4 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium">
              KUG Bangalore
            </button>
            <button className="py-2 px-4 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium">
              KUG Delhi
            </button>
            <button className="py-2 px-4 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium">
              KUG Jaipur
            </button>
          </div>

          {/* Leaderboard Filters */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex space-x-2">
              <select className="kotlin-input text-sm py-1">
                <option value="all-time">All Time</option>
                <option value="this-year">This Year</option>
                <option value="this-month">This Month</option>
                <option value="this-week">This Week</option>
              </select>
              <select className="kotlin-input text-sm py-1">
                <option value="all">All Contributions</option>
                <option value="talks">Talks</option>
                <option value="blogs">Blogs</option>
                <option value="code">Code</option>
                <option value="events">Events</option>
              </select>
            </div>
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
          </div>

          {/* Top 3 Contributors */}
          <div className="flex flex-col md:flex-row justify-center items-end space-y-6 md:space-y-0 md:space-x-8 mb-12">
            {/* 2nd Place */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full mb-2"></div>
              <div className="w-24 h-24 bg-gray-100 rounded-lg flex flex-col items-center justify-center">
                <div className="text-xl font-bold text-kotlin-blue">2nd</div>
                <div className="text-sm font-medium">Jane Smith</div>
                <div className="text-xs text-gray-500">980 pts</div>
              </div>
            </div>
            
            {/* 1st Place */}
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-gray-200 rounded-full mb-2"></div>
              <div className="w-28 h-32 kotlin-gradient rounded-lg flex flex-col items-center justify-center text-white">
                <svg className="w-8 h-8 mb-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" clipRule="evenodd" />
                </svg>
                <div className="text-2xl font-bold">1st</div>
                <div className="text-sm font-medium">John Doe</div>
                <div className="text-xs">1,240 pts</div>
              </div>
            </div>
            
            {/* 3rd Place */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full mb-2"></div>
              <div className="w-24 h-24 bg-gray-100 rounded-lg flex flex-col items-center justify-center">
                <div className="text-xl font-bold text-kotlin-orange">3rd</div>
                <div className="text-sm font-medium">Alex Kumar</div>
                <div className="text-xs text-gray-500">860 pts</div>
              </div>
            </div>
          </div>

          {/* Leaderboard Table */}
          <div className="kotlin-card">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rank
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Member
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      KUG
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Level
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contributions
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Points
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {/* Row 1 */}
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-kotlin-purple">1</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">John Doe</div>
                          <div className="text-xs text-gray-500">@johndoe</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">KUG Bangalore</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="kotlin-badge">Expert</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">28</div>
                      <div className="text-xs text-gray-500">
                        <span className="text-kotlin-purple">12 talks</span> • 
                        <span className="text-kotlin-blue"> 8 blogs</span> • 
                        <span className="text-kotlin-orange"> 8 code</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-kotlin-purple">
                      1,240
                    </td>
                  </tr>
                  
                  {/* Row 2 */}
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-kotlin-blue">2</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">Jane Smith</div>
                          <div className="text-xs text-gray-500">@janesmith</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">KUG Delhi</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="kotlin-badge">Intermediate</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">22</div>
                      <div className="text-xs text-gray-500">
                        <span className="text-kotlin-purple">6 talks</span> • 
                        <span className="text-kotlin-blue"> 10 blogs</span> • 
                        <span className="text-kotlin-orange"> 6 code</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-kotlin-blue">
                      980
                    </td>
                  </tr>
                  
                  {/* Row 3 */}
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-kotlin-orange">3</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">Alex Kumar</div>
                          <div className="text-xs text-gray-500">@alexkumar</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">KUG Jaipur</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="kotlin-badge">Expert</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">25</div>
                      <div className="text-xs text-gray-500">
                        <span className="text-kotlin-purple">8 talks</span> • 
                        <span className="text-kotlin-blue"> 7 blogs</span> • 
                        <span className="text-kotlin-orange"> 10 code</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-kotlin-orange">
                      860
                    </td>
                  </tr>
                  
                  {/* Row 4 */}
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium">4</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">Priya Sharma</div>
                          <div className="text-xs text-gray-500">@priyasharma</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">KUG Bangalore</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="kotlin-badge">Intermediate</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">19</div>
                      <div className="text-xs text-gray-500">
                        <span className="text-kotlin-purple">5 talks</span> • 
                        <span className="text-kotlin-blue"> 9 blogs</span> • 
                        <span className="text-kotlin-orange"> 5 code</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      720
                    </td>
                  </tr>
                  
                  {/* Row 5 */}
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium">5</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">Rahul Verma</div>
                          <div className="text-xs text-gray-500">@rahulverma</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">KUG Bangalore</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="kotlin-badge">Intermediate</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">18</div>
                      <div className="text-xs text-gray-500">
                        <span className="text-kotlin-purple">4 talks</span> • 
                        <span className="text-kotlin-blue"> 6 blogs</span> • 
                        <span className="text-kotlin-orange"> 8 code</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      680
                    </td>
                  </tr>
                  
                  {/* Row 6 */}
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium">6</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">Ananya Patel</div>
                          <div className="text-xs text-gray-500">@ananyapatel</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">KUG Delhi</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="kotlin-badge">Intermediate</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">16</div>
                      <div className="text-xs text-gray-500">
                        <span className="text-kotlin-purple">3 talks</span> • 
                        <span className="text-kotlin-blue"> 8 blogs</span> • 
                        <span className="text-kotlin-orange"> 5 code</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      640
                    </td>
                  </tr>
                  
                  {/* Row 7 */}
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium">7</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">Vikram Singh</div>
                          <div className="text-xs text-gray-500">@vikramsingh</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">KUG Jaipur</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="kotlin-badge">Intermediate</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">15</div>
                      <div className="text-xs text-gray-500">
                        <span className="text-kotlin-purple">4 talks</span> • 
                        <span className="text-kotlin-blue"> 5 blogs</span> • 
                        <span className="text-kotlin-orange"> 6 code</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      600
                    </td>
                  </tr>
                  
                  {/* Row 8 */}
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium">8</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">Neha Gupta</div>
                          <div className="text-xs text-gray-500">@nehagupta</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">KUG Delhi</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="kotlin-badge">Beginner</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">12</div>
                      <div className="text-xs text-gray-500">
                        <span className="text-kotlin-purple">2 talks</span> • 
                        <span className="text-kotlin-blue"> 7 blogs</span> • 
                        <span className="text-kotlin-orange"> 3 code</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      480
                    </td>
                  </tr>
                  
                  {/* Row 9 */}
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium">9</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">Arjun Reddy</div>
                          <div className="text-xs text-gray-500">@arjunreddy</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">KUG Bangalore</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="kotlin-badge">Beginner</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">10</div>
                      <div className="text-xs text-gray-500">
                        <span className="text-kotlin-purple">3 talks</span> • 
                        <span className="text-kotlin-blue"> 4 blogs</span> • 
                        <span className="text-kotlin-orange"> 3 code</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      420
                    </td>
                  </tr>
                  
                  {/* Row 10 */}
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium">10</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">Sanjay Mehta</div>
                          <div className="text-xs text-gray-500">@sanjaymehta</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">KUG Jaipur</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="kotlin-badge">Beginner</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">9</div>
                      <div className="text-xs text-gray-500">
                        <span className="text-kotlin-purple">2 talks</span> • 
                        <span className="text-kotlin-blue"> 3 blogs</span> • 
                        <span className="text-kotlin-orange"> 4 code</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      380
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of <span className="font-medium">156</span> members
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

          {/* Gamification Elements */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Gamification & Rewards</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Badges */}
              <div className="kotlin-card">
                <h3 className="text-xl font-bold mb-4">Badges</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-kotlin-purple bg-opacity-10 rounded-full flex items-center justify-center mb-2">
                      <svg className="w-8 h-8 text-kotlin-purple" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-xs font-medium text-center">Kotlin Beginner</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-kotlin-purple bg-opacity-10 rounded-full flex items-center justify-center mb-2">
                      <svg className="w-8 h-8 text-kotlin-purple" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
                      </svg>
                    </div>
                    <span className="text-xs font-medium text-center">Speaker</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-kotlin-purple bg-opacity-10 rounded-full flex items-center justify-center mb-2">
                      <svg className="w-8 h-8 text-kotlin-purple" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-xs font-medium text-center">Writer</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-kotlin-purple bg-opacity-10 rounded-full flex items-center justify-center mb-2">
                      <svg className="w-8 h-8 text-kotlin-purple" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-xs font-medium text-center">Coder</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-kotlin-purple bg-opacity-10 rounded-full flex items-center justify-center mb-2">
                      <svg className="w-8 h-8 text-kotlin-purple" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-xs font-medium text-center">Organizer</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-kotlin-purple bg-opacity-10 rounded-full flex items-center justify-center mb-2">
                      <svg className="w-8 h-8 text-kotlin-purple" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                      </svg>
                    </div>
                    <span className="text-xs font-medium text-center">Community Builder</span>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <Link href="/badges" className="text-kotlin-purple font-medium hover:underline">
                    View all badges →
                  </Link>
                </div>
              </div>
              
              {/* Levels */}
              <div className="kotlin-card">
                <h3 className="text-xl font-bold mb-4">Advocacy Levels</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Beginner</span>
                      <span className="text-sm text-gray-500">0-500 points</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gray-400 h-2 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Intermediate</span>
                      <span className="text-sm text-gray-500">501-1000 points</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-kotlin-blue h-2 rounded-full" style={{ width: '70%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Expert</span>
                      <span className="text-sm text-gray-500">1001-2000 points</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-kotlin-purple h-2 rounded-full" style={{ width: '30%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Master</span>
                      <span className="text-sm text-gray-500">2001+ points</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-kotlin-orange h-2 rounded-full" style={{ width: '5%' }}></div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">How to Level Up</h4>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-start">
                      <svg className="w-4 h-4 text-kotlin-purple mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Give talks at KUG meetups (50 points)</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-4 h-4 text-kotlin-purple mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Write blog posts about Kotlin (30 points)</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-4 h-4 text-kotlin-purple mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Contribute to Kotlin open source (40 points)</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-4 h-4 text-kotlin-purple mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Organize KUG events (60 points)</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Rewards */}
              <div className="kotlin-card">
                <h3 className="text-xl font-bold mb-4">Available Rewards</h3>
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium mb-1">KotlinConf Ticket</h4>
                        <p className="text-sm text-gray-600 mb-2">Free ticket to KotlinConf</p>
                        <div className="flex items-center">
                          <svg className="w-5 h-5 text-kotlin-purple mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-14a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm">Limited: 5 available</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="kotlin-badge-purple">1,000 points</span>
                      </div>
                    </div>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium mb-1">Kotlin Swag Pack</h4>
                        <p className="text-sm text-gray-600 mb-2">T-shirt, stickers, and more</p>
                        <div className="flex items-center">
                          <svg className="w-5 h-5 text-kotlin-purple mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-14a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm">Unlimited</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="kotlin-badge-blue">500 points</span>
                      </div>
                    </div>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium mb-1">1-on-1 Mentorship</h4>
                        <p className="text-sm text-gray-600 mb-2">30-minute session with Kotlin expert</p>
                        <div className="flex items-center">
                          <svg className="w-5 h-5 text-kotlin-purple mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-14a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm">Limited: 10 available</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="kotlin-badge-orange">300 points</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <Link href="/rewards" className="text-kotlin-purple font-medium hover:underline">
                    View all rewards →
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
