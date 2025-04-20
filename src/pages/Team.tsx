
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { useAuth } from '@/contexts/AuthContext';
import { getUsers, User } from '@/utils/excelService';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Mail, Building } from 'lucide-react';

const Team: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [teamMembers, setTeamMembers] = useState<User[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    // Get all users
    setTeamMembers(getUsers());
  }, [isAuthenticated, navigate]);

  // Generate initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  // Generate mock email from username
  const generateEmail = (username: string) => {
    return `${username.toLowerCase()}@jdframeworks.com`;
  };

  // Generate mock phone number
  const generatePhone = (username: string) => {
    const numbers = username.split('').map(char => char.charCodeAt(0) % 10).join('');
    return `+91 ${numbers.padEnd(10, '0').substring(0, 10).replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')}`;
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        <Header title="Team Members" />
        
        <main className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Department Team</h2>
            <p className="text-gray-600">Connect with colleagues across departments</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <Card key={member.username} className="overflow-hidden">
                <CardHeader className="text-center pb-0">
                  <Avatar className="h-24 w-24 mx-auto">
                    <AvatarFallback className="text-2xl font-bold bg-purple text-white">
                      {getInitials(member.fullName)}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="mt-4">{member.fullName}</CardTitle>
                  <CardDescription>@{member.username}</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Building className="h-4 w-4 text-gray-500 mr-2" />
                      <span>{member.department}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-gray-500 mr-2" />
                      <span>{generateEmail(member.username)}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-gray-500 mr-2" />
                      <span>{generatePhone(member.username)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* If there are no team members or very few, add some dummy members */}
            {teamMembers.length < 4 && (
              <>
                <Card>
                  <CardHeader className="text-center pb-0">
                    <Avatar className="h-24 w-24 mx-auto">
                      <AvatarFallback className="text-2xl font-bold bg-blue-500 text-white">RK</AvatarFallback>
                    </Avatar>
                    <CardTitle className="mt-4">Rahul Kumar</CardTitle>
                    <CardDescription>@rahul</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <Building className="h-4 w-4 text-gray-500 mr-2" />
                        <span>Water Supply</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 text-gray-500 mr-2" />
                        <span>rahul@jdframeworks.com</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 text-gray-500 mr-2" />
                        <span>+91 987-654-3210</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="text-center pb-0">
                    <Avatar className="h-24 w-24 mx-auto">
                      <AvatarFallback className="text-2xl font-bold bg-green-500 text-white">PS</AvatarFallback>
                    </Avatar>
                    <CardTitle className="mt-4">Priya Sharma</CardTitle>
                    <CardDescription>@priya</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <Building className="h-4 w-4 text-gray-500 mr-2" />
                        <span>Health</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 text-gray-500 mr-2" />
                        <span>priya@jdframeworks.com</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 text-gray-500 mr-2" />
                        <span>+91 876-543-2109</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="text-center pb-0">
                    <Avatar className="h-24 w-24 mx-auto">
                      <AvatarFallback className="text-2xl font-bold bg-yellow-500 text-white">AK</AvatarFallback>
                    </Avatar>
                    <CardTitle className="mt-4">Amit Kapoor</CardTitle>
                    <CardDescription>@amit</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <Building className="h-4 w-4 text-gray-500 mr-2" />
                        <span>Electricity</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 text-gray-500 mr-2" />
                        <span>amit@jdframeworks.com</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 text-gray-500 mr-2" />
                        <span>+91 765-432-1098</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="text-center pb-0">
                    <Avatar className="h-24 w-24 mx-auto">
                      <AvatarFallback className="text-2xl font-bold bg-red-500 text-white">SG</AvatarFallback>
                    </Avatar>
                    <CardTitle className="mt-4">Sneha Gupta</CardTitle>
                    <CardDescription>@sneha</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <Building className="h-4 w-4 text-gray-500 mr-2" />
                        <span>Education</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 text-gray-500 mr-2" />
                        <span>sneha@jdframeworks.com</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 text-gray-500 mr-2" />
                        <span>+91 654-321-0987</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="text-center pb-0">
                    <Avatar className="h-24 w-24 mx-auto">
                      <AvatarFallback className="text-2xl font-bold bg-orange-500 text-white">VP</AvatarFallback>
                    </Avatar>
                    <CardTitle className="mt-4">Vikram Patel</CardTitle>
                    <CardDescription>@vikram</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <Building className="h-4 w-4 text-gray-500 mr-2" />
                        <span>Transportation</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 text-gray-500 mr-2" />
                        <span>vikram@jdframeworks.com</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 text-gray-500 mr-2" />
                        <span>+91 543-210-9876</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="text-center pb-0">
                    <Avatar className="h-24 w-24 mx-auto">
                      <AvatarFallback className="text-2xl font-bold bg-purple-500 text-white">NR</AvatarFallback>
                    </Avatar>
                    <CardTitle className="mt-4">Neha Reddy</CardTitle>
                    <CardDescription>@neha</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <Building className="h-4 w-4 text-gray-500 mr-2" />
                        <span>Finance</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 text-gray-500 mr-2" />
                        <span>neha@jdframeworks.com</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 text-gray-500 mr-2" />
                        <span>+91 432-109-8765</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Team;
