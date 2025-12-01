'use client';

import { MessageSquare, ExternalLink } from 'lucide-react';
import { useState, useEffect } from 'react';

interface NewsletterData {
  subscribers: number;
  totalArticles: number;
  articles: Array<{
    title: string;
    description: string;
    date: string;
  }>;
  description: string;
}

export default function NewsletterSection() {
  const [newsletterData, setNewsletterData] = useState<NewsletterData>({
    subscribers: 0,
    totalArticles: 0,
    articles: [],
    description: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsletterData = async () => {
      try {
        // Fetch RSS feed from Substack
        const response = await fetch('/api/newsletter-data');
        if (response.ok) {
          const data = await response.json();
          setNewsletterData(data);
        } else {
          // Fallback data if API fails
          setNewsletterData({
            subscribers: 150,
            totalArticles: 0,
            articles: [
              {
                title: "Getting Started with Jetpack Compose",
                description: "A beginner's guide to modern Android UI development",
                date: "2024-12-15"
              },
              {
                title: "Android Interview Preparation",
                description: "Essential topics and strategies for mobile engineering interviews",
                date: "2024-12-08"
              },
              {
                title: "MVVM Architecture in Android",
                description: "Building maintainable apps with clean architecture",
                date: "2024-12-01"
              }
            ],
            description: "Your weekly source for actionable insights, expert tips, and career strategies for Android engineers."
          });
        }
      } catch (error) {
        console.error('Error fetching newsletter data:', error);
        // Fallback data
        setNewsletterData({
          subscribers: 25,
          totalArticles: 0,
          articles: [
            {
              title: "KotlinConf 2025: Recap - Speaker Edition",
              description: "My first speaking engagement at the biggest Kotlin conference in the world",
              date: "2025-05-29"
            },
            {
              title: "The First Dev on the Rise Was Kind of a Mess. I'm Still Glad I Did It.",
              description: "Hosting my first-ever podcast session on Google Developer Community Discord",
              date: "2025-05-17"
            },
            {
              title: "The Importance of Accessibility: KotlinConf Edition",
              description: "Building inclusive Jetpack Compose apps and leveraging accessibility tools",
              date: "2025-05-12"
            },
            {
              title: "Instance Wars: When Activities Multiply and Tasks Collide",
              description: "Understanding instances, tasks, activities, and the back stack in Android",
              date: "2025-05-05"
            },
            {
              title: "LaunchModes like your Mode of Transportation",
              description: "Working with launch modes, the android manifest, and instances of activities",
              date: "2025-04-22"
            }
          ],
          description: "Your weekly source for actionable insights, expert tips, and career strategies for Android engineers. Real experiences, real lessons, real growth."
        });
      } finally {
        setLoading(false);
      }
    };

    fetchNewsletterData();
  }, []);


  return (
    <section className="py-20 bg-gradient-to-br from-white to-cyan-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-600 to-indigo-600 rounded-full flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Vanessa On Mobile</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {loading ? "Loading..." : newsletterData.description}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-stretch">
            {/* Recent Publications */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-cyan-100 flex flex-col">
              <h4 className="font-semibold text-gray-900 mb-4">Recent Publications</h4>
              <div className="space-y-3">
                {loading ? (
                  <div className="space-y-3">
                    <div className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg animate-pulse">
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded"></div>
                    </div>
                    <div className="p-3 bg-gradient-to-r from-pink-50 to-orange-50 rounded-lg animate-pulse">
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded"></div>
                    </div>
                    <div className="p-3 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg animate-pulse">
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                ) : (
                  newsletterData.articles.slice(0, 3).map((article, index) => (
                    <div 
                      key={index}
                      className={`p-3 rounded-lg ${
                        index === 0 ? 'bg-gradient-to-r from-cyan-50 to-blue-50' :
                        index === 1 ? 'bg-gradient-to-r from-blue-50 to-indigo-50' :
                        'bg-gradient-to-r from-indigo-50 to-cyan-50'
                      }`}
                    >
                      <div className="font-medium text-sm text-gray-900">{article.title}</div>
                      <div className="text-xs text-gray-600">{article.description}</div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Newsletter Stats and Link */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-cyan-100 flex flex-col h-full">
              <h4 className="font-bold text-lg text-gray-900 mb-6">Newsletter Stats</h4>
              <div className="grid grid-cols-2 gap-6 mb-8 flex-grow">
                <div className="text-center p-6 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl">
                  <div className="text-4xl font-bold text-cyan-700 mb-2">
                    {loading ? "..." : newsletterData.subscribers}
                  </div>
                  <div className="text-sm font-medium text-gray-700">Subscribers</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                  <div className="text-4xl font-bold text-indigo-700 mb-2">
                    {loading ? "..." : newsletterData.totalArticles}
                  </div>
                  <div className="text-sm font-medium text-gray-700">Newsletters Published</div>
                </div>
              </div>
              
              <div className="mt-auto pt-6 border-t border-gray-200">
                <a
                  href="https://vanessaonmobile.substack.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-700 hover:to-indigo-700 text-white py-4 px-6 rounded-xl font-medium transition-all text-base"
                >
                  <ExternalLink className="w-5 h-5" />
                  View All Articles on Substack
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 