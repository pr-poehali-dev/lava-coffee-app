import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const HeroSection = () => {
  return (
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
  );
};

export default HeroSection;