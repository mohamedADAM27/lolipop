/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Share2, 
  Sparkles, 
  Check, 
  Volume2, 
  VolumeX
} from 'lucide-react';

interface VideoItem {
  id: string;
  title: string;
  creator: string;
  views: string;
  embedUrl: string;
}

function LolipopLogo({ className = "w-8 h-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 160" className={`${className} select-none`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Subtle 3D gradient for stick */}
        <linearGradient id="stickGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#F5F3FF" />
          <stop offset="100%" stopColor="#E2D9FF" />
        </linearGradient>
        
        {/* Deep immersive purple-violet gradient */}
        <radialGradient id="lollipopSpherical" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#D8B4FE" />
          <stop offset="40%" stopColor="#A78BFA" />
          <stop offset="85%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#5B21B6" />
        </radialGradient>

        <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="#7C3AED" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* Clean White Lollipop Stick */}
      <rect x="56" y="85" width="8" height="65" rx="4" fill="url(#stickGrad)" />

      {/* Main 3D Lollipop head with spiral and play point */}
      <g filter="url(#softShadow)">
        <circle cx="60" cy="55" r="40" fill="url(#lollipopSpherical)" />
        
        {/* Gloss highlight overlay */}
        <ellipse cx="60" cy="55" rx="40" ry="40" fill="none" stroke="#FFFFFF" strokeWidth="1" opacity="0.15" />

        {/* Dynamic, beautifully drawn spiral track */}
        <path 
          d="M 60,17 
             A 38,38 0 1,0 98,55 
             A 30,30 0 1,0 60,85 
             A 22,22 0 1,0 38,55 
             A 14,14 0 1,0 60,69" 
          fill="none" 
          stroke="#FFFFFF" 
          strokeWidth="4" 
          strokeLinecap="round" 
          opacity="0.32" 
        />
        <path 
          d="M 60,17 
             A 38,38 0 1,0 98,55 
             A 30,30 0 1,0 60,85 
             A 22,22 0 1,0 38,55 
             A 14,14 0 1,0 60,69" 
          fill="none" 
          stroke="#4C1D95" 
          strokeWidth="3.2" 
          strokeLinecap="round" 
          opacity="0.2"
          transform="translate(0, 1.5)"
        />

        {/* Center Play Button Triangle (Perfect white representation matching the reference) */}
        <path 
          d="M 53.5,42.5 L 71.5,55 L 53.5,67.5 Z" 
          fill="#FFFFFF" 
          stroke="#FFFFFF"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

const VIDEO_PRESETS: VideoItem[] = [
  {
    id: '1',
    title: 'The tale of amaran bros 2026 hd | Lolipop productions',
    creator: 'Lolipop productions',
    views: '2.4M',
    embedUrl: 'https://player.cloudinary.com/embed/?cloud_name=dub5abyk1&public_id=InShot_20260620_044356362_n5ld8z'
  }
];
  
export default function App() {
  const [activeVideo, setActiveVideo] = useState<VideoItem>(VIDEO_PRESETS[0]);
  const [showShareToast, setShowShareToast] = useState(false);
  const [autoplay, setAutoplay] = useState(true);
  const [muted, setMuted] = useState(false);
  const [currentNotification, setCurrentNotification] = useState<string | null>(null);

  const handleShare = () => {
    // Copy the shared URL to clipboard
    navigator.clipboard.writeText(window.location.href);
    setShowShareToast(true);
    setTimeout(() => setShowShareToast(false), 2500);

    // Trigger internal notification bar
    triggerNotification('Share link copied to your clipboard!');
  };

  const triggerNotification = (message: string) => {
    setCurrentNotification(message);
    setTimeout(() => {
      setCurrentNotification(null);
    }, 3000);
  };

  const selectVideo = (video: VideoItem) => {
    setActiveVideo(video);
    triggerNotification(`Now playing: ${video.title}`);
  };

  return (
    <div id="lolipop-app" className="min-h-screen bg-[#fcfbfe] text-[#2c1d45] font-sans relative overflow-x-hidden">
      
      {/* Soft elegant linear mesh backdrop behind header/content */}
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-[#f2ecfc] via-[#fcfbfe] to-transparent pointer-events-none -z-10" />

      {/* Floating Status Notification Overlay */}
      <AnimatePresence>
        {currentNotification && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-full bg-[#7c3aed] text-white text-xs font-medium shadow-[0_10px_25px_rgba(124,58,237,0.25)] flex items-center gap-2 border border-violet-400"
          >
            <Sparkles className="w-3.5 h-3.5 text-pink-300 animate-spin" />
            <span>{currentNotification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Container Wrapper */}
      <div className="max-w-[1100px] mx-auto px-4 md:px-6">
        
        {/* Navigation Bar Header (Matches reference image perfectly) */}
        <header id="lolipop-top-navigation" className="py-7 flex items-center justify-between border-b border-violet-100/60 mb-6 bg-transparent">
          <div 
            onClick={() => selectVideo(VIDEO_PRESETS[0])}
            role="button"
            tabIndex={0}
            className="flex items-center gap-2 cursor-pointer group active:scale-95 transition-transform"
          >
            <LolipopLogo className="w-9 h-11" />
            <span className="text-xl font-display font-extrabold tracking-tight text-[#7c3aed]">
              Lolipop
            </span>
          </div>

          <nav className="flex items-center gap-8 text-sm font-medium text-stone-500">
            <button 
              className="hover:text-[#7c3aed] transition-colors cursor-pointer"
            >
              Browse
            </button>
            <button 
              className="hover:text-[#7c3aed] transition-colors cursor-pointer"
            >
              Trending
            </button>
            <button 
              className="hover:text-[#7c3aed] transition-colors cursor-pointer"
            >
              About
            </button>
          </nav>
        </header>

        {/* Hero Area: Video Player & Subtitle Panel */}
        <main className="space-y-6">
          
          {/* Main Video Frame (16:9 Aspect Ratio Container) */}
          <div id="video-frame-wrapper" className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-[0_12px_45px_rgba(60,32,104,0.08)] border border-violet-100/40">
            
            {/* The Cloundinary Embed Iframe Player */}
            <iframe
              id="cloudinary-embed-player"
              src={`${activeVideo.embedUrl}&autoplay=${autoplay ? 'true' : 'false'}&muted=${muted ? 'true' : 'false'}`}
              className="w-full h-full border-0 absolute inset-0 z-10 bg-black"
              allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
              title={activeVideo.title}
            />

            {/* Simulated overlay for visual play state state transitions */}
            <div className="absolute inset-x-0 bottom-0 py-3 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity flex justify-between px-4 bg-gradient-to-t from-black/80 to-transparent">
              <span className="text-[11px] text-white/80 font-mono">Embedding source validated.</span>
            </div>
          </div>

          {/* Under-Video Accent Bar (Exactly like the light purple gradient visualizer bar in screenshot 1) */}
          <div 
            id="video-details-accent shadow-sm"
            className="rounded-2xl p-6 bg-gradient-to-r from-[#e3ddf4] via-[#ede9f8] to-[#f7f5fc] border border-[#d6caee]/60"
          >
            <div className="space-y-4">
              {/* Highlighted Video Title */}
              <h2 className="text-lg md:text-xl font-semibold text-[#301655] tracking-tight leading-snug">
                {activeVideo.title}
              </h2>

              {/* Share & Custom parameters strip */}
              <div className="flex items-center justify-between pt-2 border-t border-[#d8cfea]/50 text-sm">
                
                {/* Custom Share Action Button */}
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/70 hover:bg-[#7c3aed] border border-[#cfc0eb] text-[#52338a] hover:text-white font-medium transition-all duration-300 shadow-sm active:scale-95 outline-none cursor-pointer"
                >
                  {showShareToast ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-500 hover:text-white" />
                      <span className="text-xs">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4" />
                      <span>Share</span>
                    </>
                  )}
                </button>

                {/* Right Settings and Controls Option Drawer Trigger */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setMuted(!muted);
                      triggerNotification(muted ? 'Audio loop enabled' : 'Theme muted');
                    }}
                    className="p-2.5 rounded-xl bg-white/75 border border-[#cfc0eb] hover:bg-white text-[#52338a] hover:border-[#7c3aed] transition-colors cursor-pointer"
                    title={muted ? "Unmute stream" : "Mute stream"}
                  >
                    {muted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                </div>

              </div>
            </div>
          </div>



        </main>



        {/* Crisp Multi-Column Footer Component matching Screenshot 2 perfectly */}
        <footer id="lolipop-footer" className="mt-24 pt-16 pb-12 border-t border-violet-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            
            {/* Col 1 */}
            <div className="space-y-4">
              <h5 className="text-sm font-bold tracking-tight text-[#1e073c]">Product</h5>
              <ul className="space-y-2 text-xs text-stone-500 font-medium">
                <li><a href="#lolipop-app" onClick={() => triggerNotification('Feature catalogue: Light interface with dynamic loops.')} className="hover:text-[#7c3aed] transition-colors">Features</a></li>
                <li><a href="#lolipop-app" onClick={() => triggerNotification('Enjoy the premium sandbox loop for free.')} className="hover:text-[#7c3aed] transition-colors">Pricing</a></li>
                <li><a href="#lolipop-app" onClick={() => triggerNotification('Protected directly within Cloud Run container endpoints.')} className="hover:text-[#7c3aed] transition-colors">Security</a></li>
              </ul>
            </div>

            {/* Col 2 */}
            <div className="space-y-4">
              <h5 className="text-sm font-bold tracking-tight text-[#1e073c]">Company</h5>
              <ul className="space-y-2 text-xs text-stone-500 font-medium">
                <li><a href="#lolipop-app" onClick={() => triggerNotification('A minimalist lounge designed in Antigravity mode.')} className="hover:text-[#7c3aed] transition-colors">About</a></li>
                <li><a href="#lolipop-app" onClick={() => triggerNotification('Check back soon for upcoming stream tracks!')} className="hover:text-[#7c3aed] transition-colors">Blog</a></li>
                <li><a href="#lolipop-app" onClick={() => triggerNotification('Work with purple palettes and dynamic cloud engines.')} className="hover:text-[#7c3aed] transition-colors">Careers</a></li>
              </ul>
            </div>

            {/* Col 3 */}
            <div className="space-y-4">
              <h5 className="text-sm font-bold tracking-tight text-[#1e073c]">Resources</h5>
              <ul className="space-y-2 text-xs text-stone-500 font-medium">
                <li><a href="#lolipop-app" onClick={() => triggerNotification('Docs guide: Custom Cloudinary embeds.')} className="hover:text-[#7c3aed] transition-colors">Docs</a></li>
                <li><a href="#lolipop-app" onClick={() => triggerNotification('Any issues? Check developer settings.')} className="hover:text-[#7c3aed] transition-colors">Help Center</a></li>
                <li><a href="#lolipop-app" onClick={() => triggerNotification('Designed by Mohawk to celebrate violet accents.')} className="hover:text-[#7c3aed] transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Col 4 */}
            <div className="space-y-4">
              <h5 className="text-sm font-bold tracking-tight text-[#1e073c]">Legal</h5>
              <ul className="space-y-2 text-xs text-stone-500 font-medium">
                <li><a href="#lolipop-app" onClick={() => triggerNotification('Cookies and security metrics preserved locally only.')} className="hover:text-[#7c3aed] transition-colors">Privacy</a></li>
                <li><a href="#lolipop-app" onClick={() => triggerNotification('Simple offline usage restrictions remain applicable.')} className="hover:text-[#7c3aed] transition-colors">Terms</a></li>
                <li><a href="#lolipop-app" onClick={() => triggerNotification('Cookie values cache selected active track settings.')} className="hover:text-[#7c3aed] transition-colors">Cookies</a></li>
              </ul>
            </div>

          </div>

          {/* Sub-Footer strip matching screenshot 2 perfectly */}
          <div className="pt-8 border-t border-violet-100/60 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2 text-[#7c3aed] font-bold">
              <LolipopLogo className="w-7 h-9" />
              <span className="font-display tracking-tight text-[#7c3aed]">Lolipop</span>
            </div>
            
            <p className="text-[#837c95] font-medium">
              © 2026 Lolipop. Stream smooth, think less.
            </p>
          </div>
        </footer>

      </div>
    </div>
  );
}
