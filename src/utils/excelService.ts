
import * as XLSX from 'xlsx';

// Define types for our data
export interface User {
  username: string;
  fullName: string;
  department: string;
  password: string;
}

export interface Request {
  id: string;
  username: string;
  title: string;
  description: string;
  department: string;
  status: 'pending' | 'in-progress' | 'completed';
  createdAt: string;
}

// Filename constants
const USERS_FILE = 'city_nexus_users.xlsx';
const REQUESTS_FILE = 'city_nexus_requests.xlsx';

// Check if Excel files exist, if not create them
const initializeExcelFiles = () => {
  try {
    // For Users
    if (!localStorage.getItem(USERS_FILE)) {
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet([]);
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');
      const excelData = XLSX.write(workbook, { bookType: 'xlsx', type: 'base64' });
      localStorage.setItem(USERS_FILE, excelData);
    }

    // For Requests
    if (!localStorage.getItem(REQUESTS_FILE)) {
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet([]);
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Requests');
      const excelData = XLSX.write(workbook, { bookType: 'xlsx', type: 'base64' });
      localStorage.setItem(REQUESTS_FILE, excelData);
    }
  } catch (error) {
    console.error('Error initializing Excel files:', error);
  }
};

// Get all users
export const getUsers = (): User[] => {
  try {
    const excelData = localStorage.getItem(USERS_FILE);
    if (!excelData) {
      initializeExcelFiles();
      return [];
    }

    const workbook = XLSX.read(excelData, { type: 'base64' });
    const worksheet = workbook.Sheets['Users'];
    return XLSX.utils.sheet_to_json<User>(worksheet);
  } catch (error) {
    console.error('Error reading users:', error);
    return [];
  }
};

// Add a new user
export const addUser = (user: User): boolean => {
  try {
    const users = getUsers();

    // Check if username already exists
    if (users.some(u => u.username === user.username)) {
      return false;
    }

    // Add new user
    users.push(user);

    // Write back to Excel
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(users);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');
    const excelData = XLSX.write(workbook, { bookType: 'xlsx', type: 'base64' });
    localStorage.setItem(USERS_FILE, excelData);

    return true;
  } catch (error) {
    console.error('Error adding user:', error);
    return false;
  }
};

// Verify user credentials
export const verifyUser = (username: string, password: string): User | null => {
  try {
    const users = getUsers();
    const user = users.find(u => u.username === username && u.password === password);
    return user || null;
  } catch (error) {
    console.error('Error verifying user:', error);
    return null;
  }
};

// Get all requests
export const getRequests = (): Request[] => {
  try {
    const excelData = localStorage.getItem(REQUESTS_FILE);
    if (!excelData) {
      initializeExcelFiles();
      return [];
    }

    const workbook = XLSX.read(excelData, { type: 'base64' });
    const worksheet = workbook.Sheets['Requests'];
    return XLSX.utils.sheet_to_json<Request>(worksheet);
  } catch (error) {
    console.error('Error reading requests:', error);
    return [];
  }
};

// Add a new request
export const addRequest = (request: Omit<Request, 'id' | 'createdAt' | 'status'>): boolean => {
  try {
    const requests = getRequests();

    // Create new request with ID and timestamp
    const newRequest: Request = {
      ...request,
      id: Date.now().toString(),
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    // Add new request
    requests.push(newRequest);

    // Write back to Excel
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(requests);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Requests');
    const excelData = XLSX.write(workbook, { bookType: 'xlsx', type: 'base64' });
    localStorage.setItem(REQUESTS_FILE, excelData);

    return true;
  } catch (error) {
    console.error('Error adding request:', error);
    return false;
  }
};

// Update request status
export const updateRequestStatus = (requestId: string, status: 'pending' | 'in-progress' | 'completed'): boolean => {
  try {
    const requests = getRequests();
    const index = requests.findIndex(r => r.id === requestId);
    
    if (index === -1) {
      return false;
    }

    requests[index].status = status;

    // Write back to Excel
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(requests);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Requests');
    const excelData = XLSX.write(workbook, { bookType: 'xlsx', type: 'base64' });
    localStorage.setItem(REQUESTS_FILE, excelData);

    return true;
  } catch (error) {
    console.error('Error updating request status:', error);
    return false;
  }
};

// Delete a request
export const deleteRequest = (requestId: string): boolean => {
  try {
    const requests = getRequests();
    const filteredRequests = requests.filter(r => r.id !== requestId);
    
    if (filteredRequests.length === requests.length) {
      // No request was removed
      return false;
    }

    // Write back to Excel
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(filteredRequests);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Requests');
    const excelData = XLSX.write(workbook, { bookType: 'xlsx', type: 'base64' });
    localStorage.setItem(REQUESTS_FILE, excelData);

    return true;
  } catch (error) {
    console.error('Error deleting request:', error);
    return false;
  }
};

// Get requests by username
export const getRequestsByUser = (username: string): Request[] => {
  try {
    const requests = getRequests();
    return requests.filter(r => r.username === username);
  } catch (error) {
    console.error('Error getting requests by user:', error);
    return [];
  }
};

// Get request counts by status
export const getRequestCounts = (): { total: number, pending: number, inProgress: number, completed: number } => {
  try {
    const requests = getRequests();
    
    return {
      total: requests.length,
      pending: requests.filter(r => r.status === 'pending').length,
      inProgress: requests.filter(r => r.status === 'in-progress').length,
      completed: requests.filter(r => r.status === 'completed').length
    };
  } catch (error) {
    console.error('Error getting request counts:', error);
    return { total: 0, pending: 0, inProgress: 0, completed: 0 };
  }
};

// Get department statistics
export const getDepartmentStats = (): { department: string, count: number }[] => {
  try {
    const requests = getRequests();
    const departments = [
      'Water Supply', 
      'Electricity', 
      'Health', 
      'Education', 
      'Sanitation',
      'Public Works',
      'Transportation',
      'Housing',
      'Administration',
      'Finance'
    ];
    
    return departments.map(department => ({
      department,
      count: requests.filter(r => r.department === department).length
    }));
  } catch (error) {
    console.error('Error getting department statistics:', error);
    return [];
  }
};

// Initialize Excel files when the service is loaded
initializeExcelFiles();
