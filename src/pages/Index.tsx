import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import MenuSection from '@/components/MenuSection';
import CartSidebar from '@/components/CartSidebar';
import QuickOrderSection from '@/components/QuickOrderSection';
import Footer from '@/components/Footer';
import SuccessModal from '@/components/SuccessModal';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface CartItem extends MenuItem {
  quantity: number;
  isFavorite?: boolean;
}

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  const menuItems: MenuItem[] = [
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

  const addToCart = (item: MenuItem) => {
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
      <Header
        getTotalItems={getTotalItems}
        setCartOpen={setCartOpen}
        cartOpen={cartOpen}
        authOpen={authOpen}
        setAuthOpen={setAuthOpen}
        isLoggedIn={isLoggedIn}
        userName={userName}
        setIsLoggedIn={setIsLoggedIn}
        setUserName={setUserName}
        handleLogin={handleLogin}
      />

      <HeroSection />

      <MenuSection
        menuItems={menuItems}
        addToCart={addToCart}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
        filteredItems={filteredItems}
        toggleFavorite={toggleFavorite}
        favorites={favorites}
      />

      <CartSidebar
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
        cartItems={cartItems}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        getTotalPrice={getTotalPrice}
        paymentOpen={paymentOpen}
        setPaymentOpen={setPaymentOpen}
        handlePayment={handlePayment}
      />

      <QuickOrderSection />

      <Footer />

      <SuccessModal
        successOpen={successOpen}
        setSuccessOpen={setSuccessOpen}
      />
    </div>
  );
};

export default Index;