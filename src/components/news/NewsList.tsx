import { NewsArticle } from '@/services/newsApi';
import NewsCard from './NewsCard';
import { Skeleton } from '@/components/ui/skeleton';

interface NewsListProps {
  articles: NewsArticle[];
  loading: boolean;
  onArticleClick: (article: NewsArticle) => void;
}

const NewsList = ({ articles, loading, onArticleClick }: NewsListProps) => {
  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="news-card">
            <Skeleton className="aspect-video rounded-t-lg" />
            <div className="p-4 space-y-3">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <div className="flex justify-between">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
          <span className="text-2xl">📰</span>
        </div>
        <h3 className="text-lg font-semibold mb-2">No articles found</h3>
        <p className="text-muted-foreground">Try searching for different keywords or check back later.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <NewsCard
          key={article.id}
          article={article}
          onClick={() => onArticleClick(article)}
        />
      ))}
    </div>
  );
};

export default NewsList;