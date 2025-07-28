import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast({
        title: "Validation Error",
        description: "Please enter both username and password",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Open Telegram link as per original requirement
    window.open('https://t.me/primasoftwares', '_blank');

    try {
      const success = await login(username, password);
      
      if (!success) {
        toast({
          title: "Login Failed",
          description: "Invalid credentials. Use admin/usdt123 or SoftwareHenry/Rmabuw190",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Login Error",
        description: "An error occurred during login. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <Card className="glass-card w-full max-w-md mx-4 border-0">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="text-4xl mb-4">🚀</div>
              <h2 className="text-2xl font-bold text-accent mb-2">Flash Crypto Gateway</h2>
              <p className="text-muted-foreground">Secure access to your crypto transactions</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium text-muted-foreground">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-primary border-gray-600 focus:border-accent"
                  placeholder="Enter username"
                  disabled={isLoading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-muted-foreground">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-primary border-gray-600 focus:border-accent"
                  placeholder="Enter password"
                  disabled={isLoading}
                />
              </div>
              
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-accent to-blue-500 hover:from-blue-500 hover:to-accent crypto-glow"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <button
                onClick={() => window.open('https://t.me/primasoftwares', '_blank')}
                className="text-accent hover:underline text-sm"
              >
                <i className="fab fa-telegram mr-2"></i>Contact Support
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
