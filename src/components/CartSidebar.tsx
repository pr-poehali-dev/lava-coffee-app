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
  );
};

export default CartSidebar;