import { categories, NewsCategory } from '@/services/newsApi';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ activeCategory, onCategoryChange, isOpen, onClose }: SidebarProps) => {
  const handleCategoryClick = (categoryId: string) => {
    onCategoryChange(categoryId);
    onClose(); // Close mobile sidebar after selection
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-[73px] h-[calc(100vh-73px)] w-64 bg-[hsl(var(--sidebar-bg))] border-r border-border z-50 transition-transform duration-300 overflow-y-auto",
        "md:sticky md:top-[73px] md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-4">
          <h2 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide">
            Categories
          </h2>
          
          <nav className="space-y-1">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={cn(
                  "category-item w-full text-left",
                  activeCategory === category.id && "category-active"
                )}
              >
                <span className="text-lg">{category.icon}</span>
                <span className="font-medium">{category.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;