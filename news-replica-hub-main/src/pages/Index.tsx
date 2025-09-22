import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchTopHeadlines, searchNews, categories, NewsArticle } from '@/services/newsApi';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import NewsList from '@/components/news/NewsList';
import ArticlePage from '@/pages/ArticlePage';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Wifi } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [activeCategory, setActiveCategory] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Fetch news based on active category or search query
  const { data: newsData, isLoading, error, refetch } = useQuery({
    queryKey: ['news', activeCategory, searchQuery],
    queryFn: () => {
      if (searchQuery) {
        return searchNews(searchQuery);
      }
      return fetchTopHeadlines(activeCategory === 'general' ? undefined : activeCategory);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const categoryName = useMemo(() => {
    if (searchQuery) return `Search: "${searchQuery}"`;
    return categories.find(cat => cat.id === activeCategory)?.name || 'Top Stories';
  }, [activeCategory, searchQuery]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setSearchQuery(''); // Clear search when changing category
    setSidebarOpen(false);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setActiveCategory('general'); // Reset category when searching
  };

  const handleArticleClick = (article: NewsArticle) => {
    setSelectedArticle(article);
  };

  const handleBackToNews = () => {
    setSelectedArticle(null);
  };

  // Show article page if an article is selected
  if (selectedArticle) {
    return (
      <div className="min-h-screen bg-background">
        <Header onSearch={handleSearch} onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        <div className="max-w-7xl mx-auto px-4 py-6">
          <ArticlePage article={selectedArticle} onBack={handleBackToNews} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={handleSearch} onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex">
        <Sidebar
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        
        <main className="flex-1 md:ml-64 p-6">
          <div className="max-w-6xl mx-auto">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-foreground mb-1">{categoryName}</h1>
                <p className="text-muted-foreground">
                  {newsData?.totalResults} articles available
                </p>
              </div>
              
              {error && (
                <Button
                  variant="outline"
                  onClick={() => refetch()}
                  className="gap-2"
                >
                  <Wifi className="h-4 w-4" />
                  Retry
                </Button>
              )}
            </div>

            {/* Error Alert */}
            {error && (
              <Alert className="mb-6 border-destructive/20 bg-destructive/5">
                <AlertCircle className="h-4 w-4 text-destructive" />
                <AlertDescription className="text-destructive">
                  Unable to fetch news. Please check your NewsAPI key in the code or try again later.
                  Showing sample articles for demonstration.
                </AlertDescription>
              </Alert>
            )}

            {/* News List */}
            <NewsList
              articles={newsData?.articles || []}
              loading={isLoading}
              onArticleClick={handleArticleClick}
            />

            {/* API Key Notice */}
            {!isLoading && (
              <Alert className="mt-8 border-primary/20 bg-primary/5">
                <AlertCircle className="h-4 w-4 text-primary" />
                <AlertDescription>
                  <strong>Note:</strong> To fetch real news data, replace <code>YOUR_NEWS_API_KEY</code> in 
                  <code>src/services/newsApi.ts</code> with your actual NewsAPI key from{' '}
                  <a href="https://newsapi.org" target="_blank" rel="noopener noreferrer" className="underline">
                    newsapi.org
                  </a>
                </AlertDescription>
              </Alert>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
