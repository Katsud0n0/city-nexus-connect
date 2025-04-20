
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

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
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              className="bg-purple hover:bg-purple-dark text-lg px-8 py-6"
              onClick={() => navigate('/departments')}
            >
              Explore Departments
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </main>

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

export default Landing;
