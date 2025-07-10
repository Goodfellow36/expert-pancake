'use client';

import { useState, useMemo } from 'react';
import Header from '@/components/Header';
import MentorCard from '@/components/MentorCard';
import { mentors } from '@/lib/data';
import { Search, Filter, MapPin } from 'lucide-react';

export default function MentorsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedConference, setSelectedConference] = useState('');
  const [priceRange, setPriceRange] = useState([0, 100]);

  // Get unique values for filters
  const positions = [...new Set(mentors.map(m => m.position))];
  const states = [...new Set(mentors.map(m => m.location.state))];
  const conferences = [...new Set(mentors.map(m => m.conference))];

  // Filter mentors based on search and filters
  const filteredMentors = useMemo(() => {
    return mentors.filter(mentor => {
      const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           mentor.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           mentor.position.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesPosition = !selectedPosition || mentor.position === selectedPosition;
      const matchesState = !selectedState || mentor.location.state === selectedState;
      const matchesConference = !selectedConference || mentor.conference === selectedConference;
      const matchesPrice = mentor.price >= priceRange[0] && mentor.price <= priceRange[1];

      return matchesSearch && matchesPosition && matchesState && matchesConference && matchesPrice;
    });
  }, [searchTerm, selectedPosition, selectedState, selectedConference, priceRange]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedPosition('');
    setSelectedState('');
    setSelectedConference('');
    setPriceRange([0, 100]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Page Header */}
      <section className="bg-gradient-to-r from-green-600 to-blue-500 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Find Your Perfect Mentor</h1>
          <p className="text-xl">Browse {mentors.length} talented D1 women's soccer players ready to help you improve</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  Filters
                </h2>
                <button 
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Clear All
                </button>
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Name, university, position..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              {/* Position Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                <select
                  value={selectedPosition}
                  onChange={(e) => setSelectedPosition(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">All Positions</option>
                  {positions.map(position => (
                    <option key={position} value={position}>{position}</option>
                  ))}
                </select>
              </div>

              {/* State Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">All States</option>
                  {states.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>

              {/* Conference Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Conference</label>
                <select
                  value={selectedConference}
                  onChange={(e) => setSelectedConference(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">All Conferences</option>
                  {conferences.map(conference => (
                    <option key={conference} value={conference}>{conference}</option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </label>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="w-full"
                  />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Mentors Grid */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">
                {filteredMentors.length} Mentor{filteredMentors.length !== 1 ? 's' : ''} Found
              </h2>
              <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                <option>Sort by Rating</option>
                <option>Sort by Price (Low to High)</option>
                <option>Sort by Price (High to Low)</option>
                <option>Sort by Reviews</option>
              </select>
            </div>

            {filteredMentors.length === 0 ? (
              <div className="text-center py-12">
                <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No mentors found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your filters or search terms</p>
                <button 
                  onClick={clearFilters}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredMentors.map((mentor) => (
                  <MentorCard key={mentor.id} mentor={mentor} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
