import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@contexts/ThemeContext';
import { useAuth } from '@contexts/auth_context';
import { useNavigate } from 'react-router-dom';
import axios from '@services/axios';
import { toast } from 'react-toastify';
import { 
  FaFilter, 
  FaSortAmountDown, 
  FaCar, 
  FaTachometerAlt, 
  FaHorseHead,
  FaCogs,
  FaGasPump,
  FaWeight,
  FaRuler,
  FaTimes,
  FaTrophy
} from 'react-icons/fa';
import RatingStars from '@components/RatingStars';
import BackgroundIcons from '@components/BackgroundIcons';

const PerformanceModal = ({ config, onClose, isDarkMode }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      onClick={e => e.stopPropagation()}
      className={`w-full max-w-2xl ${
        isDarkMode 
          ? 'bg-gray-800/90 backdrop-blur-sm border border-blue-500/20' 
          : 'bg-white'
      } p-6 rounded-xl shadow-xl`}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">{config.name} - Performance Details</h2>
        <button onClick={onClose} className="p-2 hover:bg-gray-700/50 rounded-full">
          <FaTimes className="w-6 h-6 text-gray-400" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
          <div className="flex items-center gap-3 mb-2">
            <FaTachometerAlt className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg font-semibold text-white">Speed & Acceleration</h3>
          </div>
          <div className="space-y-2">
            <p className="text-gray-300">Max Speed: {config.performanceMetrics.metrics.maxSpeed.toFixed(1)} km/h</p>
            <p className="text-gray-300">0-60: {config.performanceMetrics.metrics.acceleration}s</p>
          </div>
        </div>

        <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
          <div className="flex items-center gap-3 mb-2">
            <FaHorseHead className="w-5 h-5 text-emerald-500" />
            <h3 className="text-lg font-semibold text-white">Power & Torque</h3>
          </div>
          <div className="space-y-2">
            <p className="text-gray-300">Horsepower: {config.performanceMetrics.metrics.horsepower} hp</p>
            <p className="text-gray-300">Torque: {config.performanceMetrics.metrics.torque} Nm</p>
          </div>
        </div>
      </div>

      <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
        <div className="flex items-center gap-3 mb-4">
          <FaCogs className="w-5 h-5 text-purple-500" />
          <h3 className="text-lg font-semibold text-white">Engine Specifications</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <p className="text-gray-400 text-sm">Engine Size</p>
            <p className="text-white font-medium">{config.performanceMetrics.metrics.cc.toFixed(0)} cc</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Cylinders</p>
            <p className="text-white font-medium">{config.performanceMetrics.bodyData.nOC}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Max RPM</p>
            <p className="text-white font-medium">{config.performanceMetrics.bodyData.brpm}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Weight</p>
            <p className="text-white font-medium">{config.performanceMetrics.bodyData.kW} kg</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Drag Coefficient</p>
            <p className="text-white font-medium">{config.performanceMetrics.bodyData.dC}</p>
          </div>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

const getTrophyDetails = (index) => {
  switch(index) {
    case 0:
      return { color: 'text-yellow-400', bg: 'bg-yellow-400/10', label: '1st Place' };
    case 1:
      return { color: 'text-gray-400', bg: 'bg-gray-400/10', label: '2nd Place' };
    case 2:
      return { color: 'text-amber-600', bg: 'bg-amber-600/10', label: '3rd Place' };
    default:
      return null;
  }
};

const CarModelRating = () => {
  const { isDarkMode } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [configurations, setConfigurations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedConfig, setSelectedConfig] = useState(null);
  const [filters, setFilters] = useState({
    modelType: '',
    minRating: 0
  });
  const [sortBy, setSortBy] = useState('rating');

  useEffect(() => {
    fetchConfigurations();
  }, [filters, sortBy]);

  const fetchConfigurations = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post('/car-configs/public', {
        modelType: filters.modelType || undefined,
        sort: sortBy
      });
      setConfigurations(response.data.data);
    } catch (error) {
      toast.error('Failed to fetch configurations');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRating = async (configId, rating) => {
    try {
      const response = await axios.post('/car-configs/rate', {
        configId,
        rating
      });
      
      setConfigurations(configs =>
        configs.map(c =>
          c._id === configId
            ? { ...c, averageRating: response.data.data.averageRating, totalRatings: response.data.data.totalRatings }
            : c
        )
      );
      
      toast.success('Rating submitted successfully!');
    } catch (error) {
      toast.error('Failed to submit rating');
    }
  };

  const getModelName = (modelType) => {
    switch (modelType) {
      case 'civic': return 'Honda Civic';
      case 'corolla': return 'Toyota Corolla';
      case 'swift': return 'Suzuki Swift';
      default: return 'Unknown Model';
    }
  };

  const handleViewModel = (config) => {
    const modelType = config.customization.modelType;
    const state = { config, isViewMode: true };

    switch(modelType) {
      case 'civic':
        navigate('/user/customize-3d-model', { state });
        break;
      case 'corolla':
        navigate('/user/customize-3d-model-corolla', { state });
        break;
      case 'swift':
        navigate('/user/customize-3d-model-swift', { state });
        break;
      default:
        toast.error('Invalid model type');
    }
  };

  if (isLoading) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gradient-to-br from-[#2b4e7e] to-black' : 'bg-gray-100'} flex items-center justify-center`}>
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gradient-to-br from-[#2b4e7e] to-black' : 'bg-gray-100'}`}>
      <BackgroundIcons />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <h1 className="text-3xl font-bold text-white">Car Model Ratings</h1>
          
          <div className="flex gap-4">
            <select
              value={filters.modelType}
              onChange={(e) => setFilters({ ...filters, modelType: e.target.value })}
              className={`select select-bordered ${isDarkMode ? 'bg-gray-800' : ''}`}
            >
              <option value="">All Models</option>
              <option value="civic">Honda Civic</option>
              <option value="corolla">Toyota Corolla</option>
              <option value="swift">Suzuki Swift</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`select select-bordered ${isDarkMode ? 'bg-gray-800' : ''}`}
            >
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest First</option>
            </select>
          </div>
        </motion.div>

        {/* Configurations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {configurations.map((config, index) => {
            const trophyDetails = getTrophyDetails(index);
            
            return (
              <motion.div
                key={config._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={(e) => {
                  const isRatingClick = e.target.closest('.rating-stars');
                  const isViewClick = e.target.closest('.btn-circle');
                  if (!isRatingClick && !isViewClick) {
                    setSelectedConfig(config);
                  }
                }}
                className={`card cursor-pointer transform transition-all duration-300 hover:scale-[1.02] ${
                  isDarkMode 
                    ? 'bg-gray-800/50 hover:bg-gray-700/60 border border-blue-500/20' 
                    : 'bg-white hover:bg-gray-50'
                } shadow-xl relative`}
              >
                {/* Trophy Badge */}
                {trophyDetails && sortBy === 'rating' && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`absolute -top-3 -right-3 ${trophyDetails.bg} p-2 rounded-full z-10 border-2 border-gray-800`}
                  >
                    <div className="relative">
                      <FaTrophy className={`w-5 h-5 ${trophyDetails.color}`} />
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
                      >
                        <span className={`text-xs font-bold ${trophyDetails.color}`}>
                          {trophyDetails.label}
                        </span>
                      </motion.div>
                    </div>
                  </motion.div>
                )}

                <div className="card-body">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-3 rounded-full ${
                      config.customization.modelType === 'civic' 
                        ? 'bg-blue-500/10' 
                        : config.customization.modelType === 'corolla'
                        ? 'bg-emerald-500/10'
                        : 'bg-purple-500/10'
                    }`}>
                      <FaCar className={`w-6 h-6 ${
                        config.customization.modelType === 'civic' 
                          ? 'text-blue-500' 
                          : config.customization.modelType === 'corolla'
                          ? 'text-emerald-500'
                          : 'text-purple-500'
                      }`} />
                    </div>
                    <div>
                      <h3 className="card-title text-white">{config.name}</h3>
                      <span className="text-sm text-gray-400">
                        {getModelName(config.customization.modelType)}
                      </span>
                      <span className="block text-xs text-gray-500">
                        by {config.creator?.email.split('@')[0]}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
                        <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                          <FaTachometerAlt className="text-blue-500" />
                          <span>Max Speed</span>
                        </div>
                        <p className="text-white font-medium">
                          {config.performanceMetrics?.metrics.maxSpeed.toFixed(1)} km/h
                        </p>
                      </div>
                      <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
                        <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                          <FaHorseHead className="text-emerald-500" />
                          <span>Power</span>
                        </div>
                        <p className="text-white font-medium">
                          {config.performanceMetrics?.metrics.horsepower} hp
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="rating-stars" onClick={(e) => e.stopPropagation()}>
                        <RatingStars
                          rating={config.averageRating || 0}
                          totalRatings={config.totalRatings || 0}
                          onRate={(rating) => {
                            handleRating(config._id, rating);
                          }}
                          size="md"
                        />
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewModel(config);
                        }}
                        className="btn btn-sm btn-circle btn-ghost"
                      >
                        <FaCogs className="w-4 h-4 text-gray-400" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Performance Details Modal */}
        <AnimatePresence>
          {selectedConfig && (
            <PerformanceModal 
              config={selectedConfig} 
              onClose={() => setSelectedConfig(null)}
              isDarkMode={isDarkMode}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CarModelRating; 