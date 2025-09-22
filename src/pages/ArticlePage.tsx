import { useState, useEffect } from 'react';
import { NewsArticle } from '@/services/newsApi';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';
import { ArrowLeft, Share2, ExternalLink, MessageCircle, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
}

interface ArticlePageProps {
  article: NewsArticle;
  onBack: () => void;
}

const ArticlePage = ({ article, onBack }: ArticlePageProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [authorName, setAuthorName] = useState('');
  const { toast } = useToast();

  // Load comments from localStorage
  useEffect(() => {
    const savedComments = localStorage.getItem(`comments-${article.id}`);
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    }
  }, [article.id]);

  // Save comments to localStorage
  const saveComments = (updatedComments: Comment[]) => {
    localStorage.setItem(`comments-${article.id}`, JSON.stringify(updatedComments));
    setComments(updatedComments);
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !authorName.trim()) {
      toast({
        title: "Missing information",
        description: "Please enter your name and comment",
        variant: "destructive"
      });
      return;
    }

    const comment: Comment = {
      id: Date.now().toString(),
      author: authorName.trim(),
      content: newComment.trim(),
      timestamp: new Date()
    };

    const updatedComments = [comment, ...comments];
    saveComments(updatedComments);
    setNewComment('');
    
    toast({
      title: "Comment added",
      description: "Your comment has been posted successfully"
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.description,
        url: article.url,
      });
    } else {
      navigator.clipboard.writeText(article.url);
      toast({
        title: "Link copied",
        description: "Article link copied to clipboard"
      });
    }
  };

  const timeAgo = formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true });

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" onClick={onBack} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to News
        </Button>
        <div className="flex items-center gap-2 ml-auto">
          <Button variant="outline" onClick={handleShare} className="gap-2">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
          <Button variant="outline" onClick={() => window.open(article.url, '_blank')} className="gap-2">
            <ExternalLink className="h-4 w-4" />
            Original
          </Button>
        </div>
      </div>

      {/* Article */}
      <article className="news-card mb-8">
        {/* Featured Image */}
        <div className="news-card-image aspect-video mb-6">
          <img
            src={article.urlToImage}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 bg-primary/90 text-primary-foreground px-3 py-1 rounded text-sm font-medium">
            {article.source.name}
          </div>
        </div>

        <div className="p-6">
          {/* Title */}
          <h1 className="text-3xl font-bold mb-4 leading-tight">
            {article.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6 border-b border-border pb-4">
            {article.author && <span>By {article.author}</span>}
            <span>{timeAgo}</span>
            <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
          </div>

          {/* Description */}
          <div className="prose prose-lg max-w-none mb-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              {article.description}
            </p>
            {article.content && (
              <div className="mt-4 text-foreground leading-relaxed">
                {article.content}
              </div>
            )}
          </div>
        </div>
      </article>

      {/* Comments Section */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <MessageCircle className="h-5 w-5" />
          <h2 className="text-xl font-semibold">Comments ({comments.length})</h2>
        </div>

        {/* Add Comment Form */}
        <form onSubmit={handleSubmitComment} className="mb-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Your name"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="px-3 py-2 border border-border rounded-md bg-background"
              required
            />
          </div>
          <Textarea
            placeholder="Write your comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[100px]"
            required
          />
          <Button type="submit" className="gap-2">
            <Send className="h-4 w-4" />
            Post Comment
          </Button>
        </form>

        {/* Comments List */}
        <div className="space-y-4">
          {comments.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No comments yet. Be the first to share your thoughts!
            </p>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="border-b border-border pb-4 last:border-b-0">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">
                      {comment.author.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-sm">{comment.author}</span>
                    <span className="text-xs text-muted-foreground ml-2">
                      {formatDistanceToNow(comment.timestamp, { addSuffix: true })}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-foreground ml-10">{comment.content}</p>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
};

export default ArticlePage;