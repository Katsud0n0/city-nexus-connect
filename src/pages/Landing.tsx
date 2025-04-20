
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Building2, Users, FileText, Zap } from 'lucide-react';

const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen navy-bg flex flex-col">
      <header className="p-4 flex justify-between items-center">
        <div className="text-xl font-bold">
          <span className="text-white">JD</span>
          <span className="text-purple-light"> | </span>
          <span className="text-purple-light">Frameworks</span>
        </div>
        <div className="flex gap-4">
          <Button
            variant="ghost"
            className="text-white hover:text-purple-light"
            onClick={() => navigate('/login')}
          >
            Login
          </Button>
          <Button
            className="bg-purple hover:bg-purple-dark"
            onClick={() => navigate('/register')}
          >
            Register
          </Button>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-white">JD</span>
            <span className="gradient-text"> Frameworks</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            A unified platform for interdepartmental cooperation and streamlined communication.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <Button
              className="bg-purple hover:bg-purple-dark text-lg px-8 py-6"
              onClick={() => navigate('/dashboard')}
            >
              Go to Dashboard
            </Button>
            <Button
              variant="outline"
              className="text-white border-white hover:bg-white/10 text-lg px-8 py-6"
              onClick={() => navigate('/departments')}
            >
              Explore Departments
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div onClick={() => navigate('/departments')} className="bg-white/10 p-6 rounded-lg text-center cursor-pointer hover:bg-white/20 transition-colors">
              <Building2 className="h-10 w-10 mx-auto mb-4 text-purple-light" />
              <h3 className="text-white text-lg font-medium">Explore All Departments</h3>
              <p className="text-gray-300 mt-2">Browse our departments and services</p>
            </div>
            <div onClick={() => navigate('/requests/new')} className="bg-white/10 p-6 rounded-lg text-center cursor-pointer hover:bg-white/20 transition-colors">
              <FileText className="h-10 w-10 mx-auto mb-4 text-purple-light" />
              <h3 className="text-white text-lg font-medium">Submit Request</h3>
              <p className="text-gray-300 mt-2">Create a new service request</p>
            </div>
            <div onClick={() => navigate('/team')} className="bg-white/10 p-6 rounded-lg text-center cursor-pointer hover:bg-white/20 transition-colors">
              <Users className="h-10 w-10 mx-auto mb-4 text-purple-light" />
              <h3 className="text-white text-lg font-medium">View Team</h3>
              <p className="text-gray-300 mt-2">Meet our department teams</p>
            </div>
            <div onClick={() => navigate('/dashboard')} className="bg-white/10 p-6 rounded-lg text-center cursor-pointer hover:bg-white/20 transition-colors">
              <Zap className="h-10 w-10 mx-auto mb-4 text-purple-light" />
              <h3 className="text-white text-lg font-medium">Dashboard</h3>
              <p className="text-gray-300 mt-2">Check request status and analytics</p>
            </div>
          </div>
        </div>
      </main>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              title="Centralized Request Management"
              description="Submit and track requests to any department through a single unified interface. Eliminates the need for redundant paperwork."
            />
            <FeatureCard 
              icon="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              title="Interdepartmental Collaboration"
              description="Connect departments for efficient communication and coordination. Breaks down silos between municipal services."
            />
            <FeatureCard 
              icon="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              title="Real-time Status Updates"
              description="Receive instant updates on your requests as they progress through various stages. No more waiting for responses."
            />
            <FeatureCard 
              icon="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              title="Multiple Department Access"
              description="Interface with Water, Electricity, Health, and other municipal departments through a single platform."
            />
            <FeatureCard 
              icon="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              title="Advanced Analytics"
              description="Gain insights from comprehensive data analytics on city-wide service requests and resolution metrics."
            />
            <FeatureCard 
              icon="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              title="Transparent Workflow"
              description="Track the complete lifecycle of every request with a transparent process that builds trust in municipal services."
            />
          </div>
        </div>
      </section>

      <div className="bg-gray-100 py-12 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Ready to streamline your department operations?</h2>
          <Button 
            className="bg-purple hover:bg-purple-dark text-lg px-8 py-6"
            onClick={() => navigate('/register')}
          >
            Get Started Today
          </Button>
        </div>
      </div>

      <footer className="navy-bg text-white py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <p className="text-gray-400">© 2025 JD Frameworks. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard: React.FC<{
  icon: string;
  title: string;
  description: string;
}> = ({ icon, title, description }) => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="w-12 h-12 bg-purple/10 rounded-full flex items-center justify-center mb-4">
        <svg className="w-6 h-6 text-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
        </svg>
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default Landing;
