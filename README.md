# NewsPortal - Modern News Application

A beautiful, responsive news portal built with React, TypeScript, and Tailwind CSS. Features real-time news from NewsAPI with category filtering, search functionality, and user comments.

## 🌟 Features

- **📰 Real-time News**: Powered by NewsAPI with live updates
- **🔍 Smart Search**: Find articles by keywords instantly
- **📱 Responsive Design**: Perfect on desktop, tablet, and mobile
- **🎨 Modern UI**: Clean design inspired by leading news sites
- **💬 Comment System**: Users can comment on articles
- **📊 Categories**: Browse by Technology, Sports, Entertainment, and more
- **⚡ Fast Loading**: Optimized with caching and lazy loading
- **🔗 Social Sharing**: Native sharing and clipboard support

## 🚀 Quick Start

### 1. Get Your NewsAPI Key
- Visit [NewsAPI.org](https://newsapi.org) and sign up for free
- Get your API key from the dashboard

### 2. Configure the API
- Open `src/services/newsApi.ts`
- Replace `YOUR_NEWS_API_KEY` with your actual API key:
```typescript
const API_KEY = 'your-actual-api-key-here';
```

### 3. Run the Application
```bash
npm install
npm run dev
```

## 📱 Design Reference

This application replicates a modern news portal design featuring:
- **Orange/Saffron Color Scheme**: Professional and eye-catching
- **Clean Typography**: Readable and accessible fonts
- **Card-based Layout**: Easy to scan article previews
- **Intuitive Navigation**: Sidebar categories with visual icons
- **Responsive Grid**: Adapts beautifully to any screen size

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS, Shadcn/ui components
- **State Management**: TanStack Query for data fetching
- **Routing**: React Router DOM
- **API**: NewsAPI for real-time news data
- **Icons**: Lucide React
- **Date Formatting**: date-fns

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/         # Header, Sidebar components
│   ├── news/          # NewsCard, NewsList components
│   └── ui/            # Reusable UI components
├── pages/             # ArticlePage and main Index
├── services/          # NewsAPI integration
└── utils/             # Utility functions and setup
```

## 🎨 Customization

### Colors & Theme
Edit `src/index.css` to modify the color scheme:
```css
--primary: 25 95% 53%;  /* Main orange color */
--primary-hover: 25 95% 48%;  /* Darker orange */
```

### Categories
Add or modify news categories in `src/services/newsApi.ts`:
```typescript
export const categories: NewsCategory[] = [
  { id: 'your-category', name: 'Your Category', icon: '🆕' },
  // ... existing categories
];
```

## 🔧 API Configuration

### Development
- Uses NewsAPI free tier (1,000 requests/day)
- Limited to localhost development
- Mock data available when API is unavailable

### Production
- Upgrade to NewsAPI paid plan
- Configure environment variables
- Set up proper CORS handling

## 🎯 Features in Detail

### Category Navigation
- **Top Stories**: Breaking news and headlines
- **World**: International news and events  
- **Technology**: Tech industry updates
- **Sports**: Sports news and scores
- **Entertainment**: Celebrity and entertainment news
- **Business**: Financial and business news
- **Health**: Health and medical news
- **Science**: Scientific discoveries and research

### Search Functionality
- Real-time search across all articles
- Keyword highlighting in results
- Search history and suggestions
- Advanced filtering options

### Comment System
- User-friendly comment interface
- Local storage persistence
- Real-time comment updates
- Responsive comment threads

### Social Features
- Native sharing API support
- Clipboard fallback for unsupported browsers
- Social media integration ready
- Share tracking and analytics

## 🚀 Deployment

Ready for deployment on:
- **Vercel**: Zero-config deployment
- **Netlify**: Continuous deployment
- **GitHub Pages**: Static hosting
- **Firebase Hosting**: Google's hosting platform

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ using modern web technologies
