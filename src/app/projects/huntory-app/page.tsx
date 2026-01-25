"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Map, Camera, User, Award, Plus, Upload, Check, X, 
  LayoutDashboard, FileText, CheckCircle, Image as ImageIcon,
  MapPin, Calendar, Search, Filter, ChevronRight, ChevronDown, Menu, LogOut,
  Shield, Edit3, Flag, Sparkles, Loader, BarChart3, Users, Settings,
  ThumbsUp, ThumbsDown, MessageSquare, Info, RotateCcw, AlertCircle, ChevronLeft,
  Lock, Bell, ArrowLeft, History, Layers, SkipForward, CheckSquare, CircleHelp
} from 'lucide-react';
import kevinSvg from '../../../../public/kevin-icon.svg';

const apiKey = ""; // API Key injected by environment

// --- HCI Component: Toast Notification (Visibility of System Status) ---
const Toast = ({ message, onClose, actionLabel, onAction }) => (
  <div className="absolute top-16 left-4 right-4 bg-slate-900/90 text-white px-4 py-3 rounded-lg shadow-xl flex justify-between items-center z-50 animate-in fade-in slide-in-from-top-2 backdrop-blur-sm">
    <span className="text-sm font-medium">{message}</span>
    <div className="flex items-center gap-3">
        {actionLabel && (
            <button onClick={onAction} className="text-indigo-400 text-xs font-bold uppercase tracking-wider hover:text-indigo-300">
                {actionLabel}
            </button>
        )}
        <button onClick={onClose}><X size={16} className="text-slate-400" /></button>
    </div>
  </div>
);

// --- Custom Asset: Running Boy Mascot (from public/) ---
const RunningBoyIcon = ({ className }) => (
    <Image src={kevinSvg} alt="Running boy mascot" className={className} width={64} height={64} />
);

// --- HCI Component: Draggable Floating Assistant ---
const DraggableFloatingAssistant = ({ onClick, onDismiss }) => {
  const [position, setPosition] = useState({ x: 290, y: 650 }); // Initial position bottom-right
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [initialPos, setInitialPos] = useState({ x: 0, y: 0 });

  const handlePointerDown = (e) => {
    e.preventDefault(); // Prevent scrolling on touch
    setIsDragging(false); // Assume click initially
    setDragStart({ x: e.clientX, y: e.clientY });
    setInitialPos({ ...position });
    
    // Add global listeners to handle drag outside the button
    document.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerup', handlePointerUp);
  };

  const handlePointerMove = (e) => {
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    
    // Threshold to distinguish click from drag
    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
        setIsDragging(true);
        setPosition({
            x: initialPos.x + dx,
            y: initialPos.y + dy
        });
    }
  };

  const handlePointerUp = (e) => {
    document.removeEventListener('pointermove', handlePointerMove);
    document.removeEventListener('pointerup', handlePointerUp);
    
    // Simple boundary check (optional, keeps it within reasonable bounds)
    // Here we just rely on visual placement for simplicity
  };

  // Because event listeners in React stick to closure values, we use refs or the updated state approach inside the move handler. 
  // However, for this simple case, we are adding/removing listeners dynamically which works, BUT `dragStart` and `initialPos` 
  // inside `handlePointerMove` would be stale if not careful.
  // To fix stale closures in standard event listeners without refs:
  // We'll use a slightly different pattern using React's event system for the element itself, but that stops tracking if mouse leaves element.
  // Let's use a ref for the mutable values to avoid stale closures.
  
  const stateRef = useRef({ 
      dragStart: { x: 0, y: 0 }, 
      initialPos: { x: 0, y: 0 },
      isDragging: false
  });

  const onDown = (e) => {
      // e.stopPropagation(); // Allow clicks to propagate? No, we handle click manually.
      stateRef.current.dragStart = { x: e.clientX, y: e.clientY };
      stateRef.current.initialPos = { ...position };
      stateRef.current.isDragging = false;
      
      document.addEventListener('pointermove', onMove);
      document.addEventListener('pointerup', onUp);
  };

  const onMove = (e) => {
      const dx = e.clientX - stateRef.current.dragStart.x;
      const dy = e.clientY - stateRef.current.dragStart.y;

      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
          stateRef.current.isDragging = true;
          // Clamp to typical phone screen width/height approx (0 to 320ish, 0 to 750ish)
          // Not strictly necessary but nice.
          setPosition({
              x: stateRef.current.initialPos.x + dx,
              y: stateRef.current.initialPos.y + dy
          });
      }
  };

  const onUp = () => {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerup', onUp);
      
      if (!stateRef.current.isDragging) {
          onClick();
      }
  };

  return (
    <div 
        className="absolute z-40 touch-none"
        style={{ left: position.x, top: position.y }}
    >
        <div className="relative group">
            {/* Dismiss Button */}
            <button 
                onClick={(e) => { e.stopPropagation(); onDismiss(); }}
                className="absolute -top-1 -left-1 bg-slate-900 text-white rounded-full p-0.5 w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-50 shadow-md"
                title="Dismiss"
            >
                <X size={12} />
            </button>

            {/* Main Avatar Button */}
            <button 
                onPointerDown={onDown}
                className="w-16 h-16 rounded-full shadow-[0_4px_14px_rgba(0,0,0,0.3)] border-4 border-white bg-white overflow-hidden active:scale-95 transition-transform cursor-move"
            >
                <RunningBoyIcon className="w-full h-full" />
                {/* Notification Dot */}
                <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 border-2 border-white rounded-full animate-bounce pointer-events-none"></span>
            </button>
        </div>
    </div>
  );
};

// --- HCI Component: Help Modal ---
const HelpModal = ({ onClose }) => (
  <div className="absolute inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
     <div className="bg-white rounded-2xl p-6 shadow-2xl w-full max-w-sm relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 bg-slate-100 rounded-full p-1"><X size={20}/></button>
        <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 shrink-0">
                 <RunningBoyIcon className="w-full h-full shadow-sm rounded-full" />
            </div>
            <div>
                <h3 className="text-xl font-bold text-slate-900 leading-tight">Ready to Hunt?</h3>
                <p className="text-xs text-slate-500 mt-1">I'm your guide to the city's hidden gems!</p>
            </div>
        </div>
        
        <div className="space-y-3 text-sm text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-100">
           <p className="flex items-start gap-3">
               <span className="bg-indigo-100 text-indigo-700 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0">1</span>
               <span><b>Scout:</b> Check the map for orange pins. These are monuments needing documentation.</span>
           </p>
           <p className="flex items-start gap-3">
               <span className="bg-indigo-100 text-indigo-700 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0">2</span>
               <span><b>Capture:</b> Tap the <Plus size={10} className="inline bg-indigo-900 text-white rounded p-0.5"/> button to snap a photo. Make sure it's centered!</span>
           </p>
           <p className="flex items-start gap-3">
               <span className="bg-indigo-100 text-indigo-700 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0">3</span>
               <span><b>Rank Up:</b> Earn points for every validated upload and climb the leaderboard.</span>
           </p>
        </div>

        <button onClick={onClose} className="w-full mt-6 bg-slate-900 text-white py-3 rounded-xl font-bold active:scale-95 transition-transform hover:bg-slate-800">
            Let's Go!
        </button>
     </div>
  </div>
);

// --- Gemini Helper ---
async function callGemini(prompt) {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );
    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "AI Service Unavailable";
  } catch (e) {
    console.error(e);
    return "Error connecting to AI service.";
  }
}

// --- Mock Data ---

const CAMPAIGNS = [
  { 
    id: 1, 
    title: "Rural Chapels", 
    deadline: "4 days left", 
    color: "orange",
    description: "Documenting endangered chapels in the Peloponnese region. Look for slate roofs and distinctive bell towers.",
    dates: "Oct 1 - Nov 15, 2023",
    purpose: "To create a digital catalog of at-risk religious sites for restoration prioritization."
  },
  { 
    id: 2, 
    title: "Ottoman Fountains", 
    deadline: "12 days left", 
    color: "blue",
    description: "Mapping functional and non-functional fountains across the city center. Please note water flow status.",
    dates: "Oct 15 - Nov 30, 2023",
    purpose: "Urban planning and hydraulic history research."
  },
  { 
    id: 3, 
    title: "Industrial Heritage", 
    deadline: "20 days left", 
    color: "slate",
    description: "Photography of old factories, warehouses, and industrial chimneys in the port area.",
    dates: "Nov 1 - Dec 20, 2023",
    purpose: "Documentation of the city's industrial past before redevelopment."
  },
];

const MOCK_SUBMISSIONS = [
  { id: 1, contestId: 1, title: "Byzantine Cistern", loc: "Thessaloniki, GR", date: "2023-10-24", status: "Pending", img: "https://placehold.co/600x400/e2e8f0/1e293b?text=Ancient+Structure" },
  { id: 2, contestId: 2, title: "Ottoman Fountain", loc: "Istanbul, TR", date: "2023-10-25", status: "Pending", img: "https://placehold.co/600x400/e2e8f0/1e293b?text=Stone+Fountain" },
  { id: 3, contestId: 1, title: "Roman Aqueduct", loc: "Segovia, ES", date: "2023-10-26", status: "Pending", img: "https://placehold.co/600x400/e2e8f0/1e293b?text=Aqueduct+Arch" },
  { id: 4, contestId: 3, title: "Old Factory Chimney", loc: "Piraeus, GR", date: "2023-10-27", status: "Validated", img: "https://placehold.co/600x400/e2e8f0/1e293b?text=Chimney" },
];

const MOCK_PINS = [
  { id: 1, top: '33%', left: '25%', color: 'text-indigo-700', title: 'Byzantine Cistern', type: 'Architecture' },
  { id: 2, top: '50%', left: '66%', color: 'text-orange-600', title: 'Roman Pillar', type: 'Artifact' },
  { id: 3, top: '75%', left: '40%', color: 'text-green-600', title: 'Ottoman Bath', type: 'Site' },
  { id: 4, top: '20%', left: '60%', color: 'text-blue-600', title: 'City Wall', type: 'Ruin' },
  { id: 5, top: '60%', left: '15%', color: 'text-red-500', title: 'Erosion Risk', type: 'Report' },
  { id: 6, top: '45%', left: '85%', color: 'text-indigo-700', title: 'Old Market', type: 'Architecture' },
];

const MY_UPLOADS_DATA = [
    {id: 101, title: "Ancient Agora Wall", location: "Athens, Monastiraki", date: "Yesterday", status: "Pending", statusColor: "bg-orange-100 text-orange-700", notes: "Awaiting expert verification."},
    {id: 102, title: "Marble Inscription", location: "Athens, Plaka", date: "Oct 22", status: "Validated", statusColor: "bg-green-100 text-green-700", notes: "Approved by Dr. Aris."},
    {id: 103, title: "Ceramic Fragment", location: "Corinth, Ancient Site", date: "Oct 15", status: "Rejected", statusColor: "bg-red-100 text-red-700", note: "Low light", notes: "Image too blurry for identification. Please retake."},
    {id: 104, title: "Byzantine Church", location: "Mystras, Lakonia", date: "Sep 30", status: "Validated", statusColor: "bg-green-100 text-green-700", notes: "Excellent contribution."}
];

// --- 1. CONTRIBUTOR VIEW (General User) ---
const ContributorView = () => {
  const [screen, setScreen] = useState('home'); // home, upload1, upload2, success, profile, contests, uploads, uploadDetail
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('Athens, Plaka (GPS Locked)');
  const [notes, setNotes] = useState('');
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [toast, setToast] = useState(null);
  const [selectedUpload, setSelectedUpload] = useState(null);
  const [selectedPin, setSelectedPin] = useState(null);
  const [expandedContest, setExpandedContest] = useState(null);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [isAssistantVisible, setIsAssistantVisible] = useState(true);
  
  // Contest Logic
  const [joinedCampaignIds, setJoinedCampaignIds] = useState([1]); // Initialize with ID 1 joined
  const [contestToJoin, setContestToJoin] = useState(null);

  // Auto-dismiss toast
  useEffect(() => {
    if (toast) {
        const timer = setTimeout(() => setToast(null), 3000);
        return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleAIEnhance = async () => {
    if (!title) return;
    setIsEnhancing(true);
    const prompt = `You are a cultural heritage expert. Write a short, engaging, and historically accurate description (max 40 words) for a user submission of a monument. 
    User Title: "${title}"
    Location: "${location}"
    User Rough Notes: "${notes}"
    If notes are empty, generate a generic but professional description. Only return text.`;
    
    const enhancedText = await callGemini(prompt);
    setNotes(enhancedText);
    setIsEnhancing(false);
  };

  const handleInitialSubmit = () => {
      setShowSubmitModal(true);
  };

  const confirmSubmit = () => {
    setShowSubmitModal(false);
    setScreen('success');
    setTimeout(() => {
      setScreen('home');
      setToast({ message: "Contribution added to queue" });
      setTitle('');
      setNotes('');
      setLocation('Athens, Plaka (GPS Locked)'); // Reset location
    }, 2500);
  };

  const openUploadDetail = (item) => {
    setSelectedUpload(item);
    setScreen('uploadDetail');
  };

  const initiateJoinContest = (e, contest) => {
    e.stopPropagation();
    setContestToJoin(contest);
  };

  const confirmJoinContest = () => {
    if (contestToJoin) {
      setJoinedCampaignIds([...joinedCampaignIds, contestToJoin.id]);
      setToast({ message: `Successfully joined "${contestToJoin.title}"` });
      setContestToJoin(null);
    }
  };

  const toggleExpandContest = (id) => {
    setExpandedContest(expandedContest === id ? null : id);
  };

  const toggleAssistant = () => {
      if (!isAssistantVisible) setIsAssistantVisible(true);
      else setShowHelp(true); // If visible and clicked via header, standard behavior
  };

  const BottomNav = () => (
    <div className="absolute bottom-0 w-full h-16 bg-white border-t border-slate-200 flex justify-around items-center px-2 z-10 rounded-b-[2.5rem]">
      <button onClick={() => setScreen('home')} className={`p-2 flex flex-col items-center ${screen === 'home' ? 'text-indigo-900' : 'text-slate-400'}`}>
        <Map size={20} />
        <span className="text-[10px] mt-1">Explore</span>
      </button>
      <button onClick={() => setScreen('contests')} className={`p-2 flex flex-col items-center ${screen === 'contests' ? 'text-indigo-900' : 'text-slate-400'}`}>
        <Flag size={20} />
        <span className="text-[10px] mt-1">Contests</span>
      </button>
      <div className="w-12"></div>
      <button onClick={() => setScreen('uploads')} className={`p-2 flex flex-col items-center ${screen === 'uploads' || screen === 'uploadDetail' ? 'text-indigo-900' : 'text-slate-400'}`}>
        <ImageIcon size={20} />
        <span className="text-[10px] mt-1">Uploads</span>
      </button>
      <button onClick={() => setScreen('profile')} className={`p-2 flex flex-col items-center ${screen === 'profile' ? 'text-indigo-900' : 'text-slate-400'}`}>
        <User size={20} />
        <span className="text-[10px] mt-1">Profile</span>
      </button>
      <button onClick={() => setScreen('upload1')} className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-14 h-14 bg-indigo-900 rounded-full flex items-center justify-center text-white shadow-lg border-4 border-slate-50 active:scale-95 transition-transform">
        <Plus size={28} />
      </button>
    </div>
  );

  const renderContestCard = (c, isJoined) => (
    <div 
        key={c.id} 
        onClick={() => toggleExpandContest(c.id)}
        className={`bg-white p-4 mb-4 rounded-xl shadow-sm border-l-4 transition-all duration-300 ${expandedContest === c.id ? 'ring-2 ring-indigo-100' : ''}`}
        style={{ borderLeftColor: c.color }}
    >
        <div className="flex justify-between items-start">
            <div>
                <h3 className="font-bold text-slate-900">{c.title}</h3>
                <span className={`text-xs px-2 py-0.5 rounded ${c.color === 'orange' ? 'bg-orange-50 text-orange-600' : c.color === 'blue' ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-600'}`}>
                    {c.deadline}
                </span>
            </div>
            {expandedContest === c.id ? <ChevronDown size={20} className="text-slate-400"/> : <ChevronRight size={20} className="text-slate-400"/>}
        </div>

        {expandedContest === c.id && (
            <div className="mt-4 pt-4 border-t border-slate-100 text-sm animate-in slide-in-from-top-2 fade-in">
                <p className="text-slate-600 mb-3">{c.description}</p>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase">Dates</div>
                        <div className="font-medium text-slate-800">{c.dates}</div>
                    </div>
                    <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase">Purpose</div>
                        <div className="font-medium text-slate-800">{c.purpose}</div>
                    </div>
                </div>
            </div>
        )}

        <div className="flex justify-end mt-3">
             {isJoined ? (
                <div className="text-xs bg-green-100 text-green-700 px-4 py-2 rounded-lg font-bold flex items-center gap-2">
                    <CheckCircle size={14} /> Joined
                </div>
             ) : (
                <button 
                    onClick={(e) => initiateJoinContest(e, c)}
                    className="text-xs bg-slate-900 text-white px-4 py-2 rounded-lg font-bold hover:bg-slate-800 active:scale-95 transition-transform"
                >
                    Join Contest
                </button>
             )}
        </div>
    </div>
  );

  const myContests = CAMPAIGNS.filter(c => joinedCampaignIds.includes(c.id));
  const availableContests = CAMPAIGNS.filter(c => !joinedCampaignIds.includes(c.id));

  return (
    <div className="h-full flex flex-col bg-slate-50 relative overflow-hidden">
      {toast && <Toast message={toast.message} onClose={() => setToast(null)} />}
      {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}
      
      {/* Floating Assistant (Clippy Style) - Conditionally Rendered */}
      {isAssistantVisible && <DraggableFloatingAssistant onClick={() => setShowHelp(true)} onDismiss={() => setIsAssistantVisible(false)} />}

      {screen === 'home' && (
        <div className="h-full relative">
          <div className="absolute inset-0 bg-slate-200">
            <div className="w-full h-full opacity-30 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]"></div>
            
            {/* Dynamic Map Pins */}
            {MOCK_PINS.map(pin => (
                <div 
                  key={pin.id} 
                  className="absolute cursor-pointer group hover:z-10"
                  style={{ top: pin.top, left: pin.left }}
                  onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPin(pin);
                  }}
                >
                  <MapPin 
                    size={32} 
                    fill="currentColor" 
                    className={`${pin.color} transition-transform duration-200 group-hover:scale-125 group-hover:-translate-y-1 drop-shadow-md ${selectedPin?.id === pin.id ? 'scale-125 -translate-y-1 ring-2 ring-white rounded-full' : ''}`} 
                  />
                  
                  {/* Tooltip on Hover (only if not selected) */}
                  {selectedPin?.id !== pin.id && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-32 bg-white p-2 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20 text-center transform scale-95 group-hover:scale-100 origin-bottom">
                        <div className="text-xs font-bold text-slate-800 leading-tight">{pin.title}</div>
                        <div className="text-[10px] text-slate-500 mt-0.5 uppercase tracking-wide">{pin.type}</div>
                        <div className="w-2 h-2 bg-white transform rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2 box-border shadow-sm"></div>
                    </div>
                  )}
                </div>
            ))}

            {/* Click to dismiss overlay */}
            {selectedPin && (
                <div className="absolute inset-0 z-20" onClick={() => setSelectedPin(null)}></div>
            )}

          </div>

          <div className="absolute top-4 left-4 right-4 bg-white rounded-xl shadow-lg p-3 flex items-center gap-3 z-10">
            <Menu size={20} className="text-slate-400" />
            <input type="text" placeholder="Search monuments..." className="flex-1 outline-none text-sm text-slate-700" />
            
            {/* Standard Help Icon - restores assistant if dismissed */}
            <button onClick={toggleAssistant} className="text-slate-400 hover:text-indigo-600 transition-colors">
                <CircleHelp size={20} className={!isAssistantVisible ? "text-indigo-600" : ""} />
            </button>
            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-900 font-bold text-xs">EG</div>
          </div>

          {/* Pin Detail Bottom Sheet */}
          {selectedPin && (
              <div className="absolute bottom-0 left-0 right-0 bg-white p-6 rounded-t-3xl shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.3)] z-30 animate-in slide-in-from-bottom duration-300">
                  <button onClick={() => setSelectedPin(null)} className="absolute top-4 right-4 p-2 bg-slate-100 rounded-full text-slate-500 hover:bg-slate-200">
                      <X size={20} />
                  </button>
                  
                  <div className="flex gap-4">
                      <div className="w-24 h-24 bg-slate-200 rounded-xl shrink-0 overflow-hidden">
                          <img src={`https://placehold.co/200x200/e2e8f0/1e293b?text=${selectedPin.type}`} className="w-full h-full object-cover" alt={selectedPin.title} />
                      </div>
                      <div>
                          <div className="flex items-center gap-2 mb-1">
                              <span className="bg-indigo-100 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">{selectedPin.type}</span>
                          </div>
                          <h3 className="text-xl font-bold text-slate-900 leading-tight mb-1">{selectedPin.title}</h3>
                          <div className="flex items-center gap-1 text-slate-500 text-xs mb-3">
                              <MapPin size={12} />
                              <span>~300m away</span>
                          </div>
                          <button className="bg-slate-900 text-white text-xs font-bold px-4 py-2 rounded-lg active:scale-95 transition-transform">
                              View Full Details
                          </button>
                      </div>
                  </div>
              </div>
          )}
        </div>
      )}

      {screen === 'upload1' && (
        <div className="h-full bg-slate-900 flex flex-col items-center justify-center p-6 text-white relative z-20">
          <button onClick={() => setScreen('home')} className="absolute top-6 left-6 p-2 bg-slate-800 rounded-full"><X size={20} /></button>
          
          <div className="w-full aspect-[3/4] bg-slate-800 rounded-2xl border-2 border-dashed border-slate-600 flex items-center justify-center mb-6 relative overflow-hidden">
             <div className="absolute inset-0 bg-black opacity-40"></div>
             <p className="z-10 text-slate-400">Viewfinder</p>
             {/* Crosshair overlay */}
             <div className="absolute w-8 h-8 border-t-2 border-l-2 border-white/50 top-4 left-4"></div>
             <div className="absolute w-8 h-8 border-t-2 border-r-2 border-white/50 top-4 right-4"></div>
             <div className="absolute w-8 h-8 border-b-2 border-l-2 border-white/50 bottom-4 left-4"></div>
             <div className="absolute w-8 h-8 border-b-2 border-r-2 border-white/50 bottom-4 right-4"></div>
          </div>

          {/* Instructions Legend */}
          <div className="w-full bg-slate-800/80 rounded-xl p-3 mb-8 border border-slate-700 backdrop-blur-sm animate-in slide-in-from-bottom-4 fade-in duration-500">
            <h4 className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase mb-2">
              <Info size={14} /> Capture Guidelines
            </h4>
            <div className="grid grid-cols-3 gap-2 text-[10px] text-center text-slate-300">
              <div className="bg-slate-900/50 p-2 rounded-lg border border-slate-700/50">
                 <div className="mb-1 text-lg">☀️</div>
                 Good Light
              </div>
              <div className="bg-slate-900/50 p-2 rounded-lg border border-slate-700/50">
                 <div className="mb-1 text-lg">🎯</div>
                 Center It
              </div>
              <div className="bg-slate-900/50 p-2 rounded-lg border border-slate-700/50">
                 <div className="mb-1 text-lg">🚫</div>
                 No Faces
              </div>
            </div>
          </div>

          <button onClick={() => setScreen('upload2')} className="w-20 h-20 bg-white rounded-full border-4 border-slate-300 ring-4 ring-indigo-500 ring-opacity-50 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105 transition-transform"></button>
        </div>
      )}

      {screen === 'upload2' && (
        <div className="h-full bg-slate-50 flex flex-col z-20 overflow-y-auto pb-6">
          <div className="h-48 bg-slate-200 relative shrink-0">
             <img src="https://placehold.co/600x400/e2e8f0/1e293b?text=Captured+Photo" alt="Preview" className="w-full h-full object-cover" />
             <button onClick={() => setScreen('upload1')} className="absolute top-4 left-4 p-2 bg-black/50 text-white rounded-full"><X size={16}/></button>
          </div>
          <div className="p-5 flex-1 flex flex-col gap-4">
            
            {/* Location (New) */}
            <div>
                <label className="text-xs font-bold text-slate-500 uppercase">Location</label>
                <div className="relative mt-1">
                    <input 
                        type="text" 
                        value={location} 
                        onChange={(e) => setLocation(e.target.value)} 
                        className="w-full p-3 pl-9 rounded-lg border border-slate-300 text-sm bg-slate-50 text-slate-600" 
                    />
                    <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
                </div>
            </div>

            <div>
              <div className="flex justify-between">
                <label className="text-xs font-bold text-slate-500 uppercase">Title <span className="text-red-500">*</span></label>
                {/* HCI: Validation feedback */}
                {!title && <span className="text-[10px] text-red-500 font-medium">Required</span>}
              </div>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Hadrian's Library" className={`w-full mt-1 p-3 rounded-lg border text-sm ${!title ? 'border-red-300 bg-red-50' : 'border-slate-300'}`} />
            </div>
            <div className="relative">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-500 uppercase">Description</label>
                {/* HCI: Recognition - Info icon explains what AI does */}
                <div className="flex items-center gap-1">
                    <div className="group relative">
                        <Info size={12} className="text-slate-400" />
                        <div className="hidden group-hover:block absolute right-0 bottom-full mb-2 w-48 bg-slate-800 text-white text-[10px] p-2 rounded shadow-lg">
                            Generates a historical description based on your title and location.
                        </div>
                    </div>
                    <button onClick={handleAIEnhance} disabled={isEnhancing || !title} className={`text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 transition-colors ${isEnhancing ? 'bg-slate-100' : 'bg-indigo-100 text-indigo-700 disabled:opacity-50'}`}>
                    {isEnhancing ? <Loader size={10} className="animate-spin" /> : <Sparkles size={10} />}
                    {isEnhancing ? 'Enhancing...' : 'AI Enhance'}
                    </button>
                </div>
              </div>
              <textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Details..." className="w-full mt-1 p-3 rounded-lg border border-slate-300 text-sm resize-none"></textarea>
            </div>
            
            {/* HCI: Error Prevention - Disable button if invalid */}
            <button 
                onClick={handleInitialSubmit} 
                disabled={!title}
                className={`mt-4 w-full py-4 rounded-xl font-bold shadow-lg transition-all ${!title ? 'bg-slate-300 text-slate-500 cursor-not-allowed' : 'bg-indigo-900 text-white active:scale-[0.98]'}`}
            >
                {title ? 'Submit Contribution' : 'Enter Title to Submit'}
            </button>
          </div>

          {/* SUBMIT CONFIRMATION MODAL */}
          {showSubmitModal && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in">
                <div className="bg-white rounded-2xl p-6 shadow-2xl w-full max-w-sm">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mb-4 mx-auto">
                        <Upload size={24} />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-center text-slate-900">Submit Contribution?</h3>
                    <p className="text-slate-600 mb-6 text-center text-sm">
                        You are about to submit "<b>{title}</b>". This will make it visible to curators for validation.
                    </p>
                    <div className="flex gap-3">
                        <button 
                            onClick={() => setShowSubmitModal(false)} 
                            className="flex-1 py-3 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200"
                        >
                            Back
                        </button>
                        <button 
                            onClick={confirmSubmit} 
                            className="flex-1 py-3 rounded-xl font-bold text-white bg-indigo-900 hover:bg-indigo-800 shadow-lg shadow-indigo-200"
                        >
                            Yes, Submit
                        </button>
                    </div>
                </div>
            </div>
          )}
        </div>
      )}

      {screen === 'success' && (
        <div className="h-full bg-indigo-900 flex flex-col items-center justify-center p-8 text-white text-center z-30">
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-xl animate-bounce"><Check size={48} /></div>
          <h2 className="text-2xl font-bold mb-2">Submitted!</h2>
          <div className="flex gap-2 text-sm bg-indigo-800 px-4 py-2 rounded-full mt-4"><Award size={18} className="text-yellow-400" /><span>+50 Points</span></div>
        </div>
      )}

      {/* NEW UPLOADS SCREEN */}
      {screen === 'uploads' && (
        <div className="p-6 pt-12 h-full overflow-y-auto pb-24">
            <h2 className="text-2xl font-bold mb-6 text-slate-900">My Uploads</h2>
            <div className="space-y-4">
               {/* Stat Summary */}
               <div className="flex gap-4 mb-6 overflow-x-auto pb-2 no-scrollbar">
                  <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 min-w-[100px]">
                      <div className="text-2xl font-bold text-indigo-600">12</div>
                      <div className="text-[10px] text-slate-400 uppercase font-bold">Total</div>
                  </div>
                   <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 min-w-[100px]">
                      <div className="text-2xl font-bold text-green-600">8</div>
                      <div className="text-[10px] text-slate-400 uppercase font-bold">Accepted</div>
                  </div>
                   <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 min-w-[100px]">
                      <div className="text-2xl font-bold text-orange-500">3</div>
                      <div className="text-[10px] text-slate-400 uppercase font-bold">Pending</div>
                  </div>
               </div>

               {/* List */}
               <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider mb-2">History</h3>
               {MY_UPLOADS_DATA.map(item => (
                 <button 
                    key={item.id} 
                    onClick={() => openUploadDetail(item)}
                    className="w-full bg-white p-3 rounded-xl shadow-sm border border-slate-100 flex gap-3 text-left transition-colors hover:bg-slate-50"
                 >
                    <div className="w-16 h-16 bg-slate-200 rounded-lg shrink-0 overflow-hidden relative">
                       <img src={`https://placehold.co/150x150/e2e8f0/1e293b?text=${item.id}`} className="w-full h-full object-cover" alt="thumb"/>
                       {item.status === 'Rejected' && <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center"><X size={20} className="text-white"/></div>}
                    </div>
                    <div className="flex-1 min-w-0">
                       <div className="flex justify-between items-start">
                          <h4 className="font-bold text-slate-800 truncate pr-2">{item.title}</h4>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.statusColor}`}>{item.status}</span>
                       </div>
                       <p className="text-xs text-slate-400 mt-0.5">{item.date}</p>
                       {item.note && <p className="text-[10px] text-red-500 mt-1 font-medium flex items-center gap-1"><Shield size={10}/> {item.note}</p>}
                    </div>
                    <ChevronRight size={16} className="text-slate-300 self-center"/>
                 </button>
               ))}
            </div>
        </div>
      )}

      {/* DETAIL OVERLAY (HCI: Visibility of Status - explaining WHY) */}
      {screen === 'uploadDetail' && selectedUpload && (
          <div className="absolute inset-0 bg-white z-20 flex flex-col animate-in slide-in-from-right">
              <div className="p-4 border-b border-slate-100 flex items-center gap-2">
                  <button onClick={() => setScreen('uploads')} className="p-2 -ml-2 rounded-full hover:bg-slate-100"><ChevronLeft size={24} className="text-slate-800"/></button>
                  <h2 className="font-bold text-lg">Submission Details</h2>
              </div>
              <div className="p-6">
                  <div className="w-full aspect-video bg-slate-200 rounded-xl mb-6 overflow-hidden">
                      <img src={`https://placehold.co/600x400/e2e8f0/1e293b?text=${selectedUpload.id}`} className="w-full h-full object-cover" alt="Detail"/>
                  </div>
                  <div className="mb-4">
                      <h1 className="text-2xl font-bold text-slate-900">{selectedUpload.title}</h1>
                      <div className="flex items-center gap-1 text-slate-500 text-sm mt-1">
                          <MapPin size={14} />
                          <span>{selectedUpload.location || "Location Unknown"}</span>
                      </div>
                      <p className="text-slate-400 text-xs mt-1">{selectedUpload.date}</p>
                  </div>
                  <div className={`p-4 rounded-xl border mb-6 ${selectedUpload.status === 'Rejected' ? 'bg-red-50 border-red-100' : 'bg-slate-50 border-slate-100'}`}>
                      <div className="text-xs font-bold uppercase mb-1 tracking-wider opacity-70">Current Status</div>
                      <div className={`text-lg font-bold flex items-center gap-2 ${selectedUpload.status === 'Rejected' ? 'text-red-700' : selectedUpload.status === 'Validated' ? 'text-green-700' : 'text-orange-600'}`}>
                          {selectedUpload.status === 'Rejected' ? <X size={20}/> : selectedUpload.status === 'Validated' ? <CheckCircle size={20}/> : <Loader size={20}/>}
                          {selectedUpload.status}
                      </div>
                      <div className="mt-3 pt-3 border-t border-black/5 text-sm">
                          <span className="font-bold">Curator Note:</span> {selectedUpload.notes}
                      </div>
                  </div>
                  {selectedUpload.status === 'Rejected' && (
                      <button className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold">Edit & Resubmit</button>
                  )}
              </div>
          </div>
      )}

      {screen === 'profile' && (
        <div className="p-6 h-full overflow-y-auto pb-24">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-900 font-bold text-xl">EG</div>
            <div><h2 className="text-xl font-bold">Elena G.</h2><p className="text-slate-500 text-xs">Scout Lvl 5</p></div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-8 text-center">
             <div className="bg-white p-3 rounded-xl shadow-sm"><div className="font-bold text-xl">124</div><div className="text-[10px] text-slate-500 uppercase">Uploads</div></div>
             <div className="bg-white p-3 rounded-xl shadow-sm"><div className="font-bold text-xl">12</div><div className="text-[10px] text-slate-500 uppercase">Badges</div></div>
             <div className="bg-white p-3 rounded-xl shadow-sm"><div className="font-bold text-xl">4.5k</div><div className="text-[10px] text-slate-500 uppercase">Points</div></div>
          </div>

          <h3 className="font-bold text-slate-800 mb-4 text-sm uppercase tracking-wider">Account</h3>
          
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden mb-6">
            {[
              { icon: User, label: "Personal Information", action: () => {} },
              { icon: Lock, label: "Password & Security", action: () => {} },
              { icon: Bell, label: "Notifications", action: () => {} },
              { icon: Shield, label: "Privacy Settings", action: () => {} },
            ].map((item, i) => (
                <button key={i} className="w-full flex items-center justify-between p-4 border-b border-slate-50 last:border-none hover:bg-slate-50 active:bg-slate-100">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-100 rounded-lg text-slate-600"><item.icon size={18}/></div>
                        <span className="text-sm font-medium text-slate-700">{item.label}</span>
                    </div>
                    <ChevronRight size={16} className="text-slate-300"/>
                </button>
            ))}
          </div>

          <h3 className="font-bold text-slate-800 mb-4 text-sm uppercase tracking-wider">Support</h3>
          
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
             <button className="w-full flex items-center justify-between p-4 border-b border-slate-50 hover:bg-slate-50 active:bg-slate-100">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600"><Info size={18}/></div>
                    <span className="text-sm font-medium text-slate-700">Help Center</span>
                </div>
                <ChevronRight size={16} className="text-slate-300"/>
            </button>
             <button className="w-full flex items-center justify-between p-4 hover:bg-red-50 active:bg-red-100 group">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-50 rounded-lg text-red-500 group-hover:bg-red-100"><LogOut size={18}/></div>
                    <span className="text-sm font-medium text-red-600">Log Out</span>
                </div>
            </button>
          </div>
        </div>
      )}

      {screen === 'contests' && (
        <div className="p-6 pt-12 pb-24 overflow-y-auto h-full">
            <h2 className="text-2xl font-bold mb-6">Contests</h2>
            
            {/* My Contests Section */}
            {myContests.length > 0 && (
                <div className="mb-8">
                    <h3 className="text-sm font-bold text-slate-500 uppercase mb-3 px-1">My Contests</h3>
                    {myContests.map(c => renderContestCard(c, true))}
                </div>
            )}

            {/* Available Section */}
            <div>
                <h3 className="text-sm font-bold text-slate-500 uppercase mb-3 px-1">Available</h3>
                {availableContests.length > 0 ? (
                    availableContests.map(c => renderContestCard(c, false))
                ) : (
                    <div className="text-center py-8 text-slate-400 text-sm">No new contests available.</div>
                )}
            </div>

            {/* JOIN MODAL */}
            {contestToJoin && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in">
                    <div className="bg-white rounded-2xl p-6 shadow-2xl w-full max-w-sm">
                        <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mb-4 mx-auto">
                            <Flag size={24} />
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-center text-slate-900">Join Contest?</h3>
                        <p className="text-slate-600 mb-6 text-center text-sm">
                            Are you sure you want to join <b>{contestToJoin.title}</b>? This will add it to your active campaigns list.
                        </p>
                        <div className="flex gap-3">
                            <button 
                                onClick={() => setContestToJoin(null)} 
                                className="flex-1 py-3 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={confirmJoinContest} 
                                className="flex-1 py-3 rounded-xl font-bold text-white bg-indigo-900 hover:bg-indigo-800 shadow-lg shadow-indigo-200"
                            >
                                Yes, Join
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
      )}

      {screen !== 'upload1' && screen !== 'upload2' && screen !== 'success' && <BottomNav />}
    </div>
  );
};

// --- 2. CURATOR VIEW (Management Mobile) ---
const CuratorView = () => {
  const [view, setView] = useState('dashboard'); // 'dashboard' | 'data' | 'settings' | 'contest-detail' | 'submission-detail'
  const [selectedItem, setSelectedItem] = useState(null); // stores current contest or submission object
  const [showNewCampaignModal, setShowNewCampaignModal] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [isAssistantVisible, setIsAssistantVisible] = useState(true);
  
  // Form State
  const [campaignName, setCampaignName] = useState('');
  const [campaignDescription, setCampaignDescription] = useState('');
  const [campaignStartDate, setCampaignStartDate] = useState('');
  const [campaignEndDate, setCampaignEndDate] = useState('');

  const [toast, setToast] = useState(null);

  // Auto-dismiss toast
  useEffect(() => {
    if (toast) {
        const timer = setTimeout(() => setToast(null), 3000);
        return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleCreateCampaign = () => {
      setToast({ message: `Contest "${campaignName}" Created` });
      setShowNewCampaignModal(false);
      setCampaignName('');
      setCampaignDescription('');
      setCampaignStartDate('');
      setCampaignEndDate('');
  };

  const isFormValid = campaignName && campaignDescription && campaignStartDate && campaignEndDate;

  const handleContestClick = (contest) => {
      setSelectedItem(contest);
      setView('contest-detail');
  };

  const handleSubmissionClick = (sub) => {
      setSelectedItem(sub);
      setView('submission-detail');
  };

  const toggleAssistant = () => {
      if (!isAssistantVisible) setIsAssistantVisible(true);
      else setShowHelp(true);
  };

  // --- Screens ---

  const DashboardScreen = () => (
      <div className="space-y-4">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                <BarChart3 size={20} className="text-indigo-500 mb-2"/>
                <div className="text-2xl font-bold text-slate-800">12.8k</div>
                <div className="text-[10px] text-slate-400 uppercase">Total Assets</div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                <Users size={20} className="text-green-500 mb-2"/>
                <div className="text-2xl font-bold text-slate-800">3,204</div>
                <div className="text-[10px] text-slate-400 uppercase">Contributors</div>
            </div>
        </div>

        {/* Action Required */}
        <div className="bg-orange-50 border border-orange-100 p-4 rounded-xl">
            <h3 className="font-bold text-orange-800 text-sm flex items-center gap-2">
                <Shield size={16}/> Attention Needed
            </h3>
            <p className="text-xs text-orange-700 mt-1 mb-3">142 submissions are pending expert review for more than 48 hours.</p>
            <button className="w-full bg-white text-orange-700 border border-orange-200 text-xs font-bold py-2 rounded-lg">Notify Experts</button>
        </div>

        {/* Manage Contests */}
        <div>
            <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-slate-800 text-sm">Active Contests</h3>
                <button onClick={() => setShowNewCampaignModal(true)} className="text-indigo-600 text-xs font-bold bg-indigo-50 px-2 py-1 rounded hover:bg-indigo-100">+ New</button>
            </div>
            {CAMPAIGNS.map(c => (
                <div 
                    key={c.id} 
                    onClick={() => handleContestClick(c)}
                    className="bg-white p-3 mb-2 rounded-xl shadow-sm flex justify-between items-center border-l-4 cursor-pointer hover:bg-slate-50 transition-colors" 
                    style={{borderLeftColor: c.color}}
                >
                    <div>
                        <div className="font-bold text-sm text-slate-900">{c.title}</div>
                        <div className="text-[10px] text-slate-500">{c.deadline}</div>
                    </div>
                    <ChevronRight size={16} className="text-slate-300"/>
                </div>
            ))}
        </div>
      </div>
  );

  const DataScreen = () => (
      <div className="space-y-4">
          <h3 className="font-bold text-slate-800 text-lg">Data Management</h3>
          <p className="text-sm text-slate-500 mb-4">Select a contest to manage its submissions.</p>
          
          <div className="space-y-3">
              {CAMPAIGNS.map(c => {
                  const subCount = MOCK_SUBMISSIONS.filter(s => s.contestId === c.id).length;
                  return (
                    <div 
                        key={c.id} 
                        onClick={() => handleContestClick(c)}
                        className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex justify-between items-center cursor-pointer hover:bg-slate-50 active:scale-[0.99] transition-all"
                    >
                        <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-${c.color === 'orange' ? 'orange' : c.color === 'blue' ? 'blue' : 'slate'}-100 text-${c.color === 'orange' ? 'orange' : c.color === 'blue' ? 'blue' : 'slate'}-600`}>
                                <Flag size={20}/>
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900">{c.title}</h4>
                                <div className="text-xs text-slate-500 flex items-center gap-2">
                                    <span>{subCount} Submissions</span>
                                    <span>•</span>
                                    <span>{c.deadline}</span>
                                </div>
                            </div>
                        </div>
                        <ChevronRight size={20} className="text-slate-300"/>
                    </div>
                  );
              })}
          </div>
      </div>
  );

  const ContestDetailScreen = () => {
      const contestSubmissions = MOCK_SUBMISSIONS.filter(s => s.contestId === selectedItem?.id);
      
      return (
        <div className="space-y-6">
            <button onClick={() => setView('dashboard')} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 text-xs font-bold uppercase tracking-wider mb-2">
                <ArrowLeft size={14}/> Back to Dashboard
            </button>
            
            <div className={`bg-white p-6 rounded-2xl shadow-sm border-l-4`} style={{borderLeftColor: selectedItem.color}}>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">{selectedItem.title}</h2>
                <div className="flex gap-2 mb-4">
                    <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded font-medium">{selectedItem.deadline}</span>
                    <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded font-medium">{contestSubmissions.length} Submissions</span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{selectedItem.description}</p>
                <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 gap-4">
                    <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase">Dates</div>
                        <div className="text-sm font-medium text-slate-800">{selectedItem.dates}</div>
                    </div>
                    <div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase">Goal</div>
                        <div className="text-sm font-medium text-slate-800">{selectedItem.purpose}</div>
                    </div>
                </div>
            </div>

            <div>
                <h3 className="font-bold text-slate-800 mb-3 text-sm uppercase tracking-wider">Contest Submissions</h3>
                <div className="space-y-3">
                    {contestSubmissions.length > 0 ? contestSubmissions.map(sub => (
                        <div key={sub.id} onClick={() => handleSubmissionClick(sub)} className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 flex gap-3 cursor-pointer hover:bg-slate-50">
                            <div className="w-12 h-12 bg-slate-200 rounded-lg shrink-0 overflow-hidden">
                                <img src={sub.img} className="w-full h-full object-cover" alt="thumb"/>
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-sm text-slate-800">{sub.title}</h4>
                                <div className="text-xs text-slate-500">{sub.date}</div>
                            </div>
                            <ChevronRight size={16} className="text-slate-300 self-center"/>
                        </div>
                    )) : (
                        <div className="text-center py-8 text-slate-400 text-sm bg-white rounded-xl border border-dashed border-slate-200">No submissions yet.</div>
                    )}
                </div>
            </div>
        </div>
      );
  };

  const SubmissionDetailScreen = () => (
      <div className="h-full flex flex-col">
          <div className="flex items-center gap-2 mb-4">
             <button onClick={() => setView(selectedItem.contestId ? 'contest-detail' : 'data')} className="p-2 -ml-2 rounded-full hover:bg-slate-200">
                 <ArrowLeft size={20} className="text-slate-600"/>
             </button>
             <h3 className="font-bold text-slate-800">Submission Details</h3>
          </div>
          
          <div className="flex-1 overflow-y-auto">
              <div className="w-full aspect-square bg-black rounded-2xl overflow-hidden mb-4 shadow-md relative group">
                  <img src={selectedItem.img} className="w-full h-full object-contain" alt="Full view"/>
                  <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-md">Original Res</div>
              </div>
              
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 space-y-4">
                  <div>
                      <span className={`inline-block px-2 py-1 rounded text-xs font-bold mb-2 ${selectedItem.status === 'Validated' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                          {selectedItem.status}
                      </span>
                      <h2 className="text-xl font-bold text-slate-900">{selectedItem.title}</h2>
                      <div className="flex items-center gap-1 text-slate-500 text-sm mt-1">
                          <MapPin size={14}/> {selectedItem.loc}
                      </div>
                  </div>
                  
                  <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-4 text-sm">
                      <div>
                          <div className="text-slate-400 text-xs uppercase font-bold">Date</div>
                          <div className="text-slate-800 font-medium">{selectedItem.date}</div>
                      </div>
                      <div>
                          <div className="text-slate-400 text-xs uppercase font-bold">Contributor</div>
                          <div className="text-slate-800 font-medium">User_249</div>
                      </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                      <div className="text-slate-400 text-xs uppercase font-bold mb-2">Expert Notes</div>
                      <p className="text-sm text-slate-600 italic bg-slate-50 p-3 rounded-lg">
                          "Preliminary assessment suggests 3rd-century origin. Needs physical inspection."
                      </p>
                  </div>
              </div>
          </div>
      </div>
  );

  return (
    <div className="h-full flex flex-col bg-slate-100 relative">
      {toast && <Toast message={toast.message} onClose={() => setToast(null)} />}
      {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}
      {isAssistantVisible && <DraggableFloatingAssistant onClick={() => setShowHelp(true)} onDismiss={() => setIsAssistantVisible(false)} />}

      {/* Header */}
      <div className="bg-white p-6 pb-4 border-b border-slate-200">
        <div className="flex justify-between items-center">
             <div>
                <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Curator Mode</div>
                <h2 className="text-xl font-bold text-slate-900">
                    {view === 'dashboard' ? 'Dashboard' : view === 'data' ? 'Data Overview' : view === 'settings' ? 'Settings' : 'Details'}
                </h2>
             </div>
             <div className="flex items-center gap-2">
                 <button onClick={toggleAssistant} className="text-slate-400 hover:text-indigo-600 transition-colors">
                    <CircleHelp size={20} className={!isAssistantVisible ? "text-indigo-600" : ""} />
                 </button>
                 <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-800 font-bold text-xs">MK</div>
             </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4">
          {view === 'dashboard' && <DashboardScreen />}
          {view === 'data' && <DataScreen />}
          {view === 'contest-detail' && <ContestDetailScreen />}
          {view === 'submission-detail' && <SubmissionDetailScreen />}
          {view === 'settings' && (
              <div className="text-center py-10 text-slate-400">
                  <Settings size={48} className="mx-auto mb-4 opacity-20"/>
                  <p className="text-sm">Global System Settings</p>
                  <p className="text-xs mt-2 text-slate-300">Version 1.0.4</p>
              </div>
          )}
      </div>

      {/* Bottom Nav */}
      <div className="h-16 bg-white border-t border-slate-200 flex justify-around items-center rounded-b-[2.5rem]">
        <button onClick={() => setView('dashboard')} className={`flex flex-col items-center ${view === 'dashboard' || view === 'contest-detail' ? 'text-indigo-900' : 'text-slate-400'}`}>
            <LayoutDashboard size={20}/>
            <span className="text-[10px] mt-1">Overview</span>
        </button>
        <button onClick={() => setView('data')} className={`flex flex-col items-center ${view === 'data' || view === 'submission-detail' ? 'text-indigo-900' : 'text-slate-400'}`}>
            <FileText size={20}/>
            <span className="text-[10px] mt-1">Data</span>
        </button>
        <button onClick={() => setView('settings')} className={`flex flex-col items-center ${view === 'settings' ? 'text-indigo-900' : 'text-slate-400'}`}>
            <Settings size={20}/>
            <span className="text-[10px] mt-1">Settings</span>
        </button>
      </div>

      {/* New Contest Modal */}
      {showNewCampaignModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in">
            <div className="bg-white rounded-2xl p-6 shadow-2xl w-full max-w-sm max-h-[80%] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-slate-900">New Contest</h3>
                    <button onClick={() => setShowNewCampaignModal(false)}><X size={20} className="text-slate-400"/></button>
                </div>
                
                <div className="space-y-4">
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase">Title <span className="text-red-500">*</span></label>
                        <input 
                            type="text" 
                            className="w-full mt-1 p-3 rounded-lg border border-slate-300 text-sm"
                            placeholder="e.g. Summer Architecture"
                            value={campaignName}
                            onChange={(e) => setCampaignName(e.target.value)}
                        />
                    </div>
                    
                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase">Description <span className="text-red-500">*</span></label>
                        <textarea 
                            className="w-full mt-1 p-3 rounded-lg border border-slate-300 text-sm resize-none"
                            rows={3}
                            placeholder="Describe the goal of this contest..."
                            value={campaignDescription}
                            onChange={(e) => setCampaignDescription(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase">Start Date <span className="text-red-500">*</span></label>
                            <input 
                                type="date" 
                                className="w-full mt-1 p-2 rounded-lg border border-slate-300 text-sm"
                                value={campaignStartDate}
                                onChange={(e) => setCampaignStartDate(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase">End Date <span className="text-red-500">*</span></label>
                            <input 
                                type="date" 
                                className="w-full mt-1 p-2 rounded-lg border border-slate-300 text-sm"
                                value={campaignEndDate}
                                onChange={(e) => setCampaignEndDate(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-bold text-slate-500 uppercase">Theme Color</label>
                        <div className="flex gap-2 mt-1">
                            <div className="w-6 h-6 rounded-full bg-orange-500 cursor-pointer ring-2 ring-offset-1 ring-orange-200"></div>
                            <div className="w-6 h-6 rounded-full bg-blue-500 cursor-pointer opacity-50"></div>
                            <div className="w-6 h-6 rounded-full bg-green-500 cursor-pointer opacity-50"></div>
                        </div>
                    </div>
                    <button 
                        onClick={handleCreateCampaign}
                        disabled={!isFormValid}
                        className="w-full bg-indigo-900 text-white py-3 rounded-xl font-bold mt-2 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                    >
                        Launch Contest
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

// --- 3. EXPERT VIEW (Review Queue Mobile) ---
const ExpertView = () => {
  const [tab, setTab] = useState('queue'); // 'queue' | 'history'
  const [index, setIndex] = useState(0);
  const [history, setHistory] = useState([]); // Array of { submission, decision, date, comment }
  const [aiReport, setAiReport] = useState(null);
  const [loadingAI, setLoadingAI] = useState(false);
  const [lastAction, setLastAction] = useState(null); // For Undo
  const [toast, setToast] = useState(null);
  const [viewHistoryItem, setViewHistoryItem] = useState(null); // View item details from history
  const [showHelp, setShowHelp] = useState(false);
  const [isAssistantVisible, setIsAssistantVisible] = useState(true);
  
  // Modal State
  const [actionModal, setActionModal] = useState(null); // 'approve' | 'reject' | null
  const [actionComment, setActionComment] = useState('');

  // Auto-dismiss toast
  useEffect(() => {
    if (toast) {
        const timer = setTimeout(() => setToast(null), 3000);
        return () => clearTimeout(timer);
    }
  }, [toast]);
  
  const currentItem = MOCK_SUBMISSIONS[index % MOCK_SUBMISSIONS.length];

  useEffect(() => { setAiReport(null); }, [index]);

  const initiateAction = (type) => {
      setActionModal(type);
      setActionComment('');
  };

  const handleSkip = () => {
      handleNext('skip');
  };

  const handleNext = (actionType) => {
      // Add to history
      const decisionItem = {
          ...currentItem,
          decision: actionType,
          comment: actionComment,
          reviewDate: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      };
      setHistory([decisionItem, ...history]);

      setLastAction({ type: actionType, itemIndex: index });
      setIndex(prev => prev + 1);
      
      // Toast handles Undo for all actions including skip
      setToast({ 
          message: actionType === 'approve' ? "Submission Approved" : actionType === 'reject' ? "Submission Rejected" : "Skipped",
          action: 'Undo'
      });
  };

  const finalizeAction = () => {
      if (!actionComment.trim()) return; // validation

      const actionType = actionModal;
      // Add to history & advance immediately
      const decisionItem = {
          ...currentItem,
          decision: actionType,
          comment: actionComment,
          reviewDate: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      };
      setHistory([decisionItem, ...history]);
      setLastAction({ type: actionType, itemIndex: index }); 
      
      // Close modal and move next
      setActionModal(null);
      setIndex(prev => prev + 1);
      
      // Show confirmation toast
      setToast({ 
          message: actionType === 'approve' ? "Submission Approved" : "Submission Rejected",
          action: 'Undo'
      });
  };

  const handleUndo = () => {
      if (lastAction) {
          setIndex(lastAction.itemIndex);
          setLastAction(null);
          setToast(null);
          // Remove the last added item from history to keep it in sync
          setHistory(prev => prev.slice(1));
      }
  };

  const generateReport = async () => {
    setLoadingAI(true);
    const prompt = `Analyze this heritage submission as an expert.
        Title: "${currentItem.title}" Location: "${currentItem.loc}"
        Provide JSON: { "significance": "1 sentence", "era": "Time period", "action": "Recommendation" }`;
    
    const txt = await callGemini(prompt);
    try {
        const clean = txt.replace(/```json/g, '').replace(/```/g, '');
        setAiReport(JSON.parse(clean));
    } catch (e) {
        setAiReport({ significance: "Analysis failed.", era: "?", action: "Review Manually" });
    }
    setLoadingAI(false);
  };

  const handleHistoryItemClick = (item) => {
      setViewHistoryItem(item);
      setTab('queue');
  };

  const handleBackToHistory = () => {
      setViewHistoryItem(null);
      setTab('history');
  };

  const handleTabChange = (newTab) => {
      setTab(newTab);
      if (newTab === 'queue') {
          setViewHistoryItem(null);
      }
  };

  const toggleAssistant = () => {
      if (!isAssistantVisible) setIsAssistantVisible(true);
      else setShowHelp(true);
  };

  // --- Screens ---

  const QueueScreen = () => {
      const isHistoryView = !!viewHistoryItem;
      const displayItem = isHistoryView ? viewHistoryItem : currentItem;

      return (
      <div className="flex-1 overflow-y-auto p-4 flex flex-col h-full">
         {/* Status Banner for History Items */}
         {isHistoryView && (
             <div className={`mb-4 px-4 py-2 rounded-lg font-bold text-center text-sm uppercase tracking-wider ${
                 displayItem.decision === 'approve' ? 'bg-green-500/20 text-green-400 border border-green-500/50' : 
                 displayItem.decision === 'reject' ? 'bg-red-500/20 text-red-400 border border-red-500/50' : 
                 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50'
             }`}>
                 Decision: {displayItem.decision}
             </div>
         )}

         {/* Main Card */}
         <div className="flex-1 flex flex-col">
             {/* Image */}
             <div className="bg-black rounded-xl overflow-hidden shadow-lg border border-slate-700 relative aspect-square mb-4 shrink-0">
                 <img src={displayItem.img} className="w-full h-full object-cover" alt="Artifact" />
                 <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 pt-12">
                     <h2 className="text-2xl font-bold">{displayItem.title}</h2>
                     <div className="flex items-center gap-1 text-slate-300 text-sm"><MapPin size={14}/> {displayItem.loc}</div>
                 </div>
             </div>

             {/* AI Analysis Button/Card - Only show if not history view (or maybe allow it?) */}
             {!isHistoryView && (
             <div className="mb-4 shrink-0">
                 {!aiReport ? (
                     <button 
                        onClick={generateReport}
                        disabled={loadingAI}
                        className="w-full py-3 bg-indigo-600/20 border border-indigo-500/50 rounded-xl text-indigo-300 font-bold text-sm flex items-center justify-center gap-2 hover:bg-indigo-600/30 transition-colors"
                     >
                        {loadingAI ? <Loader size={16} className="animate-spin"/> : <Sparkles size={16}/>}
                        Generate AI Analysis
                     </button>
                 ) : (
                     <div className="bg-indigo-900/40 border border-indigo-500/30 p-4 rounded-xl space-y-2 text-sm animate-in fade-in slide-in-from-top-2">
                         <div className="flex items-start gap-2">
                             <Sparkles size={14} className="text-indigo-400 mt-1 shrink-0"/>
                             <p className="text-indigo-100">{aiReport.significance}</p>
                         </div>
                         <div className="flex gap-4 mt-2 pt-2 border-t border-indigo-500/20">
                             <div><span className="text-[10px] text-indigo-400 uppercase">Era</span><div className="font-bold">{aiReport.era}</div></div>
                             <div><span className="text-[10px] text-indigo-400 uppercase">Action</span><div className="font-bold text-orange-300">{aiReport.action}</div></div>
                         </div>
                     </div>
                 )}
             </div>
             )}

             {/* Details */}
             <div className="bg-slate-800 p-4 rounded-xl space-y-3 mb-4 shrink-0">
                 <div><span className="text-xs text-slate-500 uppercase font-bold">User Notes</span><p className="text-sm text-slate-300">Found near the old market. Water damage visible.</p></div>
                 <div className="flex gap-2">
                     <span className="bg-slate-700 px-2 py-1 rounded text-xs">Architecture</span>
                     <span className="bg-slate-700 px-2 py-1 rounded text-xs">At Risk</span>
                 </div>
                 {isHistoryView && displayItem.comment && (
                     <div className="mt-2 pt-2 border-t border-slate-700">
                         <span className="text-xs text-slate-500 uppercase font-bold">Your Notes</span>
                         <p className="text-sm text-slate-300 italic">"{displayItem.comment}"</p>
                     </div>
                 )}
             </div>
         </div>

         {/* Floating Action Bar */}
         <div className="h-16 bg-slate-800/90 backdrop-blur-md rounded-2xl border border-slate-700 flex items-center justify-between px-6 shadow-2xl shrink-0 mt-auto">
              {isHistoryView ? (
                  <button onClick={handleBackToHistory} className="w-full flex items-center justify-center gap-2 text-slate-300 font-bold hover:text-white">
                      <ArrowLeft size={20} /> Back to History
                  </button>
              ) : (
                  <>
                    {/* HCI: Undo Button (User Control) */}
                    <button onClick={handleUndo} disabled={!lastAction} className={`w-12 h-12 flex items-center justify-center rounded-full transition-colors ${lastAction ? 'text-slate-300 bg-slate-700/50' : 'text-slate-600 bg-slate-800/50'}`}>
                        <RotateCcw size={20}/>
                    </button>
                    
                    <div className="flex gap-6">
                        <button onClick={() => initiateAction('reject')} className="w-14 h-14 bg-red-500/20 text-red-500 rounded-full border border-red-500/50 flex items-center justify-center active:scale-95 transition-transform"><X size={28}/></button>
                        <button onClick={() => initiateAction('approve')} className="w-14 h-14 bg-green-500/20 text-green-500 rounded-full border border-green-500/50 flex items-center justify-center active:scale-95 transition-transform"><Check size={28}/></button>
                    </div>
                    
                    {/* Skip Button */}
                    <button onClick={handleSkip} className="w-12 h-12 flex items-center justify-center text-yellow-500 bg-slate-700/50 rounded-full hover:bg-slate-700 transition-colors">
                        <SkipForward size={20}/>
                    </button>
                  </>
              )}
         </div>
      </div>
      );
  };

  const HistoryScreen = () => (
      <div className="p-4 overflow-y-auto flex-1">
          <h3 className="font-bold text-slate-400 text-xs uppercase tracking-wider mb-4 sticky top-0 bg-slate-900 py-2 z-10">Session History</h3>
          {history.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-slate-500">
                  <History size={48} className="mb-4 opacity-20"/>
                  <p>No reviews yet.</p>
                  <p className="text-xs mt-1">Items you process will appear here.</p>
              </div>
          ) : (
              <div className="space-y-3">
                  {history.map((item, i) => (
                      <div 
                        key={i} 
                        onClick={() => handleHistoryItemClick(item)}
                        className="bg-slate-800 p-3 rounded-xl border border-slate-700 flex flex-col gap-2 animate-in slide-in-from-left-2 fade-in duration-300 cursor-pointer hover:bg-slate-700 active:scale-[0.98] transition-all" 
                        style={{animationDelay: `${i * 50}ms`}}
                      >
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-black rounded-lg overflow-hidden shrink-0">
                                <img src={item.img} className="w-full h-full object-cover" alt="thumb"/>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                    <h4 className="font-bold text-slate-200 text-sm truncate pr-2">{item.title}</h4>
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase shrink-0 ${
                                        item.decision === 'approve' ? 'bg-green-900/30 text-green-400' : 
                                        item.decision === 'reject' ? 'bg-red-900/30 text-red-400' : 'bg-yellow-900/30 text-yellow-400'
                                    }`}>
                                        {item.decision}
                                    </span>
                                </div>
                                <div className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                                    <span>ID: #{item.id}</span>
                                    <span>•</span>
                                    <span>{item.reviewDate}</span>
                                </div>
                            </div>
                            <ChevronRight size={16} className="text-slate-500" />
                          </div>
                          {item.comment && (
                              <div className="text-xs text-slate-400 bg-slate-900/50 p-2 rounded-lg border border-slate-700/50 italic">
                                  "{item.comment}"
                              </div>
                          )}
                      </div>
                  ))}
              </div>
          )}
      </div>
  );

  return (
    <div className="h-full flex flex-col bg-slate-900 text-white relative">
      {/* HCI: Toast with Undo (User Control & Freedom) */}
      {toast && <Toast message={toast.message} onClose={() => setToast(null)} actionLabel="Undo" onAction={handleUndo} />}
      {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}
      {isAssistantVisible && <DraggableFloatingAssistant onClick={() => setShowHelp(true)} onDismiss={() => setIsAssistantVisible(false)} />}

      {/* Top Bar */}
      <div className="h-14 flex items-center justify-between px-4 border-b border-slate-800 bg-slate-900 z-10">
         <span className="font-bold text-indigo-400 text-sm tracking-wider">
             {tab === 'queue' ? (viewHistoryItem ? 'REVIEW DETAILS' : 'EXPERT QUEUE') : 'REVIEW HISTORY'}
         </span>
         <div className="flex items-center gap-3">
             {tab === 'queue' && !viewHistoryItem && <span className="text-xs text-slate-400">ID: #{currentItem.id}4920</span>}
             <button onClick={toggleAssistant} className="text-slate-400 hover:text-indigo-400 transition-colors">
                <CircleHelp size={20} className={!isAssistantVisible ? "text-indigo-600" : ""} />
             </button>
         </div>
      </div>

      {/* Content Area */}
      {tab === 'queue' ? <QueueScreen /> : <HistoryScreen />}

      {/* Bottom Nav */}
      <div className="h-16 bg-slate-800 border-t border-slate-700 flex justify-around items-center rounded-b-[2.5rem] shrink-0 z-20">
        <button onClick={() => handleTabChange('queue')} className={`flex flex-col items-center w-1/2 ${tab === 'queue' && !viewHistoryItem ? 'text-indigo-400' : 'text-slate-500'}`}>
            <Layers size={20}/>
            <span className="text-[10px] mt-1 font-bold">Queue</span>
        </button>
        <button onClick={() => handleTabChange('history')} className={`flex flex-col items-center w-1/2 ${tab === 'history' ? 'text-indigo-400' : 'text-slate-500'}`}>
            <History size={20}/>
            <span className="text-[10px] mt-1 font-bold">History</span>
        </button>
      </div>

      {/* Action Modal */}
      {actionModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6 animate-in fade-in">
            <div className={`w-full max-w-sm bg-slate-800 rounded-2xl border-2 p-6 shadow-2xl ${actionModal === 'approve' ? 'border-green-500/30' : 'border-red-500/30'}`}>
                <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-white mb-2">Are you sure?</h3>
                    <p className="text-slate-400 text-sm">
                        Do you really want to <span className={`font-bold ${actionModal === 'approve' ? 'text-green-400' : 'text-red-400'}`}>{actionModal}</span> this submission?
                    </p>
                </div>

                <div className="mb-6">
                    <label className="text-xs font-bold text-slate-500 uppercase block mb-2">
                        {actionModal === 'approve' ? "Curator Notes (Required)" : "Reason for Rejection (Required)"}
                    </label>
                    <textarea 
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-white resize-none focus:outline-none focus:border-indigo-500"
                        rows={3}
                        placeholder={actionModal === 'approve' ? "e.g., Good quality, verified location..." : "e.g., Blurry image, wrong location..."}
                        value={actionComment}
                        onChange={(e) => setActionComment(e.target.value)}
                    ></textarea>
                </div>

                <div className="flex gap-3">
                    <button 
                        onClick={() => setActionModal(null)}
                        className="flex-1 py-3 rounded-xl font-bold text-slate-400 bg-slate-700 hover:bg-slate-600"
                    >
                        No
                    </button>
                    <button 
                        onClick={finalizeAction}
                        disabled={!actionComment.trim()}
                        className={`flex-1 py-3 rounded-xl font-bold text-white shadow-lg transition-all ${
                            !actionComment.trim() 
                                ? 'bg-slate-600 opacity-50 cursor-not-allowed'
                                : actionModal === 'approve' 
                                    ? 'bg-green-600 hover:bg-green-500 shadow-green-900/20' 
                                    : 'bg-red-600 hover:bg-red-500 shadow-red-900/20'
                        }`}
                    >
                        Yes
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};


// --- APP CONTAINER & ROLE SWITCHER ---
export default function App() {
  const [role, setRole] = useState('contributor'); // contributor, curator, expert

  return (
    <div className="h-screen w-screen bg-[#0f172a] flex flex-col items-center justify-center font-sans">
      
      {/* Role Switcher (Top of screen) */}
      <div className="absolute top-8 z-50 bg-slate-800/90 backdrop-blur rounded-full p-1.5 border border-slate-700 shadow-xl flex gap-1">
        <button 
            onClick={() => setRole('contributor')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${role === 'contributor' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
        >
            <User size={14} /> Contributor
        </button>
        <button 
            onClick={() => setRole('curator')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${role === 'curator' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
        >
            <LayoutDashboard size={14} /> Curator
        </button>
        <button 
            onClick={() => setRole('expert')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${role === 'expert' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
        >
            <CheckCircle size={14} /> Expert
        </button>
      </div>

    {/* Phone Frame (90% scale) */}
    <div className="w-[375px] h-[812px] bg-black rounded-[3rem] border-8 border-slate-900 shadow-2xl relative overflow-hidden mt-[100px] ring-8 ring-slate-800/50">
          {/* Dynamic Notch/Status Bar */}
          <div className="absolute top-0 w-full h-12 z-50 flex justify-between items-center px-6 text-xs font-medium text-white/80 pointer-events-none">
              <span>9:41</span>
              <div className="w-24 h-6 bg-black rounded-b-xl absolute top-0 left-1/2 -translate-x-1/2"></div>
              <div className="flex gap-1.5">
                  <div className="w-4 h-2.5 bg-white/20 rounded-[1px]"></div>
                  <div className="w-4 h-2.5 bg-white/20 rounded-[1px]"></div>
                  <div className="w-4 h-2.5 bg-white rounded-[1px]"></div>
              </div>
          </div>
          
          {/* View Container */}
          <div className="w-full h-full pt-8 bg-white">
              {role === 'contributor' && <ContributorView />}
              {role === 'curator' && <CuratorView />}
              {role === 'expert' && <ExpertView />}
          </div>

          {/* Home Indicator */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-black/20 rounded-full z-50"></div>
      </div>
      
      <p className="mt-8 text-slate-500 text-sm font-medium">Switch roles using the top menu</p>
    </div>
  );
}