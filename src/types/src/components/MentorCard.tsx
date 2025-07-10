import Link from 'next/link';
import { Star, MapPin, Clock } from 'lucide-react';
import { Mentor } from '@/types';

interface MentorCardProps {
  mentor: Mentor;
}

export default function MentorCard({ mentor }: MentorCardProps) {
  // Generate avatar colors based on mentor name
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

  return (
    <div className="mentor-card bg-white rounded-xl overflow-hidden shadow-lg relative hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="absolute top-3 right-3 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-semibold z-10">
        D1
      </div>
      
      <div className={`h-48 bg-gradient-to-r ${getAvatarGradient(mentor.name)} relative`}>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden bg-gray-200">
            {/* Avatar placeholder with initials */}
            <div className={`w-full h-full bg-gradient-to-br ${getAvatarGradient(mentor.name)} flex items-center justify-center text-white text-2xl font-bold`}>
              {mentor.name.split(' ').map(n => n[0]).join('')}
            </div>
          </div>
        </div>
      </div>

      <div className="pt-16 pb-6 px-6">
        <h3 className="text-xl font-bold text-center text-gray-800 mb-1">{mentor.name}</h3>
        <p className="text-green-600 text-center font-medium mb-1">
          {mentor.position} • {mentor.university}
        </p>
        <p className="text-gray-500 text-center text-sm mb-3">
          {mentor.year} • {mentor.achievements[0]}
        </p>

        <div className="flex justify-center mb-4">
          <div className="flex items-center">
            <Star className="h-5 w-5 text-yellow-400 fill-current" />
            <span className="ml-1 text-gray-700 font-medium">{mentor.rating}</span>
            <span className="mx-1 text-gray-500">({mentor.reviewCount} reviews)</span>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between items-center mb-3">
            <div className="text-sm text-gray-600 flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {mentor.sessionLength} min sessions
            </div>
            <div className="text-sm text-gray-600 flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              {mentor.location.city}, {mentor.location.state}
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <span className="text-2xl font-bold text-gray-800">${mentor.price}</span>
              <span className="text-gray-600">/session</span>
            </div>
            <Link 
              href={`/mentors/${mentor.id}`}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              View Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
