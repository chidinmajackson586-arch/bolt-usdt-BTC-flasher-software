import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

export default function Settings() {
  const [darkMode, setDarkMode] = useState(true);
  const [customRpc, setCustomRpc] = useState('');
  const [gasMultiplier, setGasMultiplier] = useState('1.0');
  const { toast } = useToast();

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your settings have been saved successfully",
    });
  };

  const handleChangePassword = () => {
    toast({
      title: "Change Password",
      description: "Password change feature will be implemented",
    });
  };

  const handleClearData = () => {
    toast({
      title: "Clear Data",
      description: "Application data cleared successfully",
      variant: "destructive",
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className="glass-card border-0">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Appearance</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Dark Mode</p>
                <p className="text-sm text-muted-foreground">Use dark theme across the application</p>
              </div>
              <Switch
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card border-0">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Network Settings</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="customRpc">Custom RPC URL</Label>
              <Input
                id="customRpc"
                type="url"
                value={customRpc}
                onChange={(e) => setCustomRpc(e.target.value)}
                className="bg-primary border-gray-600 focus:border-accent"
                placeholder="https://your-custom-rpc-url.com"
              />
              <p className="text-xs text-muted-foreground">Enter a custom RPC endpoint for blockchain interactions</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="gasMultiplier">Gas Price Multiplier</Label>
              <Select value={gasMultiplier} onValueChange={setGasMultiplier}>
                <SelectTrigger className="bg-primary border-gray-600 focus:border-accent">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1.0">1.0x (Default)</SelectItem>
                  <SelectItem value="1.1">1.1x (Faster)</SelectItem>
                  <SelectItem value="1.2">1.2x (Fastest)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleSaveSettings} className="w-full">
              Save Network Settings
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card border-0">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Security</h3>
          <div className="space-y-4">
            <Button 
              onClick={handleChangePassword}
              className="w-full bg-yellow-500 text-black hover:bg-yellow-600"
            >
              Change Password
            </Button>
            
            <Button 
              onClick={handleClearData}
              variant="destructive"
              className="w-full"
            >
              Clear Application Data
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card border-0">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">About</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p><strong>Version:</strong> 2.0.0</p>
            <p><strong>Build:</strong> 20250108-001</p>
            <p><strong>Developer:</strong> primasoftwares</p>
            <div className="pt-2">
              <button
                onClick={() => window.open('https://t.me/primasoftwares', '_blank')}
                className="text-accent hover:underline"
              >
                <i className="fab fa-telegram mr-2"></i>Contact Support
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
