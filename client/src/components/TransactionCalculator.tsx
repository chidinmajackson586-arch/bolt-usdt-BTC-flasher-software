import { useState } from 'react';
import { Calculator, Info } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function TransactionCalculator() {
  const [amount, setAmount] = useState('1');
  const [crypto, setCrypto] = useState('BTC');
  
  const flashFees = {
    BTC: 0.0005,
    ETH: 0.01,
    USDT: 5,
    BNB: 0.02
  };

  const calculateFee = () => {
    const amountNum = parseFloat(amount) || 0;
    const fee = flashFees[crypto as keyof typeof flashFees];
    return fee;
  };

  const calculateTotal = () => {
    const amountNum = parseFloat(amount) || 0;
    const fee = calculateFee();
    return (amountNum + fee).toFixed(8);
  };

  return (
    <Card className="bg-black/50 border-purple-500/20 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Calculator className="w-5 h-5 text-purple-400" />
        <h3 className="text-lg font-semibold text-white">Transaction Calculator</h3>
      </div>

      <div className="space-y-4">
        <div>
          <Label className="text-gray-300">Cryptocurrency</Label>
          <Select value={crypto} onValueChange={setCrypto}>
            <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-600">
              <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
              <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
              <SelectItem value="USDT">Tether (USDT)</SelectItem>
              <SelectItem value="BNB">Binance Coin (BNB)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-gray-300">Amount to Send</Label>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="bg-gray-800 border-gray-600 text-white"
            placeholder="Enter amount"
            min="0"
            step="0.00000001"
          />
        </div>

        <div className="border-t border-gray-700 pt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Transaction Amount:</span>
            <span className="text-white font-medium">{amount} {crypto}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Flash Fee:</span>
            <span className="text-yellow-400">{calculateFee()} {crypto}</span>
          </div>
          <div className="flex justify-between text-sm font-semibold pt-2 border-t border-gray-700">
            <span className="text-white">Total Required:</span>
            <span className="text-purple-400">{calculateTotal()} {crypto}</span>
          </div>
        </div>

        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-blue-400 mt-0.5" />
            <p className="text-xs text-blue-300">
              Flash fee must be paid to TQm8yS3XZHgXiHMtMWbrQwwmLCztyvAG8y before sending transactions
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}