import { Search, Home, Video, FileText, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

interface HeaderProps {
  onSearch: (query: string) => void;
  onMenuToggle: () => void;
}

const Header = ({ onSearch, onMenuToggle }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  return (
    <header className="bg-[hsl(var(--header-bg))] border-b border-border px-4 py-3 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left section - Logo and mobile menu */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuToggle}
            className="md:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-hover rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <h1 className="text-xl font-bold text-foreground hidden sm:block">NewsPortal</h1>
          </div>
        </div>

        {/* Center section - Navigation (hidden on mobile) */}
        <nav className="hidden lg:flex items-center gap-2">
          <Button variant="ghost" size="sm" className="gap-2">
            <Home className="h-4 w-4" />
            Home
          </Button>
          <Button variant="ghost" size="sm" className="gap-2">
            <Video className="h-4 w-4" />
            Videos
          </Button>
          <Button variant="ghost" size="sm" className="gap-2">
            <FileText className="h-4 w-4" />
            Stories
          </Button>
        </nav>

        {/* Right section - Search and user */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <form onSubmit={handleSearch} className="hidden sm:flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-64 bg-muted border-border focus:border-primary"
              />
            </div>
          </form>

          {/* Mobile search button */}
          <Button
            variant="ghost"
            size="sm"
            className="sm:hidden"
            onClick={() => {
              const query = prompt('Search news:');
              if (query) onSearch(query);
            }}
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* User menu */}
          <Button variant="ghost" size="sm">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;