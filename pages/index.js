// pages/index.js
import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(
        `https://haveibeenpwned.com/api/v3/breachedaccount/${encodeURIComponent(email)}?truncateResponse=false`,
        {
          headers: {
            'hibp-api-key': process.env.NEXT_PUBLIC_HIBP_API_KEY,
            'User-Agent': 'WeScan Security App'
          }
        }
      );

      if (response.status === 404) {
        setResults({ breaches: [] });
      } else if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      } else {
        const breaches = await response.json();
        setResults({ breaches });
      }
    } catch (err) {
      setError(err.message || 'Failed to check email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Navbar Component
  const Navbar = () => (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mr-3">
            <span className="font-bold text-white">W</span>
          </div>
          <span className="text-xl font-bold">WeScan</span>
        </div>
        
        <div className="hidden md:flex space-x-8">
          {['Home', 'About', 'Blog', 'Contact', 'FAQ'].map((item) => (
            <a 
              key={item} 
              href="#" 
              className="text-gray-300 hover:text-white transition-colors"
            >
              {item}
            </a>
          ))}
        </div>
        
        <button className="md:hidden text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </nav>
  );

  // Blog Section Component
  const BlogSection = () => {
    const blogPosts = [
      {
        id: 1,
        title: "Understanding Data Breaches",
        excerpt: "Learn how data breaches happen and what you can do to protect yourself.",
        date: "June 12, 2025",
        category: "Security"
      },
      {
        id: 2,
        title: "Password Best Practices for 2025",
        excerpt: "Upgrade your password strategy with these modern security recommendations.",
        date: "June 5, 2025",
        category: "Tips"
      },
      {
        id: 3,
        title: "The Future of Digital Identity Protection",
        excerpt: "Where identity protection is heading in the next decade.",
        date: "May 28, 2025",
        category: "Insights"
      }
    ];

    return (
      <section className="py-16">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold">Latest from our Blog</h2>
          <a href="#" className="text-blue-400 hover:text-blue-300">View all →</a>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {blogPosts.map(post => (
            <div key={post.id} className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-300">
              <div className="h-48 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
              <div className="p-6">
                <div className="flex justify-between text-sm text-gray-400 mb-3">
                  <span>{post.date}</span>
                  <span className="text-blue-400">{post.category}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                <p className="text-gray-400 mb-4">{post.excerpt}</p>
                <a href="#" className="text-blue-400 hover:text-blue-300 font-medium">Read more →</a>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };

  // Footer Component
  const Footer = () => (
    <footer className="bg-gray-900 border-t border-gray-800 py-10">
      <div className="container mx-auto px-4 text-center">
        <p className="text-gray-500">
          © 2025 WeScan — Built to protect, not to profit.
        </p>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Head>
        <title>WeScan - Protect Your Digital Identity</title>
        <meta name="description" content="Check if your email has been exposed in data breaches" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <section className="text-center py-20">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Protect Your Digital Identity
          </h1>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Enter your email to check if your data has been compromised.
          </p>
          
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="flex-grow px-5 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className={`px-8 py-3 rounded-lg font-medium transition-all ${loading ? 'bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} shadow-lg shadow-blue-500/20`}
              >
                {loading ? 'Scanning...' : 'Scan Now'}
              </button>
            </div>
          </form>
          
          <p className="mt-8 text-gray-400 italic max-w-2xl mx-auto">
            Born from concern, built with care — WeScan protects people like you.
          </p>
        </section>
        
        {error && (
          <div className="bg-red-900/30 border border-red-500 rounded-xl p-6 max-w-2xl mx-auto mb-10">
            <h3 className="text-red-400 font-bold text-xl mb-2">Error</h3>
            <p className="text-red-300">{error}</p>
          </div>
        )}
        
        {results && (
          <div className={`bg-gray-800 rounded-xl p-6 max-w-2xl mx-auto mb-10 border ${results.breaches.length > 0 ? 'border-red-500' : 'border-green-500'}`}>
            <h2 className="text-2xl font-bold mb-4">
              {results.breaches.length > 0 
                ? '⚠️ Your email has been compromised' 
                : '✅ Your email is secure'}
            </h2>
            
            {results.breaches.length > 0 ? (
              <>
                <p className="mb-4">
                  Your email was found in <span className="font-bold text-red-400">{results.breaches.length}</span> data breaches.
                </p>
                
                <div className="space-y-3">
                  {results.breaches.map(breach => (
                    <div key={breach.Name} className="bg-gray-700/50 p-4 rounded-lg">
                      <h3 className="font-bold">{breach.Title}</h3>
                      <p className="text-sm text-gray-400">
                        Breached on: {new Date(breach.BreachDate).toLocaleDateString()} • 
                        Compromised data: {breach.DataClasses.slice(0, 3).join(', ')}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p>No breaches found for this email address. We recommend continuing to practice good security habits.</p>
            )}
            
            <button 
              onClick={() => setResults(null)} 
              className="mt-6 text-blue-400 hover:text-blue-300"
            >
              Check another email
            </button>
          </div>
        )}
        
        <BlogSection />
      </main>
      
      <Footer />
    </div>
  );
}
