
import React, { useState } from 'react';
import { Bell, ChevronDown } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getRequests } from '@/utils/excelService';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const Header: React.FC<{ title: string; children?: React.ReactNode }> = ({ title, children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Get pending requests for notifications - only those not created by the current user
  const pendingRequests = getRequests().filter(req => 
    req.status === 'pending' && req.username !== user?.username
  );
  
  const hasNotifications = pendingRequests.length > 0;

  return (
    <header className="flex justify-between items-center p-4 border-b bg-white">
      <h1 className="text-2xl font-bold">{title}</h1>
      
      <div className="flex items-center gap-4">
        {children}
        
        <Popover open={notificationsOpen} onOpenChange={setNotificationsOpen}>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {hasNotifications && (
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80 p-0">
            <div className="px-4 py-3 border-b">
              <h2 className="font-medium">Notifications</h2>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {hasNotifications ? (
                pendingRequests.map(req => (
                  <div key={req.id} className="px-4 py-3 border-b hover:bg-gray-50 cursor-pointer" onClick={() => navigate(`/requests`)}>
                    <p className="font-medium">{req.title}</p>
                    <p className="text-sm text-gray-500 mt-1">New request from {req.username}</p>
                    <div className="text-xs text-gray-400 mt-1">
                      {new Date(req.createdAt).toLocaleString()}
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-4 py-6 text-center text-gray-500">
                  <p>No notifications at this time</p>
                </div>
              )}
            </div>
            {hasNotifications && (
              <div className="px-4 py-2 border-t">
                <Button variant="ghost" size="sm" className="w-full" onClick={() => navigate('/requests')}>
                  View all requests
                </Button>
              </div>
            )}
          </PopoverContent>
        </Popover>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
              <span>{user?.username || 'User'}</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/profile')}>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/team')}>
              Team
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/settings')}>
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
