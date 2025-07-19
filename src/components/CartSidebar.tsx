import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartSidebarProps {
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  cartItems: CartItem[];
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  getTotalPrice: () => number;
  paymentOpen: boolean;
  setPaymentOpen: (open: boolean) => void;
  handlePayment: () => void;
}

const CartSidebar = ({
  cartOpen,
  setCartOpen,
  cartItems,
  updateQuantity,
  removeFromCart,
  getTotalPrice,
  paymentOpen,
  setPaymentOpen,
  handlePayment
}: CartSidebarProps) => {
  if (!cartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={() => setCartOpen(false)}>
      <div 
        className="fixed right-0 top-0 h-full w-full max-w-md bg-lava-cream/95 backdrop-blur-xl shadow-2xl p-6 overflow-y-auto border-l-2 border-lava-green/30 rounded-l-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6 p-4 bg-white/50 backdrop-blur-md rounded-3xl shadow-lg">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-lava-green to-lava-navy rounded-2xl flex items-center justify-center shadow-lg">
              <Icon name="ShoppingCart" size={20} className="text-lava-cream" />
            </div>
            <h3 className="text-xl font-bold text-lava-navy">Корзина</h3>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setCartOpen(false)}
            className="rounded-2xl hover:bg-lava-green/20 transition-all duration-300 hover:scale-110"
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-12 bg-white/40 backdrop-blur-md rounded-3xl shadow-lg">
            <div className="w-20 h-20 bg-gradient-to-br from-lava-green/20 to-lava-navy/20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner">
              <Icon name="ShoppingCart" size={40} className="text-lava-green/60" />
            </div>
            <p className="text-lava-navy/60 text-lg font-medium">Корзина пуста</p>
            <p className="text-lava-navy/40 text-sm mt-2">Добавьте что-нибудь вкусное! ☕</p>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              {cartItems.map((item, index) => (
                <div 
                  key={item.id} 
                  className="p-5 bg-white/60 backdrop-blur-lg rounded-3xl shadow-lg border border-lava-green/20 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="font-bold text-lava-navy text-lg">{item.name}</h4>
                      <p className="text-sm text-lava-navy/70 bg-lava-green/10 rounded-full px-3 py-1 inline-block mt-1">
                        {item.price}₽ каждый
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-lava-green">{item.price * item.quantity}₽</span>
                      <div className="w-2 h-2 bg-gradient-to-r from-lava-green to-lava-navy rounded-full mx-auto mt-1"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 bg-lava-cream/80 backdrop-blur-sm rounded-2xl p-2 shadow-inner">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="h-10 w-10 p-0 border-lava-green rounded-2xl hover:bg-lava-green hover:text-lava-cream transition-all duration-300 hover:scale-110 shadow-md"
                      >
                        <Icon name="Minus" size={14} />
                      </Button>
                      <div className="w-12 text-center">
                        <span className="text-2xl font-bold text-lava-navy">{item.quantity}</span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="h-10 w-10 p-0 border-lava-green rounded-2xl hover:bg-lava-green hover:text-lava-cream transition-all duration-300 hover:scale-110 shadow-md"
                      >
                        <Icon name="Plus" size={14} />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-100 rounded-2xl transition-all duration-300 hover:scale-110 p-3"
                    >
                      <Icon name="Trash2" size={18} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-lava-green/20 to-lava-navy/20 backdrop-blur-lg rounded-3xl p-6 mb-6 shadow-xl border border-lava-green/30">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-lava-green to-lava-navy rounded-2xl flex items-center justify-center">
                    <Icon name="Calculator" size={16} className="text-lava-cream" />
                  </div>
                  <span className="text-xl font-bold text-lava-navy">Итого:</span>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-bold bg-gradient-to-r from-lava-green to-lava-navy bg-clip-text text-transparent">
                    {getTotalPrice()}₽
                  </span>
                  <p className="text-xs text-lava-navy/60">включая доставку</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Dialog open={paymentOpen} onOpenChange={setPaymentOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full bg-gradient-to-r from-lava-green via-lava-navy to-lava-green hover:from-lava-navy hover:via-lava-green hover:to-lava-navy text-lava-cream rounded-3xl shadow-xl py-6 text-lg font-bold transition-all duration-500 hover:shadow-2xl hover:scale-105 animate-pulse">
                    <Icon name="CreditCard" size={20} className="mr-3" />
                    Оплатить заказ
                    <Icon name="Sparkles" size={16} className="ml-3" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md bg-lava-cream/95 backdrop-blur-xl border-2 border-lava-green/30 rounded-3xl shadow-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-lava-navy text-center text-2xl font-bold">💳 Оплата заказа</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6">
                    <div className="bg-lava-green/10 backdrop-blur-sm p-5 rounded-3xl border border-lava-green/20 shadow-inner">
                      <h4 className="font-bold text-lava-navy mb-3 flex items-center">
                        <Icon name="Receipt" size={18} className="mr-2" />
                        Ваш заказ:
                      </h4>
                      {cartItems.map(item => (
                        <div key={item.id} className="flex justify-between text-sm text-lava-navy/80 py-1">
                          <span>{item.name} ×{item.quantity}</span>
                          <span className="font-medium">{item.price * item.quantity}₽</span>
                        </div>
                      ))}
                      <div className="border-t border-lava-green/30 mt-3 pt-3 flex justify-between font-bold text-lava-navy">
                        <span>Итого:</span>
                        <span className="text-lava-green">{getTotalPrice()}₽</span>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-lava-navy font-medium">💳 Номер карты</Label>
                        <Input placeholder="1234 5678 9012 3456" className="rounded-2xl border-lava-green/30 backdrop-blur-sm" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label className="text-lava-navy font-medium">📅 ММ/ГГ</Label>
                          <Input placeholder="12/25" className="rounded-2xl border-lava-green/30 backdrop-blur-sm" />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-lava-navy font-medium">🔒 CVV</Label>
                          <Input placeholder="123" className="rounded-2xl border-lava-green/30 backdrop-blur-sm" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-lava-navy font-medium">🏠 Адрес доставки</Label>
                        <Textarea placeholder="Укажите адрес..." className="rounded-2xl border-lava-green/30 backdrop-blur-sm" />
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full bg-gradient-to-r from-lava-green to-lava-navy hover:from-lava-navy hover:to-lava-green text-lava-cream rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 py-3"
                      onClick={handlePayment}
                    >
                      <Icon name="CreditCard" size={18} className="mr-2" />
                      Оплатить {getTotalPrice()}₽
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              
              <Button 
                variant="outline" 
                className="w-full border-lava-green text-lava-navy hover:bg-lava-green hover:text-lava-cream rounded-2xl backdrop-blur-sm transition-all duration-300 hover:shadow-lg py-3"
              >
                <Icon name="Phone" size={18} className="mr-2" />
                Заказать по телефону
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;