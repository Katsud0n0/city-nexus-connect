
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { useAuth } from '@/contexts/AuthContext';
import { getRequests, updateRequestStatus, Request } from '@/utils/excelService';
import { Search, Filter, FilePlus, Trash2, Check, Eye } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";

// Add delete request function to excelService.ts (we'll implement this later)
const deleteRequest = (id: string) => {
  try {
    // Get all requests
    const requests = getRequests();
    // Filter out the request to delete
    const updatedRequests = requests.filter(r => r.id !== id);
    // Save the updated requests to localStorage
    localStorage.setItem('city_nexus_requests.xlsx', JSON.stringify(updatedRequests));
    return true;
  } catch (error) {
    console.error('Error deleting request:', error);
    return false;
  }
};

const Requests: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [requests, setRequests] = useState<Request[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [requestToDelete, setRequestToDelete] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Get all requests
    loadRequests();
  }, [isAuthenticated, navigate]);

  const loadRequests = () => {
    setRequests(getRequests());
  };

  // Filter requests based on search term and status filter
  const filteredRequests = requests.filter(request => {
    const matchesSearch = 
      request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleDeleteRequest = (id: string) => {
    setRequestToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (requestToDelete) {
      const success = deleteRequest(requestToDelete);
      if (success) {
        toast({
          title: "Request deleted",
          description: "The request has been successfully deleted.",
        });
        loadRequests();
      } else {
        toast({
          title: "Error",
          description: "There was an error deleting the request.",
          variant: "destructive",
        });
      }
    }
    setDeleteDialogOpen(false);
    setRequestToDelete(null);
  };

  const handleAcceptRequest = (id: string) => {
    const success = updateRequestStatus(id, 'in-progress');
    if (success) {
      toast({
        title: "Request accepted",
        description: "The request has been marked as in progress.",
      });
      loadRequests();
    } else {
      toast({
        title: "Error",
        description: "There was an error accepting the request.",
        variant: "destructive",
      });
    }
  };

  const handleCompleteRequest = (id: string) => {
    const success = updateRequestStatus(id, 'completed');
    if (success) {
      toast({
        title: "Request completed",
        description: "The request has been marked as completed.",
      });
      loadRequests();
    } else {
      toast({
        title: "Error",
        description: "There was an error completing the request.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        <Header title="Requests">
          <Button className="bg-purple hover:bg-purple-dark" onClick={() => navigate('/requests/new')}>
            <FilePlus className="mr-2 h-4 w-4" />
            New Request
          </Button>
        </Header>
        
        <main className="p-6">
          <div className="bg-white rounded-lg shadow mb-6">
            <div className="p-4 border-b flex flex-wrap items-center justify-between gap-4">
              <div className="relative flex-1 min-w-[260px]">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search requests..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-500 mr-2">Status:</span>
                <div className="flex">
                  <StatusFilterButton 
                    active={statusFilter === 'all'} 
                    onClick={() => setStatusFilter('all')}
                    position="left"
                  >
                    All
                  </StatusFilterButton>
                  <StatusFilterButton 
                    active={statusFilter === 'pending'} 
                    onClick={() => setStatusFilter('pending')}
                    position="middle"
                  >
                    Pending
                  </StatusFilterButton>
                  <StatusFilterButton 
                    active={statusFilter === 'in-progress'} 
                    onClick={() => setStatusFilter('in-progress')}
                    position="middle"
                  >
                    In Progress
                  </StatusFilterButton>
                  <StatusFilterButton 
                    active={statusFilter === 'completed'} 
                    onClick={() => setStatusFilter('completed')}
                    position="right"
                  >
                    Completed
                  </StatusFilterButton>
                </div>
              </div>
            </div>
            
            {filteredRequests.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 text-left">
                    <tr>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Date Created</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredRequests.map((request) => (
                      <tr key={request.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          #{request.id.substring(0, 6)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {request.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {request.department}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(request.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge status={request.status} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm flex items-center space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-purple flex items-center" 
                            onClick={() => navigate(`/requests/${request.id}`)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          
                          {user && user.username === request.username && request.status !== 'completed' && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-red-500 flex items-center" 
                              onClick={() => handleDeleteRequest(request.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Delete
                            </Button>
                          )}
                          
                          {user && user.username !== request.username && request.status === 'pending' && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-green-500 flex items-center" 
                              onClick={() => handleAcceptRequest(request.id)}
                            >
                              <Check className="h-4 w-4 mr-1" />
                              Accept
                            </Button>
                          )}
                          
                          {user && request.status === 'in-progress' && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-blue-500 flex items-center" 
                              onClick={() => handleCompleteRequest(request.id)}
                            >
                              <Check className="h-4 w-4 mr-1" />
                              Complete
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-8 text-center">
                <div className="inline-flex rounded-full bg-gray-100 p-4 mb-4">
                  <Search className="h-6 w-6 text-gray-500" />
                </div>
                <h3 className="text-lg font-medium mb-1">No requests found</h3>
                <p className="text-gray-500 mb-4">
                  {searchTerm || statusFilter !== 'all' 
                    ? "Try adjusting your search or filter criteria."
                    : "You haven't created any requests yet."}
                </p>
                {!searchTerm && statusFilter === 'all' && (
                  <Button className="bg-purple hover:bg-purple-dark" onClick={() => navigate('/requests/new')}>
                    Create Your First Request
                  </Button>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
      
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this request.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-500 hover:bg-red-600">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

type StatusFilterButtonProps = {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
  position: 'left' | 'middle' | 'right';
};

const StatusFilterButton: React.FC<StatusFilterButtonProps> = ({ 
  active, 
  children, 
  onClick,
  position
}) => {
  let roundedClass = 'rounded-none';
  if (position === 'left') roundedClass = 'rounded-l-md';
  if (position === 'right') roundedClass = 'rounded-r-md';

  return (
    <button
      onClick={onClick}
      className={`
        px-3 py-1.5 text-sm border ${roundedClass}
        ${active 
          ? 'bg-purple text-white border-purple' 
          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}
      `}
    >
      {children}
    </button>
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

export default Requests;
