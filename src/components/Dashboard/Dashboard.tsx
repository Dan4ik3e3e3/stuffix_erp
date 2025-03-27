import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, MessageSquare, Target, Wrench } from 'lucide-react';

interface DashboardProps {
  metrics: {
    clients: number;
    projects: number;
    messages: number;
    tasks: number;
  };
  activityData: Array<{
    date: string;
    visits: number;
    messages: number;
    tasks: number;
  }>;
}

const Dashboard: React.FC<DashboardProps> = ({ metrics, activityData }) => {
  return (
    <div className="p-6 space-y-6">
      {/* Метрики */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-blue-100">
          <CardContent className="flex items-center p-4">
            <Users className="h-8 w-8 text-blue-600 mr-4" />
            <div>
              <p className="text-2xl font-bold">{metrics.clients}</p>
              <p className="text-sm text-gray-600">Клиенты</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-teal-100">
          <CardContent className="flex items-center p-4">
            <Target className="h-8 w-8 text-teal-600 mr-4" />
            <div>
              <p className="text-2xl font-bold">{metrics.projects}</p>
              <p className="text-sm text-gray-600">Проекты</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-100">
          <CardContent className="flex items-center p-4">
            <MessageSquare className="h-8 w-8 text-purple-600 mr-4" />
            <div>
              <p className="text-2xl font-bold">{metrics.messages}</p>
              <p className="text-sm text-gray-600">Сообщения</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-orange-100">
          <CardContent className="flex items-center p-4">
            <Wrench className="h-8 w-8 text-orange-600 mr-4" />
            <div>
              <p className="text-2xl font-bold">{metrics.tasks}</p>
              <p className="text-sm text-gray-600">Задачи</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* График активности */}
      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-4">Статистика активности</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="visits"
                  stackId="1"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
                <Area
                  type="monotone"
                  dataKey="messages"
                  stackId="1"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                />
                <Area
                  type="monotone"
                  dataKey="tasks"
                  stackId="1"
                  stroke="#ffc658"
                  fill="#ffc658"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard; 