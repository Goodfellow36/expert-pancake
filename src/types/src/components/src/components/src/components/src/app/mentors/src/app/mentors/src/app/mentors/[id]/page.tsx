'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import ContactForm from '@/components/ContactForm';
import { mentors } from '@/lib/data';
import { Star, MapPin, Clock, Award, GraduationCap, Mail, Phone } from 'lucide-react';

export default function MentorDetailPage() {
  const params = useParams();
  const [showContactForm, setShowContactForm] = useState(false);
  
  const mentor = mentors.find(m => m.id === params.id);

  if (!mentor) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-800">Mentor not found</h1>
          <p className="text-gray-600 mt-2">The mentor you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const getAvatarGradient = (name: string) => {
    const gradients = [
      'from-purple-500 to-indigo-600',
      'from-blue-500 to-cyan-500', 
      'from-red-500 to-pink-500',
      'from-amber-500 to-orange-500',
      'from-green-500 to-emerald-500'
    ];
    const index = name.length % gradients.length;
    return gradients[index];
  };

  const getTrainingFocus = (position: string): string[] => {
    const focusMap: { [key: string]: string[] } = {
      'Midfielder': ['Ball Control', 'Passing', 'Vision', 'Positioning', 'Fitness'],
      'Defender': ['Defending', 'Positioning', 'Heading', 'Tackling', 'Leadership'],
      'Forward': ['Finishing', 'Movement', 'Speed', 'Creativity', 'Pressure'],
      'Goalkeeper': ['Shot Stopping', 'Distribution', 'Communication', 'Positioning', 'Mental Game']
    };
    
    return focusMap[position] || ['Technical Skills', 'Tactical Awareness', 'Mental Game'];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Profile */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Header Section */}
              <div className={`h-48 bg-gradient-to-r ${getAvatarGradient(mentor.name)} relative`}>
                <div className="absolute bottom-0 left-8 transform translate-y-1/2">
                  <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-gray-200">
                    <div className={`w-full h-full bg-gradient-to-br ${getAvatarGradient(mentor.name)} flex items-center justify-center text-white text-4xl font-bold`}>
                      {mentor.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  D1 Player
                </div>
              </div>

              {/* Profile Info */}
              <div className="pt-20 pb-8 px-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">{mentor.name}</h1>
                    <div className="flex items-center text-green-600 font-medium mb-2">
                      <GraduationCap className="h-5 w-5 mr-2" />
                      {mentor.position} • {mentor.university}
                    </div>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="h-4 w-4 mr-2" />
                      {mentor.location.city}, {mentor.location.state}
                    </div>
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-400 fill-current mr-1" />
                      <span className="font-medium">{mentor.rating}</span>
                      <span className="text-gray-500 ml-1">({mentor.reviewCount} reviews)</span>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 text-right">
                    <div className="text-3xl font-bold text-gray-800">${mentor.price}</div>
                    <div className="text-gray-600">per session</div>
                    <div className="text-sm text-gray-500 flex items-center mt-1">
                      <Clock className="h-4 w-4 mr-1" />
                      {mentor.sessionLength} minutes
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-3">About {mentor.name.split(' ')[0]}</h2>
                  <p className="text-gray-700 leading-relaxed">{mentor.bio}</p>
                </div>

                {/* Achievements */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-3">Achievements & Honors</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {mentor.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center bg-green-50 p-3 rounded-lg">
                        <Award className="h-5 w-5 text-green-600 mr-3" />
                        <span className="text-gray-700">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Training Focus */}
                <div>
                  <h2 className="text-xl font-semibold mb-3">Training Focus</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {getTrainingFocus(mentor.position).map((focus, index) => (
                      <div key={index} className="bg-blue-50 p-3 rounded-lg text-center">
                        <span className="text-sm font-medium text-blue-800">{focus}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
              <h3 className="text-xl font-semibold mb-4">Book a Session</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">Session Length</span>
                  <span className="font-medium">{mentor.sessionLength} minutes</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">Price</span>
                  <span className="font-medium">${mentor.price}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">Location</span>
                  <span className="font-medium">{mentor.location.city}, {mentor.location.state}</span>
                </div>
              </div>

              <button 
                onClick={() => setShowContactForm(true)}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition mb-4"
              >
                Contact {mentor.name.split(' ')[0]}
              </button>

              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">Questions?</p>
                <div className="flex justify-center space-x-4">
                  <button className="flex items-center text-blue-600 hover:text-blue-800">
                    <Mail className="h-4 w-4 mr-1" />
                    <span className="text-sm">Email</span>
                  </button>
                  <button className="flex items-center text-blue-600 hover:text-blue-800">
                    <Phone className="h-4 w-4 mr-1" />
                    <span className="text-sm">Call</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
              <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">University</span>
                  <span className="font-medium">{mentor.university}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Conference</span>
                  <span className="font-medium">{mentor.conference}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Year</span>
                  <span className="font-medium">{mentor.year}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Response Time</span>
                  <span className="font-medium text-green-600">Within 24 hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      {showContactForm && (
        <ContactForm 
          mentor={mentor}
          onClose={() => setShowContactForm(false)}
        />
      )}
    </div>
  );
}
