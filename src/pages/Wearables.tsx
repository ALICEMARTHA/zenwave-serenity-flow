
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Bluetooth, Watch, Heart, Thermometer, Activity, Wifi, Phone } from 'lucide-react';
import { toast } from 'sonner';

interface WearableData {
  id: string;
  device_name: string;
  device_type: string;
  hrv_value: number;
  skin_temperature: number;
  heart_rate: number;
  stress_level: number;
  recorded_at: string;
}

const Wearables = () => {
  const { user } = useAuth();
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectedDevices, setConnectedDevices] = useState<string[]>([]);
  const [wearableData, setWearableData] = useState<WearableData[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [mockHRV, setMockHRV] = useState(45);
  const [mockSkinTemp, setMockSkinTemp] = useState(36.5);

  const deviceTypes = [
    {
      type: 'smartwatch',
      name: 'Apple Watch',
      icon: Watch,
      available: true,
      description: 'Heart rate, HRV, temperature monitoring'
    },
    {
      type: 'fitness_tracker',
      name: 'Fitbit',
      icon: Activity,
      available: true,
      description: 'Activity tracking, sleep monitoring, stress levels'
    },
    {
      type: 'heart_monitor',
      name: 'Polar H10',
      icon: Heart,
      available: true,
      description: 'Professional heart rate monitoring'
    },
    {
      type: 'other',
      name: 'Other Device',
      icon: Bluetooth,
      available: false,
      description: 'Other Bluetooth-enabled health devices'
    }
  ];

  useEffect(() => {
    if (user) {
      fetchWearableData();
    }
  }, [user]);

  const fetchWearableData = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('wearable_data')
      .select('*')
      .eq('user_id', user.id)
      .order('recorded_at', { ascending: false })
      .limit(10);

    if (error) {
      console.error('Error fetching wearable data:', error);
    } else {
      setWearableData(data || []);
    }
  };

  const connectDevice = async (deviceType: string, deviceName: string) => {
    if (!user) return;

    setIsConnecting(true);
    
    // Simulate device connection process
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate mock data
    const mockData = {
      user_id: user.id,
      device_name: deviceName,
      device_type: deviceType,
      hrv_value: Math.random() * 30 + 30, // 30-60 range
      skin_temperature: Math.random() * 2 + 36, // 36-38 °C
      heart_rate: Math.floor(Math.random() * 40 + 60), // 60-100 bpm
      stress_level: Math.floor(Math.random() * 7 + 1), // 1-7 scale
      recorded_at: new Date().toISOString()
    };

    const { error } = await supabase
      .from('wearable_data')
      .insert([mockData]);

    if (error) {
      toast.error('Failed to connect device: ' + error.message);
    } else {
      setConnectedDevices([...connectedDevices, deviceName]);
      toast.success(`${deviceName} connected successfully!`);
      fetchWearableData();
    }

    setIsConnecting(false);
  };

  const startHealthScan = async () => {
    if (!user) return;
    
    setIsScanning(true);
    
    // Simulate real-time data collection
    const interval = setInterval(() => {
      setMockHRV(prev => prev + (Math.random() - 0.5) * 5);
      setMockSkinTemp(prev => prev + (Math.random() - 0.5) * 0.3);
    }, 1000);

    // Stop after 10 seconds and save data
    setTimeout(async () => {
      clearInterval(interval);
      setIsScanning(false);

      const scanData = {
        user_id: user.id,
        device_name: 'Manual Scan',
        device_type: 'other',
        hrv_value: mockHRV,
        skin_temperature: mockSkinTemp,
        heart_rate: Math.floor(Math.random() * 40 + 60),
        stress_level: Math.floor((mockHRV < 40 ? 6 : 3) + Math.random() * 2),
        recorded_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('wearable_data')
        .insert([scanData]);

      if (!error) {
        toast.success('Health scan completed!');
        fetchWearableData();
      }
    }, 10000);
  };

  const getStressLevelColor = (level: number) => {
    if (level <= 3) return 'bg-green-500';
    if (level <= 5) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getStressLevelText = (level: number) => {
    if (level <= 3) return 'Low';
    if (level <= 5) return 'Moderate';
    return 'High';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Wearable Devices</h1>
            <p className="text-gray-600">Connect your devices to track your health metrics</p>
          </div>

          {/* Device Connection Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {deviceTypes.map((device) => {
              const IconComponent = device.icon;
              const isConnected = connectedDevices.includes(device.name);
              
              return (
                <Card key={device.type} className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="text-center pb-4">
                    <div className="flex justify-center mb-3">
                      <IconComponent className="w-12 h-12 text-purple-600" />
                    </div>
                    <CardTitle className="text-lg">{device.name}</CardTitle>
                    <p className="text-sm text-gray-600">{device.description}</p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    {isConnected ? (
                      <div className="text-center">
                        <Badge className="bg-green-100 text-green-800 mb-3">Connected</Badge>
                        <Button variant="outline" className="w-full" disabled>
                          <Wifi className="w-4 h-4 mr-2" />
                          Connected
                        </Button>
                      </div>
                    ) : (
                      <Button
                        className="w-full"
                        onClick={() => connectDevice(device.type, device.name)}
                        disabled={!device.available || isConnecting}
                      >
                        <Bluetooth className="w-4 h-4 mr-2" />
                        {isConnecting ? 'Connecting...' : 'Connect'}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Manual Health Scan */}
          <Card className="mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Phone className="w-6 h-6 mr-2 text-blue-600" />
                Manual Health Scan
              </CardTitle>
              <p className="text-gray-600">
                Start a 10-second health monitoring session using your device's sensors
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">HRV (Heart Rate Variability)</span>
                    <span className="text-lg font-bold">{mockHRV.toFixed(1)} ms</span>
                  </div>
                  <Progress value={(mockHRV / 60) * 100} className="h-2" />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Skin Temperature</span>
                    <span className="text-lg font-bold">{mockSkinTemp.toFixed(1)}°C</span>
                  </div>
                  <Progress value={((mockSkinTemp - 36) / 2) * 100} className="h-2" />
                </div>
                
                <Button
                  size="lg"
                  onClick={startHealthScan}
                  disabled={isScanning}
                  className="min-w-[200px]"
                >
                  {isScanning ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Scanning...
                    </>
                  ) : (
                    <>
                      <Heart className="w-4 h-4 mr-2" />
                      Start Health Scan
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Health Data History */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Recent Health Data</CardTitle>
              <p className="text-gray-600">Your latest health metrics from connected devices</p>
            </CardHeader>
            <CardContent>
              {wearableData.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No health data available. Connect a device or start a manual scan to begin.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {wearableData.map((data) => (
                    <div key={data.id} className="border rounded-lg p-4 bg-gray-50">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <Badge variant="outline" className="mr-2">
                            {data.device_name}
                          </Badge>
                          <span className="text-sm text-gray-600">
                            {new Date(data.recorded_at).toLocaleString()}
                          </span>
                        </div>
                        <Badge className={`${getStressLevelColor(data.stress_level)} text-white`}>
                          Stress: {getStressLevelText(data.stress_level)}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center">
                          <Heart className="w-4 h-4 text-red-500 mr-2" />
                          <span>{data.heart_rate} BPM</span>
                        </div>
                        <div className="flex items-center">
                          <Activity className="w-4 h-4 text-blue-500 mr-2" />
                          <span>HRV: {data.hrv_value?.toFixed(1)} ms</span>
                        </div>
                        <div className="flex items-center">
                          <Thermometer className="w-4 h-4 text-orange-500 mr-2" />
                          <span>{data.skin_temperature?.toFixed(1)}°C</span>
                        </div>
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full ${getStressLevelColor(data.stress_level)} mr-2`}></div>
                          <span>Stress Level: {data.stress_level}/7</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Wearables;
