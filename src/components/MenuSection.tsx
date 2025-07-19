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
                placeholder="🔍 Поиск по названию..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-3xl border-lava-green/30 bg-lava-cream/50 backdrop-blur-sm shadow-lg focus:shadow-xl transition-all duration-300"
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
                  ? "bg-gradient-to-r from-lava-green to-lava-navy text-lava-cream rounded-2xl shadow-lg" 
                  : "border-lava-green text-lava-navy hover:bg-lava-green hover:text-lava-cream rounded-2xl backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:scale-105"
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="group hover:shadow-2xl transition-all duration-500 border-lava-green/20 hover:border-lava-green/40 rounded-3xl bg-white/80 backdrop-blur-lg hover:bg-white/90 hover:scale-105">
              <CardHeader className="p-0">
                <div className="aspect-square relative overflow-hidden rounded-t-3xl">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="secondary" className="bg-lava-cream/95 backdrop-blur-md text-lava-navy rounded-2xl shadow-lg border border-lava-green/20">
                      {item.category}
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleFavorite(item.id)}
                      className="bg-white/90 backdrop-blur-md hover:bg-white p-2 h-auto rounded-2xl shadow-lg border border-lava-green/20 transition-all duration-300 hover:scale-110"
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
                  className="w-full bg-gradient-to-r from-lava-green to-lava-navy hover:from-lava-navy hover:to-lava-green text-lava-cream rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
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