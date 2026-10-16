import React, { useState, useEffect } from 'react';
import { 
  Play, Video, Image as ImageIcon, Sparkles, Terminal, Copy, Check, 
  Upload, Wand2, Compass, Layers, Sliders, ArrowUpRight, Cpu, 
  RotateCw, RefreshCw, Film, Volume2, ShieldCheck, Zap, ChevronRight,
  ExternalLink, Info, CheckCircle2, Clapperboard, Palette, Share2, Eye
} from 'lucide-react';

const FEATURED_CAROUSEL = [
  {
    id: "katana",
    title: "Higgsfield Katana",
    subtitle: "Turn your clips into cool edits with one command",
    video: "https://static-public-media.higgsfield.ai/cards/c94a765b-8ad6-4af3-b884-88ea306d79ff.mp4",
    poster: "https://static-public-media.higgsfield.ai/cards/33b14c34-2394-4580-9b88-16b5e6695528.webp",
    model: "katana",
    badge: "New"
  },
  {
    id: "ads-multiplier",
    title: "Ads Studio: Ad Multiplier",
    subtitle: "Recreate ad with your products, characters",
    video: "https://static-public-media.higgsfield.ai/cards/47326e54-4048-4cac-bd7e-600b88e10427.mp4",
    poster: "https://static-public-media.higgsfield.ai/cards/6603d9a7-fdfe-4d27-a49b-a074e3edbe97.webp",
    model: "seedance_2_5",
    badge: "New"
  }
];

const VIRAL_EFFECTS = [
  {
    id: "floating-fall",
    title: "Floating fall",
    img: "https://cdn.higgsfield.ai/viral_hub/151664fa-7f7f-43d6-80fa-4683104a3c02.webp",
    aspect: "aspect-[9/16]",
    prompt: "A stylish subject falling backwards in slow motion through a cloud of iridescent particles, cinematic slow motion, 4k ultra realistic"
  },
  {
    id: "high-flip",
    title: "High flip",
    img: "https://cdn.higgsfield.ai/viral_hub/95cd0d73-4f3c-40d1-ac0b-c8668a99440b.webp",
    aspect: "aspect-[9/16]",
    prompt: "Parkour athlete performing a high backward flip off a concrete rooftop at golden hour, smooth horizontal tracking shot"
  },
  {
    id: "burning-man",
    title: "Burning man",
    img: "https://cdn.higgsfield.ai/viral_hub/a1560137-597c-455a-be9e-9622cccf76a3.webp",
    aspect: "aspect-[3/4]",
    prompt: "A lone festival traveler walking through the desert dust storm at twilight with glowing neon fabric swirling"
  },
  {
    id: "subway-slide",
    title: "Subway slide",
    img: "https://cdn.higgsfield.ai/viral_hub/4a2315f6-57e1-4378-82a5-598ddbbfbbcb.webp",
    aspect: "aspect-[9/16]",
    prompt: "Hyper-stylized camera tracking along an underground retro subway platform as light trails whip past"
  },
  {
    id: "red-flag",
    title: "Red flag",
    img: "https://cdn.higgsfield.ai/viral_hub/05201733-c72f-43ed-8393-8b8cea28b8ce.webp",
    aspect: "aspect-[9/16]",
    prompt: "Cinematic close-up of dynamic fabric billowing against dramatic storm clouds, high temporal coherence"
  },
  {
    id: "kok-boru",
    title: "Kok Boru",
    img: "https://cdn.higgsfield.ai/viral_hub/5354ce11-c68c-45a0-8a97-5aab94f52833.webp",
    aspect: "aspect-[9/16]",
    prompt: "Epic horsemen galloping across the mountain steppe in morning mist, wide cinematic camera angle, 8k textures"
  },
  {
    id: "zephyr",
    title: "ZEPHYR: Special",
    img: "https://cdn.higgsfield.ai/viral_hub/99aa3365-5ae0-4616-9722-ce0dc087607d.webp",
    aspect: "aspect-[9/16]",
    prompt: "Futuristic sci-fi speeder hovering over mirror lake water, subtle ripples and neon heat distortion"
  },
  {
    id: "hell-grind",
    title: "HELL GRIND",
    img: "https://d2ol7oe51mr4n9.cloudfront.net/user_2v5txepAmNYZwyzml1nIizlWURE/df7107b3-1dd6-438a-a168-ed382e2ad901.png",
    aspect: "aspect-[16/9]",
    prompt: "Skateboarder grinding on an iron rail down an endless neon stairwell, sparks flying in slow motion"
  }
];

const COMMUNITY_PROJECTS = [
  {
    title: "If you stop loving me, I'll die",
    author: "Higgsfield Studio",
    avatar: "https://d2ol7oe51mr4n9.cloudfront.net/user_3GNcyaSCltezE7ot4WtRdn0jfo0/4203e91f-4612-411f-a567-36265f8ee8b9.png",
    img: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd2ol7oe51mr4n9.cloudfront.net%2Fuser_3GNcyaSCltezE7ot4WtRdn0jfo0%2F821f8180-f5de-4a1b-b827-57b34a7cbc4d.jpg&w=640&q=85",
    tag: "Public"
  },
  {
    title: "Cully Hill Boys",
    author: "Higgsfield Studio",
    avatar: "https://d2ol7oe51mr4n9.cloudfront.net/user_3GNcyaSCltezE7ot4WtRdn0jfo0/4203e91f-4612-411f-a567-36265f8ee8b9.png",
    img: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd2ol7oe51mr4n9.cloudfront.net%2Fuser_3GNcyaSCltezE7ot4WtRdn0jfo0%2F75d860f8-6dde-45d6-ae81-756ddbfe563e.jpg&w=640&q=85",
    tag: "Public"
  },
  {
    title: "Red Flag",
    author: "Higgsfield Studio",
    avatar: "https://d2ol7oe51mr4n9.cloudfront.net/user_3GNcyaSCltezE7ot4WtRdn0jfo0/4203e91f-4612-411f-a567-36265f8ee8b9.png",
    img: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd2ol7oe51mr4n9.cloudfront.net%2Fuser_3GNcyaSCltezE7ot4WtRdn0jfo0%2Ff6bf4ce5-2a41-45cb-a099-12bdc1e117c1.jpg&w=640&q=85",
    tag: "Public"
  },
  {
    title: "Adiliada",
    author: "Higgsfield Studio",
    avatar: "https://d2ol7oe51mr4n9.cloudfront.net/user_3GNcyaSCltezE7ot4WtRdn0jfo0/4203e91f-4612-411f-a567-36265f8ee8b9.png",
    img: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd2ol7oe51mr4n9.cloudfront.net%2Fuser_3GNcyaSCltezE7ot4WtRdn0jfo0%2F07c550cd-d621-46a1-8cb1-420986027ac9.jpg&w=640&q=85",
    tag: "Public"
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('explore');
  const [copied, setCopied] = useState(false);

  // Video Studio State
  const [selectedModel, setSelectedModel] = useState('seedance_2_5');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [resolution, setResolution] = useState('1080p');
  const [duration, setDuration] = useState(5);
  const [cameraPreset, setCameraPreset] = useState('camera_push');
  const [prompt, setPrompt] = useState('A luxury chronograph watch rotating continuously on an obsidian pedestal, slow cinematic camera push-in towards the subject, light glints over the sapphire crystal, natural and realistic motion');
  const [imageUrl, setImageUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationQueue, setGenerationQueue] = useState([]);
  const [currentOutput, setCurrentOutput] = useState(null);

  // Motion Engine State
  const [peSubject, setPeSubject] = useState('sports car accelerates through the wet tunnel');
  const [peCamera, setPeCamera] = useState('tracking_shot');
  const [peEnv, setPeEnv] = useState('neon reflections and golden rain droplets on the windshield');
  const [peLighting, setPeLighting] = useState('deep violet and amber rim lights casting sharp shadows');
  const [peResult, setPeResult] = useState('');

  // Real-time Motion prompt generation
  useEffect(() => {
    const camDesc = {
      camera_push: "slow cinematic camera push-in towards the subject, subtle parallax on background elements",
      camera_pull: "gentle camera pull-back revealing surrounding environment, smooth steady motion",
      orbit_pan: "slow 45-degree lateral orbit around subject, shallow depth of field, steady tracking",
      tracking_shot: "smooth horizontal tracking shot following primary subject movement",
      drone_sweep: "elevated crane or drone sweep rising slowly with expansive perspective",
      subtle_ambient: "natural subtle breathing motion with handheld stabilization"
    }[peCamera] || "smooth cinematic camera movement";

    const full = `${peSubject.trim()}, ${camDesc}, ${peEnv.trim()}, ${peLighting.trim()}, natural and realistic motion, high temporal coherence`;
    setPeResult(full);
  }, [peSubject, peCamera, peEnv, peLighting]);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    const newJob = {
      id: "req_" + Math.random().toString(36).substring(2, 9),
      model: selectedModel,
      prompt: prompt,
      status: "processing",
      timestamp: new Date().toLocaleTimeString()
    };
    setGenerationQueue(prev => [newJob, ...prev]);

    setTimeout(() => {
      setGenerationQueue(prev => 
        prev.map(j => j.id === newJob.id ? { ...j, status: "completed", url: "https://static-public-media.higgsfield.ai/cards/c94a765b-8ad6-4af3-b884-88ea306d79ff.mp4" } : j)
      );
      setCurrentOutput({
        id: newJob.id,
        model: selectedModel,
        prompt: prompt,
        videoUrl: "https://static-public-media.higgsfield.ai/cards/c94a765b-8ad6-4af3-b884-88ea306d79ff.mp4"
      });
      setIsGenerating(false);
    }, 3200);
  };

  const openInStudio = (presetPrompt, presetModel = 'seedance_2_5') => {
    setPrompt(presetPrompt);
    setSelectedModel(presetModel);
    setActiveTab('video');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyText = (txt) => {
    navigator.clipboard.writeText(txt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#030304] text-[#f5f5f7] flex flex-col font-sans selection:bg-[#ff5c00] selection:text-white">
      
      {/* =========================================================================
          OFFICIAL HIGGSFIELD HEADER
          ========================================================================= */}
      <div id="header" className="sticky top-0 z-50 w-full" style={{ height: '52px' }}>
        <header id="header-visual" className="h-full border-b border-[rgba(255,255,255,0.08)] bg-[#030304]/90 backdrop-blur-md px-4 lg:px-6 flex items-center justify-between">
          <div className="container mx-auto flex h-full items-center justify-between gap-3 max-w-7xl">
            
            {/* Brand Logo & Wordmark */}
            <div className="flex items-center gap-3 shrink-0">
              <button onClick={() => setActiveTab('explore')} className="inline-flex items-center gap-2 group cursor-pointer border-none bg-transparent p-0">
                <span className="hf-logo flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-[#ff3d00] to-[#ff7a29] shadow-[0_0_16px_rgba(255,92,0,0.4)]">
                  <svg className="w-4 h-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M18.3498 9.83713L18.3339 9.65759C18.1831 7.93447 17.0963 4.69261 14.0816 4.69261C11.8445 4.69261 10.1545 6.97097 8.66311 8.97967C7.47302 10.5883 6.4419 11.9683 5.3073 11.9683C5.00574 11.9357 4.61708 11.7805 4.3792 11.4294C4.16497 11.1108 4.10948 10.7026 4.22046 10.2126C4.39489 9.43684 5.39463 8.7182 6.44963 7.95063C7.02864 7.54238 7.6238 7.10955 8.03634 6.69311C9.22643 5.5091 9.82932 4.65164 9.82932 3.2717C9.82932 1.89176 9.09157 1.20565 8.47276 0.911636C7.23514 0.323844 5.41851 0.666781 4.26026 1.69583C4.08583 1.85922 3.91117 2.01418 3.75243 2.16119C2.58622 3.23097 1.80094 3.95781 0 3.40232V5.63972C2.38791 6.72588 4.39512 4.65164 5.15675 3.69633C5.74372 3.06758 6.36253 2.70006 6.82283 2.70006H6.84671C7.05298 2.70825 7.22741 2.78995 7.35454 2.93696C7.56081 3.18204 7.64018 3.46786 7.60038 3.78622C7.51305 4.45594 6.83875 5.23967 5.60113 6.09713C4.14928 7.10159 1.7218 8.78374 1.53122 10.8987C1.3884 12.4177 2.15003 13.9365 3.34012 14.5243C6.11669 15.8798 7.80665 13.5444 9.5994 11.0783C10.9719 9.1756 12.273 7.37103 14.0818 7.37103C15.7081 7.37103 16.311 8.75916 16.311 9.63301V9.80459L16.1523 9.83713C12.2095 10.5558 10.0595 14.3611 10.0595 16.1167C10.0595 17.8724 11.5034 19.375 13.2804 19.375C15.359 19.375 17.9293 17.5458 18.3419 12.4013L18.3578 12.2136H20V9.83737H18.3498V9.83713Z" />
                  </svg>
                </span>
                <span className="font-grotesk font-bold text-lg tracking-tight text-white group-hover:text-[#ff5c00] transition">
                  Higgsfield
                </span>
              </button>
            </div>

            {/* Main Navigation Items (Desktop) */}
            <nav className="hidden md:flex items-center gap-1 overflow-x-auto hide-scrollbar px-2">
              <button 
                onClick={() => setActiveTab('explore')}
                className={`hfnav-item px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition ${activeTab === 'explore' ? 'bg-white/10 text-white font-bold' : 'text-[#92939e] hover:text-white hover:bg-white/5'}`}
              >
                Explore
              </button>
              <button 
                onClick={() => setActiveTab('image')}
                className={`hfnav-item px-3 py-1.5 rounded-lg text-xs font-medium transition ${activeTab === 'image' ? 'bg-white/10 text-white font-bold' : 'text-[#92939e] hover:text-white hover:bg-white/5'}`}
              >
                Image
              </button>
              <button 
                onClick={() => setActiveTab('video')}
                className={`hfnav-item px-3 py-1.5 rounded-lg text-xs font-medium transition ${activeTab === 'video' ? 'bg-white/10 text-[#ff5c00] font-bold' : 'text-[#92939e] hover:text-white hover:bg-white/5'}`}
              >
                Video
              </button>
              <button 
                onClick={() => setActiveTab('audio')}
                className={`hfnav-item px-3 py-1.5 rounded-lg text-xs font-medium transition ${activeTab === 'audio' ? 'bg-white/10 text-white font-bold' : 'text-[#92939e] hover:text-white hover:bg-white/5'}`}
              >
                Audio
              </button>
              <button 
                onClick={() => setActiveTab('mcp')}
                className={`hfnav-item px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition ${activeTab === 'mcp' ? 'bg-white/10 text-[#06b6d4] font-bold' : 'text-[#92939e] hover:text-white hover:bg-white/5'}`}
              >
                MCP <span className="bg-[#22c55e]/20 text-[#4ade80] text-[9px] px-1 py-0.2 rounded font-bold">Ready</span>
              </button>
              <a 
                href="/docs" 
                target="_blank"
                className="hfnav-item px-3 py-1.5 rounded-lg text-xs font-medium text-[#92939e] hover:text-white hover:bg-white/5 flex items-center gap-1"
              >
                API <span className="bg-[#ff5c00]/20 text-[#ff772e] text-[9px] px-1 py-0.2 rounded font-bold">New</span>
              </a>

              <div className="h-3 w-px bg-white/10 mx-1"></div>

              {/* Top Models quick access */}
              <button 
                onClick={() => openInStudio('Genjutsu reality manipulation style', 'genjutsu')}
                className="hfnav-item px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#92939e] hover:text-white hover:bg-white/5 flex items-center gap-1"
              >
                Genjutsu <span className="bg-gradient-to-r from-[#f920d1] to-[#ed1572] text-white text-[9px] px-1 py-0.2 rounded font-bold uppercase -skew-x-6">TOP</span>
              </button>
              <button 
                onClick={() => openInStudio('Katana action edit clip', 'katana')}
                className="hfnav-item px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#92939e] hover:text-white hover:bg-white/5 flex items-center gap-1"
              >
                Katana <span className="bg-[#ff5c00]/20 text-[#ff772e] text-[9px] px-1 py-0.2 rounded font-bold">New</span>
              </button>
              <button 
                onClick={() => openInStudio('High fashion AI influencer studio portrait with motion', 'nano_banana_2')}
                className="hfnav-item px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#92939e] hover:text-white hover:bg-white/5 flex items-center gap-1"
              >
                AI Influencer <span className="bg-[#ff5c00]/20 text-[#ff772e] text-[9px] px-1 py-0.2 rounded font-bold">New</span>
              </button>
              <button 
                onClick={() => setActiveTab('mcp')}
                className="hfnav-item px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#92939e] hover:text-white hover:bg-white/5 animate-pulse"
              >
                ChatGPT Plugin
              </button>
            </nav>

            {/* Right Action buttons */}
            <div className="flex items-center gap-2.5">
              <button onClick={() => setActiveTab('video')} className="text-xs text-[#a0a1ab] hover:text-white px-2.5 py-1.5 rounded-md hover:bg-white/5 transition flex items-center gap-1">
                Pricing
              </button>
              <a 
                href="https://github.com/LABCaramelo/Higgsfield" 
                target="_blank" 
                rel="noreferrer"
                className="text-xs bg-white/5 hover:bg-white/10 text-white px-3 py-1.5 rounded-lg border border-white/10 transition flex items-center gap-1 font-medium"
              >
                GitHub <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <button 
                onClick={() => setActiveTab('video')}
                className="text-xs bg-[#d1fe17] hover:brightness-110 text-black px-3.5 py-1.5 rounded-lg font-bold transition shadow-[0_2px_12px_rgba(209,254,23,0.3)]"
              >
                Sign in
              </button>
            </div>

          </div>
        </header>
      </div>

      {/* =========================================================================
          VIEW 1: EXPLORE / OFFICIAL HIGGSFIELD HOMEPAGE
          ========================================================================= */}
      {activeTab === 'explore' && (
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 lg:px-6 py-6 space-y-10 animate-fadeIn">
          
          {/* 1. TOP CAROUSEL: KATANA & ADS MULTIPLIER */}
          <section className="w-full">
            <ul className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
              {FEATURED_CAROUSEL.map(item => (
                <li key={item.id} className="flex-1 min-w-[320px] md:min-w-[440px]">
                  <div 
                    onClick={() => openInStudio(`${item.title}: dynamic motion clip, cinematic slow motion`, item.model)}
                    className="group cursor-pointer rounded-2xl overflow-hidden border border-white/10 bg-[#0d0d12] hover:border-[#ff5c00]/50 transition-all duration-300"
                  >
                    <div className="relative aspect-video w-full overflow-hidden bg-black">
                      <video 
                        autoPlay 
                        loop 
                        muted 
                        playsInline 
                        poster={item.poster}
                        src={item.video} 
                        className="size-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="bg-[#ff5c00] text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded shadow">
                          {item.badge}
                        </span>
                      </div>
                    </div>
                    <div className="p-3.5 flex flex-col gap-1">
                      <h3 className="font-grotesk font-bold text-sm text-white uppercase group-hover:text-[#ff5c00] transition">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#92939e] truncate">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* 2. EXPLORE HERO BANNER (SEEDANCE 2.5) & MODEL CARDS GRID */}
          <section className="flex flex-col lg:flex-row gap-4 items-stretch">
            
            {/* Left Hero Card */}
            <div className="relative w-full lg:w-[48%] shrink-0 min-h-[300px] rounded-2xl overflow-hidden border border-white/15 bg-gradient-to-r from-black/90 to-black/60 p-6 md:p-8 flex flex-col justify-between">
              <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                poster="https://static.higgsfield.ai/public/promotions/seedance-2-5-sale-hero-poster.jpg"
                src="https://static.higgsfield.ai/promotions/seedance_2_5_explore_image.mp4" 
                className="absolute inset-0 size-full object-cover pointer-events-none opacity-40 mix-blend-screen"
              />
              <div className="relative z-10 space-y-3">
                <span className="bg-white/10 text-[#d1fe17] text-[11px] font-bold px-2 py-0.8 rounded-full border border-[#d1fe17]/30 uppercase tracking-wide">
                  Flagship AI Video
                </span>
                <h2 className="text-2xl md:text-3xl font-bold font-grotesk tracking-tight text-white uppercase">
                  Sign up and get your <span className="text-[#d1fe17]">extra discount</span>
                </h2>
                <ul className="space-y-1.5 text-xs text-white/80 pt-1">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#d1fe17]" /> Unlimited Nano Banana Pro
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#d1fe17]" /> Unlock your extra discount
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#d1fe17]" /> Access to Seedance 2.5 Cinema
                  </li>
                </ul>
              </div>

              <div className="relative z-10 pt-6">
                <button 
                  onClick={() => openInStudio('Seedance 2.5 Cinema ultra high fidelity video')}
                  className="bg-[#d1fe17] hover:brightness-110 text-black px-6 py-2.5 rounded-xl font-bold text-sm transition shadow-[0_4px_20px_rgba(209,254,23,0.35)] flex items-center gap-2"
                >
                  <Play className="w-4 h-4 fill-black" /> Open Video Studio
                </button>
              </div>
            </div>

            {/* Right Models Grid (2x3) */}
            <div className="grid flex-1 grid-cols-2 md:grid-cols-3 gap-3">
              
              {/* Seedance 2.5 */}
              <div 
                onClick={() => openInStudio('Seedance 2.5 temporal coherence video', 'seedance_2_5')}
                className="group cursor-pointer rounded-xl border border-white/10 bg-[#0d0d12] p-4 flex flex-col justify-between hover:border-[#ff5c00]/60 transition"
              >
                <div className="flex items-center justify-between w-full">
                  <img src="https://static.higgsfield.ai/explore/image-generate-block/seedance-logo.png" alt="Seedance" className="w-5 h-5" />
                  <span className="font-grotesk text-[10px] uppercase px-1.5 rounded font-bold -skew-x-12 bg-gradient-to-r from-[#F920D1] to-[#ED1572] text-white">
                    TOP
                  </span>
                </div>
                <div className="pt-4">
                  <h4 className="font-semibold text-sm text-white group-hover:text-[#ff5c00] transition">Seedance 2.5</h4>
                  <p className="text-[11px] text-[#92939e] leading-tight">The most advanced video model</p>
                </div>
              </div>

              {/* AI Influencer */}
              <div 
                onClick={() => openInStudio('AI Influencer photorealistic character video', 'nano_banana_2')}
                className="group cursor-pointer rounded-xl border border-white/10 bg-[#0d0d12] p-4 flex flex-col justify-between hover:border-[#ff5c00]/60 transition"
              >
                <div className="flex items-center justify-between w-full">
                  <Sparkles className="w-5 h-5 text-[#d1fe17]" />
                  <span className="text-[10px] uppercase font-bold px-1.5 rounded bg-[#ff5c00]/20 text-[#ff772e]">
                    NEW
                  </span>
                </div>
                <div className="pt-4">
                  <h4 className="font-semibold text-sm text-white group-hover:text-[#ff5c00] transition">AI Influencer</h4>
                  <p className="text-[11px] text-[#92939e] leading-tight">Build your next hype machine</p>
                </div>
              </div>

              {/* Genjutsu */}
              <div 
                onClick={() => openInStudio('Higgsfield Genjutsu reality swap video', 'genjutsu')}
                className="group cursor-pointer rounded-xl border border-white/10 bg-[#0d0d12] p-4 flex flex-col justify-between hover:border-[#ff5c00]/60 transition"
              >
                <div className="flex items-center justify-between w-full">
                  <Wand2 className="w-5 h-5 text-[#a855f7]" />
                  <span className="text-[10px] uppercase font-bold px-1.5 rounded bg-[#ff5c00]/20 text-[#ff772e]">
                    NEW
                  </span>
                </div>
                <div className="pt-4">
                  <h4 className="font-semibold text-sm text-white group-hover:text-[#ff5c00] transition">Higgsfield Genjutsu</h4>
                  <p className="text-[11px] text-[#92939e] leading-tight">One video, many versions</p>
                </div>
              </div>

              {/* Claude MCP */}
              <div 
                onClick={() => setActiveTab('mcp')}
                className="group cursor-pointer rounded-xl border border-white/10 bg-[#0d0d12] p-4 flex flex-col justify-between hover:border-[#06b6d4]/60 transition"
              >
                <div className="flex items-center justify-between w-full">
                  <Terminal className="w-5 h-5 text-[#d97706]" />
                  <span className="text-[10px] uppercase font-bold px-1.5 rounded bg-white/10 text-white/80">
                    MCP
                  </span>
                </div>
                <div className="pt-4">
                  <h4 className="font-semibold text-sm text-white group-hover:text-[#06b6d4] transition">Claude & MCP</h4>
                  <p className="text-[11px] text-[#92939e] leading-tight">Generate media inside Claude</p>
                </div>
              </div>

              {/* Cinema Studio */}
              <div 
                onClick={() => openInStudio('Cinema Studio 4.0 anamorphic cinematic scene')}
                className="group cursor-pointer rounded-xl border border-white/10 bg-[#0d0d12] p-4 flex flex-col justify-between hover:border-[#ff5c00]/60 transition"
              >
                <div className="flex items-center justify-between w-full">
                  <img src="https://static.higgsfield.ai/explore/image-generate-block/cinema-studio.png" alt="Cinema" className="w-5 h-5" />
                </div>
                <div className="pt-4">
                  <h4 className="font-semibold text-sm text-white group-hover:text-[#ff5c00] transition">Cinema Studio 4.0</h4>
                  <p className="text-[11px] text-[#92939e] leading-tight">Create cinematic scenes effortlessly</p>
                </div>
              </div>

              {/* Supercomputer */}
              <div 
                onClick={() => openInStudio('Supercomputer autonomous creative agent')}
                className="group cursor-pointer rounded-xl border border-white/10 bg-[#0d0d12] p-4 flex flex-col justify-between hover:border-[#ff5c00]/60 transition"
              >
                <div className="flex items-center justify-between w-full">
                  <img src="https://static.higgsfield.ai/explore/image-generate-block/supercomputer-card-icon.svg" alt="Supercomputer" className="w-5 h-5" />
                </div>
                <div className="pt-4">
                  <h4 className="font-semibold text-sm text-white group-hover:text-[#ff5c00] transition">Supercomputer</h4>
                  <p className="text-[11px] text-[#92939e] leading-tight">Agent powered by GPT-6 Astra</p>
                </div>
              </div>

            </div>
          </section>

          {/* 3. AI INFLUENCER BANNER (OFFICIAL ASSETS & GLOWS) */}
          <section className="relative w-full rounded-3xl overflow-hidden bg-black border border-white/10 p-8 md:p-14 text-center">
            <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#d1fe17]/20 via-transparent to-transparent"></div>
            
            {/* Left & Right Character Cutouts */}
            <img 
              src="https://static.higgsfield.ai/home/ai-influencer-banner/v1/portrait-left-2.webp" 
              alt="Model Left" 
              className="hidden lg:block absolute bottom-0 left-4 h-80 w-auto object-contain pointer-events-none"
            />
            <img 
              src="https://static.higgsfield.ai/home/ai-influencer-banner/v1/portrait-right.webp" 
              alt="Model Right" 
              className="hidden lg:block absolute bottom-0 right-4 h-80 w-auto object-contain pointer-events-none"
            />

            <div className="relative z-10 max-w-xl mx-auto space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d1fe17]/20 text-[#d1fe17] text-xs font-semibold border border-[#d1fe17]/30">
                <Sparkles className="w-3.5 h-3.5" /> Try Free
              </span>
              <p className="font-grotesk font-bold text-xs uppercase tracking-widest text-[#a0a1ab]">AI Influencer</p>
              <h2 className="text-3xl md:text-5xl font-extrabold uppercase font-grotesk tracking-tight text-white leading-tight">
                Build your next hype machine
              </h2>
              <p className="text-sm md:text-base text-white/60">
                Pick the look. Add motion. Build hype.
              </p>
              <div className="pt-3">
                <button 
                  onClick={() => openInStudio('AI Influencer viral TikTok dance and reaction shot', 'kling3_0')}
                  className="bg-white text-black hover:bg-neutral-200 px-6 py-3 rounded-xl font-bold text-sm transition shadow-[0_4px_24px_rgba(255,255,255,0.2)]"
                >
                  Create your own AI Influencer
                </button>
              </div>
            </div>
          </section>

          {/* 4. CHATGPT DOTS WITH HIGGSFIELD MCP BANNER */}
          <section className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-r from-[#12131b] via-[#1b1c26] to-[#0c0d13] border border-white/10 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-3 max-w-xl">
              <div className="flex items-center gap-2">
                <span className="bg-[#22c55e]/20 text-[#4ade80] text-xs font-bold px-2 py-0.5 rounded border border-[#22c55e]/30">
                  Higgsfield MCP
                </span>
                <span className="text-xs text-white/50">Multi-Agent Protocol</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold font-grotesk text-white">
                Use ChatGPT Dots with Higgsfield MCP
              </h3>
              <p className="text-sm text-[#92939e]">
                Plan and make a creative project step by step with specialized Higgsfield agent roles inside Claude and ChatGPT.
              </p>
              <div className="pt-2">
                <button 
                  onClick={() => setActiveTab('mcp')}
                  className="bg-[#ff5c00] hover:bg-[#ff701a] text-white px-5 py-2.5 rounded-xl font-bold text-sm transition shadow-[0_4px_16px_rgba(255,92,0,0.3)] flex items-center gap-2"
                >
                  <Terminal className="w-4 h-4" /> Connect Higgsfield MCP
                </button>
              </div>
            </div>

            {/* 4 Agent Character Dots */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full md:w-auto">
              {[
                { name: "Character Creator", img: "https://static.higgsfield.ai/mcp/dots/v2/dot-character-creator.webp" },
                { name: "Cinematic Director", img: "https://static.higgsfield.ai/mcp/dots/v2/dot-cinematic-director.webp" },
                { name: "Content Lead", img: "https://static.higgsfield.ai/mcp/dots/v2/dot-content-lead.webp" },
                { name: "Motion Designer", img: "https://static.higgsfield.ai/mcp/dots/v2/dot-motion-designer.webp" }
              ].map(dot => (
                <div key={dot.name} className="flex flex-col items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/5 hover:border-[#ff5c00]/40 transition">
                  <img src={dot.img} alt={dot.name} className="w-14 h-14 object-contain rounded-full shadow" />
                  <span className="text-[11px] font-medium text-center text-white/80">{dot.name}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 5. VISUAL EFFECTS (VIRAL HUB) MASONRY SHOWCASE */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold uppercase font-grotesk tracking-wide text-white">
                  Visual Effects
                </h3>
                <p className="text-xs text-[#92939e]">
                  Big-budget visual effects, from explosions to surreal transformations.
                </p>
              </div>
              <button 
                onClick={() => setActiveTab('video')}
                className="bg-white/10 hover:bg-white/15 text-white text-xs font-semibold px-4 py-2 rounded-lg border border-white/10 transition"
              >
                Start generating
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {VIRAL_EFFECTS.map(effect => (
                <div 
                  key={effect.id}
                  onClick={() => openInStudio(effect.prompt)}
                  className={`group relative rounded-xl overflow-hidden cursor-pointer bg-[#0f0f15] border border-white/10 hover:border-[#ff5c00]/70 transition-all ${effect.aspect}`}
                >
                  <img 
                    src={effect.img} 
                    alt={effect.title} 
                    className="size-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center p-4 text-center gap-2">
                    <h4 className="font-grotesk font-bold text-white uppercase text-base tracking-wide">
                      {effect.title}
                    </h4>
                    <span className="bg-[#d1fe17] text-black text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                      <Sparkles className="w-3 h-3 fill-black" /> Recreate
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 6. COMMUNITY PROJECTS GALLERY */}
          <section className="space-y-4 pt-4">
            <div>
              <h3 className="text-xl font-bold uppercase font-grotesk tracking-wide text-white">
                Explore the inside of every project
              </h3>
              <p className="text-xs text-[#92939e]">
                See all prompts, assets, and how each project was created
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {COMMUNITY_PROJECTS.map((proj, idx) => (
                <div 
                  key={idx}
                  onClick={() => openInStudio(`Community project: ${proj.title}, award winning cinematic direction`)}
                  className="group cursor-pointer rounded-xl overflow-hidden border border-white/10 bg-[#0d0d12] hover:border-white/30 transition p-1.5 flex flex-col gap-2"
                >
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
                    <img src={proj.img} alt={proj.title} className="size-full object-cover group-hover:scale-105 transition duration-300" />
                  </div>
                  <div className="p-2 flex items-center justify-between">
                    <div className="flex items-center gap-2 min-w-0">
                      <img src={proj.avatar} alt={proj.author} className="w-5 h-5 rounded-full" />
                      <div className="truncate">
                        <p className="text-xs font-semibold text-white truncate">{proj.title}</p>
                        <p className="text-[10px] text-[#92939e] truncate">{proj.author}</p>
                      </div>
                    </div>
                    <span className="text-[9px] bg-white/10 px-1.5 py-0.5 rounded text-white/70">
                      {proj.tag}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </main>
      )}

      {/* =========================================================================
          VIEW 2: VIDEO STUDIO WORKSPACE
          ========================================================================= */}
      {(activeTab === 'video' || activeTab === 'image') && (
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 lg:px-6 py-6 space-y-6 animate-fadeIn">
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Left Control Panel */}
            <div className="w-full lg:w-96 space-y-5 bg-[#0d0d12] border border-white/10 rounded-2xl p-5 shrink-0">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Film className="w-4 h-4 text-[#ff5c00]" />
                  <h3 className="font-grotesk font-bold text-sm uppercase text-white">Video Parameters</h3>
                </div>
                <span className="text-[11px] text-[#4ade80] bg-[#22c55e]/10 px-2 py-0.5 rounded border border-[#22c55e]/20">
                  Ready
                </span>
              </div>

              {/* Model Picker */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#92939e] flex items-center justify-between">
                  <span>Model Engine</span>
                  <span className="text-[#ff5c00] text-[11px]">40+ available</span>
                </label>
                <select 
                  value={selectedModel}
                  onChange={e => setSelectedModel(e.target.value)}
                  className="w-full bg-[#14141b] border border-white/10 text-white rounded-lg px-3 py-2 text-xs focus:border-[#ff5c00] outline-none"
                >
                  <option value="seedance_2_5">Seedance 2.5 Cinema (Flagship)</option>
                  <option value="kling3_0">Kling 3.0 Pro</option>
                  <option value="veo_3_1">Google Veo 3.1 HQ</option>
                  <option value="genjutsu">Higgsfield Genjutsu</option>
                  <option value="nano_banana_2">Nano Banana Pro</option>
                  <option value="sora_2">OpenAI Sora 2</option>
                </select>
              </div>

              {/* Camera Presets */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#92939e]">Camera Motion Preset</label>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { id: 'camera_push', label: 'Push-In' },
                    { id: 'camera_pull', label: 'Pull-Out' },
                    { id: 'orbit_pan', label: 'Orbit 45°' },
                    { id: 'tracking_shot', label: 'Tracking' },
                    { id: 'drone_sweep', label: 'Crane Rise' },
                    { id: 'subtle_ambient', label: 'Subtle Handheld' },
                  ].map(cam => (
                    <button
                      key={cam.id}
                      onClick={() => setCameraPreset(cam.id)}
                      className={`text-xs py-1.5 px-2 rounded-lg border text-left transition ${cameraPreset === cam.id ? 'bg-[#ff5c00]/20 border-[#ff5c00] text-white font-bold' : 'border-white/5 bg-[#14141b] text-[#92939e] hover:text-white'}`}
                    >
                      {cam.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Aspect Ratio & Resolution */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#92939e]">Aspect Ratio</label>
                  <select 
                    value={aspectRatio}
                    onChange={e => setAspectRatio(e.target.value)}
                    className="w-full bg-[#14141b] border border-white/10 text-white rounded-lg px-2.5 py-1.5 text-xs outline-none"
                  >
                    <option value="16:9">16:9 (Landscape)</option>
                    <option value="9:16">9:16 (Story / Reel)</option>
                    <option value="1:1">1:1 (Square)</option>
                    <option value="4:3">4:3 (Classic)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#92939e]">Resolution</label>
                  <select 
                    value={resolution}
                    onChange={e => setResolution(e.target.value)}
                    className="w-full bg-[#14141b] border border-white/10 text-white rounded-lg px-2.5 py-1.5 text-xs outline-none"
                  >
                    <option value="1080p">1080p Full HD</option>
                    <option value="720p">720p Fast</option>
                    <option value="4k">4K Cinema Upscale</option>
                  </select>
                </div>
              </div>

              {/* Duration Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-[#92939e]">Duration</span>
                  <span className="text-[#ff5c00] font-bold">{duration} seconds</span>
                </div>
                <input 
                  type="range" 
                  min="3" 
                  max="10" 
                  value={duration} 
                  onChange={e => setDuration(Number(e.target.value))}
                  className="w-full accent-[#ff5c00]"
                />
              </div>

              {/* Image Input Optional */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#92939e]">Image Reference URL (Optional)</label>
                <input 
                  type="text" 
                  placeholder="https://..."
                  value={imageUrl}
                  onChange={e => setImageUrl(e.target.value)}
                  className="w-full bg-[#14141b] border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#ff5c00]"
                />
              </div>

            </div>

            {/* Right Canvas / Prompt & Results */}
            <div className="flex-1 space-y-5">
              
              {/* Prompt Textarea Box */}
              <div className="bg-[#0d0d12] border border-white/10 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#92939e]">Motion Prompt</span>
                  <button 
                    onClick={() => setPrompt(peResult)}
                    className="text-xs text-[#a855f7] hover:underline flex items-center gap-1 font-medium"
                  >
                    <Wand2 className="w-3.5 h-3.5" /> Inject Synthesized Prompt
                  </button>
                </div>
                
                <textarea 
                  rows={4}
                  value={prompt}
                  onChange={e => setPrompt(e.target.value)}
                  placeholder="Describe your scene, lighting, action and camera trajectory..."
                  className="w-full bg-[#14141b] border border-white/10 rounded-xl p-3 text-sm text-white outline-none focus:border-[#ff5c00] resize-none"
                />

                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-[#92939e]">{prompt.length} characters</span>
                  <button 
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="bg-gradient-to-r from-[#ff5c00] to-[#ff3d00] hover:brightness-110 disabled:opacity-50 text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-[0_4px_18px_rgba(255,92,0,0.35)] flex items-center gap-2 transition cursor-pointer"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" /> Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 fill-white" /> Generate Motion (25 credits)
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Output Preview Screen */}
              <div className="bg-[#0d0d12] border border-white/10 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-grotesk font-bold text-sm text-white uppercase">Viewport Output</h4>
                  {currentOutput && (
                    <button 
                      onClick={() => copyText(currentOutput.prompt)}
                      className="text-xs bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 text-white flex items-center gap-1"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                      {copied ? "Copied" : "Copy Prompt"}
                    </button>
                  )}
                </div>

                <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black flex items-center justify-center border border-white/5">
                  {isGenerating ? (
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 rounded-full border-4 border-[#ff5c00] border-t-transparent animate-spin"></div>
                      <p className="text-sm font-grotesk text-white">Rendering temporal coherence layers...</p>
                      <p className="text-xs text-[#92939e]">Estimated remaining: 3s</p>
                    </div>
                  ) : currentOutput ? (
                    <video 
                      autoPlay 
                      loop 
                      controls
                      src={currentOutput.videoUrl} 
                      className="size-full object-contain"
                    />
                  ) : (
                    <div className="text-center space-y-2 p-6">
                      <Clapperboard className="w-10 h-10 text-white/20 mx-auto" />
                      <p className="text-sm text-[#92939e]">Your generated render will display here.</p>
                      <button 
                        onClick={() => openInStudio('Floating fall through golden particles')}
                        className="text-xs text-[#ff5c00] hover:underline"
                      >
                        Load sample prompt to test
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Queue History */}
              {generationQueue.length > 0 && (
                <div className="bg-[#0d0d12] border border-white/10 rounded-2xl p-4 space-y-3">
                  <h5 className="font-grotesk font-semibold text-xs text-white uppercase">Session Generation History</h5>
                  <div className="space-y-2">
                    {generationQueue.map(item => (
                      <div key={item.id} className="flex items-center justify-between p-2.5 rounded-lg bg-[#14141b] border border-white/5 text-xs">
                        <div className="flex items-center gap-2 truncate pr-4">
                          <span className={`w-2 h-2 rounded-full ${item.status === 'completed' ? 'bg-green-400' : 'bg-[#ff5c00] animate-ping'}`} />
                          <span className="font-mono text-white/60">{item.id}</span>
                          <span className="text-white truncate">{item.prompt}</span>
                        </div>
                        <span className="text-[#a0a1ab] shrink-0">{item.timestamp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

          </div>
        </main>
      )}

      {/* =========================================================================
          VIEW 3: MCP CONSOLE & MULTI-AGENT STUDIO
          ========================================================================= */}
      {activeTab === 'mcp' && (
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 lg:px-6 py-6 space-y-6 animate-fadeIn">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold font-grotesk uppercase text-white">
              Higgsfield Model Context Protocol (MCP) Server
            </h2>
            <p className="text-sm text-[#92939e]">
              Connect Claude Desktop, Cursor, or your local agent pipelines to generate videos, images and synthesize prompts.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Claude Desktop Config Card */}
            <div className="bg-[#0d0d12] border border-white/10 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-[#06b6d4]" />
                  <h4 className="font-bold text-sm text-white">Claude Desktop Setup</h4>
                </div>
                <button 
                  onClick={() => copyText(`{
  "mcpServers": {
    "higgsfield": {
      "command": "python",
      "args": ["d:/meus documentos/higgsfield/src/mcp_server.py"],
      "env": {
        "HF_API_KEY": "YOUR_HIGGSFIELD_API_KEY"
      }
    }
  }
}`)}
                  className="text-xs bg-white/10 hover:bg-white/15 px-3 py-1.5 rounded-lg text-white flex items-center gap-1.5"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? "Copied" : "Copy Config"}
                </button>
              </div>

              <pre className="p-4 rounded-xl bg-black/80 text-[#06b6d4] font-mono text-xs overflow-x-auto border border-white/5">
{`{
  "mcpServers": {
    "higgsfield": {
      "command": "python",
      "args": ["d:/meus documentos/higgsfield/src/mcp_server.py"],
      "env": {
        "HF_API_KEY": "YOUR_HIGGSFIELD_API_KEY"
      }
    }
  }
}`}
              </pre>

              <div className="space-y-1.5 text-xs text-[#92939e]">
                <p>Add this snippet to your <code className="text-white">claude_desktop_config.json</code>.</p>
                <p>Available Tools: <span className="text-white font-mono">generate_video, generate_image, get_generation_status, search_models, estimate_cost, generate_motion_prompt, upload_media</span>.</p>
              </div>
            </div>

            {/* Live Tool Execution Sandbox */}
            <div className="bg-[#0d0d12] border border-white/10 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-[#22c55e]" />
                  <h4 className="font-bold text-sm text-white">Local Server Status</h4>
                </div>
                <span className="text-xs text-[#4ade80] bg-[#22c55e]/15 px-2.5 py-1 rounded-full border border-[#22c55e]/30 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-ping" /> Online (Port 8000)
                </span>
              </div>

              <div className="space-y-3 pt-2">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-semibold text-white">FastAPI Core Suite</p>
                    <p className="text-[#92939e]">http://localhost:8000</p>
                  </div>
                  <a href="/docs" target="_blank" className="text-[#ff5c00] hover:underline flex items-center gap-1">
                    Swagger API Docs <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-semibold text-white">Models Catalog</p>
                    <p className="text-[#92939e]">40+ registered AI video/image models</p>
                  </div>
                  <button onClick={() => openInStudio('Test seedance render')} className="text-[#d1fe17] hover:underline">
                    Test in Studio →
                  </button>
                </div>
              </div>

            </div>

          </div>
        </main>
      )}

      {/* =========================================================================
          FOOTER (OFFICIAL HIGGSFIELD MINIMAL FOOTER)
          ========================================================================= */}
      <footer className="mt-auto border-t border-white/10 bg-[#030304] py-8 px-6 text-xs text-[#92939e]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-grotesk font-bold text-white text-sm">Higgsfield</span>
            <span>© 2026 Higgsfield AI. Recreated with REA Clean-Room Architecture.</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setActiveTab('explore')} className="hover:text-white transition">Explore</button>
            <button onClick={() => setActiveTab('video')} className="hover:text-white transition">Video Studio</button>
            <button onClick={() => setActiveTab('mcp')} className="hover:text-white transition">MCP Server</button>
            <a href="https://github.com/LABCaramelo/Higgsfield" target="_blank" rel="noreferrer" className="hover:text-white transition">GitHub</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
