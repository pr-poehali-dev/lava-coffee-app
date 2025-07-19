import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [cartItems, setCartItems] = useState<{id: number, name: string, price: number, quantity: number, isFavorite?: boolean}[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

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

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fId => fId !== id)
        : [...prev, id]
    );
  };

  const handleLogin = (email: string, password: string) => {
    setIsLoggedIn(true);
    setUserName(email.split('@')[0]);
    setAuthOpen(false);
    toast({ title: 'Добро пожаловать!', description: 'Вы успешно авторизованы' });
  };

  const handlePayment = () => {
    setPaymentOpen(false);
    setSuccessOpen(true);
    setCartItems([]);
    toast({ title: 'Заказ оформлен!', description: 'Ваш заказ принят в обработку' });
  };

  const categories = ['Все', 'Горячие напитки', 'Холодные напитки'];
  
  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Все' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
              
              <Dialog open={authOpen} onOpenChange={setAuthOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="border-lava-green text-lava-navy hover:bg-lava-green hover:text-lava-cream">
                    <Icon name="User" size={18} />
                    {isLoggedIn && <span className="ml-2 hidden sm:inline">{userName}</span>}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-lava-navy">{isLoggedIn ? 'Профиль' : 'Вход в аккаунт'}</DialogTitle>
                  </DialogHeader>
                  {isLoggedIn ? (
                    <div className="space-y-4">
                      <div className="text-center p-6">
                        <div className="w-16 h-16 bg-lava-green rounded-full flex items-center justify-center mx-auto mb-4">
                          <Icon name="User" size={32} className="text-lava-cream" />
                        </div>
                        <h3 className="text-lg font-bold text-lava-navy mb-2">{userName}</h3>
                        <p className="text-lava-navy/70 text-sm mb-4">Пользователь LAVA</p>
                        <Button 
                          variant="outline" 
                          onClick={() => { setIsLoggedIn(false); setUserName(''); setAuthOpen(false); }}
                          className="border-lava-green text-lava-navy hover:bg-lava-green hover:text-lava-cream"
                        >
                          Выйти
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Tabs defaultValue="login" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="login">Вход</TabsTrigger>
                        <TabsTrigger value="register">Регистрация</TabsTrigger>
                      </TabsList>
                      <TabsContent value="login" className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="login-email">Email</Label>
                          <Input id="login-email" type="email" placeholder="your@email.com" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="login-password">Пароль</Label>
                          <Input id="login-password" type="password" placeholder="*********" />
                        </div>
                        <Button 
                          className="w-full bg-lava-green hover:bg-lava-green/90 text-lava-cream"
                          onClick={() => handleLogin('user@example.com', 'password')}
                        >
                          Войти
                        </Button>
                      </TabsContent>
                      <TabsContent value="register" className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="register-name">Имя</Label>
                          <Input id="register-name" placeholder="Ваше имя" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="register-email">Email</Label>
                          <Input id="register-email" type="email" placeholder="your@email.com" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="register-password">Пароль</Label>
                          <Input id="register-password" type="password" placeholder="*********" />
                        </div>
                        <Button 
                          className="w-full bg-lava-green hover:bg-lava-green/90 text-lava-cream"
                          onClick={() => handleLogin('newuser@example.com', 'password')}
                        >
                          Зарегистрироваться
                        </Button>
                      </TabsContent>
                    </Tabs>
                  )}
                </DialogContent>
              </Dialog>
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
                    <div key={item.id} className="p-4 bg-lava-cream/30 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-medium text-lava-navy">{item.name}</h4>
                          <p className="text-sm text-lava-navy/70">{item.price}₽ каждый</p>
                        </div>
                        <span className="font-bold text-lava-green">{item.price * item.quantity}₽</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="h-8 w-8 p-0 border-lava-green"
                          >
                            <Icon name="Minus" size={12} />
                          </Button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-8 w-8 p-0 border-lava-green"
                          >
                            <Icon name="Plus" size={12} />
                          </Button>
                        </div>
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
                  <Dialog open={paymentOpen} onOpenChange={setPaymentOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-lava-green hover:bg-lava-green/90 text-lava-cream">
                        <Icon name="CreditCard" size={18} className="mr-2" />
                        Оплатить заказ
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle className="text-lava-navy">Оплата заказа</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-6">
                        <div className="bg-lava-cream/50 p-4 rounded-lg">
                          <h4 className="font-medium text-lava-navy mb-2">Ваш заказ:</h4>
                          {cartItems.map(item => (
                            <div key={item.id} className="flex justify-between text-sm text-lava-navy/80">
                              <span>{item.name} ×{item.quantity}</span>
                              <span>{item.price * item.quantity}₽</span>
                            </div>
                          ))}
                          <div className="border-t border-lava-green/20 mt-2 pt-2 flex justify-between font-bold text-lava-navy">
                            <span>Итого:</span>
                            <span>{getTotalPrice()}₽</span>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label>Номер карты</Label>
                            <Input placeholder="1234 5678 9012 3456" />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-2">
                              <Label>ММ/ГГ</Label>
                              <Input placeholder="12/25" />
                            </div>
                            <div className="space-y-2">
                              <Label>CVV</Label>
                              <Input placeholder="123" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>Адрес доставки</Label>
                            <Textarea placeholder="Укажите адрес..." />
                          </div>
                        </div>
                        
                        <Button 
                          className="w-full bg-lava-green hover:bg-lava-green/90 text-lava-cream"
                          onClick={handlePayment}
                        >
                          <Icon name="CreditCard" size={18} className="mr-2" />
                          Оплатить {getTotalPrice()}₽
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
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

      {/* Success Modal */}
      <Dialog open={successOpen} onOpenChange={setSuccessOpen}>
        <DialogContent className="sm:max-w-md text-center">
          <div className="p-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="CheckCircle" size={32} className="text-green-600" />
            </div>
            <DialogTitle className="text-2xl font-bold text-lava-navy mb-2">
              Заказ успешно оформлен! 🎉
            </DialogTitle>
            <p className="text-lava-navy/70 mb-6">
              Ваш заказ #LA{Math.floor(Math.random() * 10000)} принят в обработку.
              Ожидайте доставку в течение 30-45 минут.
            </p>
            <div className="space-y-3">
              <Button 
                className="w-full bg-lava-green hover:bg-lava-green/90 text-lava-cream"
                onClick={() => setSuccessOpen(false)}
              >
                <Icon name="Coffee" size={18} className="mr-2" />
                Продолжить покупки
              </Button>
              <Button 
                variant="outline" 
                className="w-full border-lava-green text-lava-navy hover:bg-lava-green hover:text-lava-cream"
                onClick={() => {
                  setSuccessOpen(false);
                  toast({ title: 'Уведомления включены', description: 'Мы отправим SMS когда заказ будет готов' });
                }}
              >
                <Icon name="Bell" size={18} className="mr-2" />
                Отслеживать заказ
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;