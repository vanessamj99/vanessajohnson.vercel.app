import { NextResponse } from 'next/server';

// ============================================
// CONFIGURATION - Update these values as needed
// ============================================
// Note: Substack RSS feeds don't include subscriber counts,
// so update this manually when your subscriber count changes
const SUBSCRIBER_COUNT = 28; // Update this with your current subscriber count

// Cache configuration
const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 1 week in milliseconds

// In-memory cache (for serverless functions, consider using Vercel KV or similar)
let cachedData: any = null;
let lastFetchTime: number = 0;

export async function GET() {
  try {
    // Check if cache is valid (less than 1 week old)
    const now = Date.now();
    const cacheAge = now - lastFetchTime;
    
    if (cachedData && cacheAge < CACHE_DURATION) {
      console.log('Returning cached newsletter data');
      return NextResponse.json({
        ...cachedData,
        cached: true,
        cacheAge: Math.floor(cacheAge / 1000 / 60 / 60), // hours
        nextRefresh: Math.floor((CACHE_DURATION - cacheAge) / 1000 / 60 / 60) // hours until next refresh
      });
    }

    console.log('Fetching fresh newsletter data');
    
    // Fetch RSS feed from Substack
    const rssUrl = 'https://vanessaonmobile.substack.com/feed';
    const response = await fetch(rssUrl, {
      next: { revalidate: 604800 } // 1 week in seconds
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch RSS feed');
    }

    const xmlText = await response.text();
    
    // Parse XML to extract articles and channel description
    const articles = parseRSSFeed(xmlText);
    const channelDescription = parseChannelDescription(xmlText);
    
    // Get article count from RSS feed (subscriber count is set in config)
    const totalArticleCount = parseTotalArticleCount(xmlText);
    
    // Update cache
    cachedData = {
      subscribers: SUBSCRIBER_COUNT,
      articles: articles.slice(0, 10), // Get latest 10 articles for display
      totalArticles: totalArticleCount, // Total count of all articles
      description: channelDescription || "Vanessa On Mobile: Your weekly source for actionable insights, expert tips, and career strategies for Android engineers. Also, I'm building a side project that's in iOS for gut health. Come along for the ride!"
    };
    lastFetchTime = now;
    
    return NextResponse.json({
      ...cachedData,
      cached: false,
      lastUpdated: new Date(now).toISOString()
    });
    
  } catch (error) {
    console.error('Error fetching newsletter data:', error);
    
    // If we have cached data, return it even if expired
    if (cachedData) {
      console.log('Returning expired cache due to fetch error');
      return NextResponse.json({
        ...cachedData,
        cached: true,
        expired: true
      });
    }
    
    // Return fallback data with exact numbers
    return NextResponse.json({
      subscribers: SUBSCRIBER_COUNT,
      totalArticles: 0, // Will be calculated from RSS feed
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
      description: "Vanessa On Mobile: Your weekly source for actionable insights, expert tips, and career strategies for Android engineers. Also, I'm building a side project that's in iOS for gut health. Come along for the ride!",
      fallback: true
    });
  }
}

function parseRSSFeed(xmlText: string) {
  const articles: Array<{title: string, description: string, date: string}> = [];
  
  try {
    // Parse RSS feed with CDATA sections
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    const titleRegex = /<title><!\[CDATA\[([^\]]+)\]\]><\/title>/;
    const descriptionRegex = /<description><!\[CDATA\[([^\]]+)\]\]><\/description>/;
    const pubDateRegex = /<pubDate>([^<]+)<\/pubDate>/;
    
    let match;
    while ((match = itemRegex.exec(xmlText)) !== null) {
      const itemContent = match[1];
      
      const titleMatch = itemContent.match(titleRegex);
      const descriptionMatch = itemContent.match(descriptionRegex);
      const dateMatch = itemContent.match(pubDateRegex);
      
      if (titleMatch && descriptionMatch) {
        articles.push({
          title: titleMatch[1].trim(),
          description: descriptionMatch[1].trim(),
          date: dateMatch ? dateMatch[1].trim() : new Date().toISOString().split('T')[0]
        });
      }
    }
  } catch (error) {
    console.error('Error parsing RSS feed:', error);
  }
  
  return articles;
}

// Note: parseSubscriberCount function removed as Substack RSS doesn't include subscriber data
// Subscriber count is now configured at the top of the file as SUBSCRIBER_COUNT

function parseTotalArticleCount(xmlText: string): number {
  // Count the actual number of <item> tags in the RSS feed
  // This gives us the real count of newsletters published
  try {
    const itemMatches = xmlText.match(/<item>/g);
    if (itemMatches) {
      return itemMatches.length;
    }
    
    // Fallback: count using a more comprehensive regex
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let count = 0;
    let match;
    while ((match = itemRegex.exec(xmlText)) !== null) {
      count++;
    }
    
    return count;
  } catch (error) {
    console.error('Error parsing total article count:', error);
    return 0; // Return 0 if we can't parse, so it's obvious something is wrong
  }
}

function parseChannelDescription(xmlText: string): string | null {
  // Extract the <description> under <channel>
  const match = xmlText.match(/<channel>[\s\S]*?<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/);
  if (match && match[1]) {
    return match[1].trim();
  }
  // Fallback: try without CDATA
  const fallback = xmlText.match(/<channel>[\s\S]*?<description>([^<]+)<\/description>/);
  if (fallback && fallback[1]) {
    return fallback[1].trim();
  }
  
  // If no channel description found, extract from the first article's content
  // Look for the standard newsletter intro that appears in all articles
  const introMatch = xmlText.match(/<em>Hello Hello,<\/em><\/p><p><em>Welcome to my space on the internet where I talk about my experiences in the tech space whether it be projects I&#8217;m actively working on or events I attend\. If you are a tech lover, searching for an answer to your question within the mobile space, or just looking for a fellow woman in tech feel free to subscribe and stick around\. Happy to have you here in my corner\. &#128518;<\/em>/);
  
  if (introMatch) {
    return "Hello Hello,\n\nWelcome to my space on the internet where I talk about my experiences in the tech space whether it be projects I'm actively working on or events I attend. If you are a tech lover, searching for an answer to your question within the mobile space, or just looking for a fellow woman in tech feel free to subscribe and stick around. Happy to have you here in my corner. 😁";
  }
  
  // Try a simpler pattern to match the newsletter intro
  const simpleIntroMatch = xmlText.match(/Hello Hello,.*?Welcome to my space on the internet.*?Happy to have you here in my corner/);
  
  if (simpleIntroMatch) {
    return "Hello Hello,\n\nWelcome to my space on the internet where I talk about my experiences in the tech space whether it be projects I'm actively working on or events I attend. If you are a tech lover, searching for an answer to your question within the mobile space, or just looking for a fellow woman in tech feel free to subscribe and stick around. Happy to have you here in my corner. 😁";
  }
  
  return null;
} 