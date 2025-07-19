import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const Footer = () => {
  return (
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
  );
};

export default Footer;