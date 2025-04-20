import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { useAuth } from '@/contexts/AuthContext';
import { getDepartmentStats, getRequestCounts, getRequestsByUser } from '@/utils/excelService';
import { Users, Clock, FileCheck, FileText } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [requestCounts, setRequestCounts] = useState({ total: 0, pending: 0, inProgress: 0, completed: 0 });
  const [departmentStats, setDepartmentStats] = useState<{ department: string; count: number }[]>([]);
  const [userRequests, setUserRequests] = useState<any[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Get request counts
    setRequestCounts(getRequestCounts());

    // Get department statistics
    setDepartmentStats(getDepartmentStats());

    // Get user requests
    if (user) {
      setUserRequests(getRequestsByUser(user.username));
    }
  }, [isAuthenticated, navigate, user]);

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        <Header title="Dashboard">
          <Button className="bg-purple hover:bg-purple-dark" onClick={() => navigate('/requests/new')}>
            New Request
          </Button>
        </Header>
        
        <main className="p-6">
          <h2 className="text-xl font-medium mb-4">Welcome back, {user?.fullName || 'User'}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatusCard 
              title="Total Requests" 
              count={requestCounts.total} 
              description="All department requests" 
              icon={<FileText className="h-6 w-6" />}
              color="border-slate-800"
            />
            <StatusCard 
              title="Pending" 
              count={requestCounts.pending} 
              description="Awaiting action" 
              icon={<Clock className="h-6 w-6" />}
              color="border-orange-500"
            />
            <StatusCard 
              title="In Progress" 
              count={requestCounts.inProgress} 
              description="Currently being processed" 
              icon={<Users className="h-6 w-6" />}
              color="border-blue-500"
            />
            <StatusCard 
              title="Completed" 
              count={requestCounts.completed} 
              description="Successfully resolved" 
              icon={<FileCheck className="h-6 w-6" />}
              color="border-green-500"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium mb-4">Department Statistics</h3>
              <div className="space-y-4">
                {departmentStats.map((stat) => (
                  <div key={stat.department} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-gray-100 p-2 rounded mr-3">
                        <FileText className="h-5 w-5 text-gray-600" />
                      </div>
                      <span>{stat.department}</span>
                    </div>
                    <div className="bg-purple-100 text-purple rounded-full px-3 py-1">
                      {stat.count}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Your Recent Requests</h3>
                <Button variant="link" className="text-purple" onClick={() => navigate('/requests')}>
                  View All
                </Button>
              </div>

              {userRequests.length > 0 ? (
                <div className="space-y-4">
                  {userRequests.slice(0, 3).map((request) => (
                    <div key={request.id} className="border-b pb-4">
                      <h4 className="font-medium">{request.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{request.description.substring(0, 60)}...</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">
                          {new Date(request.createdAt).toLocaleDateString()}
                        </span>
                        <StatusBadge status={request.status} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                  <h4 className="text-lg font-medium mb-2">No Requests Yet</h4>
                  <p className="text-gray-500 mb-4">You haven't created any interdepartmental requests yet.</p>
                  <Button className="bg-purple hover:bg-purple-dark" onClick={() => navigate('/requests/new')}>
                    Create Your First Request
                  </Button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const StatusCard: React.FC<{
  title: string;
  count: number;
  description: string;
  icon: React.ReactNode;
  color: string;
}> = ({ title, count, description, icon, color }) => {
  return (
    <div className={`bg-white p-6 rounded-lg shadow ${color} border-l-4`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium mb-1">{title}</h3>
          <p className="text-3xl font-bold mb-2">{count}</p>
          <p className="text-gray-500 text-sm">{description}</p>
        </div>
        <div className="text-gray-400">
          {icon}
        </div>
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

export default Dashboard;
