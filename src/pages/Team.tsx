
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { getUsers, User } from '@/utils/excelService';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  CheckCircle,
  Mail,
  MessageSquare,
  Phone,
  UserPlus,
} from 'lucide-react';

const Team: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [allUsers, setAllUsers] = useState<User[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Get all users from the service
    setAllUsers(getUsers());
  }, [isAuthenticated, navigate]);

  // Group users by department
  const usersByDepartment: Record<string, User[]> = {};
  
  allUsers.forEach((user) => {
    if (!usersByDepartment[user.department]) {
      usersByDepartment[user.department] = [];
    }
    usersByDepartment[user.department].push(user);
  });

  const departments = Object.keys(usersByDepartment).sort();

  // If no users, populate with some mock data
  if (allUsers.length === 0) {
    const mockUsers = [
      { username: 'john.doe', fullName: 'John Doe', department: 'Water Supply', password: '' },
      { username: 'sarah.smith', fullName: 'Sarah Smith', department: 'Electricity', password: '' },
      { username: 'michael.chen', fullName: 'Michael Chen', department: 'Health', password: '' },
      { username: 'preeti.vyas', fullName: 'Preeti Vyas', department: 'Education', password: '' },
      { username: 'rajiv.kumar', fullName: 'Rajiv Kumar', department: 'Sanitation', password: '' },
      { username: 'lisa.wong', fullName: 'Lisa Wong', department: 'Public Works', password: '' },
      { username: 'ahmed.khan', fullName: 'Ahmed Khan', department: 'Transportation', password: '' },
      { username: 'maria.rodriguez', fullName: 'Maria Rodriguez', department: 'Housing', password: '' },
      { username: 'david.kim', fullName: 'David Kim', department: 'Administration', password: '' },
      { username: 'tanvi.shah', fullName: 'Tanvi Shah', department: 'Finance', password: '' },
      { username: 'james.wilson', fullName: 'James Wilson', department: 'Water Supply', password: '' },
      { username: 'priya.patel', fullName: 'Priya Patel', department: 'Education', password: '' },
    ];
    
    mockUsers.forEach(mockUser => {
      if (!usersByDepartment[mockUser.department]) {
        usersByDepartment[mockUser.department] = [];
      }
      usersByDepartment[mockUser.department].push(mockUser);
    });
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        <Header title="Team" />
        
        <main className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Departmental Teams</h2>
              <p className="text-gray-600">Connect with team members across various departments</p>
            </div>
            
            <Button className="bg-purple hover:bg-purple-dark">
              <UserPlus className="h-4 w-4 mr-2" />
              Invite Team Member
            </Button>
          </div>
          
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Departments</TabsTrigger>
              {departments.map((department) => (
                <TabsTrigger key={department} value={department}>
                  {department}
                </TabsTrigger>
              ))}
            </TabsList>
            
            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {departments.map((department) => (
                  <Card key={department}>
                    <CardHeader className="bg-gray-50 border-b">
                      <CardTitle>{department}</CardTitle>
                      <CardDescription>
                        {usersByDepartment[department].length} team members
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        {usersByDepartment[department].map((teamMember) => (
                          <TeamMemberCard 
                            key={teamMember.username} 
                            user={teamMember} 
                          />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            {departments.map((department) => (
              <TabsContent key={department} value={department}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {usersByDepartment[department].map((teamMember) => (
                    <TeamMemberCard 
                      key={teamMember.username} 
                      user={teamMember} 
                      expanded
                    />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </main>
      </div>
    </div>
  );
};

type TeamMemberCardProps = {
  user: User;
  expanded?: boolean;
};

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ user, expanded = false }) => {
  // Generate a random avatar color based on username
  const colorIndex = user.username.charCodeAt(0) % 5;
  const avatarColors = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-pink-500', 'bg-purple-500'];
  const avatarColor = avatarColors[colorIndex];

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };

  if (expanded) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className={`${avatarColor} w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold`}>
              {getInitials(user.fullName)}
            </div>
            <div>
              <h3 className="font-bold text-lg">{user.fullName}</h3>
              <p className="text-gray-500">@{user.username}</p>
              <p className="text-sm text-gray-500 mt-1">{user.department}</p>
            </div>
          </div>
          
          <div className="space-y-3 mt-4">
            <Button variant="outline" className="w-full justify-start">
              <Mail className="mr-2 h-4 w-4" />
              Send Email
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <MessageSquare className="mr-2 h-4 w-4" />
              Message
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Phone className="mr-2 h-4 w-4" />
              Call
            </Button>
          </div>
          
          <div className="mt-4 pt-4 border-t">
            <h4 className="font-medium mb-2">Performance</h4>
            <div className="flex justify-between items-center">
              <div className="text-green-600 flex items-center">
                <CheckCircle className="h-4 w-4 mr-1" />
                <span className="text-sm">Active Status</span>
              </div>
              <div className="text-gray-600 flex items-center">
                <BarChart className="h-4 w-4 mr-1" />
                <span className="text-sm">5 requests completed</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div className={`${avatarColor} w-10 h-10 rounded-full flex items-center justify-center text-white font-bold`}>
        {getInitials(user.fullName)}
      </div>
      <div>
        <h3 className="font-medium">{user.fullName}</h3>
        <p className="text-sm text-gray-500">@{user.username}</p>
      </div>
    </div>
  );
};

export default Team;
