
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { useAuth } from '@/contexts/AuthContext';
import { getDepartmentStats } from '@/utils/excelService';
import { Droplet, Zap, Heart, GraduationCap, Trash2 } from 'lucide-react';

const Departments: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

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
    }
  ];

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        <Header title="Departments" />
        
        <main className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">City Departments</h2>
            <p className="text-gray-600">Connect and collaborate with different municipal departments</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departmentsInfo.map((dept) => (
              <DepartmentCard 
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
        </main>
      </div>
    </div>
  );
};

type DepartmentCardProps = {
  name: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  count: number;
  onClick: () => void;
};

const DepartmentCard: React.FC<DepartmentCardProps> = ({ name, icon, color, description, count, onClick }) => {
  return (
    <div 
      className="bg-white rounded-lg shadow hover:shadow-md transition-shadow overflow-hidden cursor-pointer"
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
      <div className="p-4">
        <p className="text-gray-600 mb-4">{description}</p>
        <Button variant="outline" className="w-full">View Department</Button>
      </div>
    </div>
  );
};

export default Departments;
