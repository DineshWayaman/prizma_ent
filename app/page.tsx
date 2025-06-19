'use client'
import Image from "next/image";
import { motion } from "framer-motion";
import MusicScene from "@/components/MusicScene";
import Navbar from "@/components/Navbar";
import eventsData from "@/data/events.json";
import testimonialsData from "@/data/testimonials.json";
import { useRef } from 'react';

export default function Home() {
  const contactRef = useRef<HTMLElement>(null);

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] overflow-x-hidden">
      <Navbar />
      <MusicScene />
      {/* Hero Section */}
      <section id="hero" className="relative w-full h-auto aspect-[16/9] md:aspect-[21/9] mt-16">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-[#0a0a0a] z-10" />
        <div className="absolute inset-0">
          <Image
            src="/band-hero.png"
            alt="Prizma Entertainment"
            fill
            className="object-contain md:object-cover"
            sizes="100vw"
            priority
            quality={100}
          />
        </div>
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#F9B104] to-amber-500 text-center px-4"
          >
            PRIZMA ENTERTAINMENT
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 text-lg sm:text-xl md:text-2xl text-gray-200 text-center px-4"
          >
            Entertainment Redefined
          </motion.p>
        </div>
      </section>

      {/* About Us (formerly Latest Release) */}
      <section id="latest" className="py-12 sm:py-16 md:py-20 px-2 sm:px-4 bg-black/50">
        <div className="max-w-[90rem] w-full mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl md:text-5xl font-bold text-center text-white mb-8 sm:mb-12 md:mb-16"
          >
            About <span className="text-[#F9B104]">Us</span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative min-h-[500px] lg:min-h-[600px] w-full rounded-lg overflow-hidden group"
            >
              <Image
                src="/bandimg.png"
                alt="Prizma Band"
                fill
                quality={100}
                className="object-contain hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                style={{ objectPosition: 'center center' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-white space-y-6"
            >
              <div className="select-text text-center md:text-left">
                <h3 className="text-2xl font-bold">PRIZMA Entertainment</h3>
                <p className="text-gray-300 mt-4">
                  We are a dynamic entertainment group specializing in live music performances.
                  With our diverse musical influences and professional experience, we create
                  unforgettable experiences for weddings, corporate events, and private functions.
                </p>
                <div className="space-y-4 mt-6">
                  <div>
                    <p className="text-[#F9B104]">Email</p>
                    <p className="text-gray-300">contact@prizmaent.com</p>
                  </div>
                  <div>
                    <p className="text-[#F9B104]">Phone</p>
                    <p className="text-gray-300">+1 234 567 8900</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="mt-8 text-center">
            <button 
              onClick={scrollToContact}
              className="bg-[#F9B104] hover:bg-amber-500 px-8 py-3 rounded-full transition-colors text-black font-semibold cursor-pointer z-10 relative"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* Upcoming Shows */}
      <section id="shows" className="py-12 sm:py-16 md:py-20 px-2 sm:px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-center text-white mb-16">
          Upcoming <span className="text-purple-500">Shows</span>
        </h2>
        <div className="max-w-4xl mx-auto space-y-4">
          {eventsData.events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm p-4 sm:p-6 rounded-lg hover:bg-white/10 transition-colors"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 text-white">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold">{event.venue}</h3>
                  <p className="text-gray-400 text-sm sm:text-base">{event.location} • {new Date(event.date).toLocaleDateString()}</p>
                </div>
                <a
                  href={event.ticketLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto text-center bg-[#F9B104] hover:bg-amber-500 px-6 py-2 rounded-full transition-colors"
                >
                  Get Tickets
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Band Members */}
      <section id="band" className="py-12 sm:py-16 md:py-20 px-2 sm:px-4 bg-black/30">
        <h2 className="text-3xl md:text-5xl font-bold text-center text-white mb-16">
          Meet The <span className="text-[#F9B104]">Band</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {[
            { name: "Milinda Chanuka", role: "Drummer", image: "/members/1.webp" },
            { name: "Sehan Ranasinghe", role: "Bassist", image: "/members/2.webp" },
            { name: "Asitha Joe", role: "Guitarist", image: "/members/3.webp" },
            { name: "Shemal Perera", role: "Rhythem and Vocalist", image: "/members/4.webp" },
            { name: "Gimhara Vidanagamage", role: "Keys", image: "/members/6.webp" },
            { name: "Kalpa Jay", role: "Vocalist", image: "/members/5.webp" },
          ].map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-black/40 backdrop-blur-sm rounded-xl overflow-hidden flex flex-col"
            >
              <div className="relative w-full pt-[125%]"> {/* Changed height to use padding-top for aspect ratio */}
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-top" /* Added object-top */
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>
              <div className="p-6 text-center mt-auto"> {/* Added mt-auto */}
                <h3 className="text-xl font-bold text-[#F9B104]">{member.name}</h3>
                <p className="text-gray-300">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Photo Gallery */}
      <section id="gallery" className="py-12 sm:py-16 md:py-20 px-2 sm:px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-center text-white mb-16">
          Photo <span className="text-[#F9B104]">Gallery</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-7xl mx-auto">
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              className="relative aspect-square rounded-lg overflow-hidden"
            >
              <Image
                src={`/gallery/${index}.jpg`}
                alt={`Gallery image ${index}`}
                fill
                className="object-cover"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 sm:py-16 md:py-20 px-2 sm:px-4 bg-black/30">
        <h2 className="text-3xl md:text-5xl font-bold text-center text-white mb-16">
          What People <span className="text-[#F9B104]">Say</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {testimonialsData.testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-black/40 backdrop-blur-sm p-6 rounded-xl"
            >
              <p className="text-gray-300 italic mb-4">{testimonial.text}</p>
              <p className="text-[#F9B104] font-semibold">{testimonial.author}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section ref={contactRef} id="contact" className="py-12 sm:py-16 md:py-20 px-2 sm:px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-center text-white mb-16">
          Get In <span className="text-[#F9B104]">Touch</span>
        </h2>
        <div className="max-w-2xl mx-auto bg-black/40 backdrop-blur-sm p-6 sm:p-8 rounded-xl">
          <form className="space-y-6">
            <input
              type="email"
              placeholder="Your Email"
              className="w-full bg-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F9B104]"
            />
            <textarea
              placeholder="Your Message"
              rows={4}
              className="w-full bg-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F9B104]"
            />
            <button className="w-full bg-[#F9B104] hover:bg-amber-500 px-8 py-3 rounded-full transition-colors text-black font-semibold">
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Social Links */}
      <footer className="py-8 sm:py-12 bg-black/30 text-white px-2 sm:px-4">
        <div className="max-w-4xl mx-auto px-4 flex flex-wrap justify-center gap-6 sm:gap-8">
          {['Spotify', 'Instagram', 'YouTube', 'Twitter'].map((platform) => (
            <motion.a
              key={platform}
              href="#"
              whileHover={{ y: -5 }}
              className="hover:text-[#F9B104] transition-colors"
            >
              {platform}
            </motion.a>
          ))}
        </div>
      </footer>
    </div>
  );
}
