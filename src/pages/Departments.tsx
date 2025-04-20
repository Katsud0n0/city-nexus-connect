import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { getDepartmentStats } from '@/utils/excelService';
import { 
  Droplet, Zap, Heart, GraduationCap, Trash2, Building2, 
  Car, Home, FileText, Landmark, ArrowRight
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Departments = () => {
  const navigate = useNavigate();
  const [selectedDept, setSelectedDept] = useState<any>(null);
  const departmentStats = getDepartmentStats();

  const departmentsInfo = [
    {
      name: 'Water Supply',
      icon: <Droplet className="h-6 w-6" />,
      color: 'bg-blue-500',
      description: 'Responsible for clean water distribution, maintenance of water infrastructure, and quality testing.',
      count: departmentStats.find(d => d.department === 'Water Supply')?.count || 0,
      details: 'Our Water Supply Department ensures the delivery of clean and safe drinking water to all citizens. We maintain extensive water infrastructure networks and conduct regular quality tests to meet the highest standards of water safety.'
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
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold">City Departments</h2>
              <p className="text-gray-600">Connect and collaborate with different municipal departments</p>
            </div>
            <Button 
              className="bg-purple hover:bg-purple-dark"
              onClick={() => navigate('/requests/new')}
            >
              New Request
            </Button>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="grid grid-cols-12 bg-gray-100 p-4 font-medium text-gray-600">
              <div className="col-span-4">Department</div>
              <div className="col-span-6">Service Description</div>
              <div className="col-span-1 text-center">Requests</div>
              <div className="col-span-1"></div>
            </div>
            <div className="divide-y">
              {departmentsInfo.map((dept) => (
                <div 
                  key={dept.name}
                  className="grid grid-cols-12 p-4 items-center hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => setSelectedDept(dept)}
                >
                  <div className="col-span-4 flex items-center">
                    <div className={`${dept.color} w-8 h-8 rounded-full flex items-center justify-center text-white mr-3`}>
                      {dept.icon}
                    </div>
                    <div>
                      <h3 className="font-medium">{dept.name}</h3>
                    </div>
                  </div>
                  <div className="col-span-6 text-gray-600">
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
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>

        <Dialog open={!!selectedDept} onOpenChange={() => setSelectedDept(null)}>
          <DialogContent className="sm:max-w-[600px]">
            {selectedDept && (
              <>
                <DialogHeader>
                  <div className="flex items-center gap-3">
                    <div className={`${selectedDept.color} w-10 h-10 rounded-full flex items-center justify-center text-white`}>
                      {selectedDept.icon}
                    </div>
                    <DialogTitle>{selectedDept.name}</DialogTitle>
                  </div>
                </DialogHeader>
                <DialogDescription className="text-base">
                  {selectedDept.details}
                </DialogDescription>
                <div className="mt-4">
                  <Button 
                    className="w-full bg-purple hover:bg-purple-dark"
                    onClick={() => {
                      setSelectedDept(null);
                      navigate('/requests/new');
                    }}
                  >
                    Submit Request
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Departments;
