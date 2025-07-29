import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Copy, Check } from 'lucide-react';
import QRCode from 'qrcode';

interface PricingProps {
  user: any;
  onSubscriptionComplete: () => Promise<boolean>;
}

export default function Pricing({ user, onSubscriptionComplete }: PricingProps) {
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [paymentTxHash, setPaymentTxHash] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [showPayment, setShowPayment] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const usdtAddress = "TQm8yS3XZHgXiHMtMWbrQwwmLCztyvAG8y";

  // Fetch subscription plans
  const { data: plans = [] } = useQuery({
    queryKey: ['/api/subscription-plans'],
  });

  // Generate QR code for USDT address
  useEffect(() => {
    QRCode.toDataURL(usdtAddress, {
      width: 200,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#ffffff'
      }
    })
    .then(url => setQrCodeUrl(url))
    .catch(err => console.error('QR code generation failed:', err));
  }, []);

  // Create subscription mutation
  const createSubscription = useMutation({
    mutationFn: async (data: { userId: string; planId: string; paymentTxHash: string }) => {
      return await apiRequest('/api/subscriptions', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });
    },
    onSuccess: async () => {
      toast({
        title: "Subscription Activated",
        description: "Your subscription has been activated successfully!",
      });
      await onSubscriptionComplete();
    },
    onError: (error: any) => {
      toast({
        title: "Subscription Failed",
        description: error.message || "Failed to activate subscription",
        variant: "destructive",
      });
    },
  });

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: "USDT address copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Please copy the address manually",
        variant: "destructive",
      });
    }
  };

  const handlePlanSelect = (plan: any) => {
    setSelectedPlan(plan);
    setShowPayment(true);
  };

  const handlePaymentConfirm = () => {
    if (!paymentTxHash.trim()) {
      toast({
        title: "Transaction Hash Required",
        description: "Please enter the transaction hash from your payment",
        variant: "destructive",
      });
      return;
    }

    createSubscription.mutate({
      userId: user.id,
      planId: selectedPlan.id,
      paymentTxHash: paymentTxHash.trim(),
    });
  };

  if (showPayment && selectedPlan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-black bg-opacity-50 border border-purple-500 shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-white">Complete Payment</CardTitle>
            <p className="text-gray-300">{selectedPlan.name} Plan - ${selectedPlan.price} USDT</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-600">
              <div className="flex items-center justify-between mb-2">
                <Label className="text-white text-sm">USDT Payment Address:</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(usdtAddress)}
                  className="text-xs h-8 px-2 text-purple-400 hover:text-purple-300"
                >
                  <Copy className="w-4 h-4 mr-1" />
                  Copy
                </Button>
              </div>
              <p className="font-mono text-sm break-all bg-gray-900 rounded p-2 text-gray-300 mb-3">
                {usdtAddress}
              </p>
              
              {qrCodeUrl && (
                <div className="flex justify-center p-3 bg-white rounded-lg">
                  <img src={qrCodeUrl} alt="USDT Address QR Code" className="w-48 h-48" />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="txHash" className="text-white">Transaction Hash</Label>
              <Input
                id="txHash"
                type="text"
                value={paymentTxHash}
                onChange={(e) => setPaymentTxHash(e.target.value)}
                className="bg-gray-800 border-gray-600 text-white focus:border-purple-500"
                placeholder="Enter transaction hash after payment"
              />
              <p className="text-xs text-gray-400">
                Send exactly ${selectedPlan.price} USDT to the address above, then enter the transaction hash
              </p>
            </div>

            <div className="flex space-x-3">
              <Button
                onClick={() => setShowPayment(false)}
                variant="ghost"
                className="flex-1 text-gray-300 hover:text-white"
              >
                Back
              </Button>
              <Button
                onClick={handlePaymentConfirm}
                disabled={createSubscription.isPending || !paymentTxHash.trim()}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                {createSubscription.isPending ? 'Confirming...' : 'Confirm Payment'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Choose Your Plan</h1>
          <p className="text-gray-300">Welcome {user.username}! Select a subscription plan to access the platform</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan: any) => (
            <Card 
              key={plan.id} 
              className={`bg-black bg-opacity-50 border shadow-2xl hover:shadow-purple-500/20 transition-all ${
                plan.name === 'Pro' ? 'border-purple-500 scale-105' : 'border-gray-600'
              }`}
            >
              <CardHeader className="text-center">
                {plan.name === 'Pro' && (
                  <div className="bg-purple-500 text-white text-xs font-bold py-1 px-3 rounded-full mb-2 inline-block">
                    POPULAR
                  </div>
                )}
                <CardTitle className="text-2xl font-bold text-white">{plan.name}</CardTitle>
                <div className="text-3xl font-bold text-purple-400">${plan.price}</div>
                <p className="text-gray-400">USDT Payment</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-center text-gray-300">
                      <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => handlePlanSelect(plan)}
                  className={`w-full ${
                    plan.name === 'Pro' 
                      ? 'bg-purple-600 hover:bg-purple-700' 
                      : 'bg-gray-700 hover:bg-gray-600'
                  } text-white`}
                >
                  Select {plan.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}