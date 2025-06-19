'use client'
import Head from "next/head";
import Image from "next/image";
import { motion } from "framer-motion";
import MusicScene from "@/components/MusicScene";
import Navbar from "@/components/Navbar";
import eventsData from "@/data/events.json";
import testimonialsData from "@/data/testimonials.json";
import { useRef, useState } from 'react';
import Link from "next/link";
import toast from 'react-hot-toast';

// Metadata for the page
const pageMetadata = {
  title: 'Prizma Entertainment - Sri Lanka\'s Premier Live Music Band',
  description: 'Experience unforgettable live music performances with Prizma Entertainment. Professional band for weddings, corporate events, and private functions in Sri Lanka.',
  keywords: 'live band, sri lanka band, wedding band, corporate events, live music, prizma entertainment',
  ogImage: 'https://prizmalive.com/band-hero.png'
};

export default function Home() {
  const contactRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const loadingToast = toast.loading('Sending your message...');

    try {
      const formData = new FormData(e.currentTarget);
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        subject: formData.get('subject'),
        message: formData.get('message'),
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Message sent successfully!', { id: loadingToast });
        formRef.current?.reset();
      } else {
        throw new Error(result.message || 'Failed to send message');
      }
    } catch (error: any) {
      console.error('Error:', error);
      toast.error(
        error?.message || 'Error sending message. Please try again.',
        { id: loadingToast }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Enhanced structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Prizma Entertainment",
    "url": "https://prizmalive.com",
    "logo": "https://prizmalive.com/logo.png",
    "sameAs": [
      "https://www.facebook.com/Prizmasl",
      "https://www.instagram.com/prizmasl/",
      "https://www.youtube.com/@prizmasl",
      "https://www.tiktok.com/@prizmasl"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+94777250382",
      "contactType": "customer service",
      "email": "info@prizmalive.com"
    },
    "event": eventsData.events.map(event => ({
      "@type": "Event",
      "name": `Prizma Entertainment at ${event.venue}`,
      "startDate": event.date,
      "location": {
        "@type": "Place",
        "name": event.venue,
        "address": event.location
      },
      "performer": {
        "@type": "MusicGroup",
        "name": "Prizma Entertainment"
      }
    }))
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] overflow-x-hidden">
      <Head>
        <title>{pageMetadata.title}</title>
        <meta name="description" content={pageMetadata.description} />
        <meta name="keywords" content={pageMetadata.keywords} />
        
        {/* Open Graph */}
        <meta property="og:title" content={pageMetadata.title} />
        <meta property="og:description" content={pageMetadata.description} />
        <meta property="og:image" content={pageMetadata.ogImage} />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageMetadata.title} />
        <meta name="twitter:description" content={pageMetadata.description} />
        <meta name="twitter:image" content={pageMetadata.ogImage} />
        
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      <Navbar />
      <MusicScene />
      {/* Hero Section */}
      <section id="hero" className="relative w-full h-auto aspect-[16/9] md:aspect-[21/9] mt-16">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-[#0a0a0a] z-10" />
        <div className="absolute inset-0">
          <Image
            src="/band-hero.png"
            alt="Prizma Entertainment - Sri Lanka's Premier Live Music Band"
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
              className="text-white space-y-6 relative z-50"
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
                    <Link 
                      href="mailto:info@prizmalive.com"
                      className="text-gray-300 hover:text-[#F9B104] transition-colors"
                    >
                      info@prizmalive.com
                    </Link>
                  </div>
                  <div>
                    <p className="text-[#F9B104]">Phone</p>
                    <Link 
                      href="tel:+94777250382" 
                      className="text-gray-300 hover:text-[#F9B104] transition-colors"
                    >
                      +94 777 250 382
                    </Link>
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
      {eventsData.events.length > 0 && (
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
      )}

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
          <form ref={formRef} className="space-y-6" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="w-full bg-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F9B104]"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="w-full bg-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F9B104]"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Your Phone Number"
              required
              className="w-full bg-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F9B104]"
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              required
              className="w-full bg-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F9B104]"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows={4}
              required
              className="w-full bg-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F9B104]"
            />
            <button 
              type="submit"
              disabled={isSubmitting}
              className={`w-full px-8 py-3 rounded-full transition-colors text-black font-semibold relative
                ${isSubmitting 
                  ? 'bg-amber-500 cursor-not-allowed' 
                  : 'bg-[#F9B104] hover:bg-amber-500'
                }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                'Send Message'
              )}
            </button>
          </form>
        </div>
      </section>

      {/* Social Links */}
      <footer className="py-8 sm:py-12 bg-black/30 text-white px-2 sm:px-4 relative z-50">
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
