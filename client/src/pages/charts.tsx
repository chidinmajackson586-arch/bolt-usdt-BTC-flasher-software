import { Card, CardContent } from '@/components/ui/card';

export default function Charts() {
  const chartData = [
    {
      title: 'Bitcoin Price Chart',
      icon: 'fas fa-chart-line',
      color: 'text-accent',
      description: 'BTC Price Chart',
      subtitle: 'Real-time data integration required',
    },
    {
      title: 'Ethereum Price Chart',
      icon: 'fas fa-chart-area',
      color: 'text-green-500',
      description: 'ETH Price Chart',
      subtitle: 'Real-time data integration required',
    },
    {
      title: 'USDT Price Chart',
      icon: 'fas fa-chart-bar',
      color: 'text-yellow-500',
      description: 'USDT Price Chart',
      subtitle: 'Real-time data integration required',
    },
    {
      title: 'Portfolio Overview',
      icon: 'fas fa-pie-chart',
      color: 'text-blue-400',
      description: 'Portfolio Distribution',
      subtitle: 'Asset allocation visualization',
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {chartData.map((chart, index) => (
        <Card key={index} className="glass-card border-0">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">{chart.title}</h3>
            <div className="h-64 bg-primary rounded-lg flex items-center justify-center border border-gray-700">
              <div className="text-center text-muted-foreground">
                <i className={`${chart.icon} text-4xl mb-2 ${chart.color}`}></i>
                <p className="font-medium">{chart.description}</p>
                <p className="text-sm">{chart.subtitle}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
