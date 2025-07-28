import { useAuth } from '@/hooks/use-auth';

export default function Header() {
  const { user } = useAuth();

  return (
    <header className="glass-card border-b border-gray-700 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Dashboard</h2>
          <p className="text-sm text-muted-foreground">Welcome back to your crypto gateway</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full pulse-animation"></div>
            <span className="text-sm text-muted-foreground">Online</span>
          </div>
          
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Welcome, {user?.username}</p>
            <p className="text-lg font-bold text-green-500 balance-glow">$5,000,000.00</p>
          </div>
        </div>
      </div>
    </header>
  );
}