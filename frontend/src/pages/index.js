import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Head>
        <title>KUG Advocacy Platform</title>
        <meta name="description" content="Kotlin User Group Advocacy Platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-kotlin-purple">KUG Advocacy Platform</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login" className="kotlin-button-secondary">
              Login
            </Link>
            <Link href="/register" className="kotlin-button">
              Register
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Welcome Banner */}
        <section className="kotlin-gradient text-white py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h1 className="text-4xl font-bold mb-4">Welcome to KUG Advocacy Platform</h1>
                <p className="text-xl mb-6">
                  A unified platform for all city-based Kotlin User Group chapters to collaborate, grow, and track contributions.
                </p>
                <div className="flex space-x-4">
                  <Link href="/register" className="bg-white text-kotlin-purple font-bold py-2 px-6 rounded-full hover:bg-gray-100 transition-colors duration-300">
                    Join Now
                  </Link>
                  <Link href="/about" className="bg-transparent border border-white text-white font-bold py-2 px-6 rounded-full hover:bg-white hover:bg-opacity-10 transition-colors duration-300">
                    Learn More
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h2 className="text-kotlin-purple text-2xl font-bold mb-4">Global Stats</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-kotlin-blue">24</p>
                      <p className="text-gray-600">Active KUGs</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-kotlin-blue">1,240</p>
                      <p className="text-gray-600">Members</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-kotlin-orange">156</p>
                      <p className="text-gray-600">Events</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-kotlin-orange">720</p>
                      <p className="text-gray-600">Contributions</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured KUGs */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Featured KUGs</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* KUG Card 1 */}
              <div className="kotlin-card">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-kotlin-purple rounded-full flex items-center justify-center text-white text-2xl font-bold mr-4">
                    B
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">KUG Bangalore</h3>
                    <p className="text-gray-600">India</p>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Members: 120</p>
                  <p className="text-sm text-gray-600">Events: 24</p>
                </div>
                <Link href="/kugs/bangalore" className="text-kotlin-purple font-medium hover:underline">
                  View KUG →
                </Link>
              </div>

              {/* KUG Card 2 */}
              <div className="kotlin-card">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-kotlin-blue rounded-full flex items-center justify-center text-white text-2xl font-bold mr-4">
                    D
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">KUG Delhi</h3>
                    <p className="text-gray-600">India</p>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Members: 85</p>
                  <p className="text-sm text-gray-600">Events: 18</p>
                </div>
                <Link href="/kugs/delhi" className="text-kotlin-purple font-medium hover:underline">
                  View KUG →
                </Link>
              </div>

              {/* KUG Card 3 */}
              <div className="kotlin-card">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-kotlin-orange rounded-full flex items-center justify-center text-white text-2xl font-bold mr-4">
                    J
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">KUG Jaipur</h3>
                    <p className="text-gray-600">India</p>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Members: 65</p>
                  <p className="text-sm text-gray-600">Events: 12</p>
                </div>
                <Link href="/kugs/jaipur" className="text-kotlin-purple font-medium hover:underline">
                  View KUG →
                </Link>
              </div>
            </div>
            <div className="text-center mt-8">
              <Link href="/kugs" className="kotlin-button">
                View All KUGs
              </Link>
            </div>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Upcoming Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Event Card 1 */}
              <div className="kotlin-card">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold mb-2">Kotlin Everywhere</h3>
                    <p className="text-gray-600 mb-4">KUG Bangalore</p>
                  </div>
                  <span className="kotlin-badge-orange">Meetup</span>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">Date:</span> April 15, 2025
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">Time:</span> 6:00 PM - 9:00 PM
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Location:</span> TechHub, Bangalore
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <Link href="/events/1" className="text-kotlin-purple font-medium hover:underline">
                    View Details
                  </Link>
                  <button className="kotlin-button">RSVP</button>
                </div>
              </div>

              {/* Event Card 2 */}
              <div className="kotlin-card">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold mb-2">Kotlin Hackathon</h3>
                    <p className="text-gray-600 mb-4">KUG Delhi</p>
                  </div>
                  <span className="kotlin-badge-blue">Hackathon</span>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">Date:</span> May 10, 2025
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">Time:</span> 9:00 AM - 6:00 PM
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Location:</span> CoWork Space, Delhi
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <Link href="/events/2" className="text-kotlin-purple font-medium hover:underline">
                    View Details
                  </Link>
                  <button className="kotlin-button">RSVP</button>
                </div>
              </div>
            </div>
            <div className="text-center mt-8">
              <Link href="/events" className="kotlin-button">
                View All Events
              </Link>
            </div>
          </div>
        </section>

        {/* Top Contributors */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Top Contributors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Contributor Card 1 */}
              <div className="kotlin-card">
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-gray-200 rounded-full mb-4"></div>
                  <h3 className="text-xl font-bold mb-1">John Doe</h3>
                  <p className="text-gray-600 mb-2">KUG Bangalore</p>
                  <div className="flex space-x-2 mb-3">
                    <span className="kotlin-badge">Level: Expert</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Points:</span> 1,240
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Contributions:</span> 28
                  </p>
                </div>
              </div>

              {/* Contributor Card 2 */}
              <div className="kotlin-card">
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-gray-200 rounded-full mb-4"></div>
                  <h3 className="text-xl font-bold mb-1">Jane Smith</h3>
                  <p className="text-gray-600 mb-2">KUG Delhi</p>
                  <div className="flex space-x-2 mb-3">
                    <span className="kotlin-badge">Level: Intermediate</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Points:</span> 980
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Contributions:</span> 22
                  </p>
                </div>
              </div>

              {/* Contributor Card 3 */}
              <div className="kotlin-card">
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-gray-200 rounded-full mb-4"></div>
                  <h3 className="text-xl font-bold mb-1">Alex Kumar</h3>
                  <p className="text-gray-600 mb-2">KUG Jaipur</p>
                  <div className="flex space-x-2 mb-3">
                    <span className="kotlin-badge">Level: Expert</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Points:</span> 1,120
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Contributions:</span> 25
                  </p>
                </div>
              </div>

              {/* Contributor Card 4 */}
              <div className="kotlin-card">
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-gray-200 rounded-full mb-4"></div>
                  <h3 className="text-xl font-bold mb-1">Priya Sharma</h3>
                  <p className="text-gray-600 mb-2">KUG Bangalore</p>
                  <div className="flex space-x-2 mb-3">
                    <span className="kotlin-badge">Level: Intermediate</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Points:</span> 860
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Contributions:</span> 19
                  </p>
                </div>
              </div>
            </div>
            <div className="text-center mt-8">
              <Link href="/leaderboard" className="kotlin-button">
                View Leaderboard
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
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
