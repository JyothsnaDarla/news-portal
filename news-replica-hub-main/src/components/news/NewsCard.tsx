import { NewsArticle } from '@/services/newsApi';
import { formatDistanceToNow } from 'date-fns';
import { ExternalLink, Share2, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NewsCardProps {
  article: NewsArticle;
  onClick: () => void;
}

const NewsCard = ({ article, onClick }: NewsCardProps) => {
  const timeAgo = formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true });

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.description,
        url: article.url,
      });
    } else {
      navigator.clipboard.writeText(article.url);
    }
  };

  const handleExternalLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(article.url, '_blank');
  };

  return (
    <article className="news-card cursor-pointer group" onClick={onClick}>
      {/* Article Image */}
      <div className="news-card-image aspect-video">
        <img
          src={article.urlToImage}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Source badge */}
        <div className="absolute top-3 left-3 bg-primary/90 text-primary-foreground px-2 py-1 rounded text-xs font-medium">
          {article.source.name}
        </div>
      </div>

      {/* Article Content */}
      <div className="p-4">
        {/* Title */}
        <h2 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {article.title}
        </h2>

        {/* Description */}
        <p className="text-muted-foreground text-sm mb-3 line-clamp-3">
          {article.description}
        </p>

        {/* Meta information */}
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
          <div className="flex items-center gap-3">
            {article.author && (
              <span>By {article.author}</span>
            )}
            <span>{timeAgo}</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-xs gap-1">
              <MessageCircle className="h-3 w-3" />
              Comments
            </Button>
          </div>
          
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="text-xs gap-1"
            >
              <Share2 className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleExternalLink}
              className="text-xs gap-1"
            >
              <ExternalLink className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;