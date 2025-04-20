import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MessageSquare, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Team = () => {
  const navigate = useNavigate();

  const teamMembers = [
    {
      fullName: 'Priya Sharma',
      username: 'priya.sharma',
      department: 'Water Supply',
      role: 'Department Head',
      email: 'priya.sharma@jdframework.com',
      phone: '+91 98765 43210'
    },
    {
      fullName: 'Rajesh Kumar',
      username: 'rajesh.kumar',
      department: 'Education',
      role: 'Senior Administrator',
      email: 'rajesh.kumar@jdframework.com',
      phone: '+91 87654 32109'
    },
    {
      fullName: 'Anjali Patel',
      username: 'anjali.patel',
      department: 'Transportation',
      role: 'Project Manager',
      email: 'anjali.patel@jdframework.com',
      phone: '+91 76543 21098'
    },
    {
      fullName: 'Mohammed Khan',
      username: 'mohammed.khan',
      department: 'Health',
      role: 'Department Coordinator',
      email: 'mohammed.khan@jdframework.com',
      phone: '+91 65432 10987'
    },
    {
      fullName: 'Sunita Reddy',
      username: 'sunita.reddy',
      department: 'Finance',
      role: 'Financial Analyst',
      email: 'sunita.reddy@jdframework.com',
      phone: '+91 54321 09876'
    },
    {
      fullName: 'Arjun Gupta',
      username: 'arjun.gupta',
      department: 'Public Works',
      role: 'Operations Manager',
      email: 'arjun.gupta@jdframework.com',
      phone: '+91 43210 98765'
    }
  ];

  const getAvatarColor = (username: string) => {
    const colorIndex = username.charCodeAt(0) % 5;
    const avatarColors = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-pink-500', 'bg-purple-500'];
    return avatarColors[colorIndex];
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        <Header title="Team" />
        
        <main className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member) => (
              <Card key={member.username}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`${getAvatarColor(member.username)} w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold`}>
                      {getInitials(member.fullName)}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{member.fullName}</h3>
                      <p className="text-gray-500">@{member.username}</p>
                      <p className="text-sm text-gray-500 mt-1">{member.department}</p>
                      <p className="text-sm text-purple">{member.role}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mt-4">
                    <Button variant="outline" className="w-full justify-start">
                      <Mail className="mr-2 h-4 w-4" />
                      <span className="text-sm">{member.email}</span>
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Phone className="mr-2 h-4 w-4" />
                      <span className="text-sm">{member.phone}</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Team;
