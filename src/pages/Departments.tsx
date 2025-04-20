
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { useAuth } from '@/contexts/AuthContext';
import { getDepartmentStats } from '@/utils/excelService';
import { 
  Droplet, Zap, Heart, GraduationCap, Trash2, Building2, 
  Car, Home, FileText, Landmark, BarChart3, ArrowRight
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Departments: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState<string>('grid');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const departmentStats = getDepartmentStats();

  const departmentsInfo = [
    {
      name: 'Water Supply',
      icon: <Droplet className="h-6 w-6" />,
      color: 'bg-blue-500',
      description: 'Responsible for clean water distribution, maintenance of water infrastructure, and quality testing.',
      count: departmentStats.find(d => d.department === 'Water Supply')?.count || 0
    },
    {
      name: 'Electricity',
      icon: <Zap className="h-6 w-6" />,
      color: 'bg-yellow-500',
      description: 'Manages power distribution, electrical infrastructure, and handles power-related complaints.',
      count: departmentStats.find(d => d.department === 'Electricity')?.count || 0
    },
    {
      name: 'Health',
      icon: <Heart className="h-6 w-6" />,
      color: 'bg-red-500',
      description: 'Oversees public health initiatives, medical facilities, and healthcare programs across the city.',
      count: departmentStats.find(d => d.department === 'Health')?.count || 0
    },
    {
      name: 'Education',
      icon: <GraduationCap className="h-6 w-6" />,
      color: 'bg-green-500',
      description: 'Responsible for schools, educational programs, teacher training, and academic infrastructure.',
      count: departmentStats.find(d => d.department === 'Education')?.count || 0
    },
    {
      name: 'Sanitation',
      icon: <Trash2 className="h-6 w-6" />,
      color: 'bg-purple-500',
      description: 'Handles waste management, sewage systems, and maintains cleanliness throughout the city.',
      count: departmentStats.find(d => d.department === 'Sanitation')?.count || 0
    },
    {
      name: 'Public Works',
      icon: <Building2 className="h-6 w-6" />,
      color: 'bg-slate-500',
      description: 'Oversees construction and maintenance of roads, bridges, buildings and other public infrastructure.',
      count: departmentStats.find(d => d.department === 'Public Works')?.count || 0
    },
    {
      name: 'Transportation',
      icon: <Car className="h-6 w-6" />,
      color: 'bg-orange-500',
      description: 'Manages public transit systems, traffic management, and transportation infrastructure planning.',
      count: departmentStats.find(d => d.department === 'Transportation')?.count || 0
    },
    {
      name: 'Housing',
      icon: <Home className="h-6 w-6" />,
      color: 'bg-emerald-500',
      description: 'Provides affordable housing solutions, housing assistance programs, and community development.',
      count: departmentStats.find(d => d.department === 'Housing')?.count || 0
    },
    {
      name: 'Administration',
      icon: <FileText className="h-6 w-6" />,
      color: 'bg-indigo-500',
      description: 'Handles governmental administrative tasks, policy implementation, and interdepartmental coordination.',
      count: departmentStats.find(d => d.department === 'Administration')?.count || 0
    },
    {
      name: 'Finance',
      icon: <Landmark className="h-6 w-6" />,
      color: 'bg-cyan-500',
      description: 'Manages city budget, taxation, financial planning, and economic development initiatives.',
      count: departmentStats.find(d => d.department === 'Finance')?.count || 0
    }
  ];

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        <Header title="Departments" />
        
        <main className="p-6">
          <div className="mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold mb-2">City Departments</h2>
                <p className="text-gray-600">Connect and collaborate with different municipal departments</p>
              </div>
              
              <Button 
                className="bg-purple hover:bg-purple-dark"
                onClick={() => navigate('/requests/new')}
              >
                New Request
              </Button>
            </div>
          </div>

          <Tabs defaultValue="grid" className="w-full mb-6" onValueChange={setActiveView}>
            <div className="flex justify-between items-center">
              <TabsList>
                <TabsTrigger value="grid">Grid View</TabsTrigger>
                <TabsTrigger value="card">Card View</TabsTrigger>
                <TabsTrigger value="list">List View</TabsTrigger>
              </TabsList>
              
              <div className="text-sm text-gray-500">
                {departmentsInfo.length} Departments Available
              </div>
            </div>

            <TabsContent value="grid" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {departmentsInfo.map((dept) => (
                  <GridDepartmentCard 
                    key={dept.name} 
                    name={dept.name} 
                    icon={dept.icon} 
                    color={dept.color} 
                    description={dept.description}
                    count={dept.count}
                    onClick={() => navigate(`/departments/${dept.name.toLowerCase().replace(' ', '-')}`)}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="card" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {departmentsInfo.map((dept) => (
                  <Card key={dept.name} className="overflow-hidden">
                    <CardHeader className={`${dept.color} text-white`}>
                      <div className="flex justify-between items-center">
                        <CardTitle className="flex items-center gap-2">
                          {dept.icon}
                          {dept.name}
                        </CardTitle>
                        <div className="bg-white/20 rounded-full h-8 w-8 flex items-center justify-center text-white font-medium">
                          {dept.count}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <CardDescription className="text-base mb-6">{dept.description}</CardDescription>
                      <Button 
                        variant="outline" 
                        className="w-full flex justify-between items-center"
                        onClick={() => navigate(`/departments/${dept.name.toLowerCase().replace(' ', '-')}`)}
                      >
                        <span>View Department</span>
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="list" className="mt-6">
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="grid grid-cols-12 bg-gray-100 p-4 font-medium text-gray-600">
                  <div className="col-span-5">Department</div>
                  <div className="col-span-5">Service Description</div>
                  <div className="col-span-1 text-center">Requests</div>
                  <div className="col-span-1"></div>
                </div>
                <div className="divide-y">
                  {departmentsInfo.map((dept) => (
                    <div 
                      key={dept.name}
                      className="grid grid-cols-12 p-4 items-center hover:bg-gray-50 transition-colors"
                    >
                      <div className="col-span-5 flex items-center">
                        <div className={`${dept.color} w-8 h-8 rounded-full flex items-center justify-center text-white mr-3`}>
                          {dept.icon}
                        </div>
                        <div>
                          <h3 className="font-medium">{dept.name}</h3>
                        </div>
                      </div>
                      <div className="col-span-5 text-gray-600 text-sm">
                        {dept.description}
                      </div>
                      <div className="col-span-1 text-center">
                        <span className="inline-flex items-center justify-center bg-gray-100 rounded-full w-8 h-8">
                          {dept.count}
                        </span>
                      </div>
                      <div className="col-span-1 text-right">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => navigate(`/departments/${dept.name.toLowerCase().replace(' ', '-')}`)}
                        >
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-8 bg-gradient-to-r from-purple-500/10 to-blue-500/5 p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium mb-2">Interdepartmental Collaboration</h3>
            <p className="text-gray-600">
              Our platform enables seamless communication between departments to efficiently address citizen needs.
              Submit requests, track status, and receive updates all in one place.
            </p>
            <div className="flex justify-end mt-4">
              <Button variant="outline" className="border-purple text-purple" onClick={() => navigate('/requests/new')}>
                Submit New Request
              </Button>
            </div>
          </div>
          
          {activeView === 'grid' && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Department Activity</h3>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  {departmentsInfo.slice(0, 5).map(dept => (
                    <div key={`stats-${dept.name}`} className="flex flex-col items-center text-center p-4 rounded-lg border">
                      <div className={`${dept.color} w-12 h-12 rounded-full flex items-center justify-center text-white mb-3`}>
                        {dept.icon}
                      </div>
                      <h4 className="font-medium">{dept.name}</h4>
                      <div className="text-2xl font-bold mt-2">{dept.count}</div>
                      <div className="text-sm text-gray-500">Active Requests</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

type GridDepartmentCardProps = {
  name: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  count: number;
  onClick: () => void;
};

const GridDepartmentCard: React.FC<GridDepartmentCardProps> = ({ 
  name, icon, color, description, count, onClick 
}) => {
  return (
    <div 
      className="bg-white rounded-lg shadow hover:shadow-md transition-shadow overflow-hidden cursor-pointer h-full flex flex-col"
      onClick={onClick}
    >
      <div className={`${color} text-white p-4 flex justify-between items-center`}>
        <div className="flex items-center">
          {icon}
          <h3 className="text-xl font-semibold ml-2">{name}</h3>
        </div>
        <div className="bg-white/20 rounded-full h-8 w-8 flex items-center justify-center text-sm font-medium">
          {count}
        </div>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <p className="text-gray-600 mb-4 flex-1">{description}</p>
        <Button variant="outline" className="w-full mt-auto">View Department</Button>
      </div>
    </div>
  );
};

export default Departments;
