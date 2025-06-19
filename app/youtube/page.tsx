'use client'
import { useState } from 'react';
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import videosData from '@/data/videos.json';
import { useRouter } from 'next/navigation';

export default function YouTube() {
  const [videos] = useState(videosData.videos);
  const router = useRouter();

  const handleNavigation = (section: string) => {
    router.push(`/#${section}`);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="relative z-50">
        <Navbar onNavClick={handleNavigation} />
      </div>
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-[#F9B104] mb-12 text-center">Our Videos</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video) => (
              <div key={video.id} className="bg-black/40 backdrop-blur-sm rounded-xl overflow-hidden">
                <div className="relative pb-[56.25%]">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${video.videoId}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold text-white mb-2">{video.title}</h3>
                  <p className="text-gray-400">{video.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Social Links Footer */}
      <footer className="py-12 bg-black/30 text-white relative z-50">
        <div className="max-w-4xl mx-auto px-4 flex flex-wrap justify-center gap-6 sm:gap-8">
          {[
            { name: 'TikTok', url: 'https://www.tiktok.com/@prizmasl' },
            { name: 'Instagram', url: 'https://www.instagram.com/prizmasl/' },
            { name: 'Facebook', url: 'https://web.facebook.com/Prizmasl' },
            { name: 'YouTube', url: 'https://www.youtube.com/@prizmasl' },
          ].map((platform) => (
            <motion.a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5 }}
              className="hover:text-[#F9B104] transition-colors"
            >
              {platform.name}
            </motion.a>
          ))}
        </div>
      </footer>
    </div>
  );
}
