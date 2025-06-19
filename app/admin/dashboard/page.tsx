'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import eventsData from '@/data/events.json';
import testimonialsData from '@/data/testimonials.json';
import videosData from '@/data/videos.json';
import { FiCalendar, FiMessageSquare, FiLogOut, FiPlus, FiYoutube } from 'react-icons/fi';

interface Event {
  id: number;
  venue: string;
  location: string;
  date: string;
  ticketLink: string;
}

interface Testimonial {
  id: number;
  text: string;
  author: string;
}

interface Video {
  id: number;
  title: string;
  videoId: string;
  description: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>(eventsData.events);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(testimonialsData.testimonials);
  const [videos, setVideos] = useState<Video[]>(videosData.videos);
  const [newEvent, setNewEvent] = useState({ venue: '', location: '', date: '', ticketLink: '' });
  const [newTestimonial, setNewTestimonial] = useState({ text: '', author: '' });
  const [newVideo, setNewVideo] = useState({ title: '', videoId: '', description: '' });
  const [activeTab, setActiveTab] = useState('events');
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [editingItem, setEditingItem] = useState<{ id: number, type: string } | null>(null);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('adminAuth');
    if (!isAuthenticated) {
      router.push('/admin');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    router.push('/admin');
  };

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: '', type: '' });
    }, 3000);
  };

  const getNewId = (items: { id: number }[]) => {
    if (items.length === 0) return 1;
    const maxId = Math.max(...items.map(item => item.id));
    return maxId + 1;
  };

  const addEvent = async () => {
    const event = {
      id: getNewId(events),
      ...newEvent
    };

    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      });

      if (response.ok) {
        setEvents([...events, event]);
        setNewEvent({ venue: '', location: '', date: '', ticketLink: '' });
        showNotification('Event added successfully!', 'success');
      } else {
        showNotification('Failed to save event', 'error');
      }
    } catch {
      showNotification('Error saving event', 'error');
    }
  };

  const addTestimonial = async () => {
    const testimonial = {
      id: getNewId(testimonials),
      ...newTestimonial
    };

    try {
      const response = await fetch('/api/testimonials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testimonial),
      });

      if (response.ok) {
        setTestimonials([...testimonials, testimonial]);
        setNewTestimonial({ text: '', author: '' });
        showNotification('Testimonial added successfully!', 'success');
      } else {
        showNotification('Failed to save testimonial', 'error');
      }
    } catch {
      showNotification('Error saving testimonial', 'error');
    }
  };

  const addVideo = async () => {
    const video = {
      id: getNewId(videos),
      ...newVideo
    };

    try {
      const response = await fetch('/api/videos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(video),
      });

      if (response.ok) {
        setVideos([...videos, video]);
        setNewVideo({ title: '', videoId: '', description: '' });
        showNotification('Video added successfully!', 'success');
      } else {
        showNotification('Failed to save video', 'error');
      }
    } catch {
      showNotification('Error saving video', 'error');
    }
  };

  const handleDelete = async (id: number, type: 'event' | 'testimonial' | 'video') => {
    try {
      const response = await fetch(`/api/${type}s/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        if (type === 'event') {
          setEvents(events.filter(event => event.id !== id));
        } else if (type === 'testimonial') {
          setTestimonials(testimonials.filter(testimonial => testimonial.id !== id));
        } else {
          setVideos(videos.filter(video => video.id !== id));
        }
        showNotification(`${type} deleted successfully!`, 'success');
      } else {
        showNotification(`Failed to delete ${type}`, 'error');
      }
    } catch {
      showNotification(`Error deleting ${type}`, 'error');
    }
  };

  const handleEdit = async (id: number, type: 'event' | 'testimonial' | 'video') => {
    if (type === 'event') {
      const item = events.find(e => e.id === id);
      if (item) {
        // Spread all properties except id
        const { venue, location, date, ticketLink } = item;
        setNewEvent({ venue, location, date, ticketLink });
      }
    } else if (type === 'testimonial') {
      const item = testimonials.find(t => t.id === id);
      if (item) {
        const { text, author } = item;
        setNewTestimonial({ text, author });
      }
    } else {
      const item = videos.find(v => v.id === id);
      if (item) {
        const { title, videoId, description } = item;
        setNewVideo({ title, videoId, description });
      }
    }
    setEditingItem({ id, type });
  };

  const handleUpdate = async () => {
    if (!editingItem) return;

    const { id, type } = editingItem;
    const data = type === 'event' 
      ? newEvent 
      : type === 'testimonial'
      ? newTestimonial
      : newVideo;

    try {
      const response = await fetch(`/api/${type}s/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        if (type === 'event') {
          setEvents(events.map(event => event.id === id ? { ...newEvent, id } : event));
          setNewEvent({ venue: '', location: '', date: '', ticketLink: '' });
        } else if (type === 'testimonial') {
          setTestimonials(testimonials.map(testimonial => 
            testimonial.id === id ? { ...newTestimonial, id } : testimonial
          ));
          setNewTestimonial({ text: '', author: '' });
        } else {
          setVideos(videos.map(video => video.id === id ? { ...newVideo, id } : video));
          setNewVideo({ title: '', videoId: '', description: '' });
        }
        setEditingItem(null);
        showNotification(`${type} updated successfully!`, 'success');
      } else {
        showNotification(`Failed to update ${type}`, 'error');
      }
    } catch {
      showNotification(`Error updating ${type}`, 'error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] flex">
      {/* Notification Component */}
      {notification.message && (
        <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg ${
          notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white z-50 transition-opacity duration-300`}>
          {notification.message}
        </div>
      )}
      
      {/* Sidebar */}
      <div className="w-64 bg-black/40 backdrop-blur-sm p-6 flex flex-col">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#F9B104]">Prizma Admin</h1>
        </div>
        
        <nav className="flex-1">
          <button
            onClick={() => setActiveTab('events')}
            className={`w-full flex items-center space-x-3 p-3 rounded-lg mb-2 transition-colors ${
              activeTab === 'events' ? 'bg-[#F9B104] text-black' : 'text-white hover:bg-white/10'
            }`}
          >
            <FiCalendar />
            <span>Events</span>
          </button>
          
          <button
            onClick={() => setActiveTab('testimonials')}
            className={`w-full flex items-center space-x-3 p-3 rounded-lg mb-2 transition-colors ${
              activeTab === 'testimonials' ? 'bg-[#F9B104] text-black' : 'text-white hover:bg-white/10'
            }`}
          >
            <FiMessageSquare />
            <span>Testimonials</span>
          </button>

          <button
            onClick={() => setActiveTab('videos')}
            className={`w-full flex items-center space-x-3 p-3 rounded-lg mb-2 transition-colors ${
              activeTab === 'videos' ? 'bg-[#F9B104] text-black' : 'text-white hover:bg-white/10'
            }`}
          >
            <FiYoutube />
            <span>Videos</span>
          </button>
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 p-3 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
        >
          <FiLogOut />
          <span>Logout</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-5xl mx-auto">
          {activeTab === 'events' ? (
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-white">Events Management</h2>
                <button
                  onClick={() => document.getElementById('eventForm')?.focus()}
                  className="flex items-center space-x-2 bg-[#F9B104] hover:bg-amber-500 px-4 py-2 rounded-lg transition-colors"
                >
                  <FiPlus /> <span>Add Event</span>
                </button>
              </div>

              {/* Add Event Form */}
              <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 mb-8">
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    id="eventForm"
                    type="text"
                    placeholder="Venue"
                    className="bg-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#F9B104]"
                    value={newEvent.venue}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, venue: e.target.value }))}
                  />
                  <input
                    type="text"
                    placeholder="Location"
                    className="bg-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#F9B104]"
                    value={newEvent.location}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, location: e.target.value }))}
                  />
                  <input
                    type="date"
                    className="bg-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#F9B104]"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, date: e.target.value }))}
                  />
                  <input
                    type="text"
                    placeholder="Ticket Link"
                    className="bg-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#F9B104]"
                    value={newEvent.ticketLink}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, ticketLink: e.target.value }))}
                  />
                </div>
                <button
                  onClick={editingItem?.type === 'event' ? handleUpdate : addEvent}
                  className="mt-4 w-full bg-[#F9B104] hover:bg-amber-500 px-8 py-3 rounded-lg transition-colors font-semibold"
                >
                  {editingItem?.type === 'event' ? 'Update Event' : 'Add Event'}
                </button>
              </div>

              {/* Events List */}
              <div className="grid gap-4">
                {events.map(event => (
                  <div
                    key={event.id}
                    className="bg-black/40 backdrop-blur-sm p-6 rounded-xl hover:bg-black/50 transition-colors group"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">{event.venue}</h3>
                        <p className="text-gray-400">{event.location}</p>
                        <p className="text-[#F9B104] mt-2">{new Date(event.date).toLocaleDateString()}</p>
                      </div>
                      <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleEdit(event.id, 'event')}
                          className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 p-2 rounded-lg transition-colors"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(event.id, 'event')}
                          className="bg-red-500/10 hover:bg-red-500/20 text-red-500 p-2 rounded-lg transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : activeTab === 'testimonials' ? (
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-white">Testimonials Management</h2>
                <button
                  onClick={() => document.getElementById('testimonialForm')?.focus()}
                  className="flex items-center space-x-2 bg-[#F9B104] hover:bg-amber-500 px-4 py-2 rounded-lg transition-colors"
                >
                  <FiPlus /> <span>Add Testimonial</span>
                </button>
              </div>

              {/* Add Testimonial Form */}
              <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 mb-8">
                <textarea
                  id="testimonialForm"
                  placeholder="Testimonial Text"
                  rows={4}
                  className="w-full bg-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#F9B104] mb-4"
                  value={newTestimonial.text}
                  onChange={(e) => setNewTestimonial(prev => ({ ...prev, text: e.target.value }))}
                />
                <input
                  type="text"
                  placeholder="Author"
                  className="w-full bg-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#F9B104]"
                  value={newTestimonial.author}
                  onChange={(e) => setNewTestimonial(prev => ({ ...prev, author: e.target.value }))}
                />
                <button
                  onClick={editingItem?.type === 'testimonial' ? handleUpdate : addTestimonial}
                  className="mt-4 w-full bg-[#F9B104] hover:bg-amber-500 px-8 py-3 rounded-lg transition-colors font-semibold"
                >
                  {editingItem?.type === 'testimonial' ? 'Update Testimonial' : 'Add Testimonial'}
                </button>
              </div>

              {/* Testimonials List */}
              <div className="grid gap-4">
                {testimonials.map(testimonial => (
                  <div
                    key={testimonial.id}
                    className="bg-black/40 backdrop-blur-sm p-6 rounded-xl hover:bg-black/50 transition-colors group"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-white italic mb-2">{testimonial.text}</p>
                        <p className="text-[#F9B104]">- {testimonial.author}</p>
                      </div>
                      <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleEdit(testimonial.id, 'testimonial')}
                          className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 p-2 rounded-lg transition-colors"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(testimonial.id, 'testimonial')}
                          className="bg-red-500/10 hover:bg-red-500/20 text-red-500 p-2 rounded-lg transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-white">YouTube Videos Management</h2>
                <button
                  onClick={() => document.getElementById('videoForm')?.focus()}
                  className="flex items-center space-x-2 bg-[#F9B104] hover:bg-amber-500 px-4 py-2 rounded-lg transition-colors"
                >
                  <FiPlus /> <span>Add Video</span>
                </button>
              </div>

              {/* Add Video Form */}
              <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 mb-8">
                <input
                  id="videoForm"
                  type="text"
                  placeholder="Video Title"
                  className="w-full bg-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#F9B104] mb-4"
                  value={newVideo.title}
                  onChange={(e) => setNewVideo(prev => ({ ...prev, title: e.target.value }))}
                />
                <input
                  type="text"
                  placeholder="YouTube Video ID"
                  className="w-full bg-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#F9B104] mb-4"
                  value={newVideo.videoId}
                  onChange={(e) => setNewVideo(prev => ({ ...prev, videoId: e.target.value }))}
                />
                <textarea
                  placeholder="Description"
                  rows={3}
                  className="w-full bg-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#F9B104]"
                  value={newVideo.description}
                  onChange={(e) => setNewVideo(prev => ({ ...prev, description: e.target.value }))}
                />
                <button
                  onClick={editingItem?.type === 'video' ? handleUpdate : addVideo}
                  className="mt-4 w-full bg-[#F9B104] hover:bg-amber-500 px-8 py-3 rounded-lg transition-colors font-semibold"
                >
                  {editingItem?.type === 'video' ? 'Update Video' : 'Add Video'}
                </button>
              </div>

              {/* Videos List */}
              <div className="grid gap-4">
                {videos.map(video => (
                  <div
                    key={video.id}
                    className="bg-black/40 backdrop-blur-sm p-6 rounded-xl hover:bg-black/50 transition-colors group"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">{video.title}</h3>
                        <p className="text-gray-400">{video.description}</p>
                      </div>
                      <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleEdit(video.id, 'video')}
                          className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 p-2 rounded-lg transition-colors"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(video.id, 'video')}
                          className="bg-red-500/10 hover:bg-red-500/20 text-red-500 p-2 rounded-lg transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
