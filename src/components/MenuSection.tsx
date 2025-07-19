import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface MenuSectionProps {
  menuItems: MenuItem[];
  addToCart: (item: MenuItem) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  categories: string[];
  filteredItems: MenuItem[];
  toggleFavorite: (id: number) => void;
  favorites: number[];
}

const MenuSection = ({
  addToCart,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  categories,
  filteredItems,
  toggleFavorite,
  favorites
}: MenuSectionProps) => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <h3 className="text-3xl font-bold text-center text-lava-navy mb-8">Наше меню</h3>
        
        {/* Search and Filters */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Поиск по названию..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category 
                  ? "bg-lava-green text-lava-cream" 
                  : "border-lava-green text-lava-navy hover:bg-lava-green hover:text-lava-cream"
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="group hover:shadow-lg transition-all duration-300 border-lava-green/20 hover:border-lava-green/40">
              <CardHeader className="p-0">
                <div className="aspect-square relative overflow-hidden rounded-t-lg">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="secondary" className="bg-lava-cream/90 text-lava-navy">
                      {item.category}
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleFavorite(item.id)}
                      className="bg-white/80 hover:bg-white p-2 h-auto"
                    >
                      <Icon 
                        name="Heart" 
                        size={16} 
                        className={favorites.includes(item.id) ? "text-red-500 fill-current" : "text-gray-500"}
                      />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-lava-navy mb-2">{item.name}</CardTitle>
                <p className="text-lava-navy/70 text-sm mb-3">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-lava-green">{item.price}₽</span>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button 
                  className="w-full bg-lava-green hover:bg-lava-green/90 text-lava-cream"
                  onClick={() => addToCart(item)}
                >
                  <Icon name="Plus" size={16} className="mr-2" />
                  В корзину
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuSection;