
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { getRequestsByUser } from '@/utils/excelService';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

const Profile: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editedDepartment, setEditedDepartment] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [editedPhone, setEditedPhone] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
    
    if (user) {
      setEditedName(user.fullName);
      setEditedDepartment(user.department);
      setEditedEmail(`${user.username}@jdframeworks.com`);
      setEditedPhone('+91 9876543210');
    }
  }, [isAuthenticated, navigate, user]);

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

  const openEditDialog = () => {
    setEditDialogOpen(true);
  };

  const handleSaveProfile = () => {
    // In a real app, this would update the user profile in the database
    toast({
      title: "Profile Updated",
      description: "Your profile information has been successfully updated."
    });
    setEditDialogOpen(false);
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
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Email</h4>
                      <p>{user.username}@jdframeworks.com</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Phone</h4>
                      <p>+91 9876543210</p>
                    </div>
                    
                    <Separator />
                    
                    <Button variant="outline" className="w-full" onClick={openEditDialog}>
                      Edit Profile
                    </Button>
                    
                    <Button 
                      variant="outline"
                      className="w-full"
                      onClick={() => navigate('/settings')}
                    >
                      Settings
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
      
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile information here.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="department" className="text-right">
                Department
              </Label>
              <Select 
                value={editedDepartment} 
                onValueChange={setEditedDepartment}
              >
                <SelectTrigger id="department" className="col-span-3">
                  <SelectValue placeholder="Select a department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Water Supply">Water Supply</SelectItem>
                  <SelectItem value="Electricity">Electricity</SelectItem>
                  <SelectItem value="Health">Health</SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
                  <SelectItem value="Sanitation">Sanitation</SelectItem>
                  <SelectItem value="Public Works">Public Works</SelectItem>
                  <SelectItem value="Transportation">Transportation</SelectItem>
                  <SelectItem value="Housing">Housing</SelectItem>
                  <SelectItem value="Administration">Administration</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                value={editedEmail}
                onChange={(e) => setEditedEmail(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input
                id="phone"
                value={editedPhone}
                onChange={(e) => setEditedPhone(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-purple hover:bg-purple-dark" onClick={handleSaveProfile}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
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
