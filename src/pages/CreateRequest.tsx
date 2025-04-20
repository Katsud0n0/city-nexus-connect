
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { useAuth } from '@/contexts/AuthContext';
import { addRequest } from '@/utils/excelService';

const CreateRequest: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [department, setDepartment] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const departments = [
    'Water Supply',
    'Electricity',
    'Health',
    'Education',
    'Sanitation'
  ];

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !department) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    if (!user) {
      toast({
        title: "Authentication Error",
        description: "You must be logged in to create a request.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    const success = addRequest({
      username: user.username,
      title,
      description,
      department
    });

    if (success) {
      toast({
        title: "Request Created",
        description: "Your request has been submitted successfully.",
      });
      navigate('/requests');
    } else {
      toast({
        title: "Error",
        description: "Failed to create request. Please try again.",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        <Header title="Create New Request" />
        
        <main className="p-6">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold mb-6">Submit a New Interdepartmental Request</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Request Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter a clear title for your request"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select value={department} onValueChange={setDepartment}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select target department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Request Details</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide detailed information about your request"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={6}
                  />
                </div>

                <div className="flex gap-4 justify-end">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => navigate('/requests')}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    className="bg-purple hover:bg-purple-dark"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Submitting...' : 'Submit Request'}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CreateRequest;
