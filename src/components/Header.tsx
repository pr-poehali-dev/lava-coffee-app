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
    <header className="sticky top-0 z-50 bg-lava-cream/80 backdrop-blur-xl border-b border-lava-green/20 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-lava-green to-lava-navy rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-lava-cream font-bold text-sm">Л</span>
            </div>
            <h1 className="text-2xl font-bold text-lava-navy">ЛАВА</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCartOpen(!cartOpen)}
              className="relative border-lava-green text-lava-navy hover:bg-lava-green hover:text-lava-cream rounded-2xl backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <Icon name="ShoppingCart" size={18} />
              {getTotalItems() > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-gradient-to-r from-lava-navy to-lava-green text-lava-cream rounded-full shadow-lg animate-pulse">
                  {getTotalItems()}
                </Badge>
              )}
            </Button>
            
            <Dialog open={authOpen} onOpenChange={setAuthOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="border-lava-green text-lava-navy hover:bg-lava-green hover:text-lava-cream rounded-2xl backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:scale-105">
                  <Icon name="User" size={18} />
                  {isLoggedIn && <span className="ml-2 hidden sm:inline">{userName}</span>}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md bg-lava-cream/95 backdrop-blur-xl border-2 border-lava-green/30 rounded-3xl shadow-2xl">
                <DialogHeader>
                  <DialogTitle className="text-lava-navy">{isLoggedIn ? 'Профиль' : 'Вход в аккаунт'}</DialogTitle>
                </DialogHeader>
                {isLoggedIn ? (
                  <div className="space-y-4">
                    <div className="text-center p-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-lava-green to-lava-navy rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-xl">
                        <Icon name="User" size={32} className="text-lava-cream" />
                      </div>
                      <h3 className="text-lg font-bold text-lava-navy mb-2">{userName}</h3>
                      <p className="text-lava-navy/70 text-sm mb-4">Пользователь LAVA</p>
                      <Button 
                        variant="outline" 
                        onClick={() => { setIsLoggedIn(false); setUserName(''); setAuthOpen(false); }}
                        className="border-lava-green text-lava-navy hover:bg-lava-green hover:text-lava-cream rounded-2xl backdrop-blur-sm transition-all duration-300 hover:shadow-lg"
                      >
                        Выйти
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Tabs defaultValue="login" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 bg-lava-green/10 backdrop-blur-sm rounded-2xl p-1">
                      <TabsTrigger value="login">Вход</TabsTrigger>
                      <TabsTrigger value="register">Регистрация</TabsTrigger>
                    </TabsList>
                    <TabsContent value="login" className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="login-email">Email</Label>
                        <Input id="login-email" type="email" placeholder="your@email.com" className="rounded-2xl border-lava-green/30 backdrop-blur-sm" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="login-password">Пароль</Label>
                        <Input id="login-password" type="password" placeholder="*********" className="rounded-2xl border-lava-green/30 backdrop-blur-sm" />
                      </div>
                      <Button 
                        className="w-full bg-gradient-to-r from-lava-green to-lava-navy hover:from-lava-navy hover:to-lava-green text-lava-cream rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
                        onClick={() => handleLogin('user@example.com', 'password')}
                      >
                        Войти
                      </Button>
                    </TabsContent>
                    <TabsContent value="register" className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="register-name">Имя</Label>
                        <Input id="register-name" placeholder="Ваше имя" className="rounded-2xl border-lava-green/30 backdrop-blur-sm" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="register-email">Email</Label>
                        <Input id="register-email" type="email" placeholder="your@email.com" className="rounded-2xl border-lava-green/30 backdrop-blur-sm" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="register-password">Пароль</Label>
                        <Input id="register-password" type="password" placeholder="*********" className="rounded-2xl border-lava-green/30 backdrop-blur-sm" />
                      </div>
                      <Button 
                        className="w-full bg-gradient-to-r from-lava-green to-lava-navy hover:from-lava-navy hover:to-lava-green text-lava-cream rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
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