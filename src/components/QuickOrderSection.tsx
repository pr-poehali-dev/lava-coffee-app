import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

const QuickOrderSection = () => {
  const [quickOrderOpen, setQuickOrderOpen] = useState(false);
  const [phone, setPhone] = useState('');

  const handleQuickOrder = () => {
    setQuickOrderOpen(false);
    toast({
      title: '🚀 Заказ принят!',
      description: `Мы перезвоним на ${phone || '+7 (999) 123-45-67'} в течение 2 минут`
    });
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-r from-lava-green to-lava-navy relative overflow-hidden">
      {/* Декоративные элементы */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-10 w-20 h-20 bg-lava-cream/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-lava-cream/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-lava-cream/5 rounded-full blur-lg"></div>
      </div>
      
      <div className="container mx-auto max-w-2xl text-center relative z-10">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-lava-cream/20">
          <div className="w-16 h-16 bg-gradient-to-br from-lava-cream to-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
            <Icon name="Zap" size={32} className="text-lava-navy" />
          </div>
          
          <h3 className="text-4xl font-bold text-lava-cream mb-4 bg-gradient-to-r from-lava-cream to-white bg-clip-text text-transparent">
            Быстрый заказ
          </h3>
          <p className="text-lava-cream/90 mb-8 text-lg">
            Оставьте номер телефона, и мы перезвоним в течение 2 минут ⚡
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <Input 
              placeholder="📱 +7 (999) 123-45-67"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="flex-1 bg-white/90 backdrop-blur-sm border-0 text-lava-navy rounded-2xl shadow-lg placeholder:text-lava-navy/60 focus:bg-white transition-all duration-300"
            />
            <Dialog open={quickOrderOpen} onOpenChange={setQuickOrderOpen}>
              <DialogTrigger asChild>
                <Button 
                  variant="secondary" 
                  className="bg-lava-cream hover:bg-white text-lava-navy hover:text-lava-navy rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 px-8"
                >
                  <Icon name="Phone" size={18} className="mr-2" />
                  Перезвонить
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg bg-lava-cream/95 backdrop-blur-xl border-2 border-lava-green/30 rounded-3xl shadow-2xl">
                <DialogHeader>
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-lava-green to-lava-navy rounded-3xl flex items-center justify-center shadow-xl">
                      <Icon name="Coffee" size={32} className="text-lava-cream" />
                    </div>
                  </div>
                  <DialogTitle className="text-lava-navy text-center text-2xl font-bold">
                    ☕ Быстрый заказ в ЛАВА
                  </DialogTitle>
                </DialogHeader>
                
                <div className="space-y-6">
                  <div className="bg-lava-green/10 backdrop-blur-sm p-5 rounded-3xl border border-lava-green/20 shadow-inner">
                    <h4 className="font-bold text-lava-navy mb-3 flex items-center">
                      <Icon name="Clock" size={18} className="mr-2" />
                      Как это работает:
                    </h4>
                    <div className="space-y-2 text-sm text-lava-navy/80">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-lava-green rounded-full flex items-center justify-center text-xs text-white font-bold">1</div>
                        <span>Укажите ваши данные</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-lava-green rounded-full flex items-center justify-center text-xs text-white font-bold">2</div>
                        <span>Мы перезвоним в течение 2 минут</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-lava-green rounded-full flex items-center justify-center text-xs text-white font-bold">3</div>
                        <span>Оформим заказ по телефону</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-lava-navy font-medium">📱 Номер телефона</Label>
                      <Input 
                        placeholder="+7 (999) 123-45-67"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="rounded-2xl border-lava-green/30 backdrop-blur-sm"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-lava-navy font-medium">👤 Ваше имя</Label>
                      <Input 
                        placeholder="Как к вам обращаться?"
                        className="rounded-2xl border-lava-green/30 backdrop-blur-sm"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-lava-navy font-medium">☕ Что бы хотели заказать?</Label>
                      <Textarea 
                        placeholder="Опишите ваш заказ... Например: 2 латте, 1 эспрессо"
                        className="rounded-2xl border-lava-green/30 backdrop-blur-sm min-h-[80px]"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-lava-navy font-medium">🏠 Адрес доставки (необязательно)</Label>
                      <Input 
                        placeholder="Куда доставить заказ?"
                        className="rounded-2xl border-lava-green/30 backdrop-blur-sm"
                      />
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-lava-green/20 to-lava-navy/20 backdrop-blur-sm p-4 rounded-2xl border border-lava-green/20">
                    <div className="flex items-center space-x-2 text-sm text-lava-navy/80">
                      <Icon name="Shield" size={16} className="text-lava-green" />
                      <span>Ваши данные защищены и не передаются третьим лицам</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-gradient-to-r from-lava-green to-lava-navy hover:from-lava-navy hover:to-lava-green text-lava-cream rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 py-4 text-lg font-bold"
                    onClick={handleQuickOrder}
                  >
                    <Icon name="Phone" size={20} className="mr-3" />
                    Заказать звонок
                    <Icon name="Sparkles" size={16} className="ml-3" />
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="flex items-center justify-center space-x-6 mt-8 text-lava-cream/70">
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} />
              <span className="text-sm">2 минуты</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Phone" size={16} />
              <span className="text-sm">Бесплатно</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Coffee" size={16} />
              <span className="text-sm">Быстро</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickOrderSection;