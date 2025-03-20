import Head from 'next/head';
import Link from 'next/link';

export default function KugPage() {
  return (
    <div className="min-h-screen">
      <Head>
        <title>KUG Bangalore - KUG Advocacy Platform</title>
        <meta name="description" content="Kotlin User Group Bangalore" />
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
        {/* KUG Header */}
        <section className="kotlin-gradient text-white py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/4 mb-8 md:mb-0 flex justify-center">
                <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center text-kotlin-purple text-4xl font-bold">
                  B
                </div>
              </div>
              <div className="md:w-3/4">
                <h1 className="text-4xl font-bold mb-2">KUG Bangalore</h1>
                <p className="text-xl mb-4">Founded: January 2023</p>
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="bg-white bg-opacity-20 rounded-lg px-4 py-2">
                    <span className="block text-sm">Members</span>
                    <span className="block text-2xl font-bold">120</span>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-lg px-4 py-2">
                    <span className="block text-sm">Events</span>
                    <span className="block text-2xl font-bold">24</span>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-lg px-4 py-2">
                    <span className="block text-sm">Talks</span>
                    <span className="block text-2xl font-bold">36</span>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-lg px-4 py-2">
                    <span className="block text-sm">Contributions</span>
                    <span className="block text-2xl font-bold">78</span>
                  </div>
                </div>
                <button className="kotlin-button bg-white text-kotlin-purple hover:bg-gray-100">
                  Join KUG
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Sidebar */}
            <div className="md:col-span-1">
              {/* KUG Leaders */}
              <div className="kotlin-card mb-8">
                <h2 className="text-xl font-bold mb-4">KUG Leaders</h2>
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                    <div>
                      <p className="font-medium">John Doe</p>
                      <p className="text-sm text-gray-600">Lead</p>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                    <div>
                      <p className="font-medium">Jane Smith</p>
                      <p className="text-sm text-gray-600">Co-Lead</p>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                    <div>
                      <p className="font-medium">Alex Kumar</p>
                      <p className="text-sm text-gray-600">Co-Lead</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* KUG Stats */}
              <div className="kotlin-card">
                <h2 className="text-xl font-bold mb-4">KUG Stats</h2>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="text-gray-600">Events:</span>
                    <span className="font-medium">24</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Talks:</span>
                    <span className="font-medium">36</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Blogs:</span>
                    <span className="font-medium">42</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">PRs:</span>
                    <span className="font-medium">78</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Total Points:</span>
                    <span className="font-medium">4,560</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Main Content */}
            <div className="md:col-span-2">
              {/* Upcoming Events */}
              <div className="kotlin-card mb-8">
                <h2 className="text-xl font-bold mb-4">Upcoming Events</h2>
                <div className="space-y-4">
                  <div className="border-b border-gray-200 pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold mb-1">Kotlin Everywhere</h3>
                        <p className="text-sm text-gray-600 mb-2">April 15, 2025 • 6:00 PM - 9:00 PM</p>
                        <p className="text-sm text-gray-600">TechHub, Bangalore</p>
                      </div>
                      <span className="kotlin-badge-orange">Meetup</span>
                    </div>
                    <div className="mt-3 flex justify-between items-center">
                      <span className="text-sm text-gray-600">45 RSVPs</span>
                      <button className="kotlin-button text-sm py-1 px-3">RSVP</button>
                    </div>
                  </div>
                  <div className="border-b border-gray-200 pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold mb-1">Monthly Meetup #25</h3>
                        <p className="text-sm text-gray-600 mb-2">May 20, 2025 • 6:30 PM - 8:30 PM</p>
                        <p className="text-sm text-gray-600">CoWork Space, Bangalore</p>
                      </div>
                      <span className="kotlin-badge-orange">Meetup</span>
                    </div>
                    <div className="mt-3 flex justify-between items-center">
                      <span className="text-sm text-gray-600">28 RSVPs</span>
                      <button className="kotlin-button text-sm py-1 px-3">RSVP</button>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <Link href="/events" className="text-kotlin-purple font-medium hover:underline">
                    View all events →
                  </Link>
                </div>
              </div>

              {/* Top Contributors */}
              <div className="kotlin-card mb-8">
                <h2 className="text-xl font-bold mb-4">Top Contributors</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-full mr-3"></div>
                    <div>
                      <p className="font-medium">John Doe</p>
                      <p className="text-sm text-gray-600">Points: 1,240</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-full mr-3"></div>
                    <div>
                      <p className="font-medium">Priya Sharma</p>
                      <p className="text-sm text-gray-600">Points: 860</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-full mr-3"></div>
                    <div>
                      <p className="font-medium">Rahul Verma</p>
                      <p className="text-sm text-gray-600">Points: 720</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-full mr-3"></div>
                    <div>
                      <p className="font-medium">Ananya Patel</p>
                      <p className="text-sm text-gray-600">Points: 680</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <Link href="/kugs/bangalore/leaderboard" className="text-kotlin-purple font-medium hover:underline">
                    View leaderboard →
                  </Link>
                </div>
              </div>

              {/* Recent Activities */}
              <div className="kotlin-card">
                <h2 className="text-xl font-bold mb-4">Recent Activities</h2>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="w-8 h-8 bg-gray-200 rounded-full mr-3 mt-1"></div>
                    <div>
                      <p>
                        <span className="font-medium">John Doe</span> gave a talk on{" "}
                        <span className="text-kotlin-purple">Kotlin Flow</span>
                      </p>
                      <p className="text-sm text-gray-600">2 days ago</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-8 h-8 bg-gray-200 rounded-full mr-3 mt-1"></div>
                    <div>
                      <p>
                        <span className="font-medium">Priya Sharma</span> published a blog on{" "}
                        <span className="text-kotlin-purple">Coroutines</span>
                      </p>
                      <p className="text-sm text-gray-600">3 days ago</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-8 h-8 bg-gray-200 rounded-full mr-3 mt-1"></div>
                    <div>
                      <p>
                        <span className="font-medium">Alex Kumar</span> organized{" "}
                        <span className="text-kotlin-purple">Kotlin Meetup #24</span>
                      </p>
                      <p className="text-sm text-gray-600">1 week ago</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-8 h-8 bg-gray-200 rounded-full mr-3 mt-1"></div>
                    <div>
                      <p>
                        <span className="font-medium">Rahul Verma</span> contributed to{" "}
                        <span className="text-kotlin-purple">KotlinX library</span>
                      </p>
                      <p className="text-sm text-gray-600">1 week ago</p>
                    </div>
                  </li>
                </ul>
                <div className="mt-4">
                  <Link href="/kugs/bangalore/activities" className="text-kotlin-purple font-medium hover:underline">
                    View all activities →
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
