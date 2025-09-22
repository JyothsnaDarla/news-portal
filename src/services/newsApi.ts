import axios from 'axios';

// Note: In a production app, you should get the API key from environment variables
// For this demo, users will need to replace this with their NewsAPI key
const API_KEY = 'YOUR_NEWS_API_KEY'; // Users need to replace this
const BASE_URL = 'https://newsapi.org/v2';

export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  content: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  author: string;
  source: {
    id: string;
    name: string;
  };
}

export interface NewsResponse {
  articles: NewsArticle[];
  totalResults: number;
  status: string;
}

export interface NewsCategory {
  id: string;
  name: string;
  icon: string;
}

export const categories: NewsCategory[] = [
  { id: 'general', name: 'Top Stories', icon: '🔥' },
  { id: 'world', name: 'World', icon: '🌍' },
  { id: 'technology', name: 'Technology', icon: '💻' },
  { id: 'sports', name: 'Sports', icon: '⚽' },
  { id: 'entertainment', name: 'Entertainment', icon: '🎬' },
  { id: 'business', name: 'Business', icon: '💼' },
  { id: 'health', name: 'Health', icon: '🏥' },
  { id: 'science', name: 'Science', icon: '🔬' }
];

const newsApi = axios.create({
  baseURL: BASE_URL,
  params: {
    apiKey: API_KEY,
    country: 'us',
    pageSize: 20
  }
});

export const fetchTopHeadlines = async (category?: string): Promise<NewsResponse> => {
  try {
    const response = await newsApi.get('/top-headlines', {
      params: category ? { category } : {}
    });
    
    return {
      ...response.data,
      articles: response.data.articles.map((article: any, index: number) => ({
        ...article,
        id: `${Date.now()}-${index}`,
        // Fallback for missing images
        urlToImage: article.urlToImage || `https://via.placeholder.com/400x200?text=${encodeURIComponent(article.title.slice(0, 30))}`
      }))
    };
  } catch (error) {
    console.error('Error fetching news:', error);
    // Return mock data for development
    return getMockNews(category);
  }
};

export const searchNews = async (query: string, page: number = 1): Promise<NewsResponse> => {
  try {
    const response = await newsApi.get('/everything', {
      params: {
        q: query,
        page,
        sortBy: 'publishedAt'
      }
    });
    
    return {
      ...response.data,
      articles: response.data.articles.map((article: any, index: number) => ({
        ...article,
        id: `${Date.now()}-${index}`,
        urlToImage: article.urlToImage || `https://via.placeholder.com/400x200?text=${encodeURIComponent(article.title.slice(0, 30))}`
      }))
    };
  } catch (error) {
    console.error('Error searching news:', error);
    return getMockNews();
  }
};

// Mock data for development/demo purposes
const getMockNews = (category?: string): NewsResponse => {
  const mockArticles: NewsArticle[] = [
    {
      id: '1',
      title: 'Breaking: Major Technology Breakthrough Announced',
      description: 'Scientists have announced a groundbreaking discovery that could revolutionize the tech industry...',
      content: 'Full article content would be here...',
      url: 'https://example.com/tech-breakthrough',
      urlToImage: 'https://images.unsplash.com/photo-1518976024611-28bf4ac3b3da?w=400&h=200&fit=crop',
      publishedAt: new Date().toISOString(),
      author: 'Tech Reporter',
      source: { id: 'tech-news', name: 'Tech News' }
    },
    {
      id: '2',
      title: 'Global Economic Summit Addresses Climate Change',
      description: 'World leaders gather to discuss economic policies addressing climate change...',
      content: 'Full article content would be here...',
      url: 'https://example.com/economic-summit',
      urlToImage: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=200&fit=crop',
      publishedAt: new Date(Date.now() - 3600000).toISOString(),
      author: 'World Reporter',
      source: { id: 'world-news', name: 'World News' }
    },
    {
      id: '3',
      title: 'Sports Championship Finals Draw Record Viewership',
      description: 'The championship finals broke all previous viewership records...',
      content: 'Full article content would be here...',
      url: 'https://example.com/sports-finals',
      urlToImage: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=200&fit=crop',
      publishedAt: new Date(Date.now() - 7200000).toISOString(),
      author: 'Sports Writer',
      source: { id: 'sports-news', name: 'Sports News' }
    }
  ];

  return {
    articles: mockArticles,
    totalResults: mockArticles.length,
    status: 'ok'
  };
};