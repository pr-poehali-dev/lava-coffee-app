import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

interface SuccessModalProps {
  successOpen: boolean;
  setSuccessOpen: (open: boolean) => void;
}

const SuccessModal = ({ successOpen, setSuccessOpen }: SuccessModalProps) => {
  return (
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
  );
};

export default SuccessModal;