import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [cartItems, setCartItems] = useState<{id: number, name: string, price: number, quantity: number}[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const menuItems = [
    {
      id: 1,
      name: 'Латте',
      description: 'Нежный кофе с молочной пенкой',
      price: 250,
      image: '/img/de584951-16ae-4f59-b428-82591fcb1c00.jpg',
      category: 'Горячие напитки'
    },
    {
      id: 2,
      name: 'Эспрессо',
      description: 'Классический крепкий кофе',
      price: 180,
      image: '/img/37aa834b-433f-4b22-84cf-f349932f8bf5.jpg',
      category: 'Горячие напитки'
    },
    {
      id: 3,
      name: 'Айс кофе',
      description: 'Освежающий холодный кофе',
      price: 280,
      image: '/img/761c3d8a-e93a-4125-baab-d9bce0c12b8a.jpg',
      category: 'Холодные напитки'
    },
    {
      id: 4,
      name: 'Капучино',
      description: 'Идеальный баланс кофе и молока',
      price: 230,
      image: '/img/de584951-16ae-4f59-b428-82591fcb1c00.jpg',
      category: 'Горячие напитки'
    },
    {
      id: 5,
      name: 'Американо',
      description: 'Эспрессо с горячей водой',
      price: 200,
      image: '/img/37aa834b-433f-4b22-84cf-f349932f8bf5.jpg',
      category: 'Горячие напитки'
    },
    {
      id: 6,
      name: 'Фраппе',
      description: 'Взбитый холодный кофе с пенкой',
      price: 320,
      image: '/img/761c3d8a-e93a-4125-baab-d9bce0c12b8a.jpg',
      category: 'Холодные напитки'
    }
  ];

  const addToCart = (item: typeof menuItems[0]) => {
    setCartItems(prev => {
      const existing = prev.find(cartItem => cartItem.id === item.id);
      if (existing) {
        return prev.map(cartItem => 
          cartItem.id === item.id 
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-lava-cream/95 backdrop-blur-sm border-b border-lava-green/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-lava-green rounded-full flex items-center justify-center">
                <span className="text-lava-cream font-bold text-sm">Л</span>
              </div>
              <h1 className="text-2xl font-bold text-lava-navy">ЛАВА</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCartOpen(!cartOpen)}
                className="relative border-lava-green text-lava-navy hover:bg-lava-green hover:text-lava-cream"
              >
                <Icon name="ShoppingCart" size={18} />
                {getTotalItems() > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-lava-navy text-lava-cream">
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>
              
              <Button variant="outline" size="sm" className="border-lava-green text-lava-navy hover:bg-lava-green hover:text-lava-cream">
                <Icon name="User" size={18} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 text-center bg-gradient-to-br from-lava-cream to-lava-green/10">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-5xl font-bold text-lava-navy mb-6">
            Добро пожаловать в ЛАВА
          </h2>
          <p className="text-xl text-lava-navy/80 mb-8 max-w-2xl mx-auto">
            Премиальный кофе, приготовленный с любовью. Быстрый заказ, превосходный вкус.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-lava-green hover:bg-lava-green/90 text-lava-cream">
              <Icon name="Coffee" size={20} className="mr-2" />
              Смотреть меню
            </Button>
            <Button variant="outline" size="lg" className="border-lava-green text-lava-navy hover:bg-lava-green hover:text-lava-cream">
              <Icon name="Phone" size={20} className="mr-2" />
              +7 (999) 123-45-67
            </Button>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center text-lava-navy mb-12">Наше меню</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item) => (
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

      {/* Cart Sidebar */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setCartOpen(false)}>
          <div 
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl p-6 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-lava-navy">Корзина</h3>
              <Button variant="ghost" size="sm" onClick={() => setCartOpen(false)}>
                <Icon name="X" size={20} />
              </Button>
            </div>

            {cartItems.length === 0 ? (
              <div className="text-center py-8">
                <Icon name="ShoppingCart" size={48} className="mx-auto text-lava-green/50 mb-4" />
                <p className="text-lava-navy/60">Корзина пуста</p>
              </div>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-lava-cream/30 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-lava-navy">{item.name}</h4>
                        <p className="text-sm text-lava-navy/70">{item.price}₽ × {item.quantity}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-lava-green">{item.price * item.quantity}₽</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Icon name="Trash2" size={16} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-lava-green/20 pt-4 mb-6">
                  <div className="flex justify-between items-center text-lg font-bold text-lava-navy">
                    <span>Итого:</span>
                    <span className="text-lava-green">{getTotalPrice()}₽</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button className="w-full bg-lava-green hover:bg-lava-green/90 text-lava-cream">
                    <Icon name="CreditCard" size={18} className="mr-2" />
                    Оплатить заказ
                  </Button>
                  
                  <Button variant="outline" className="w-full border-lava-green text-lava-navy hover:bg-lava-green hover:text-lava-cream">
                    <Icon name="Phone" size={18} className="mr-2" />
                    Заказать по телефону
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Quick Order Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-lava-green to-lava-navy">
        <div className="container mx-auto max-w-2xl text-center">
          <h3 className="text-3xl font-bold text-lava-cream mb-6">Быстрый заказ</h3>
          <p className="text-lava-cream/80 mb-8">Оставьте номер телефона, и мы перезвоним в течение 2 минут</p>
          
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input 
              placeholder="+7 (999) 123-45-67" 
              className="flex-1 bg-white border-0 text-lava-navy"
            />
            <Button variant="secondary" className="bg-lava-cream text-lava-navy hover:bg-lava-cream/90">
              <Icon name="Phone" size={18} className="mr-2" />
              Перезвонить
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-lava-navy text-lava-cream">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-bold mb-4">ЛАВА</h4>
              <p className="text-lava-cream/80 text-sm">
                Премиальная кофейня с быстрой доставкой и отличным сервисом.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Контакты</h4>
              <div className="space-y-2 text-sm text-lava-cream/80">
                <p>📞 +7 (999) 123-45-67</p>
                <p>📧 hello@lava-coffee.ru</p>
                <p>📍 Москва, ул. Кофейная, 123</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Социальные сети</h4>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm" className="text-lava-cream hover:text-lava-green">
                  <Icon name="Instagram" size={20} />
                </Button>
                <Button variant="ghost" size="sm" className="text-lava-cream hover:text-lava-green">
                  <Icon name="MessageCircle" size={20} />
                </Button>
                <Button variant="ghost" size="sm" className="text-lava-cream hover:text-lava-green">
                  <Icon name="Mail" size={20} />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-lava-cream/20 mt-8 pt-8 text-center text-sm text-lava-cream/60">
            © 2024 ЛАВА. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;