
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';
import {
  Bell,
  Lock,
  LogOut,
  Mail,
  Shield,
  User,
} from 'lucide-react';

const Settings: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('user@example.com');
  const [notifyOnMessage, setNotifyOnMessage] = useState(true);
  const [notifyOnRequest, setNotifyOnRequest] = useState(true);
  const [notifyOnStatus, setNotifyOnStatus] = useState(true);
  
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const handleChangeEmail = () => {
    toast({
      title: "Email updated",
      description: "Your email has been updated successfully.",
    });
  };
  
  const handleChangePassword = () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast({
        title: "Validation error",
        description: "Please fill in all password fields.",
        variant: "destructive",
      });
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "New password and confirmation do not match.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Password updated",
      description: "Your password has been changed successfully.",
    });
    
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        <Header title="Settings" />
        
        <main className="p-6">
          <Tabs defaultValue="account" className="w-full">
            <div className="flex mb-6">
              <TabsList className="mr-auto">
                <TabsTrigger value="account">
                  <User className="h-4 w-4 mr-2" />
                  Account
                </TabsTrigger>
                <TabsTrigger value="notifications">
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger value="security">
                  <Shield className="h-4 w-4 mr-2" />
                  Security
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="account">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>
                      Update your account details and personal information.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-lg font-medium">Username</h3>
                          <p className="text-gray-500">{user?.username}</p>
                        </div>
                        <Button variant="outline">Edit</Button>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-lg font-medium">Full Name</h3>
                          <p className="text-gray-500">{user?.fullName || 'Not set'}</p>
                        </div>
                        <Button variant="outline">Edit</Button>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-lg font-medium">Department</h3>
                          <p className="text-gray-500">{user?.department || 'Not assigned'}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Email Address</CardTitle>
                    <CardDescription>
                      Change your email address for communications.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <Label htmlFor="email">Email</Label>
                        <div className="flex gap-4">
                          <Input
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="flex-1"
                          />
                          <Button onClick={handleChangeEmail}>Save</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="text-red-600">
                    <CardTitle>Danger Zone</CardTitle>
                    <CardDescription>
                      Proceed with caution. These actions cannot be undone.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Log out of all sessions</h3>
                        <p className="text-gray-500 text-sm">
                          You will be logged out of all devices except this one.
                        </p>
                      </div>
                      <Button variant="outline" className="text-red-600">
                        <LogOut className="h-4 w-4 mr-2" />
                        Log out
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>
                    Decide which communications you'd like to receive and how.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h3 className="font-medium">
                        <Mail className="h-4 w-4 inline mr-2" />
                        New message notifications
                      </h3>
                      <p className="text-gray-500 text-sm">Get notified when you receive new messages.</p>
                    </div>
                    <Switch 
                      checked={notifyOnMessage} 
                      onCheckedChange={setNotifyOnMessage} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h3 className="font-medium">New request notifications</h3>
                      <p className="text-gray-500 text-sm">Get notified when new requests are submitted.</p>
                    </div>
                    <Switch 
                      checked={notifyOnRequest} 
                      onCheckedChange={setNotifyOnRequest} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h3 className="font-medium">Status change notifications</h3>
                      <p className="text-gray-500 text-sm">Get notified when the status of your requests changes.</p>
                    </div>
                    <Switch 
                      checked={notifyOnStatus} 
                      onCheckedChange={setNotifyOnStatus} 
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="security">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                    <CardDescription>
                      Update your password to maintain account security.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input
                          id="current-password"
                          type="password"
                          value={oldPassword}
                          onChange={(e) => setOldPassword(e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-1">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input
                          id="new-password"
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-1">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input
                          id="confirm-password"
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </div>
                      
                      <Button onClick={handleChangePassword}>Update Password</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Login Sessions</CardTitle>
                    <CardDescription>
                      Manage your active sessions and security settings.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                        <div>
                          <div className="font-medium flex items-center">
                            <Lock className="h-4 w-4 mr-2" />
                            Current session
                          </div>
                          <p className="text-gray-500 text-sm">Last active: Now</p>
                        </div>
                        <Button variant="outline" onClick={handleLogout}>Sign Out</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Settings;
