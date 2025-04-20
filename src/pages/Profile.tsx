
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { getRequestsByUser } from '@/utils/excelService';

const Profile: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const userRequests = getRequestsByUser(user?.username || '');

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        <Header title="Your Profile" />
        
        <main className="p-6">
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <Card>
                <CardHeader className="text-center">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarFallback className="text-xl bg-purple text-white">
                      {getInitials(user.fullName)}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle>{user.fullName}</CardTitle>
                  <CardDescription>@{user.username}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Department</h4>
                      <p>{user.department}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Account Status</h4>
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                        <span>Active</span>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <Button variant="outline" className="w-full" onClick={() => navigate('/settings')}>
                      Edit Profile
                    </Button>
                    
                    <Button 
                      variant="destructive" 
                      className="w-full"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Activity Summary</CardTitle>
                  <CardDescription>Overview of your activity on the platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <h3 className="text-3xl font-bold text-purple mb-1">{userRequests.length}</h3>
                      <p className="text-gray-500">Total Requests</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <h3 className="text-3xl font-bold text-green-500 mb-1">
                        {userRequests.filter(r => r.status === 'completed').length}
                      </h3>
                      <p className="text-gray-500">Completed</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <h3 className="text-3xl font-bold text-orange-500 mb-1">
                        {userRequests.filter(r => r.status === 'pending').length}
                      </h3>
                      <p className="text-gray-500">Pending</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
                    
                    {userRequests.length > 0 ? (
                      <div className="space-y-4">
                        {userRequests.slice(0, 5).map(request => (
                          <div key={request.id} className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex justify-between mb-2">
                              <h4 className="font-medium">{request.title}</h4>
                              <span className="text-sm text-gray-500">
                                {new Date(request.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                              {request.description.substring(0, 100)}
                              {request.description.length > 100 ? '...' : ''}
                            </p>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-purple">{request.department}</span>
                              <StatusBadge status={request.status} />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 bg-gray-50 rounded-lg">
                        <p className="text-gray-500 mb-4">You haven't made any requests yet.</p>
                        <Button className="bg-purple hover:bg-purple-dark" onClick={() => navigate('/requests/new')}>
                          Create Your First Request
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  let color = "";
  switch (status) {
    case "pending":
      color = "bg-orange-100 text-orange-700";
      break;
    case "in-progress":
      color = "bg-blue-100 text-blue-700";
      break;
    case "completed":
      color = "bg-green-100 text-green-700";
      break;
    default:
      color = "bg-gray-100 text-gray-700";
  }

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>
      {status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")}
    </span>
  );
};

export default Profile;
