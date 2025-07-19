import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface HeaderProps {
  getTotalItems: () => number;
  setCartOpen: (open: boolean) => void;
  cartOpen: boolean;
  authOpen: boolean;
  setAuthOpen: (open: boolean) => void;
  isLoggedIn: boolean;
  userName: string;
  setIsLoggedIn: (logged: boolean) => void;
  setUserName: (name: string) => void;
  handleLogin: (email: string, password: string) => void;
}

const Header = ({
  getTotalItems,
  setCartOpen,
  cartOpen,
  authOpen,
  setAuthOpen,
  isLoggedIn,
  userName,
  setIsLoggedIn,
  setUserName,
  handleLogin
}: HeaderProps) => {
  return (
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
  );
};

export default Header;