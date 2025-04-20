
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Bell } from 'lucide-react';

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
        <div className="flex items-center gap-4">
          <Bell className="text-white h-5 w-5" />
          <div className="w-8 h-8 rounded-full bg-gray-400" />
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-6xl md:text-7xl font-bold mb-6">
          <span className="text-white">JD</span>
          <span className="gradient-text"> Frameworks</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mb-12">
          A unified platform for interdepartmental cooperation and streamlined communication.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button 
            className="bg-[#9b87f5] hover:bg-[#8B77E5] text-lg px-8 py-6"
            onClick={() => navigate('/dashboard')}
          >
            Go to Dashboard
          </Button>
          <Button 
            className="bg-white text-navy hover:bg-gray-100 text-lg px-8 py-6"
            onClick={() => navigate('/departments')}
          >
            Explore Departments
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </main>

      <div className="max-w-6xl mx-auto w-full px-4 py-20">
        <h2 className="text-3xl font-bold text-white text-center mb-16">Key Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            title="Centralized Request Management"
            description="Submit and track requests to any department through a single unified interface. Eliminates the need for redundant paperwork."
            icon="🎯"
          />
          <FeatureCard
            title="Interdepartmental Collaboration"
            description="Connect departments for efficient communication and coordination. Breaks down silos between municipal services."
            icon="👥"
          />
          <FeatureCard
            title="Real-time Status Updates"
            description="Receive instant updates on your requests as they progress through various stages. No more waiting for responses."
            icon="⚡"
          />
          <FeatureCard
            title="Multiple Department Access"
            description="Interface with Water, Electricity, Health, and other municipal departments through a single platform."
            icon="🏢"
          />
          <FeatureCard
            title="Advanced Analytics"
            description="Gain insights from comprehensive data analytics on city-wide service requests and resolution metrics."
            icon="📊"
          />
          <FeatureCard
            title="Transparent Workflow"
            description="Track the complete lifecycle of every request with a transparent process that builds trust in municipal services."
            icon="✨"
          />
        </div>
        <div className="text-center mt-12">
          <Button 
            className="bg-[#9b87f5] hover:bg-[#8B77E5] text-lg px-8 py-6"
            onClick={() => navigate('/register')}
          >
            Get Started Today
          </Button>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ title, description, icon }: { title: string; description: string; icon: string }) => (
  <div className="bg-[#252943] rounded-lg p-6 hover:bg-[#2A2E4A] transition-colors">
    <div className="text-3xl mb-4">{icon}</div>
    <h3 className="text-white text-xl font-semibold mb-3">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
);

export default Landing;
