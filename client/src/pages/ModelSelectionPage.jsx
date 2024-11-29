import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '@contexts/ThemeContext';
import { toast } from 'react-toastify';
import axios from '@services/axios';
import { useAuth } from '@contexts/auth_context';
import Cookies from 'js-cookie';
import BackgroundIcons from '@components/BackgroundIcons';

const ModelSelectionPage = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [myModels, setMyModels] = useState([]);
  const [sharedModels, setSharedModels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchConfigurations();
    }
  }, [user]);

  const fetchConfigurations = async () => {
    try {
      setIsLoading(true);
      
      
    

      const response = await axios.get('/car-configs');

      if (response.data.success) {
        const created = response.data.data.created.filter(
          model => model.creator._id === user._id
        );
        const shared = response.data.data.shared.filter(
          model => model.creator._id !== user._id
        );

        setMyModels(created);
        setSharedModels(shared);
      }
    } catch (error) {
      console.error('Error fetching configurations:', error);
      if (error.response?.status === 401) {
        toast.error('Session expired. Please login again');
        navigate('/sign-in');
      } else {
        toast.error('Failed to fetch configurations');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwiftClick = () => {
    toast.info('Swift customization coming soon!', {
      position: "top-right",
      autoClose: 3000,
      theme: isDarkMode ? "dark" : "light"
    });
  };

  if (isLoading) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} flex items-center justify-center`}>
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen relative ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <BackgroundIcons />

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Car Customization Hub</h1>
          <div className="flex gap-4">
            {/* Theme Toggle Button */}
            <button 
              onClick={toggleTheme} 
              className="btn btn-circle btn-ghost"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            {/* Refresh Button */}
            <button 
              onClick={() => fetchConfigurations()} 
              className="btn btn-circle btn-ghost"
              aria-label="Refresh configurations"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* New Model Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Create New Model</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Civic Card */}
            <Link to="/user/customize-3d-model" 
              className={`card ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} shadow-xl transition-all duration-300`}>
              <div className="card-body">
                <h3 className="card-title">Honda Civic</h3>
                <p>Customize your Honda Civic with our advanced 3D configurator</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Start Customizing</button>
                </div>
              </div>
            </Link>

            {/* Corolla Card */}
            <Link to="/user/customize-3d-model-corolla"
              className={`card ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} shadow-xl transition-all duration-300`}>
              <div className="card-body">
                <h3 className="card-title">Toyota Corolla</h3>
                <p>Create your perfect Toyota Corolla with custom modifications</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Start Customizing</button>
                </div>
              </div>
            </Link>

            {/* Swift Card */}
            <Link to="/user/customize-3d-model-swift"
              className={`card ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} shadow-xl transition-all duration-300`}>
              <div className="card-body">
                <h3 className="card-title">Suzuki Swift</h3>
                <p>Create your perfect Suzuki Swift with custom modifications</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Start Customizing</button>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* My Models Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">My Models</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {myModels.length > 0 ? (
              myModels.map((model) => (
                <div key={model._id} 
                  className={`card ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} shadow-xl transition-all duration-300`}>
                  <div className="card-body">
                    <h3 className="card-title">{model.name}</h3>
                    <p>Created: {new Date(model.createdAt).toLocaleDateString()}</p>
                    <div className="card-actions justify-end">
                      <button 
                        onClick={() => navigate(`/user/models/${model._id}`)}
                        className="btn btn-primary">
                        View Model
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className={`col-span-3 text-center p-8 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} rounded-lg`}>
                <p>No custom models created yet. Start by creating a new model!</p>
              </div>
            )}
          </div>
        </section>

        {/* Shared Models Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Shared Models</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sharedModels.length > 0 ? (
              sharedModels.map((model) => (
                <div key={model._id} 
                  className={`card ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} shadow-xl transition-all duration-300`}>
                  <div className="card-body">
                    <h3 className="card-title">{model.name}</h3>
                    <p>Shared by: {model.creator?.name || 'Unknown'}</p>
                    <div className="card-actions justify-end">
                      <button 
                        onClick={() => navigate(`/user/models/${model._id}`)}
                        className="btn btn-primary">
                        View Model
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className={`col-span-3 text-center p-8 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} rounded-lg`}>
                <p>No models have been shared with you yet.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ModelSelectionPage;