# NewsPortal Setup Guide

## Getting Started with NewsAPI

To get real news data, you'll need to:

1. **Get a free NewsAPI key:**
   - Visit [https://newsapi.org](https://newsapi.org)
   - Sign up for a free account
   - Get your API key from the dashboard

2. **Add your API key:**
   - Open `src/services/newsApi.ts`
   - Replace `YOUR_NEWS_API_KEY` with your actual API key
   - Example: `const API_KEY = 'abc123your-actual-api-key-here';`

3. **Rate Limits:**
   - Free plan: 1,000 requests per day
   - Development only (localhost)
   - For production, upgrade to a paid plan

## Features Included

✅ **Category Navigation** - Browse by Top Stories, World, Technology, Sports, Entertainment, etc.
✅ **Search Functionality** - Search for specific news topics
✅ **Responsive Design** - Works on desktop and mobile
✅ **Article Comments** - Users can comment on articles (stored locally)
✅ **Social Sharing** - Share articles via native sharing or clipboard
✅ **Error Handling** - Graceful fallbacks when API is unavailable
✅ **Caching** - 5-minute cache for better performance

## Demo Mode

The app includes sample articles for demonstration when NewsAPI is not configured. Real data will load automatically once you add your API key.

## Customization

- **Colors:** Edit `src/index.css` to change the orange theme
- **Categories:** Modify `categories` array in `src/services/newsApi.ts`
- **Layout:** Adjust components in `src/components/layout/`

## Production Deployment

For production use:
1. Get a paid NewsAPI plan
2. Set up environment variables for the API key
3. Enable CORS for your domain
4. Consider implementing server-side caching