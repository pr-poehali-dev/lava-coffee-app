import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

const QuickOrderSection = () => {
  return (
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
  );
};

export default QuickOrderSection;