'use client';

import { Calendar, MapPin, ExternalLink, Mic, ChevronRight } from 'lucide-react';

interface Talk {
  title: string;
  conference: string;
  location: string;
  date: string;
  status: 'completed' | 'upcoming';
  link?: string;
  description: string;
}

const talks: Talk[] = [
  {
    title: 'Stop Guessing A11y: Auto Generate Playwright Tests from Your GraphQL Schema',
    conference: 'SeleniumConf & AppiumConf 2026',
    location: 'Valencia, Spain',
    date: 'May 6-8, 2026',
    status: 'upcoming',
    description: 'Demonstrating how to turn schema-level accessibility annotations into Playwright coverage automatically—cutting flakiness, raising confidence, and giving QA repeatable a11y checks out of the box.'
  },
  {
    title: 'Server Driven Accessibility: Embedding UI Semantics Into Your GraphQL Schema',
    conference: 'Devoxx Greece 2026',
    location: 'Athens, Greece',
    date: 'April 23-25, 2026',
    status: 'upcoming',
    description: 'A deep dive into driving accessibility from the backend by pushing semantic hints through GraphQL. We cover directive patterns, client fallbacks, and how to keep accessibility metadata fresh as products ship quickly.'
  },
  {
    title: 'What if Your API Spoke Accessibility?',
    conference: 'APIDays Paris 2025',
    location: 'Paris, France',
    date: 'December 9-11, 2025',
    status: 'completed',
    link: 'https://www.youtube.com/watch?v=yjbcfc_0vBM',
    description: 'APIs shape the user experience long before UI code is written, but accessibility is almost always left until the end. This talk shows how to embed accessibility metadata directly into GraphQL schemas using custom directives and code generation, enabling clients (Android, iOS, and web) to get accessible defaults from day one. We\'ll cover directive design, exposing metadata in generated types, and how frontends like Jetpack Compose or SwiftUI consume it. A repository with working code examples is available alongside the recorded session.'
  },
  {
    title: 'Building Inclusive Jetpack Compose Apps: Leveraging Kotlin and the Accessibility Scanner',
    conference: 'Droidcon Italy 2025',
    location: 'Turin, Italy',
    date: 'November 19-20, 2025',
    status: 'completed',
    description: 'Accessibility is a growing and important aspect in app development that isn\'t always prioritized. This talk explores how Jetpack Compose\'s Kotlin-based declarative approach offers a simplified path to building inclusive UIs. Learn about Kotlin-based Semantics, navigational cues, and how to leverage the Accessibility Scanner to quickly identify and address common accessibility issues. Discover straightforward changes that yield dramatic improvements for user experience, making your apps more user-friendly for a wide range of individuals.'
  },
  {
    title: 'Code & Hydrate: Build a Water Intake Tracker App (Android Edition)',
    conference: 'Mentor Me Collective Workshop',
    location: 'Virtual',
    date: 'October 2025',
    status: 'completed',
    link: 'https://www.youtube.com/watch?v=J1YBcZzvS64',
    description: 'Led a beginner friendly workshop on Android app development, teaching participants to build a water intake tracker app using Kotlin, XML UI design, and local storage with SharedPreferences.'
  },
  {
    title: 'What if GraphQL Knew Accessibility',
    conference: 'GraphQLConf 2025',
    location: 'Amsterdam, The Netherlands',
    date: 'September 8-10, 2025',
    status: 'completed',
    link: 'https://www.youtube.com/watch?v=ttmp_zkHH_0',
    description: 'What if your GraphQL schema could do more than provide data? What if it could help your app be more accessible from the start? This lightning talk explores embedding accessibility metadata directly into GraphQL schemas. Inspired by Kotlin semantics in Jetpack Compose, we\'ll examine annotating fields with labels, roles, or screen reader hints that support screen readers, improve navigation, and power automated accessibility testing. This is a call to rethink the developer experience and treat accessibility as a first-class concern, reimagining GraphQL not just as a data layer, but as an inclusive design enabler.'
  },
  {
    title: 'Building Inclusive Jetpack Compose Apps: Leveraging Kotlin and the Accessibility Scanner',
    conference: 'KotlinConf 2025',
    location: 'Copenhagen, Denmark',
    date: 'May 21-23, 2025',
    status: 'completed',
    link: 'https://kotlinconf.com/talks/795897/',
    description: 'Accessibility is a growing and important aspect in app development that isn\'t always prioritized. Google\'s efforts include making apps more accessible through Jetpack Compose, their new standard for building UIs. Jetpack Compose\'s Kotlin-based declarative approach offers a simplified path to building inclusive UIs. Within Jetpack Compose, powerful tools like the Accessibility Scanner can quickly identify and address common accessibility issues, improving the overall user experience. This talk demonstrates that straightforward changes yield dramatic improvements, showing concrete strategies to increase inclusivity in your projects.'
  }
];

export default function SpeakingSection() {
  return (
    <section id="speaking" className="py-12 bg-white">
      <div className="container mx-auto px-4">
        {/* App Header */}
        <div className="bg-gradient-to-r from-cyan-600 to-indigo-600 rounded-2xl p-6 mb-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-1">
                Speaking
              </h2>
              <p className="text-white/80 text-sm">
                Sharing knowledge at conferences & in workshops
              </p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Mic className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Talks List */}
        <div className="space-y-4">
          {talks.map((talk, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-600 to-indigo-600 rounded-xl flex items-center justify-center">
                      <Mic className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 line-clamp-2">
                        {talk.title}
                      </h3>
                      <p className="text-primary font-medium">{talk.conference}</p>
                    </div>
                  </div>
                  
                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{talk.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{talk.date}</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      talk.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-orange-100 text-orange-800'
                    }`}>
                      {talk.status === 'completed' ? 'Completed' : 'Upcoming'}
                    </span>
                  </div>
                </div>

              </div>

              {/* Description */}
              <p className="text-gray-700 mb-4 leading-relaxed text-sm">
                {talk.description}
              </p>

              {/* Action Button */}
              {talk.link && (
                <div className="flex justify-end">
                  <a
                    href={talk.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
                  >
                    View Details
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-8 bg-gray-50 rounded-2xl p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Interested in having me speak?
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            I'm always open to new speaking opportunities
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
} 