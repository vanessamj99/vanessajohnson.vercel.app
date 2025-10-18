'use client';

import { ArrowRight, Github, Mail, MessageSquare, Star, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';

// Import talks array from SpeakingSection
const talks = [
  {
    title: 'Building Inclusive Jetpack Compose Apps: Leveraging Kotlin and the Accessibility Scanner',
    conference: 'TechBash 2025',
    location: 'Poconos, Pennsylvania',
    date: 'November 5-7, 2025',
    status: 'upcoming',
    description: 'Sharing insights on building accessible Android applications using Jetpack Compose and the Accessibility Scanner.'
  },
  {
    title: 'Building Inclusive Jetpack Compose Apps: Leveraging Kotlin and the Accessibility Scanner',
    conference: 'Droidcon Italy 2025',
    location: 'Turin, Italy',
    date: 'November 19-20, 2025',
    status: 'upcoming',
    description: 'Sharing insights on building accessible Android applications using Jetpack Compose and leveraging the Accessibility Scanner for better user experience.'
  },
  {
    title: 'What if GraphQL Knew Accessibility',
    conference: 'GraphQLConf 2025',
    location: 'Amsterdam, The Netherlands',
    date: 'September 8-10, 2025',
    status: 'completed',
    link: 'https://www.youtube.com/watch?v=ttmp_zkHH_0',
    description: 'Exploring how GraphQL can be leveraged to build more accessible applications and improve user experience.'
  },
  {
    title: 'Building Inclusive Jetpack Compose Apps: Leveraging Kotlin and the Accessibility Scanner',
    conference: 'KotlinConf 2025',
    location: 'Copenhagen, Denmark',
    date: 'May 21-23, 2025',
    status: 'completed',
    link: 'https://kotlinconf.com/talks/795897/',
    description: 'Presented on building accessible Android applications using Jetpack Compose and leveraging the Accessibility Scanner for better user experience.'
  }
];

export default function HeroSection() {
  const [currentTime, setCurrentTime] = useState('');
  // Newsletter dynamic state
  const [newsletter, setNewsletter] = useState({
    description: "Loading newsletter data...",
    articles: [
      { title: "Loading..." },
      { title: "Loading..." },
      { title: "Loading..." }
    ],
    loading: true
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetch('/api/newsletter-data')
      .then(res => res.json())
      .then(data => {
        setNewsletter({
          description: data.description || "Vanessa On Mobile: Your weekly source for actionable insights, expert tips, and career strategies for Android engineers. Also, I'm building a side project that's in iOS for gut health. Come along for the ride!",
          articles: data.articles && data.articles.length > 0 ? data.articles.slice(0, 3) : [
            { title: "Loading recent publications..." },
            { title: "Loading recent publications..." },
            { title: "Loading recent publications..." }
          ],
          loading: false
        });
      })
      .catch(() => setNewsletter(n => ({ 
        ...n, 
        description: "Vanessa On Mobile: Your weekly source for actionable insights, expert tips, and career strategies for Android engineers. Also, I'm building a side project that's in iOS for gut health. Come along for the ride!",
        loading: false 
      })));
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-600 via-blue-600 to-indigo-700 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-blue-600 animate-pulse"></div>
      </div>
      
      <div className="container mx-auto px-2 sm:px-4 py-10 sm:py-20 relative z-10">
        <div className="flex justify-center">
          {/* Android Device Frame */}
          <div className="relative">
            {/* Phone Frame */}
            <div className="relative w-full max-w-[400px] h-[80vh] max-h-[700px] bg-gradient-to-br from-gray-900 to-gray-800 rounded-[3rem] p-2 shadow-2xl border-4 border-cyan-500/30">
              {/* Screen */}
              <div className="w-full h-full bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 rounded-[2.5rem] overflow-hidden relative">
                {/* Status Bar */}
                <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-r from-cyan-600 to-indigo-600 text-white flex items-center justify-between px-6 text-xs font-medium z-20">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                  </div>
                  <div className="font-mono">{currentTime}</div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-1.5 bg-white rounded-sm"></div>
                    <div className="w-1 h-1.5 bg-white rounded-sm"></div>
                  </div>
                </div>

                {/* App Content */}
                <div className="pt-8 h-full bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50">
                  {/* Navigation Bar */}
                  <div className="flex items-center justify-between px-6 py-4 bg-white/90 backdrop-blur-sm border-b border-cyan-100">
                    <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">V</span>
                    </div>
                    <h1 className="text-lg font-bold text-gray-900">Portfolio</h1>
                    <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">•••</span>
                    </div>
                  </div>

                  {/* Scrollable Content */}
                  <div className="h-full overflow-y-auto pb-24">
                    <div className="px-6 py-8 space-y-6">
                      {/* Profile Card */}
                      <div className="bg-gradient-to-br from-white to-cyan-50 rounded-2xl p-6 shadow-lg border border-cyan-100">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-xl">VJ</span>
                          </div>
                          <div>
                            <h2 className="text-xl font-bold text-gray-900">Vanessa Johnson</h2>
                            <p className="text-cyan-700 font-medium">Android Engineer</p>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          Building mobile experiences at The New York Times. 
                          Passionate about clean code, user experience, and the Android ecosystem.
                        </p>
                      </div>

                      {/* Quick Actions */}
                      <div className="grid grid-cols-2 gap-4">
                        <a
                          href="#contact"
                          className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white p-4 rounded-xl flex items-center justify-center gap-2 font-medium hover:from-cyan-700 hover:to-blue-700 transition-all cursor-pointer shadow-lg"
                        >
                          <Mail className="w-4 h-4" />
                          Contact
                        </a>
                        <a
                          href="https://github.com/vanessamj99"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white p-4 rounded-xl flex items-center justify-center gap-2 font-medium hover:from-teal-600 hover:to-cyan-700 transition-all cursor-pointer shadow-lg"
                        >
                          <Github className="w-4 h-4" />
                          GitHub
                        </a>
                      </div>

                      {/* Stats Cards */}
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-gradient-to-br from-cyan-100 to-blue-100 rounded-xl p-3 text-center shadow-sm border border-cyan-200">
                          <div className="text-lg font-bold text-cyan-800">1+</div>
                          <div className="text-xs text-gray-700">Years Exp</div>
                        </div>
                        <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl p-3 text-center shadow-sm border border-blue-200">
                          <div className="text-lg font-bold text-blue-800">{talks.length}</div>
                          <div className="text-xs text-gray-700">Talks</div>
                        </div>
                        <div className="bg-gradient-to-br from-teal-100 to-cyan-100 rounded-xl p-3 text-center shadow-sm border border-teal-200">
                          <div className="text-lg font-bold text-teal-800">3</div>
                          <div className="text-xs text-gray-700">Projects</div>
                        </div>
                      </div>

                      {/* Featured Project */}
                      <div className="bg-gradient-to-br from-cyan-600 to-indigo-600 rounded-2xl p-6 text-white shadow-lg">
                        <div className="flex items-center gap-3 mb-4">
                          <Star className="w-5 h-5 text-yellow-300" />
                          <span className="text-yellow-300 font-medium">Featured Project</span>
                        </div>
                        <h3 className="text-xl font-bold mb-4">
                          Kotlin Code Quality with Problems API
                        </h3>
                        <p className="text-white/90 mb-6 leading-relaxed text-sm">
                          Google Summer of Code 2025 project integrating the new Problems API in detekt and ktlint plugins to improve code quality tooling and provide better developer experience.
                        </p>
                        <div className="flex flex-wrap gap-2 mb-6">
                          <span className="px-3 py-1 bg-white/20 text-white rounded-full text-xs font-medium">Kotlin</span>
                          <span className="px-3 py-1 bg-white/20 text-white rounded-full text-xs font-medium">Gradle</span>
                          <span className="px-3 py-1 bg-white/20 text-white rounded-full text-xs font-medium">Problems API</span>
                          <span className="px-3 py-1 bg-white/20 text-white rounded-full text-xs font-medium">detekt</span>
                          <span className="px-3 py-1 bg-white/20 text-white rounded-full text-xs font-medium">ktlint</span>
                        </div>
                        <a
                          href="https://community.gradle.org/events/gsoc/2025/kotlin-code-quality-with-problems-api/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-white text-cyan-700 px-4 py-2 rounded-xl font-medium transition-colors"
                        >
                          View Project
                        </a>
                      </div>

                      {/* Recent Activity */}
                      <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-4 shadow-sm border border-blue-100">
                        <h3 className="font-semibold text-gray-900 mb-3">Recent Activity</h3>
                        <div className="space-y-2">
                          <div className="flex items-center gap-3 text-sm">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-gray-600">Spoke at GraphQLConf 2025</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-gray-600">Spoke at KotlinConf 2025</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm">
                            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                            <span className="text-gray-600">Google Summer of Code 2025</span>
                          </div>
                        </div>
                      </div>

                      {/* Current Focus */}
                      <div className="bg-gradient-to-br from-white to-pink-50 rounded-2xl p-4 shadow-sm border border-pink-100">
                        <h3 className="font-semibold text-gray-900 mb-3">Current Focus</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          Utilized Jetpack Compose in Kotlin, deeplinking, graphql, retrofit, practiced MVVM, used repositories & use cases throughout my work at the NYT thus far. I contributed to the big release of the friends tab, tech led adding the ConnectionsBot to the app, owned a new subscribe message in the app, and am currently tech leading a new upcoming feature.
                        </p>
                      </div>

                      {/* Skills Section */}
                      <div className="bg-gradient-to-br from-white to-teal-50 rounded-2xl p-4 shadow-sm border border-teal-100">
                        <h3 className="font-semibold text-gray-900 mb-3">Skills</h3>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1 bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-700 rounded-full text-xs border border-cyan-200">Kotlin</span>
                          <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 rounded-full text-xs border border-blue-200">Android SDK</span>
                          <span className="px-3 py-1 bg-gradient-to-r from-indigo-100 to-cyan-100 text-indigo-700 rounded-full text-xs border border-indigo-200">Jetpack Compose</span>
                          <span className="px-3 py-1 bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-700 rounded-full text-xs border border-teal-200">MVVM</span>
                          <span className="px-3 py-1 bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-700 rounded-full text-xs border border-cyan-200">Firebase</span>
                          <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 rounded-full text-xs border border-blue-200">Git</span>
                          <span className="px-3 py-1 bg-gradient-to-r from-indigo-100 to-teal-100 text-indigo-700 rounded-full text-xs border border-indigo-200">GraphQL</span>
                          <span className="px-3 py-1 bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-700 rounded-full text-xs border border-cyan-200">Room</span>
                          <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 rounded-full text-xs border border-blue-200">Retrofit</span>
                          <span className="px-3 py-1 bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-700 rounded-full text-xs border border-teal-200">SwiftUI</span>
                        </div>
                      </div>

                      {/* Newsletter Section */}
                      <div className="bg-gradient-to-br from-white to-cyan-50 rounded-2xl p-4 shadow-sm border border-cyan-100">
                        <div className="flex items-center gap-3 mb-3">
                          <MessageSquare className="w-5 h-5 text-cyan-700" />
                          <h3 className="font-semibold text-gray-900">Vanessa On Mobile</h3>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">
                          {newsletter.loading ? 'Loading...' : newsletter.description}
                        </p>
                        <div className="space-y-2 mb-4">
                          <div className="text-xs text-gray-500">Recent Publications:</div>
                          <div className="space-y-1">
                            {newsletter.loading ? (
                              <div className="text-sm text-gray-400">Loading...</div>
                            ) : (
                              newsletter.articles.map((article, idx) => (
                                <div key={idx} className="text-sm text-gray-700">• {article.title}</div>
                              ))
                            )}
                          </div>
                        </div>
                        <a
                          href="https://vanessaonmobile.substack.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-cyan-700 hover:text-cyan-800 font-medium text-sm transition-colors"
                        >
                          Subscribe to Newsletter
                        </a>
                      </div>

                      {/* Interests */}
                      <div className="bg-gradient-to-br from-white to-green-50 rounded-2xl p-4 shadow-sm border border-green-100">
                        <h3 className="font-semibold text-gray-900 mb-3">Interests</h3>
                        <div className="space-y-2 text-sm text-gray-600">
                          <div>• Mobile Development & UX</div>
                          <div>• Open Source Contributions</div>
                          <div>• Conference Speaking</div>
                          <div>• Accessibility in Tech</div>
                          <div>• Newsletter Publishing</div>
                        </div>
                      </div>

                      {/* Additional Content for Full Scrolling */}
                      <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-4 shadow-sm border border-blue-100">
                        <h3 className="font-semibold text-gray-900 mb-3">More Projects</h3>
                        <div className="space-y-3">
                          <div className="p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                            <div className="font-medium text-sm text-gray-900">From Scratch Labs</div>
                            <div className="text-xs text-gray-600">An upcoming educational platform</div>
                          </div>
                          <div className="p-3 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg border border-teal-200">
                            <div className="font-medium text-sm text-gray-900">GutFeeling</div>
                            <div className="text-xs text-gray-600">Health tracking app with AI insights</div>
                          </div>
                          <div className="p-3 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg border border-indigo-200">
                            <div className="font-medium text-sm text-gray-900">Gemini Collaboration IDE</div>
                            <div className="text-xs text-gray-600">Real-time collaborative coding platform</div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-white to-indigo-50 rounded-2xl p-4 shadow-sm border border-indigo-100">
                        <h3 className="font-semibold text-gray-900 mb-3">Speaking Highlights</h3>
                        <div className="space-y-2 text-sm text-gray-600">
                          <div>• TechBash 2025 - Building Inclusive Jetpack Compose Apps</div>
                          <div>• Droidcon Italy 2025 - Building Inclusive Jetpack Compose Apps</div>
                          <div>• GraphQLConf 2025 - What if GraphQL Knew Accessibility ✓</div>
                          <div>• KotlinConf 2025 - Building Inclusive Jetpack Compose Apps ✓</div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-white to-orange-50 rounded-2xl p-4 shadow-sm border border-orange-100">
                        <h3 className="font-semibold text-gray-900 mb-3">Open Source</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          Contributing to detekt and ktlint plugins, improving code quality tooling 
                          for the Kotlin ecosystem through Google Summer of Code 2025.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Scroll Indicator */}
                  <div className="absolute bottom-20 right-6 flex flex-col items-center gap-2 animate-bounce z-50">
                    <div className="w-6 h-10 border-2 border-gray-800 rounded-full flex justify-center bg-white shadow-lg">
                      <div className="w-1 h-3 bg-gray-800 rounded-full mt-2 animate-pulse"></div>
                    </div>
                    <div className="text-xs text-gray-800 font-bold bg-white px-2 py-1 rounded-full shadow-lg border border-gray-200">Scroll</div>
                  </div>

                  {/* Bottom Navigation */}
                  <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-cyan-200">
                    <div className="flex justify-around py-3">
                      <a href="#home" className="flex flex-col items-center">
                        <div className="w-6 h-6 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full mb-1"></div>
                        <span className="text-xs text-cyan-700 font-medium">Home</span>
                      </a>
                      <a href="#experience" className="flex flex-col items-center">
                        <div className="w-6 h-6 bg-gray-300 rounded-full mb-1"></div>
                        <span className="text-xs text-gray-400">Experience</span>
                      </a>
                      <a href="#projects" className="flex flex-col items-center">
                        <div className="w-6 h-6 bg-gray-300 rounded-full mb-1"></div>
                        <span className="text-xs text-gray-400">Projects</span>
                      </a>
                      <a href="#contact" className="flex flex-col items-center">
                        <div className="w-6 h-6 bg-gray-300 rounded-full mb-1"></div>
                        <span className="text-xs text-gray-400">Contact</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Home Button */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-cyan-400 to-indigo-400 rounded-full"></div>
              </div>
            </div>

            {/* Floating Action Button */}
            <a
              href="#experience"
              className="absolute -bottom-4 -right-4 w-12 h-12 bg-gradient-to-br from-cyan-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg hover:from-cyan-700 hover:to-indigo-700 transition-all cursor-pointer"
            >
              <ArrowRight className="w-6 h-6 text-white" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
