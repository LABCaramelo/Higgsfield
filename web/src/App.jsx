import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Pause, Video, Image as ImageIcon, Sparkles, Terminal, Copy, Check, 
  Upload, Wand2, Compass, Layers, Sliders, ArrowUpRight, Cpu, 
  RotateCw, RefreshCw, Film, Volume2, VolumeX, ShieldCheck, Zap, ChevronRight,
  ChevronDown, ExternalLink, Info, CheckCircle2, Clapperboard, Palette, Share2, 
  Eye, Download, Maximize2, Plus, Search, Heart, Folder, Home, Grid, 
  SlidersHorizontal, Camera, Clock, MoveHorizontal, Disc, SlidersVertical,
  Scissors, ArrowRight, CornerDownRight, Split, Flame, FastForward, Activity,
  Repeat, UserCheck, Mic, Headphones, Music, Trash2, Radio
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
    video: "https://static-public-media.higgsfield.ai/cards/c94a765b-8ad6-4af3-b884-88ea306d79ff.mp4",
    aspect: "aspect-[9/16]",
    prompt: "A stylish subject falling backwards in slow motion through a cloud of iridescent particles, cinematic slow motion, 4k ultra realistic"
  },
  {
    id: "high-flip",
    title: "High flip",
    img: "https://cdn.higgsfield.ai/viral_hub/95cd0d73-4f3c-40d1-ac0b-c8668a99440b.webp",
    video: "https://static-public-media.higgsfield.ai/cards/47326e54-4048-4cac-bd7e-600b88e10427.mp4",
    aspect: "aspect-[9/16]",
    prompt: "Parkour athlete performing a high backward flip off a concrete rooftop at golden hour, smooth horizontal tracking shot"
  },
  {
    id: "burning-man",
    title: "Burning man",
    img: "https://cdn.higgsfield.ai/viral_hub/a1560137-597c-455a-be9e-9622cccf76a3.webp",
    video: "https://static-public-media.higgsfield.ai/cards/c94a765b-8ad6-4af3-b884-88ea306d79ff.mp4",
    aspect: "aspect-[3/4]",
    prompt: "A lone festival traveler walking through the desert dust storm at twilight with glowing neon fabric swirling"
  },
  {
    id: "subway-slide",
    title: "Subway slide",
    img: "https://cdn.higgsfield.ai/viral_hub/4a2315f6-57e1-4378-82a5-598ddbbfbbcb.webp",
    video: "https://static-public-media.higgsfield.ai/cards/47326e54-4048-4cac-bd7e-600b88e10427.mp4",
    aspect: "aspect-[9/16]",
    prompt: "Hyper-stylized camera tracking along an underground retro subway platform as light trails whip past"
  },
  {
    id: "red-flag",
    title: "Red flag",
    img: "https://cdn.higgsfield.ai/viral_hub/05201733-c72f-43ed-8393-8b8cea28b8ce.webp",
    video: "https://static-public-media.higgsfield.ai/cards/c94a765b-8ad6-4af3-b884-88ea306d79ff.mp4",
    aspect: "aspect-[9/16]",
    prompt: "Cinematic close-up of dynamic fabric billowing against dramatic storm clouds, high temporal coherence"
  },
  {
    id: "kok-boru",
    title: "Kok Boru",
    img: "https://cdn.higgsfield.ai/viral_hub/5354ce11-c68c-45a0-8a97-5aab94f52833.webp",
    video: "https://static-public-media.higgsfield.ai/cards/47326e54-4048-4cac-bd7e-600b88e10427.mp4",
    aspect: "aspect-[9/16]",
    prompt: "Epic horsemen galloping across the mountain steppe in morning mist, wide cinematic camera angle, 8k textures"
  },
  {
    id: "zephyr",
    title: "ZEPHYR: Special",
    img: "https://cdn.higgsfield.ai/viral_hub/99aa3365-5ae0-4616-9722-ce0dc087607d.webp",
    video: "https://static-public-media.higgsfield.ai/cards/c94a765b-8ad6-4af3-b884-88ea306d79ff.mp4",
    aspect: "aspect-[9/16]",
    prompt: "Futuristic sci-fi speeder hovering over mirror lake water, subtle ripples and neon heat distortion"
  },
  {
    id: "hell-grind",
    title: "HELL GRIND",
    img: "https://d2ol7oe51mr4n9.cloudfront.net/user_2v5txepAmNYZwyzml1nIizlWURE/df7107b3-1dd6-438a-a168-ed382e2ad901.png",
    video: "https://static-public-media.higgsfield.ai/cards/47326e54-4048-4cac-bd7e-600b88e10427.mp4",
    aspect: "aspect-[16/9]",
    prompt: "Skateboarder grinding on an iron rail down an endless neon stairwell, sparks flying in slow motion"
  }
];

const GENJUTSU_MOTION_PRESETS = [
  {
    id: "katana_strike",
    title: "Cyber Katana Strike",
    category: "Action & Martial Arts",
    videoUrl: "https://static-public-media.higgsfield.ai/cards/c94a765b-8ad6-4af3-b884-88ea306d79ff.mp4",
    thumb: "https://static-public-media.higgsfield.ai/cards/33b14c34-2394-4580-9b88-16b5e6695528.webp",
    fps: "30 FPS",
    duration: "5s",
    description: "Dynamic blade unsheathe with 180° body rotation and impact pause"
  },
  {
    id: "parkour_flip",
    title: "Rooftop High Flip",
    category: "Parkour & Acrobatics",
    videoUrl: "https://static-public-media.higgsfield.ai/cards/47326e54-4048-4cac-bd7e-600b88e10427.mp4",
    thumb: "https://cdn.higgsfield.ai/viral_hub/95cd0d73-4f3c-40d1-ac0b-c8668a99440b.webp",
    fps: "60 FPS",
    duration: "4s",
    description: "Inverted high backflip with rotational airtime and crouch recovery"
  },
  {
    id: "runway_strut",
    title: "High-Fashion Runway Walk",
    category: "Editorial & Modeling",
    videoUrl: "https://static.higgsfield.ai/promotions/seedance_2_5_explore_image.mp4",
    thumb: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    fps: "24 FPS",
    duration: "6s",
    description: "Paced confident runway walk toward lens with subtle coat flare"
  },
  {
    id: "kpop_sync",
    title: "K-Pop Synchronized Routine",
    category: "Dance & Choreography",
    videoUrl: "https://static-public-media.higgsfield.ai/cards/47326e54-4048-4cac-bd7e-600b88e10427.mp4",
    thumb: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
    fps: "30 FPS",
    duration: "8s",
    description: "Upper-body arm wave, snappy chest isolation and rhythmic turn"
  }
];

const GENJUTSU_CHARACTER_PRESETS = [
  {
    id: "aria_nomad",
    name: "Aria (Cyber Nomad)",
    style: "35mm Photorealistic Raw",
    imgUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    badge: "Soul #884"
  },
  {
    id: "ren_shinobi",
    name: "Ren (Anime Shinobi)",
    style: "Cel-Shaded Anime 2.0",
    imgUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80",
    badge: "Soul #102"
  },
  {
    id: "elena_muse",
    name: "Elena (Vogue Editorial)",
    style: "High-Fashion 85mm Prime",
    imgUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
    badge: "Soul #331"
  },
  {
    id: "kael_exo",
    name: "Kael (Sci-Fi Exo Pilot)",
    style: "Unreal 5 Cinematic CGI",
    imgUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    badge: "Soul #919"
  }
];

const AUDIO_VOICE_PRESETS = [
  {
    id: "marcus_narrator",
    name: "Marcus",
    role: "Cinematic Trailer & Doc",
    tone: "Deep, Authoritative, Resonant",
    gender: "Male",
    accent: "American (General)",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    sampleRate: "48 kHz",
    bitrate: "320 kbps"
  },
  {
    id: "elena_editorial",
    name: "Elena",
    role: "Editorial Muse & Luxury",
    tone: "Warm, Sophisticated, Crisp",
    gender: "Female",
    accent: "British (RP)",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    sampleRate: "48 kHz",
    bitrate: "320 kbps"
  },
  {
    id: "kai_cyberpunk",
    name: "Kai",
    role: "Modern Dialogue & Sci-Fi",
    tone: "Intense, Close-Mic, Dynamic",
    gender: "Male",
    accent: "Urban West Coast",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    sampleRate: "48 kHz",
    bitrate: "320 kbps"
  },
  {
    id: "aria_whisper",
    name: "Aria",
    role: "Poetic & Intimate Narration",
    tone: "Soft, Emotive, Breathy",
    gender: "Female",
    accent: "Mid-Atlantic",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    sampleRate: "48 kHz",
    bitrate: "320 kbps"
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('explore'); // 'explore' | 'video' | 'image' | 'genjutsu' | 'audio' | 'mcp'
  const [copied, setCopied] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // ==========================================
  // GENJUTSU (MOTION TRANSFER) STATE
  // ==========================================
  const [genjutsuMode, setGenjutsuMode] = useState('motion_transfer'); // 'motion_transfer' | 'recast' | 'restyle' | 'object_swap'
  const [selectedMotionId, setSelectedMotionId] = useState('katana_strike');
  const [selectedCharacterId, setSelectedCharacterId] = useState('aria_nomad');
  const [characterOrientation, setCharacterOrientation] = useState('match_video'); // 'match_video' | 'match_image'
  const [motionDynamicScale, setMotionDynamicScale] = useState('balanced'); // 'balanced' | 'high_dynamic'
  const [genjutsuAspect, setGenjutsuAspect] = useState('9:16');
  const [genjutsuDuration, setGenjutsuDuration] = useState('5s');
  const [genjutsuPrompt, setGenjutsuPrompt] = useState('Transfer dynamic combat motion, maintain photorealistic skin textures, cinematic lighting and kinetic wind physics');
  const [isGenjutsuGenerating, setIsGenjutsuGenerating] = useState(false);
  const [genjutsuViewMode, setGenjutsuViewMode] = useState('side_by_side'); // 'side_by_side' | 'split' | 'result'
  const [isGenjutsuPlaying, setIsGenjutsuPlaying] = useState(true);
  const motionVideoRef = useRef(null);
  const outputVideoRef = useRef(null);

  const activeMotion = GENJUTSU_MOTION_PRESETS.find(m => m.id === selectedMotionId) || GENJUTSU_MOTION_PRESETS[0];
  const activeCharacter = GENJUTSU_CHARACTER_PRESETS.find(c => c.id === selectedCharacterId) || GENJUTSU_CHARACTER_PRESETS[0];

  // ==========================================
  // AUDIO STUDIO (SPEAK 2.0 / ELEVEN V4) STATE
  // ==========================================
  const [selectedAudioModel, setSelectedAudioModel] = useState('speak_2_0'); // 'speak_2_0' | 'eleven_v4' | 'turbo_speech'
  const [audioStability, setAudioStability] = useState(75);
  const [audioSimilarity, setAudioSimilarity] = useState(85);
  const [audioExaggeration, setAudioExaggeration] = useState(25);
  const [audioSpeed, setAudioSpeed] = useState(1.0);
  const [audioLanguage, setAudioLanguage] = useState('en');
  const [isAudioGenerating, setIsAudioGenerating] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [activeAudioSpeaker, setActiveAudioSpeaker] = useState('marcus_narrator');
  const [showVoicePicker, setShowVoicePicker] = useState(false);

  const [dialogueCards, setDialogueCards] = useState([
    {
      id: "card_1",
      speakerNumber: 1,
      voiceId: "marcus_narrator",
      speakerName: "Marcus (Narrator)",
      script: "We build systems not just to generate frames, but to capture the exact tension between stillness and speed.",
      duration: "4.8s",
      status: "ready"
    },
    {
      id: "card_2",
      speakerNumber: 2,
      voiceId: "elena_editorial",
      speakerName: "Elena (Muse)",
      script: "Every shadow in this city holds a frequency. If you listen close enough, you can hear the pulse before the light breaks.",
      duration: "5.4s",
      status: "ready"
    },
    {
      id: "card_3",
      speakerNumber: 3,
      voiceId: "kai_cyberpunk",
      speakerName: "Kai (Operator)",
      script: "Lock all sensors on sector nine. The kinetic transfer begins in three, two, one...",
      duration: "3.9s",
      status: "ready"
    }
  ]);

  // URL sync for ?model=genjutsu or /audio
  useEffect(() => {
    try {
      const search = window.location.search;
      const params = new URLSearchParams(search);
      const pathname = window.location.pathname;
      if (params.get('model') === 'genjutsu' || pathname.includes('genjutsu')) {
        setActiveTab('genjutsu');
      } else if (pathname.includes('/audio') || params.get('tab') === 'audio') {
        setActiveTab('audio');
      }
    } catch(e) {}
  }, []);

  const navigateToGenjutsu = () => {
    setActiveTab('genjutsu');
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('model', 'genjutsu');
      window.history.pushState({}, '', url.toString());
    } catch(e) {}
  };

  const navigateToAudio = () => {
    setActiveTab('audio');
    try {
      window.history.pushState({}, '', '/audio');
    } catch(e) {}
  };


  // ==========================================
  // CINEMA STUDIO (VIDEO) STATE
  // ==========================================
  const [selectedVideoModel, setSelectedVideoModel] = useState('seedance_2_5');
  const [videoAspect, setVideoAspect] = useState('16:9');
  const [cameraPreset, setCameraPreset] = useState('camera_push');
  const [colorPalette, setColorPalette] = useState('neon_obsidian');
  const [videoPrompt, setVideoPrompt] = useState('A luxury chronograph watch rotating continuously on an obsidian pedestal, slow cinematic camera push-in towards the subject, light glints over the sapphire crystal, natural and realistic motion');
  const [isVideoGenerating, setIsVideoGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [activeShotId, setActiveShotId] = useState('shot_1');
  const [showVideoModelPicker, setShowVideoModelPicker] = useState(false);
  const [showCameraPicker, setShowCameraPicker] = useState(false);
  const [showPalettePicker, setShowPalettePicker] = useState(false);
  const videoRef = useRef(null);

  const [shots, setShots] = useState([
    {
      id: "shot_1",
      name: "Shot 1: Chronograph Push-In",
      model: "seedance_2_5",
      camera: "Push-In 35mm",
      aspect: "16:9",
      duration: "5s",
      videoUrl: "https://static-public-media.higgsfield.ai/cards/c94a765b-8ad6-4af3-b884-88ea306d79ff.mp4",
      thumb: "https://static-public-media.higgsfield.ai/cards/33b14c34-2394-4580-9b88-16b5e6695528.webp",
      prompt: "A luxury chronograph watch rotating continuously on an obsidian pedestal, slow cinematic camera push-in towards the subject, light glints over the sapphire crystal, natural and realistic motion"
    },
    {
      id: "shot_2",
      name: "Shot 2: Katana Action Sequence",
      model: "katana",
      camera: "Tracking 24mm",
      aspect: "16:9",
      duration: "5s",
      videoUrl: "https://static-public-media.higgsfield.ai/cards/47326e54-4048-4cac-bd7e-600b88e10427.mp4",
      thumb: "https://cdn.higgsfield.ai/viral_hub/95cd0d73-4f3c-40d1-ac0b-c8668a99440b.webp",
      prompt: "Fast-paced katana action cut, dramatic speed ramp and light streaks, cinematic color grade"
    },
    {
      id: "shot_3",
      name: "Shot 3: Desert Mirage",
      model: "kling3_0",
      camera: "Orbit 45°",
      aspect: "16:9",
      duration: "5s",
      videoUrl: "https://static.higgsfield.ai/promotions/seedance_2_5_explore_image.mp4",
      thumb: "https://cdn.higgsfield.ai/viral_hub/a1560137-597c-455a-be9e-9622cccf76a3.webp",
      prompt: "A lone festival traveler walking through the desert dust storm at twilight with glowing neon fabric swirling"
    }
  ]);

  const activeShot = shots.find(s => s.id === activeShotId) || shots[0];

  // ==========================================
  // IMAGE STUDIO STATE
  // ==========================================
  const [selectedImageModel, setSelectedImageModel] = useState('nano_banana_2');
  const [imageAspect, setImageAspect] = useState('1:1');
  const [imageStyle, setImageStyle] = useState('photorealistic_raw');
  const [imagePrompt, setImagePrompt] = useState('High-fashion editorial portrait of a woman wearing an architectural charcoal coat, soft natural window light, 35mm film grain, 8k hyper-detailed skin textures');
  const [isImageGenerating, setIsImageGenerating] = useState(false);
  const [activeImageId, setActiveImageId] = useState('img_1');
  const [showImageModelPicker, setShowImageModelPicker] = useState(false);
  const [showImageStylePicker, setShowImageStylePicker] = useState(false);

  const [images, setImages] = useState([
    {
      id: "img_1",
      name: "Editorial Portrait Trench",
      model: "nano_banana_2",
      modelLabel: "Nano Banana Pro",
      aspect: "1:1",
      style: "Fashion Editorial",
      resolution: "4K UHD",
      url: "https://static-public-media.higgsfield.ai/cards/6603d9a7-fdfe-4d27-a49b-a074e3edbe97.webp",
      prompt: "High-fashion editorial portrait of a woman wearing an architectural charcoal coat, soft natural window light, 35mm film grain, 8k hyper-detailed skin textures"
    },
    {
      id: "img_2",
      name: "Cyberpunk Tokyo Geisha",
      model: "gpt_image_2_5",
      modelLabel: "GPT Image 2.5",
      aspect: "9:16",
      style: "Cyberpunk Neon",
      resolution: "2K",
      url: "https://cdn.higgsfield.ai/card/9c6affe8-03a8-4434-97ef-2fc476f7a71e.webp",
      prompt: "Futuristic cyberpunk Tokyo street with giant holographic koi fish floating between neon skyscrapers in heavy rain, cinematic rim light"
    },
    {
      id: "img_3",
      name: "Obsidian Tourbillon Watch",
      model: "nano_banana_2",
      modelLabel: "Nano Banana Pro",
      aspect: "16:9",
      style: "Product Macro",
      resolution: "4K UHD",
      url: "https://static-public-media.higgsfield.ai/cards/33b14c34-2394-4580-9b88-16b5e6695528.webp",
      prompt: "A luxury chronograph tourbillon watch on an obsidian pedestal, micro sapphire gear mechanics, studio key lighting"
    },
    {
      id: "img_4",
      name: "Desert Twilight Traveler",
      model: "flux_2",
      modelLabel: "FLUX.2 Pro",
      aspect: "16:9",
      style: "Cinematic Raw",
      resolution: "2K",
      url: "https://static-public-media.higgsfield.ai/cards/f35128d2-0067-4ce8-a988-0c198b39669f.webp",
      prompt: "A lone festival traveler walking through sunset desert dunes, swirling golden dust particles, soft warm backlight"
    }
  ]);

  const activeImage = images.find(img => img.id === activeImageId) || images[0];

  // Generate Video
  const handleGenerateVideo = () => {
    if (!videoPrompt.trim()) return;
    setIsVideoGenerating(true);
    const newId = "shot_" + (shots.length + 1);
    
    setTimeout(() => {
      const newShot = {
        id: newId,
        name: `Shot ${shots.length + 1}: Generated Scene`,
        model: selectedVideoModel,
        camera: cameraPreset.replace('_', ' '),
        aspect: videoAspect,
        duration: "5s",
        videoUrl: "https://static-public-media.higgsfield.ai/cards/c94a765b-8ad6-4af3-b884-88ea306d79ff.mp4",
        thumb: "https://static-public-media.higgsfield.ai/cards/6603d9a7-fdfe-4d27-a49b-a074e3edbe97.webp",
        prompt: videoPrompt
      };
      setShots(prev => [newShot, ...prev]);
      setActiveShotId(newId);
      setIsVideoGenerating(false);
    }, 2800);
  };

  // Generate Image
  const handleGenerateImage = () => {
    if (!imagePrompt.trim()) return;
    setIsImageGenerating(true);
    const newId = "img_" + (images.length + 1);

    setTimeout(() => {
      const newImg = {
        id: newId,
        name: `Image ${images.length + 1}: ${imagePrompt.substring(0, 20)}...`,
        model: selectedImageModel,
        modelLabel: selectedImageModel === 'nano_banana_2' ? 'Nano Banana Pro' : selectedImageModel === 'gpt_image_2_5' ? 'GPT Image 2.5' : 'FLUX.2 Pro',
        aspect: imageAspect,
        style: imageStyle.replace('_', ' '),
        resolution: "4K UHD",
        url: "https://static-public-media.higgsfield.ai/cards/6603d9a7-fdfe-4d27-a49b-a074e3edbe97.webp",
        prompt: imagePrompt
      };
      setImages(prev => [newImg, ...prev]);
      setActiveImageId(newId);
      setIsImageGenerating(false);
    }, 2400);
  };

  // Signature Bridge: Animate Generated Image into Seedance 2.5 Video
  const animateImageToVideo = (img) => {
    const motionPrompt = `${img.prompt}, slow cinematic camera push-in towards the subject, natural realistic motion, high temporal stability`;
    setVideoPrompt(motionPrompt);
    setSelectedVideoModel('seedance_2_5');
    setVideoAspect(img.aspect === '9:16' ? '9:16' : img.aspect === '1:1' ? '1:1' : '16:9');
    setActiveTab('video');
  };

  // Genjutsu Actions
  const handleGenerateGenjutsu = () => {
    setIsGenjutsuGenerating(true);
    setTimeout(() => {
      setIsGenjutsuGenerating(false);
    }, 2500);
  };

  const handleSyncPlayToggle = () => {
    const nextPlay = !isGenjutsuPlaying;
    setIsGenjutsuPlaying(nextPlay);
    if (motionVideoRef.current) {
      if (nextPlay) motionVideoRef.current.play(); else motionVideoRef.current.pause();
    }
    if (outputVideoRef.current) {
      if (nextPlay) outputVideoRef.current.play(); else outputVideoRef.current.pause();
    }
  };

  const handleSendGenjutsuToCinema = () => {
    const newId = "shot_genjutsu_" + Date.now();
    const newShot = {
      id: newId,
      name: `Genjutsu: ${activeMotion.title} ➔ ${activeCharacter.name}`,
      model: "genjutsu",
      camera: "Motion Transfer 30fps",
      aspect: genjutsuAspect,
      duration: genjutsuDuration,
      videoUrl: activeMotion.videoUrl,
      thumb: activeCharacter.imgUrl,
      prompt: genjutsuPrompt
    };
    setShots(prev => [newShot, ...prev]);
    setActiveShotId(newId);
    setVideoPrompt(genjutsuPrompt);
    setSelectedVideoModel('genjutsu');
    setActiveTab('video');
  };

  // Audio Studio Actions
  const handleAddDialogueCard = () => {
    const nextNum = dialogueCards.length + 1;
    const defaultVoice = AUDIO_VOICE_PRESETS[(nextNum - 1) % AUDIO_VOICE_PRESETS.length];
    const newCard = {
      id: "card_" + Date.now(),
      speakerNumber: nextNum,
      voiceId: defaultVoice.id,
      speakerName: `${defaultVoice.name} (${defaultVoice.role.split(' ')[0]})`,
      script: "",
      duration: "0.0s",
      status: "draft"
    };
    setDialogueCards(prev => [...prev, newCard]);
  };

  const handleDeleteDialogueCard = (cardId) => {
    if (dialogueCards.length <= 1) return;
    setDialogueCards(prev => prev.filter(c => c.id !== cardId));
  };

  const handleUpdateCardScript = (cardId, text) => {
    setDialogueCards(prev => prev.map(c => c.id === cardId ? { 
      ...c, 
      script: text, 
      duration: `${Math.max(1.8, (text.trim().split(/\s+/).filter(Boolean).length * 0.42)).toFixed(1)}s` 
    } : c));
  };

  const handleUpdateCardVoice = (cardId, voiceId) => {
    const v = AUDIO_VOICE_PRESETS.find(p => p.id === voiceId) || AUDIO_VOICE_PRESETS[0];
    setDialogueCards(prev => prev.map(c => c.id === cardId ? { 
      ...c, 
      voiceId: v.id, 
      speakerName: `${v.name} (${v.role.split(' ')[0]})` 
    } : c));
  };

  const handleGenerateAudio = () => {
    setIsAudioGenerating(true);
    setTimeout(() => {
      setDialogueCards(prev => prev.map(c => ({ ...c, status: "ready" })));
      setIsAudioGenerating(false);
    }, 2200);
  };

  const handleAttachAudioToCinema = () => {
    const combinedScript = dialogueCards.map(c => `[${c.speakerName}]: "${c.script}"`).join(' ');
    const newId = "shot_audio_" + Date.now();
    const newShot = {
      id: newId,
      name: `Scene Dialogue: ${dialogueCards.length} Speakers (Speak 2.0)`,
      model: "seedance_2_5",
      camera: "Audio Track Sync 48kHz",
      aspect: "16:9",
      duration: "10s",
      videoUrl: "https://static-public-media.higgsfield.ai/cards/c94a765b-8ad6-4af3-b884-88ea306d79ff.mp4",
      thumb: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
      prompt: `Cinematic performance synchronized to studio vocal track: ${combinedScript}`
    };
    setShots(prev => [newShot, ...prev]);
    setActiveShotId(newId);
    setVideoPrompt(newShot.prompt);
    setActiveTab('video');
  };



  const openInStudio = (presetPrompt, presetModel = 'seedance_2_5', presetVideo = null) => {
    setVideoPrompt(presetPrompt);
    setSelectedVideoModel(presetModel);
    if (presetVideo) {
      const newId = "shot_custom_" + Date.now();
      const customShot = {
        id: newId,
        name: `Shot ${shots.length + 1}: ${presetPrompt.substring(0, 24)}...`,
        model: presetModel,
        camera: "Cinematic Motion",
        aspect: "16:9",
        duration: "5s",
        videoUrl: presetVideo,
        thumb: "https://static-public-media.higgsfield.ai/cards/33b14c34-2394-4580-9b88-16b5e6695528.webp",
        prompt: presetPrompt
      };
      setShots(prev => [customShot, ...prev]);
      setActiveShotId(newId);
    }
    setActiveTab('video');
  };

  const copyText = (txt) => {
    navigator.clipboard.writeText(txt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleVideoPlayback = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <div className="h-screen w-screen bg-[#0F1113] text-[#f5f5f7] flex flex-col font-sans overflow-hidden select-none">
      
      {/* =========================================================================
          TOP CANONICAL HIGGSFIELD APP HEADER
          ========================================================================= */}
      <header className="h-[52px] shrink-0 border-b border-white/8 bg-[#0F1113]/95 backdrop-blur-md px-4 flex items-center justify-between z-40">
        <div className="flex items-center gap-3">
          
          {/* Logo & Brand Switcher */}
          <button 
            onClick={() => setActiveTab('explore')} 
            className="flex items-center gap-2 group cursor-pointer border-none bg-transparent p-0"
          >
            <span className="hf-logo flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-[#ff3d00] to-[#ff7a29] shadow-[0_0_16px_rgba(255,92,0,0.4)]">
              <svg className="w-4 h-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path d="M18.3498 9.83713L18.3339 9.65759C18.1831 7.93447 17.0963 4.69261 14.0816 4.69261C11.8445 4.69261 10.1545 6.97097 8.66311 8.97967C7.47302 10.5883 6.4419 11.9683 5.3073 11.9683C5.00574 11.9357 4.61708 11.7805 4.3792 11.4294C4.16497 11.1108 4.10948 10.7026 4.22046 10.2126C4.39489 9.43684 5.39463 8.7182 6.44963 7.95063C7.02864 7.54238 7.6238 7.10955 8.03634 6.69311C9.22643 5.5091 9.82932 4.65164 9.82932 3.2717C9.82932 1.89176 9.09157 1.20565 8.47276 0.911636C7.23514 0.323844 5.41851 0.666781 4.26026 1.69583C4.08583 1.85922 3.91117 2.01418 3.75243 2.16119C2.58622 3.23097 1.80094 3.95781 0 3.40232V5.63972C2.38791 6.72588 4.39512 4.65164 5.15675 3.69633C5.74372 3.06758 6.36253 2.70006 6.82283 2.70006H6.84671C7.05298 2.70825 7.22741 2.78995 7.35454 2.93696C7.56081 3.18204 7.64018 3.46786 7.60038 3.78622C7.51305 4.45594 6.83875 5.23967 5.60113 6.09713C4.14928 7.10159 1.7218 8.78374 1.53122 10.8987C1.3884 12.4177 2.15003 13.9365 3.34012 14.5243C6.11669 15.8798 7.80665 13.5444 9.5994 11.0783C10.9719 9.1756 12.273 7.37103 14.0818 7.37103C15.7081 7.37103 16.311 8.75916 16.311 9.63301V9.80459L16.1523 9.83713C12.2095 10.5558 10.0595 14.3611 10.0595 16.1167C10.0595 17.8724 11.5034 19.375 13.2804 19.375C15.359 19.375 17.9293 17.5458 18.3419 12.4013L18.3578 12.2136H20V9.83737H18.3498V9.83713Z" />
              </svg>
            </span>
            <span className="font-grotesk font-bold text-base tracking-tight text-white group-hover:text-[#ff5c00] transition">
              Higgsfield
            </span>
          </button>

          <div className="h-4 w-px bg-white/10 mx-1"></div>

          {/* Mode Switcher Buttons */}
          <div className="flex items-center gap-1 bg-[#18191C] p-1 rounded-xl border border-white/6">
            <button 
              onClick={() => setActiveTab('explore')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${activeTab === 'explore' ? 'bg-white/10 text-white' : 'text-[#92939e] hover:text-white'}`}
            >
              Explore
            </button>
            <button 
              onClick={() => setActiveTab('video')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${activeTab === 'video' ? 'bg-[#d1fe17] text-black shadow-sm' : 'text-[#92939e] hover:text-white'}`}
            >
              <Film className="w-3.5 h-3.5" /> Cinema Studio 4.0
            </button>
            <button 
              onClick={() => setActiveTab('image')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${activeTab === 'image' ? 'bg-[#ff5c00] text-white shadow-sm' : 'text-[#92939e] hover:text-white'}`}
            >
              <ImageIcon className="w-3.5 h-3.5" /> Image Studio
            </button>
            <button 
              onClick={navigateToGenjutsu}
              className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${activeTab === 'genjutsu' ? 'bg-gradient-to-r from-[#9333ea] to-[#ec4899] text-white shadow-[0_0_12px_rgba(236,72,153,0.35)]' : 'text-[#92939e] hover:text-white'}`}
            >
              <Zap className="w-3.5 h-3.5 text-[#f472b6]" /> Genjutsu
              <span className="text-[9px] bg-white/20 text-white px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">top</span>
            </button>
            <button 
              onClick={navigateToAudio}
              className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${activeTab === 'audio' ? 'bg-[#38bdf8] text-black shadow-sm' : 'text-[#92939e] hover:text-white'}`}
            >
              <Mic className="w-3.5 h-3.5" /> Audio
            </button>
            <button 
              onClick={() => setActiveTab('mcp')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${activeTab === 'mcp' ? 'bg-[#06b6d4] text-black' : 'text-[#92939e] hover:text-white'}`}
            >
              <Terminal className="w-3.5 h-3.5" /> MCP Agent
            </button>
          </div>

        </div>

        {/* Right User Bar */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-lg bg-white/5 border border-white/8 text-xs text-[#d1fe17] font-semibold">
            <Zap className="w-3.5 h-3.5 fill-[#d1fe17]" />
            <span>250 credits</span>
          </div>

          <a 
            href="https://github.com/LABCaramelo/Higgsfield" 
            target="_blank" 
            rel="noreferrer"
            className="text-xs bg-white/5 hover:bg-white/10 text-white px-3 py-1.5 rounded-lg border border-white/10 transition flex items-center gap-1 font-medium"
          >
            GitHub <ArrowUpRight className="w-3 h-3" />
          </a>

          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#3b82f6] to-[#8b5cf6] flex items-center justify-center font-bold text-xs text-white shadow">
            U
          </div>
        </div>
      </header>

      {/* =========================================================================
          VIEW 1: EXPLORE SHOWCASE
          ========================================================================= */}
      {activeTab === 'explore' && (
        <main className="flex-1 overflow-y-auto px-4 lg:px-6 py-6 space-y-10 max-w-7xl mx-auto w-full">
          {/* Top Carousel */}
          <section className="w-full">
            <ul className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
              {FEATURED_CAROUSEL.map(item => (
                <li key={item.id} className="flex-1 min-w-[320px] md:min-w-[440px]">
                  <div 
                    onClick={() => openInStudio(`${item.title}: dynamic motion clip, cinematic slow motion`, item.model, item.video)}
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

          {/* Hero Banner & Models Grid */}
          <section className="flex flex-col lg:flex-row gap-4 items-stretch">
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

              <div className="relative z-10 pt-6 flex gap-3">
                <button 
                  onClick={() => openInStudio('Seedance 2.5 Cinema ultra high fidelity video', 'seedance_2_5')}
                  className="bg-[#d1fe17] hover:brightness-110 text-black px-6 py-2.5 rounded-xl font-bold text-sm transition shadow-[0_4px_20px_rgba(209,254,23,0.35)] flex items-center gap-2"
                >
                  <Play className="w-4 h-4 fill-black" /> Cinema Studio 4.0
                </button>
                <button 
                  onClick={() => setActiveTab('image')}
                  className="bg-white/10 hover:bg-white/15 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition border border-white/10 flex items-center gap-2"
                >
                  <ImageIcon className="w-4 h-4 text-[#ff5c00]" /> Image Studio
                </button>
              </div>
            </div>

            {/* Right Grid */}
            <div className="grid flex-1 grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { name: "Seedance 2.5", sub: "The most advanced video model", tag: "TOP", icon: "https://static.higgsfield.ai/explore/image-generate-block/seedance-logo.png", action: () => openInStudio('Seedance 2.5 video', 'seedance_2_5') },
                { name: "Nano Banana Pro", sub: "Flagship ultra-sharp images", tag: "IMAGE", icon: "sparkles", action: () => setActiveTab('image') },
                { name: "Higgsfield Genjutsu", sub: "Motion Transfer & Recast", tag: "TOP", icon: "wand", action: navigateToGenjutsu },
                { name: "GPT Image 2.5", sub: "Graphic design & crisp text", tag: "IMAGE", icon: "image", action: () => setActiveTab('image') },
                { name: "Cinema Studio 4.0", sub: "Create cinematic scenes effortlessly", tag: null, icon: "https://static.higgsfield.ai/explore/image-generate-block/cinema-studio.png", action: () => setActiveTab('video') },
                { name: "Supercomputer", sub: "Agent powered by GPT-6 Astra", tag: null, icon: "https://static.higgsfield.ai/explore/image-generate-block/supercomputer-card-icon.svg", action: () => openInStudio('Supercomputer autonomous agent') }
              ].map((m, idx) => (
                <div 
                  key={idx}
                  onClick={m.action}
                  className="group cursor-pointer rounded-xl border border-white/10 bg-[#0d0d12] p-4 flex flex-col justify-between hover:border-[#ff5c00]/60 transition"
                >
                  <div className="flex items-center justify-between w-full">
                    {m.icon.startsWith('http') ? (
                      <img src={m.icon} alt={m.name} className="w-5 h-5 object-contain" />
                    ) : m.icon === 'sparkles' ? (
                      <Sparkles className="w-5 h-5 text-[#d1fe17]" />
                    ) : m.icon === 'image' ? (
                      <ImageIcon className="w-5 h-5 text-[#ff5c00]" />
                    ) : (
                      <Wand2 className="w-5 h-5 text-[#a855f7]" />
                    )}
                    {m.tag && (
                      <span className="text-[10px] uppercase font-bold px-1.5 rounded bg-[#ff5c00]/20 text-[#ff772e]">
                        {m.tag}
                      </span>
                    )}
                  </div>
                  <div className="pt-4">
                    <h4 className="font-semibold text-sm text-white group-hover:text-[#ff5c00] transition">{m.name}</h4>
                    <p className="text-[11px] text-[#92939e] leading-tight">{m.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Visual Effects */}
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
                  onClick={() => openInStudio(effect.prompt, 'seedance_2_5', effect.video)}
                  className={`group relative rounded-xl overflow-hidden cursor-pointer bg-[#0f0f15] border border-white/10 hover:border-[#ff5c00]/70 transition-all ${effect.aspect}`}
                >
                  <img 
                    src={effect.img} 
                    alt={effect.title} 
                    className="size-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center p-4 text-center gap-2">
                    <h4 className="font-grotesk font-bold text-white uppercase text-base tracking-wide">
                      {effect.title}
                    </h4>
                    <span className="bg-[#d1fe17] text-black text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                      <Sparkles className="w-3 h-3 fill-black" /> Direct Shot
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      )}

      {/* =========================================================================
          VIEW 2: REAL CINEMA STUDIO 4.0 (VIDEO WORKSPACE)
          ========================================================================= */}
      {activeTab === 'video' && (
        <div className="flex-1 flex overflow-hidden relative">
          
          {/* Accessible Folder Sidebar (231px) */}
          <aside 
            className={`h-full border-r border-white/8 bg-[#18191C] flex flex-col shrink-0 transition-all duration-200 z-30 ${sidebarCollapsed ? 'w-[56px]' : 'w-[230px]'}`}
          >
            <div className="p-2 border-b border-white/6 flex items-center justify-between">
              {!sidebarCollapsed ? (
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-6 h-6 rounded-md bg-[#d1fe17] flex items-center justify-center text-black font-extrabold text-xs shrink-0 shadow">
                    H
                  </div>
                  <span className="font-grotesk font-bold text-xs truncate text-white">Cinema Studio 4.0</span>
                </div>
              ) : (
                <div className="w-6 h-6 rounded-md bg-[#d1fe17] flex items-center justify-center text-black font-extrabold text-xs mx-auto shadow">
                  H
                </div>
              )}
              <button 
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="p-1 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-2 space-y-1">
              {[
                { id: "home", label: "Home", gradient: "from-[#222221] to-[#3B3C3A]", icon: Home, action: () => setActiveTab('explore') },
                { id: "generations", label: "My generations", gradient: "from-[#51E2E0] to-[#125C8D]", icon: Sparkles, active: true },
                { id: "images", label: "Image Studio", gradient: "from-[#ff5c00] to-[#ff7a29]", icon: ImageIcon, action: () => setActiveTab('image') },
                { id: "elements", label: "My elements", gradient: "from-[#4188BE] to-[#0E2772]", icon: Palette },
                { id: "favorites", label: "My favorites", gradient: "from-[#E251B4] to-[#8D1237]", icon: Heart },
                { id: "community", label: "Community", gradient: "from-[#A5A5A5] to-[#3D3D3D]", icon: Grid, action: () => setActiveTab('explore') }
              ].map(item => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={item.action || (() => {})}
                    className={`w-full flex items-center gap-2.5 px-2 py-1.5 rounded-xl transition text-left ${item.active ? 'bg-white/10 text-white font-medium' : 'text-[#92939e] hover:bg-white/5 hover:text-white'}`}
                  >
                    <span className={`w-6 h-6 rounded-lg bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white shrink-0 shadow-[0_2px_4px_rgba(0,0,0,0.3)]`}>
                      <Icon className="w-3.5 h-3.5" />
                    </span>
                    {!sidebarCollapsed && <span className="text-xs truncate">{item.label}</span>}
                  </button>
                );
              })}
            </div>

            {!sidebarCollapsed && (
              <div className="flex-1 overflow-y-auto px-2 pt-2 border-t border-white/6 space-y-2">
                <div className="flex items-center justify-between px-1 text-[11px] font-semibold text-[#92939e] uppercase tracking-wider">
                  <span>Projects</span>
                  <button className="hover:text-white transition">
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-0.5">
                  {[
                    "Zephyr Special",
                    "The Cully Hill Boys",
                    "Hell Grind Action",
                    "Red Flag Cinema",
                    "Kok Boru Riders"
                  ].map((pName, i) => (
                    <button
                      key={i}
                      onClick={() => openInStudio(`Project scene: ${pName}`)}
                      className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs transition text-left truncate ${i === 0 ? 'bg-white/5 text-[#d1fe17] font-semibold' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
                    >
                      <Folder className="w-3.5 h-3.5 shrink-0 opacity-50" />
                      <span className="truncate">{pName}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </aside>

          {/* Central Workspace */}
          <section className="flex-1 flex flex-col min-w-0 bg-[#0F1113] overflow-hidden relative">
            
            {/* Top Toolbar */}
            <div className="h-11 border-b border-white/6 px-4 flex items-center justify-between shrink-0 bg-[#141518]/60 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-white/90 truncate flex items-center gap-1.5">
                  <Clapperboard className="w-3.5 h-3.5 text-[#ff5c00]" />
                  {activeShot.name}
                </span>
                <span className="text-[10px] bg-[#d1fe17]/20 text-[#d1fe17] px-2 py-0.5 rounded font-mono font-bold">
                  {activeShot.model.toUpperCase()}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-[#1c1d22] p-0.5 rounded-lg border border-white/6 text-xs text-white/70">
                  <button 
                    onClick={() => setVideoAspect('16:9')}
                    className={`px-2 py-0.5 rounded text-[11px] font-medium ${videoAspect === '16:9' ? 'bg-white/10 text-white' : ''}`}
                  >
                    16:9
                  </button>
                  <button 
                    onClick={() => setVideoAspect('9:16')}
                    className={`px-2 py-0.5 rounded text-[11px] font-medium ${videoAspect === '9:16' ? 'bg-white/10 text-white' : ''}`}
                  >
                    9:16
                  </button>
                  <button 
                    onClick={() => setVideoAspect('1:1')}
                    className={`px-2 py-0.5 rounded text-[11px] font-medium ${videoAspect === '1:1' ? 'bg-white/10 text-white' : ''}`}
                  >
                    1:1
                  </button>
                </div>

                <a 
                  href={activeShot.videoUrl} 
                  download 
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 transition"
                  title="Download render"
                >
                  <Download className="w-3.5 h-3.5" />
                </a>

                <button 
                  onClick={() => copyText(activeShot.prompt)}
                  className="text-xs bg-white/5 hover:bg-white/10 text-white px-2.5 py-1 rounded-lg border border-white/10 transition flex items-center gap-1"
                >
                  {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? "Copied" : "Copy Prompt"}</span>
                </button>
              </div>
            </div>

            {/* Stage Viewport */}
            <div className="flex-1 flex flex-col items-center justify-center p-4 min-h-0 relative">
              <div className="relative w-full h-full max-h-[calc(100vh-270px)] rounded-2xl overflow-hidden bg-black/90 border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.8)] flex items-center justify-center group">
                
                {isVideoGenerating ? (
                  <div className="flex flex-col items-center gap-3 text-center p-6">
                    <div className="relative">
                      <div className="w-14 h-14 rounded-full border-4 border-[#d1fe17] border-t-transparent animate-spin"></div>
                      <Sparkles className="w-5 h-5 text-[#d1fe17] absolute inset-0 m-auto animate-pulse" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-grotesk font-bold text-white text-base">Directing Scene with {selectedVideoModel}...</h4>
                      <p className="text-xs text-[#92939e]">Solving spatial camera vectors and 60fps motion coherence</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <video 
                      ref={videoRef}
                      autoPlay 
                      loop 
                      muted={isMuted}
                      playsInline 
                      src={activeShot.videoUrl} 
                      className="size-full object-contain"
                    />

                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between p-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex items-center gap-3 text-xs">
                        <button onClick={toggleVideoPlayback} className="hover:text-[#d1fe17] transition">
                          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                        </button>
                        <button onClick={() => setIsMuted(!isMuted)} className="hover:text-white transition">
                          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                        </button>
                        <span className="font-mono text-[11px] text-white/70">00:03.20 / 00:05.00</span>
                      </div>

                      <div className="flex items-center gap-2 text-xs">
                        <span className="px-2 py-0.5 rounded bg-white/10 text-white/80 font-mono text-[10px]">
                          1080p 60fps
                        </span>
                        <span className="px-2 py-0.5 rounded bg-[#ff5c00]/20 text-[#ff772e] font-semibold text-[10px]">
                          {activeShot.camera}
                        </span>
                      </div>
                    </div>
                  </>
                )}

              </div>
            </div>

            {/* Reel Timeline */}
            <div className="h-20 shrink-0 border-t border-white/6 px-4 bg-[#141518]/90 flex items-center gap-3 overflow-x-auto hide-scrollbar z-20">
              <span className="text-[10px] uppercase font-bold text-[#92939e] shrink-0 tracking-wider">
                Reel Timeline
              </span>
              
              <div className="flex items-center gap-2">
                {shots.map((shot, idx) => (
                  <div
                    key={shot.id}
                    onClick={() => setActiveShotId(shot.id)}
                    className={`relative cursor-pointer rounded-xl overflow-hidden border transition-all shrink-0 w-28 h-14 bg-black flex items-center justify-center ${activeShotId === shot.id ? 'border-[#d1fe17] ring-2 ring-[#d1fe17]/20 scale-102' : 'border-white/10 opacity-70 hover:opacity-100'}`}
                  >
                    <img src={shot.thumb} alt={shot.name} className="size-full object-cover" />
                    <span className="absolute bottom-1 left-1.5 bg-black/70 px-1 rounded text-[9px] font-mono text-white">
                      0{idx + 1}
                    </span>
                  </div>
                ))}

                <button 
                  onClick={() => handleGenerateVideo()}
                  className="w-20 h-14 rounded-xl border border-dashed border-white/20 hover:border-[#d1fe17] text-white/50 hover:text-white flex flex-col items-center justify-center gap-1 transition shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span className="text-[9px] font-semibold">New Shot</span>
                </button>
              </div>
            </div>

            {/* Floating Cinematic Prompt Dock */}
            <div className="p-4 pt-1 pb-4 shrink-0 z-30">
              <div className="max-w-4xl mx-auto rounded-2xl border border-white/15 bg-[#18191C]/95 backdrop-blur-xl p-3 shadow-[0_12px_40px_rgba(0,0,0,0.6)] space-y-2">
                
                <div className="flex items-center gap-2">
                  <textarea 
                    rows={1}
                    value={videoPrompt}
                    onChange={e => setVideoPrompt(e.target.value)}
                    placeholder="Describe scene, character action, lighting and cinematic motion..."
                    className="w-full bg-transparent text-sm text-white placeholder-white/40 outline-none resize-none px-2 py-1 max-h-24"
                  />
                  <button 
                    onClick={() => {
                      const enhancements = [
                        "cinematic slow motion, anamorphic lens flare, photorealistic physics, 8k textures",
                        "dramatic rim light, high temporal coherence, natural camera tracking, fine particle simulation",
                        "hyper-detailed depth of field, 35mm film grain, dynamic lighting transitions, realistic motion"
                      ];
                      const chosen = enhancements[Math.floor(Math.random() * enhancements.length)];
                      setVideoPrompt(prev => prev + ", " + chosen);
                    }}
                    title="Synthesize 5s Motion Prompt"
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#a855f7] hover:text-white transition shrink-0"
                  >
                    <Wand2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-white/6">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    
                    {/* Model Pill */}
                    <div className="relative">
                      <button 
                        onClick={() => setShowVideoModelPicker(!showVideoModelPicker)}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/8 text-xs text-white font-medium transition"
                      >
                        <Film className="w-3 h-3 text-[#ff5c00]" />
                        <span>{selectedVideoModel === 'seedance_2_5' ? 'Seedance 2.5 Cinema' : selectedVideoModel === 'kling3_0' ? 'Kling 3.0' : selectedVideoModel === 'veo_3_1' ? 'Veo 3.1' : 'Genjutsu'}</span>
                        <ChevronDown className="w-3 h-3 opacity-60" />
                      </button>

                      {showVideoModelPicker && (
                        <div className="absolute bottom-full left-0 mb-2 w-48 rounded-xl bg-[#1d1e24] border border-white/10 p-1 shadow-2xl z-50 text-xs">
                          {[
                            { id: 'seedance_2_5', label: 'Seedance 2.5 Cinema' },
                            { id: 'kling3_0', label: 'Kling 3.0 Pro' },
                            { id: 'veo_3_1', label: 'Google Veo 3.1' },
                            { id: 'genjutsu', label: 'Higgsfield Genjutsu' },
                            { id: 'katana', label: 'Higgsfield Katana' },
                          ].map(m => (
                            <button
                              key={m.id}
                              onClick={() => { setSelectedVideoModel(m.id); setShowVideoModelPicker(false); }}
                              className={`w-full text-left px-2.5 py-1.5 rounded-lg transition ${selectedVideoModel === m.id ? 'bg-[#d1fe17] text-black font-bold' : 'hover:bg-white/5 text-white'}`}
                            >
                              {m.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Camera Movement Pill */}
                    <div className="relative">
                      <button 
                        onClick={() => setShowCameraPicker(!showCameraPicker)}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/8 text-xs text-white font-medium transition"
                      >
                        <Camera className="w-3 h-3 text-[#38bdf8]" />
                        <span className="capitalize">{cameraPreset.replace('_', ' ')}</span>
                        <ChevronDown className="w-3 h-3 opacity-60" />
                      </button>

                      {showCameraPicker && (
                        <div className="absolute bottom-full left-0 mb-2 w-44 rounded-xl bg-[#1d1e24] border border-white/10 p-1 shadow-2xl z-50 text-xs">
                          {[
                            { id: 'camera_push', label: 'Push-In' },
                            { id: 'camera_pull', label: 'Pull-Out' },
                            { id: 'orbit_pan', label: 'Orbit 45°' },
                            { id: 'tracking_shot', label: 'Tracking Shot' },
                            { id: 'drone_sweep', label: 'Crane Rise' }
                          ].map(c => (
                            <button
                              key={c.id}
                              onClick={() => { setCameraPreset(c.id); setShowCameraPicker(false); }}
                              className={`w-full text-left px-2.5 py-1.5 rounded-lg transition ${cameraPreset === c.id ? 'bg-[#38bdf8] text-black font-bold' : 'hover:bg-white/5 text-white'}`}
                            >
                              {c.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Color Palette Pill */}
                    <div className="relative">
                      <button 
                        onClick={() => setShowPalettePicker(!showPalettePicker)}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/8 text-xs text-white font-medium transition"
                      >
                        <Palette className="w-3 h-3 text-[#f472b6]" />
                        <span className="capitalize">{colorPalette.replace('_', ' ')}</span>
                        <ChevronDown className="w-3 h-3 opacity-60" />
                      </button>

                      {showPalettePicker && (
                        <div className="absolute bottom-full left-0 mb-2 w-44 rounded-xl bg-[#1d1e24] border border-white/10 p-1 shadow-2xl z-50 text-xs">
                          {[
                            { id: 'neon_obsidian', label: 'Neon Obsidian' },
                            { id: 'golden_hour', label: 'Golden Hour' },
                            { id: 'cyber_cyan', label: 'Cyberpunk Cyan' },
                            { id: 'kodak_35mm', label: 'Kodak 35mm' },
                          ].map(pal => (
                            <button
                              key={pal.id}
                              onClick={() => { setColorPalette(pal.id); setShowPalettePicker(false); }}
                              className={`w-full text-left px-2.5 py-1.5 rounded-lg transition ${colorPalette === pal.id ? 'bg-[#f472b6] text-black font-bold' : 'hover:bg-white/5 text-white'}`}
                            >
                              {pal.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <span className="px-2 py-1 rounded-lg bg-white/5 border border-white/8 text-[11px] text-white/70 font-mono">
                      5 sec
                    </span>
                  </div>

                  <button 
                    onClick={handleGenerateVideo}
                    disabled={isVideoGenerating}
                    className="bg-[#d1fe17] hover:brightness-110 disabled:opacity-50 text-black px-5 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition shadow-[0_4px_16px_rgba(209,254,23,0.35)] cursor-pointer"
                  >
                    {isVideoGenerating ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Rendering...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5 fill-black" /> Generate Shot • 25 credits
                      </>
                    )}
                  </button>
                </div>

              </div>
            </div>

          </section>

        </div>
      )}

      {/* =========================================================================
          VIEW 3: REAL HIGGSFIELD IMAGE STUDIO (/ai/image)
          ========================================================================= */}
      {activeTab === 'image' && (
        <div className="flex-1 flex overflow-hidden relative">
          
          {/* Image Studio Left Sidebar */}
          <aside 
            className={`h-full border-r border-white/8 bg-[#18191C] flex flex-col shrink-0 transition-all duration-200 z-30 ${sidebarCollapsed ? 'w-[56px]' : 'w-[230px]'}`}
          >
            <div className="p-2 border-b border-white/6 flex items-center justify-between">
              {!sidebarCollapsed ? (
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-6 h-6 rounded-md bg-[#ff5c00] flex items-center justify-center text-white font-extrabold text-xs shrink-0 shadow">
                    <ImageIcon className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-grotesk font-bold text-xs truncate text-white">Image Studio</span>
                </div>
              ) : (
                <div className="w-6 h-6 rounded-md bg-[#ff5c00] flex items-center justify-center text-white font-extrabold text-xs mx-auto shadow">
                  <ImageIcon className="w-3.5 h-3.5" />
                </div>
              )}
              <button 
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="p-1 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-2 space-y-1">
              {[
                { id: "home", label: "Home", gradient: "from-[#222221] to-[#3B3C3A]", icon: Home, action: () => setActiveTab('explore') },
                { id: "cinema", label: "Cinema Studio", gradient: "from-[#d1fe17] to-[#829b19]", icon: Film, action: () => setActiveTab('video') },
                { id: "generations", label: "My images", gradient: "from-[#ff5c00] to-[#ff7a29]", icon: ImageIcon, active: true },
                { id: "elements", label: "My elements", gradient: "from-[#4188BE] to-[#0E2772]", icon: Palette },
                { id: "favorites", label: "My favorites", gradient: "from-[#E251B4] to-[#8D1237]", icon: Heart },
                { id: "community", label: "Community", gradient: "from-[#A5A5A5] to-[#3D3D3D]", icon: Grid, action: () => setActiveTab('explore') }
              ].map(item => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={item.action || (() => {})}
                    className={`w-full flex items-center gap-2.5 px-2 py-1.5 rounded-xl transition text-left ${item.active ? 'bg-white/10 text-white font-medium' : 'text-[#92939e] hover:bg-white/5 hover:text-white'}`}
                  >
                    <span className={`w-6 h-6 rounded-lg bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white shrink-0 shadow-[0_2px_4px_rgba(0,0,0,0.3)]`}>
                      <Icon className="w-3.5 h-3.5" />
                    </span>
                    {!sidebarCollapsed && <span className="text-xs truncate">{item.label}</span>}
                  </button>
                );
              })}
            </div>

            {!sidebarCollapsed && (
              <div className="flex-1 overflow-y-auto px-2 pt-2 border-t border-white/6 space-y-2">
                <div className="flex items-center justify-between px-1 text-[11px] font-semibold text-[#92939e] uppercase tracking-wider">
                  <span>Image Styles</span>
                </div>

                <div className="space-y-0.5">
                  {[
                    { name: "Photorealistic 35mm Raw", style: "photorealistic_raw" },
                    { name: "High-Fashion Editorial", style: "fashion_editorial" },
                    { name: "Cyberpunk & Neon", style: "cyberpunk_neon" },
                    { name: "Concept Digital Art", style: "concept_art" },
                    { name: "Product & Commercial", style: "commercial_macro" }
                  ].map((st, i) => (
                    <button
                      key={i}
                      onClick={() => setImageStyle(st.style)}
                      className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs transition text-left truncate ${imageStyle === st.style ? 'bg-white/5 text-[#ff5c00] font-semibold' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
                    >
                      <Palette className="w-3.5 h-3.5 shrink-0 opacity-50" />
                      <span className="truncate">{st.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </aside>

          {/* Image Studio Central Canvas */}
          <section className="flex-1 flex flex-col min-w-0 bg-[#0F1113] overflow-hidden relative">
            
            {/* Top Toolbar */}
            <div className="h-11 border-b border-white/6 px-4 flex items-center justify-between shrink-0 bg-[#141518]/60 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-white/90 truncate flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-[#ff5c00]" />
                  {activeImage.name}
                </span>
                <span className="text-[10px] bg-[#ff5c00]/20 text-[#ff772e] px-2 py-0.5 rounded font-mono font-bold">
                  {activeImage.modelLabel}
                </span>
                <span className="text-[10px] bg-white/10 text-white/80 px-2 py-0.5 rounded font-mono">
                  {activeImage.resolution}
                </span>
              </div>

              {/* Signature Action: Animate into Video Bridge */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => animateImageToVideo(activeImage)}
                  className="bg-gradient-to-r from-[#d1fe17] to-[#ffff14] hover:brightness-110 text-black px-3 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-[0_2px_12px_rgba(209,254,23,0.3)]"
                >
                  <Film className="w-3.5 h-3.5 fill-black" />
                  <span>Animate with Seedance 2.5</span>
                  <ArrowRight className="w-3 h-3" />
                </button>

                <a 
                  href={activeImage.url} 
                  download 
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 transition"
                  title="Download image"
                >
                  <Download className="w-3.5 h-3.5" />
                </a>

                <button 
                  onClick={() => copyText(activeImage.prompt)}
                  className="text-xs bg-white/5 hover:bg-white/10 text-white px-2.5 py-1 rounded-lg border border-white/10 transition flex items-center gap-1"
                >
                  {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? "Copied" : "Copy Prompt"}</span>
                </button>
              </div>
            </div>

            {/* Central High-Resolution Viewport */}
            <div className="flex-1 flex flex-col items-center justify-center p-4 min-h-0 relative">
              <div className="relative w-full h-full max-h-[calc(100vh-270px)] rounded-2xl overflow-hidden bg-black/90 border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.8)] flex items-center justify-center group">
                
                {isImageGenerating ? (
                  <div className="flex flex-col items-center gap-3 text-center p-6">
                    <div className="relative">
                      <div className="w-14 h-14 rounded-full border-4 border-[#ff5c00] border-t-transparent animate-spin"></div>
                      <Sparkles className="w-5 h-5 text-[#ff5c00] absolute inset-0 m-auto animate-pulse" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-grotesk font-bold text-white text-base">Rendering with {selectedImageModel === 'nano_banana_2' ? 'Nano Banana Pro' : 'GPT Image 2.5'}...</h4>
                      <p className="text-xs text-[#92939e]">Synthesizing sub-pixel texture maps and optical lighting</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <img 
                      src={activeImage.url} 
                      alt={activeImage.name} 
                      className="size-full object-contain"
                    />

                    {/* Overlay Prompt Inspector */}
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between p-2.5 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-xs text-white/90 truncate pr-4">
                        <span className="text-[#ff5c00] font-semibold">Prompt: </span>
                        {activeImage.prompt}
                      </p>
                      <button
                        onClick={() => animateImageToVideo(activeImage)}
                        className="bg-[#d1fe17] text-black text-[11px] font-bold px-3 py-1 rounded-lg shrink-0 flex items-center gap-1 shadow"
                      >
                        <Play className="w-3 h-3 fill-black" /> Animate Motion
                      </button>
                    </div>
                  </>
                )}

              </div>
            </div>

            {/* Recent Images Strip */}
            <div className="h-20 shrink-0 border-t border-white/6 px-4 bg-[#141518]/90 flex items-center gap-3 overflow-x-auto hide-scrollbar z-20">
              <span className="text-[10px] uppercase font-bold text-[#92939e] shrink-0 tracking-wider">
                Gallery Strip
              </span>
              
              <div className="flex items-center gap-2">
                {images.map((img, idx) => (
                  <div
                    key={img.id}
                    onClick={() => setActiveImageId(img.id)}
                    className={`relative cursor-pointer rounded-xl overflow-hidden border transition-all shrink-0 w-20 h-14 bg-black flex items-center justify-center ${activeImageId === img.id ? 'border-[#ff5c00] ring-2 ring-[#ff5c00]/30 scale-102' : 'border-white/10 opacity-70 hover:opacity-100'}`}
                  >
                    <img src={img.url} alt={img.name} className="size-full object-cover" />
                    <span className="absolute bottom-1 left-1 bg-black/70 px-1 rounded text-[8px] font-mono text-white">
                      0{idx + 1}
                    </span>
                  </div>
                ))}

                <button 
                  onClick={() => handleGenerateImage()}
                  className="w-16 h-14 rounded-xl border border-dashed border-white/20 hover:border-[#ff5c00] text-white/50 hover:text-white flex flex-col items-center justify-center gap-1 transition shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span className="text-[9px] font-semibold">New</span>
                </button>
              </div>
            </div>

            {/* Floating Image Prompt Dock */}
            <div className="p-4 pt-1 pb-4 shrink-0 z-30">
              <div className="max-w-4xl mx-auto rounded-2xl border border-white/15 bg-[#18191C]/95 backdrop-blur-xl p-3 shadow-[0_12px_40px_rgba(0,0,0,0.6)] space-y-2">
                
                <div className="flex items-center gap-2">
                  <textarea 
                    rows={1}
                    value={imagePrompt}
                    onChange={e => setImagePrompt(e.target.value)}
                    placeholder="Describe your subject, camera lens, lighting and composition in detail..."
                    className="w-full bg-transparent text-sm text-white placeholder-white/40 outline-none resize-none px-2 py-1 max-h-24"
                  />
                  <button 
                    onClick={() => {
                      const enhancements = [
                        "Leica 35mm f/1.4 Summilux, Kodak Portra 400 film grain, soft natural window key light, 8k textures",
                        "Hasselblad H6D-100c medium format, studio editorial rim lighting, hyper-realistic skin pores, volumetric shadows",
                        "raw uncompressed photograph, dramatic chiaroscuro contrast, ultra-sharp detail, cinematic atmosphere"
                      ];
                      const chosen = enhancements[Math.floor(Math.random() * enhancements.length)];
                      setImagePrompt(prev => prev + ", " + chosen);
                    }}
                    title="Enhance Image Prompt"
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#ff5c00] hover:text-white transition shrink-0"
                  >
                    <Wand2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-white/6">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    
                    {/* Model Pill */}
                    <div className="relative">
                      <button 
                        onClick={() => setShowImageModelPicker(!showImageModelPicker)}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/8 text-xs text-white font-medium transition"
                      >
                        <ImageIcon className="w-3 h-3 text-[#ff5c00]" />
                        <span>{selectedImageModel === 'nano_banana_2' ? 'Nano Banana Pro' : selectedImageModel === 'gpt_image_2_5' ? 'GPT Image 2.5' : 'FLUX.2 Pro'}</span>
                        <ChevronDown className="w-3 h-3 opacity-60" />
                      </button>

                      {showImageModelPicker && (
                        <div className="absolute bottom-full left-0 mb-2 w-48 rounded-xl bg-[#1d1e24] border border-white/10 p-1 shadow-2xl z-50 text-xs">
                          {[
                            { id: 'nano_banana_2', label: 'Nano Banana Pro (Flagship)' },
                            { id: 'gpt_image_2_5', label: 'GPT Image 2.5' },
                            { id: 'flux_2', label: 'FLUX.2 Pro' },
                            { id: 'text2image_soul_v2', label: 'Higgsfield Soul V2' },
                            { id: 'cinematic_studio_2_5', label: 'Cinematic Studio 2.5' },
                          ].map(m => (
                            <button
                              key={m.id}
                              onClick={() => { setSelectedImageModel(m.id); setShowImageModelPicker(false); }}
                              className={`w-full text-left px-2.5 py-1.5 rounded-lg transition ${selectedImageModel === m.id ? 'bg-[#ff5c00] text-white font-bold' : 'hover:bg-white/5 text-white'}`}
                            >
                              {m.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Aspect Ratio Pill */}
                    <div className="flex items-center gap-1 bg-[#141518] p-0.5 rounded-lg border border-white/6 text-xs text-white/70">
                      {[
                        { id: '1:1', label: '1:1' },
                        { id: '9:16', label: '9:16' },
                        { id: '16:9', label: '16:9' },
                        { id: '4:5', label: '4:5' }
                      ].map(r => (
                        <button
                          key={r.id}
                          onClick={() => setImageAspect(r.id)}
                          className={`px-2 py-0.5 rounded text-[11px] font-medium transition ${imageAspect === r.id ? 'bg-white/10 text-white font-bold' : ''}`}
                        >
                          {r.label}
                        </button>
                      ))}
                    </div>

                    {/* Style Preset Pill */}
                    <div className="relative">
                      <button 
                        onClick={() => setShowImageStylePicker(!showImageStylePicker)}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/8 text-xs text-white font-medium transition"
                      >
                        <Palette className="w-3 h-3 text-[#a855f7]" />
                        <span className="capitalize">{imageStyle.replace('_', ' ')}</span>
                        <ChevronDown className="w-3 h-3 opacity-60" />
                      </button>

                      {showImageStylePicker && (
                        <div className="absolute bottom-full left-0 mb-2 w-48 rounded-xl bg-[#1d1e24] border border-white/10 p-1 shadow-2xl z-50 text-xs">
                          {[
                            { id: 'photorealistic_raw', label: 'Photorealistic Raw 35mm' },
                            { id: 'fashion_editorial', label: 'Fashion Editorial' },
                            { id: 'cyberpunk_neon', label: 'Cyberpunk Neon' },
                            { id: 'concept_art', label: 'Digital Concept Art' },
                            { id: 'commercial_macro', label: 'Commercial Macro' }
                          ].map(st => (
                            <button
                              key={st.id}
                              onClick={() => { setImageStyle(st.id); setShowImageStylePicker(false); }}
                              className={`w-full text-left px-2.5 py-1.5 rounded-lg transition ${imageStyle === st.style ? 'bg-[#a855f7] text-white font-bold' : 'hover:bg-white/5 text-white'}`}
                            >
                              {st.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <span className="px-2 py-1 rounded-lg bg-white/5 border border-white/8 text-[11px] text-white/70 font-mono">
                      4K UHD
                    </span>
                  </div>

                  <button 
                    onClick={handleGenerateImage}
                    disabled={isImageGenerating}
                    className="bg-[#ff5c00] hover:bg-[#ff701a] disabled:opacity-50 text-white px-5 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition shadow-[0_4px_16px_rgba(255,92,0,0.35)] cursor-pointer"
                  >
                    {isImageGenerating ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5 fill-white" /> Generate Image • 10 credits
                      </>
                    )}
                  </button>
                </div>

              </div>
            </div>

          </section>

        </div>
      )}

      {/* =========================================================================
          VIEW 3.5: GENJUTSU MOTION TRANSFER & RECAST STUDIO (/ai/video?model=genjutsu)
          ========================================================================= */}
      {activeTab === 'genjutsu' && (
        <div className="flex-1 flex overflow-hidden">
          
          {/* LEFT CONTROL SIDEBAR: MOTION DRIVER & TARGET SUBJECT */}
          <aside className="w-[340px] shrink-0 border-r border-white/8 bg-[#121316] flex flex-col overflow-y-auto">
            {/* Header Badge */}
            <div className="p-4 border-b border-white/8 flex items-center justify-between bg-gradient-to-r from-[#9333ea]/15 to-[#ec4899]/15">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#9333ea] to-[#ec4899] flex items-center justify-center text-white shadow-[0_0_12px_rgba(236,72,153,0.4)]">
                  <Zap className="w-4 h-4 fill-white" />
                </span>
                <div>
                  <h3 className="font-bold text-sm text-white flex items-center gap-1.5">
                    Higgsfield Genjutsu
                    <span className="text-[9px] bg-[#ec4899]/30 text-[#f472b6] border border-[#ec4899]/50 px-1 rounded uppercase font-bold">2.0</span>
                  </h3>
                  <p className="text-[11px] text-[#92939e]">Motion Transfer & Recast Engine</p>
                </div>
              </div>
            </div>

            <div className="p-4 space-y-5">
              {/* 4 Genjutsu Modes */}
              <div>
                <label className="text-[10px] font-bold text-[#92939e] uppercase tracking-wider block mb-2">
                  Genjutsu Engine Mode
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { id: 'motion_transfer', label: 'Motion Transfer', icon: Zap, desc: 'Image + Motion Driver' },
                    { id: 'recast', label: 'Recast / Swap', icon: UserCheck, desc: 'Keep Motion, Swap Subject' },
                    { id: 'restyle', label: 'Restyle Redraw', icon: Palette, desc: 'Anime / CGI Video Redraw' },
                    { id: 'object_swap', label: 'Object Swap', icon: Repeat, desc: 'Swap Items or Clothes' },
                  ].map(mode => (
                    <button
                      key={mode.id}
                      onClick={() => setGenjutsuMode(mode.id)}
                      className={`p-2.5 rounded-xl border text-left transition flex flex-col gap-1 ${genjutsuMode === mode.id ? 'bg-[#9333ea]/20 border-[#ec4899] text-white shadow-[0_0_12px_rgba(236,72,153,0.2)]' : 'bg-white/3 border-white/6 hover:bg-white/6 text-white/70'}`}
                    >
                      <div className="flex items-center gap-1.5">
                        <mode.icon className={`w-3.5 h-3.5 ${genjutsuMode === mode.id ? 'text-[#ec4899]' : 'text-white/50'}`} />
                        <span className="text-xs font-bold leading-tight">{mode.label}</span>
                      </div>
                      <span className="text-[9px] text-[#92939e]">{mode.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 1: Motion Driver Selection */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[10px] font-bold text-[#92939e] uppercase tracking-wider">
                    1. Motion Driver (Reference Video)
                  </label>
                  <span className="text-[10px] text-[#ec4899] font-mono">{activeMotion.fps}</span>
                </div>
                
                <div className="space-y-2">
                  {GENJUTSU_MOTION_PRESETS.map(preset => (
                    <div
                      key={preset.id}
                      onClick={() => setSelectedMotionId(preset.id)}
                      className={`p-2 rounded-xl border cursor-pointer transition flex items-center gap-2.5 ${selectedMotionId === preset.id ? 'bg-[#9333ea]/15 border-[#a855f7] ring-1 ring-[#a855f7]/40' : 'bg-white/3 border-white/6 hover:bg-white/6'}`}
                    >
                      <div className="relative w-14 h-11 rounded-lg overflow-hidden shrink-0 bg-black">
                        <img src={preset.thumb} alt={preset.title} className="w-full h-full object-cover" />
                        <span className="absolute bottom-0.5 right-0.5 bg-black/80 px-1 rounded text-[8px] font-mono text-white">
                          {preset.duration}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-bold text-white truncate">{preset.title}</p>
                          <span className="text-[9px] text-white/50 font-mono">{preset.fps}</span>
                        </div>
                        <p className="text-[10px] text-[#92939e] truncate">{preset.description}</p>
                      </div>
                    </div>
                  ))}

                  <div className="border border-dashed border-white/15 hover:border-[#ec4899]/50 rounded-xl p-2.5 text-center cursor-pointer transition bg-white/2 hover:bg-white/4">
                    <Upload className="w-3.5 h-3.5 text-white/60 mx-auto mb-1" />
                    <p className="text-[11px] font-semibold text-white">Upload Custom Motion Clip</p>
                    <p className="text-[9px] text-[#92939e]">Supports MP4, MOV up to 30s (Max 50MB)</p>
                  </div>
                </div>
              </div>

              {/* Step 2: Target Character / Subject */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[10px] font-bold text-[#92939e] uppercase tracking-wider">
                    2. Target Subject (Character Image)
                  </label>
                  <span className="text-[10px] text-[#4ade80] font-mono">{activeCharacter.badge}</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {GENJUTSU_CHARACTER_PRESETS.map(char => (
                    <div
                      key={char.id}
                      onClick={() => setSelectedCharacterId(char.id)}
                      className={`p-2 rounded-xl border cursor-pointer transition flex flex-col gap-1.5 ${selectedCharacterId === char.id ? 'bg-[#9333ea]/15 border-[#ec4899] ring-1 ring-[#ec4899]/40' : 'bg-white/3 border-white/6 hover:bg-white/6'}`}
                    >
                      <div className="aspect-square w-full rounded-lg overflow-hidden bg-black relative">
                        <img src={char.imgUrl} alt={char.name} className="w-full h-full object-cover" />
                        <span className="absolute bottom-1 left-1 bg-black/80 px-1 rounded text-[8px] font-mono text-[#f472b6]">
                          {char.badge}
                        </span>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white truncate">{char.name}</p>
                        <p className="text-[9px] text-[#92939e] truncate">{char.style}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-2 border border-dashed border-white/15 hover:border-[#a855f7]/50 rounded-xl p-2.5 text-center cursor-pointer transition bg-white/2 hover:bg-white/4">
                  <ImageIcon className="w-3.5 h-3.5 text-white/60 mx-auto mb-1" />
                  <p className="text-[11px] font-semibold text-white">Upload New Soul / Character</p>
                  <p className="text-[9px] text-[#92939e]">JPG, PNG, WebP with clear facial details</p>
                </div>
              </div>

              {/* Step 3: Engine Fine-Tuning */}
              <div className="space-y-3 pt-2 border-t border-white/8">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-[10px] font-bold text-[#92939e] uppercase tracking-wider flex items-center gap-1">
                      Character Orientation
                      <Info className="w-3 h-3 text-white/40" />
                    </label>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 bg-black/40 p-1 rounded-xl border border-white/6">
                    <button
                      onClick={() => setCharacterOrientation('match_video')}
                      className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition ${characterOrientation === 'match_video' ? 'bg-[#9333ea] text-white shadow' : 'text-[#92939e] hover:text-white'}`}
                    >
                      Match Video
                    </button>
                    <button
                      onClick={() => setCharacterOrientation('match_image')}
                      className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition ${characterOrientation === 'match_image' ? 'bg-[#9333ea] text-white shadow' : 'text-[#92939e] hover:text-white'}`}
                    >
                      Match Image
                    </button>
                  </div>
                  <p className="text-[9px] text-[#92939e] mt-1 leading-tight">
                    {characterOrientation === 'match_video' 
                      ? "Matches body trajectory and limb mechanics for fast choreography." 
                      : "Preserves initial framing and facial geometry against motion warp."}
                  </p>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-[#92939e] uppercase tracking-wider block mb-1.5">
                    Motion Dynamic Scale
                  </label>
                  <div className="grid grid-cols-2 gap-1.5 bg-black/40 p-1 rounded-xl border border-white/6">
                    <button
                      onClick={() => setMotionDynamicScale('balanced')}
                      className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition ${motionDynamicScale === 'balanced' ? 'bg-[#a855f7] text-white shadow' : 'text-[#92939e] hover:text-white'}`}
                    >
                      Balanced (1x)
                    </button>
                    <button
                      onClick={() => setMotionDynamicScale('high_dynamic')}
                      className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition ${motionDynamicScale === 'high_dynamic' ? 'bg-[#ec4899] text-white shadow' : 'text-[#92939e] hover:text-white'}`}
                    >
                      Kinetic (1.5x)
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-[#92939e] uppercase tracking-wider block mb-1.5">
                      Aspect Ratio
                    </label>
                    <select
                      value={genjutsuAspect}
                      onChange={e => setGenjutsuAspect(e.target.value)}
                      className="w-full bg-[#18191C] border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-white outline-none"
                    >
                      <option value="9:16">9:16 (Stories/Reels)</option>
                      <option value="16:9">16:9 (Cinema)</option>
                      <option value="1:1">1:1 (Square)</option>
                      <option value="4:5">4:5 (Portrait Feed)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-[#92939e] uppercase tracking-wider block mb-1.5">
                      Clip Duration
                    </label>
                    <select
                      value={genjutsuDuration}
                      onChange={e => setGenjutsuDuration(e.target.value)}
                      className="w-full bg-[#18191C] border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-white outline-none"
                    >
                      <option value="3s">3 seconds</option>
                      <option value="5s">5 seconds (Optimal)</option>
                      <option value="8s">8 seconds</option>
                      <option value="15s">15 seconds (Extended)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* MAIN DUAL VIEWPORT & MOTION WORKSPACE */}
          <section className="flex-1 flex flex-col overflow-hidden bg-[#0F1113]">
            {/* Viewport Action Bar */}
            <div className="h-12 border-b border-white/8 px-4 flex items-center justify-between bg-[#141518]/80 backdrop-blur-sm z-10">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-[#ec4899]" />
                  <span>{activeMotion.title}</span>
                  <span className="text-[#92939e]">➔</span>
                  <span className="text-[#f472b6] font-bold">{activeCharacter.name}</span>
                </span>
                <span className="hidden sm:inline-block text-[11px] text-white/50 border border-white/10 bg-white/5 px-2 py-0.5 rounded-full font-mono">
                  1080p • {activeMotion.fps} • Temporal Lock ON
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* View Mode Switcher */}
                <div className="flex items-center bg-black/40 p-1 rounded-xl border border-white/6 text-xs">
                  <button
                    onClick={() => setGenjutsuViewMode('side_by_side')}
                    className={`px-2.5 py-1 rounded-lg font-medium transition ${genjutsuViewMode === 'side_by_side' ? 'bg-white/15 text-white' : 'text-[#92939e] hover:text-white'}`}
                  >
                    Side-by-Side
                  </button>
                  <button
                    onClick={() => setGenjutsuViewMode('split')}
                    className={`px-2.5 py-1 rounded-lg font-medium transition ${genjutsuViewMode === 'split' ? 'bg-white/15 text-white' : 'text-[#92939e] hover:text-white'}`}
                  >
                    Split View
                  </button>
                  <button
                    onClick={() => setGenjutsuViewMode('result')}
                    className={`px-2.5 py-1 rounded-lg font-medium transition ${genjutsuViewMode === 'result' ? 'bg-white/15 text-white' : 'text-[#92939e] hover:text-white'}`}
                  >
                    Result Only
                  </button>
                </div>

                {/* Send to Cinema Studio Bridge */}
                <button
                  onClick={handleSendGenjutsuToCinema}
                  className="bg-[#d1fe17] hover:bg-[#b8e212] text-black font-bold text-xs px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Film className="w-3.5 h-3.5" />
                  <span>Open in Cinema 4.0</span>
                </button>
              </div>
            </div>

            {/* Central Viewport Stage */}
            <div className="flex-1 p-4 lg:p-6 flex items-center justify-center overflow-hidden">
              <div className="w-full max-w-5xl h-full flex flex-col items-center justify-center">
                
                {/* Side-by-Side Mode */}
                {genjutsuViewMode === 'side_by_side' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full h-[460px] max-h-[70vh]">
                    
                    {/* Motion Driver Source */}
                    <div className="relative rounded-2xl overflow-hidden bg-black border border-white/10 flex flex-col shadow-2xl group">
                      <div className="absolute top-3 left-3 z-20 flex items-center gap-2">
                        <span className="bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-bold text-white uppercase tracking-wider border border-white/10 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#3b82f6] animate-pulse" />
                          Motion Driver (Source)
                        </span>
                        <span className="bg-black/60 px-2 py-0.5 rounded text-[9px] font-mono text-white/70">
                          {activeMotion.fps}
                        </span>
                      </div>

                      <video 
                        ref={motionVideoRef}
                        src={activeMotion.videoUrl} 
                        className="w-full h-full object-cover" 
                        loop 
                        autoPlay 
                        muted 
                        playsInline
                      />

                      <div className="absolute bottom-3 inset-x-3 z-20 flex items-center justify-between bg-black/60 backdrop-blur-md p-2 rounded-xl border border-white/10">
                        <span className="text-[11px] text-white font-medium truncate">{activeMotion.title}</span>
                        <span className="text-[10px] text-[#92939e] font-mono">{activeMotion.duration}</span>
                      </div>
                    </div>

                    {/* Genjutsu Synthesized Result */}
                    <div className="relative rounded-2xl overflow-hidden bg-black border border-[#ec4899]/40 flex flex-col shadow-[0_0_30px_rgba(236,72,153,0.15)] group">
                      <div className="absolute top-3 left-3 z-20 flex items-center gap-2">
                        <span className="bg-gradient-to-r from-[#9333ea] to-[#ec4899] px-2.5 py-1 rounded-lg text-[10px] font-bold text-white uppercase tracking-wider border border-white/20 shadow-md flex items-center gap-1.5">
                          <Zap className="w-3 h-3 fill-white" />
                          Genjutsu 2.0 Output
                        </span>
                        <span className="bg-black/60 px-2 py-0.5 rounded text-[9px] font-mono text-[#f472b6]">
                          Matched
                        </span>
                      </div>

                      <div className="absolute top-3 right-3 z-20">
                        <span className="bg-black/80 px-2.5 py-1 rounded-lg text-[10px] font-mono text-[#d1fe17] border border-white/10">
                          1080p Cinema
                        </span>
                      </div>

                      {/* Video Output / Animated Canvas */}
                      <video 
                        ref={outputVideoRef}
                        src={activeMotion.videoUrl} 
                        className="w-full h-full object-cover filter contrast-105 saturate-110" 
                        loop 
                        autoPlay 
                        muted 
                        playsInline
                      />

                      {/* Overlay Character Tag & Controls */}
                      <div className="absolute bottom-3 inset-x-3 z-20 flex items-center justify-between bg-black/70 backdrop-blur-md p-2.5 rounded-xl border border-white/15">
                        <div className="flex items-center gap-2">
                          <img src={activeCharacter.imgUrl} alt={activeCharacter.name} className="w-7 h-7 rounded-lg object-cover border border-[#ec4899]" />
                          <div>
                            <p className="text-[11px] font-bold text-white leading-none">{activeCharacter.name}</p>
                            <p className="text-[9px] text-[#f472b6]">{characterOrientation === 'match_video' ? 'Kinetic Trajectory' : 'Framing Locked'}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button 
                            onClick={handleSyncPlayToggle}
                            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
                          >
                            {isGenjutsuPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                          </button>
                          <button 
                            onClick={() => copyText(genjutsuPrompt)}
                            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
                            title="Copy Prompt"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                    </div>

                  </div>
                )}

                {/* Split Screen Mode */}
                {genjutsuViewMode === 'split' && (
                  <div className="relative w-full max-w-2xl h-[480px] rounded-2xl overflow-hidden border border-[#ec4899]/30 bg-black shadow-2xl">
                    <video 
                      src={activeMotion.videoUrl} 
                      className="w-full h-full object-cover" 
                      loop 
                      autoPlay 
                      muted 
                      playsInline
                    />
                    <div className="absolute inset-y-0 left-1/2 w-0.5 bg-[#ec4899] shadow-[0_0_12px_#ec4899] z-20">
                      <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-[#ec4899] text-white flex items-center justify-center shadow-lg">
                        <Split className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <span className="absolute top-4 left-4 bg-black/80 px-2.5 py-1 rounded-lg text-xs font-bold text-white uppercase border border-white/10">
                      Driver: {activeMotion.title}
                    </span>
                    <span className="absolute top-4 right-4 bg-gradient-to-r from-[#9333ea] to-[#ec4899] px-2.5 py-1 rounded-lg text-xs font-bold text-white uppercase border border-white/20">
                      Target: {activeCharacter.name}
                    </span>
                  </div>
                )}

                {/* Result Only Mode */}
                {genjutsuViewMode === 'result' && (
                  <div className="relative w-full max-w-2xl h-[480px] rounded-2xl overflow-hidden border border-[#ec4899]/40 bg-black shadow-2xl">
                    <video 
                      src={activeMotion.videoUrl} 
                      className="w-full h-full object-cover filter contrast-105 saturate-110" 
                      loop 
                      autoPlay 
                      muted 
                      playsInline
                    />
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-[#9333ea] to-[#ec4899] px-3 py-1.5 rounded-xl text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5 shadow-lg border border-white/20">
                      <Zap className="w-3.5 h-3.5 fill-white" />
                      {activeCharacter.name} • Full Frame
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* Floating Genjutsu Prompt Dock */}
            <div className="p-4 pt-1 pb-4 shrink-0 z-30">
              <div className="max-w-4xl mx-auto rounded-2xl border border-[#ec4899]/30 bg-[#18191C]/95 backdrop-blur-xl p-3 shadow-[0_12px_40px_rgba(0,0,0,0.6)] space-y-2">
                
                <div className="flex items-center gap-2">
                  <textarea 
                    rows={1}
                    value={genjutsuPrompt}
                    onChange={e => setGenjutsuPrompt(e.target.value)}
                    placeholder="Direct character performance, expressions, lighting, style and physical motion reactions..."
                    className="flex-1 bg-transparent border-none text-white text-sm outline-none resize-none placeholder:text-[#92939e] font-sans px-2"
                  />
                  <button 
                    onClick={() => setGenjutsuPrompt(prev => prev + ", cinematic volumetric fog, 35mm anamorphic lens flare, photorealistic skin textures")}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#f472b6] hover:text-white transition shrink-0 flex items-center gap-1 text-xs font-semibold cursor-pointer"
                    title="Enhance prompt with cinematic motion keywords"
                  >
                    <Wand2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Enhance</span>
                  </button>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-white/8 text-xs">
                  <div className="flex items-center gap-2 overflow-x-auto">
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gradient-to-r from-[#9333ea]/30 to-[#ec4899]/30 border border-[#ec4899]/40 text-xs text-white font-bold">
                      <Zap className="w-3 h-3 text-[#f472b6]" />
                      Higgsfield Genjutsu 2.0
                    </span>

                    <span className="px-2 py-1 rounded-lg bg-white/5 border border-white/8 text-[11px] text-[#f472b6] font-mono">
                      @{activeCharacter.name.split(' ')[0]}
                    </span>
                    <span className="px-2 py-1 rounded-lg bg-white/5 border border-white/8 text-[11px] text-[#60a5fa] font-mono">
                      @{activeMotion.title.split(' ')[0]}
                    </span>
                    <span className="px-2 py-1 rounded-lg bg-white/5 border border-white/8 text-[11px] text-white/70 font-mono">
                      {genjutsuAspect}
                    </span>
                    <span className="px-2 py-1 rounded-lg bg-white/5 border border-white/8 text-[11px] text-white/70 font-mono">
                      {genjutsuDuration}
                    </span>
                  </div>

                  <button 
                    onClick={handleGenerateGenjutsu}
                    disabled={isGenjutsuGenerating}
                    className="bg-gradient-to-r from-[#9333ea] to-[#ec4899] hover:from-[#a855f7] hover:to-[#f43f5e] disabled:opacity-50 text-white px-5 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition shadow-[0_4px_16px_rgba(236,72,153,0.35)] cursor-pointer"
                  >
                    {isGenjutsuGenerating ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Transferring Motion...
                      </>
                    ) : (
                      <>
                        <Zap className="w-3.5 h-3.5 fill-white" /> Transfer Motion • 15 credits
                      </>
                    )}
                  </button>
                </div>

              </div>
            </div>

          </section>

        </div>
      )}

      {/* =========================================================================
          VIEW 3.8: HIGGSFIELD AUDIO STUDIO (/audio)
          ========================================================================= */}
      {activeTab === 'audio' && (
        <div className="flex-1 flex overflow-hidden">
          
          {/* LEFT CONTROL SIDEBAR: AUDIO ENGINE & VOICE ROSTER */}
          <aside className="w-[340px] shrink-0 border-r border-white/8 bg-[#121316] flex flex-col overflow-y-auto">
            {/* Header Badge */}
            <div className="p-4 border-b border-white/8 flex items-center justify-between bg-gradient-to-r from-[#0284c7]/15 to-[#38bdf8]/15">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#0284c7] to-[#38bdf8] flex items-center justify-center text-black shadow-[0_0_12px_rgba(56,189,248,0.4)]">
                  <Mic className="w-4 h-4 fill-black" />
                </span>
                <div>
                  <h3 className="font-bold text-sm text-white flex items-center gap-1.5">
                    Higgsfield Audio
                    <span className="text-[9px] bg-[#38bdf8]/20 text-[#38bdf8] border border-[#38bdf8]/40 px-1 rounded uppercase font-bold">2.0</span>
                  </h3>
                  <p className="text-[11px] text-[#92939e]">Voice Narration & Multi-Speaker Dialogue</p>
                </div>
              </div>
            </div>

            <div className="p-4 space-y-5">
              {/* Engine Model Switcher */}
              <div>
                <label className="text-[10px] font-bold text-[#92939e] uppercase tracking-wider block mb-2">
                  Speech Synthesis Engine
                </label>
                <div className="grid grid-cols-3 gap-1 bg-black/40 p-1 rounded-xl border border-white/6 text-xs">
                  {[
                    { id: 'speak_2_0', label: 'Speak 2.0', badge: 'Flagship' },
                    { id: 'eleven_v4', label: 'Eleven v4', badge: '10 Voices' },
                    { id: 'turbo_speech', label: 'Turbo', badge: 'Fast' }
                  ].map(m => (
                    <button
                      key={m.id}
                      onClick={() => setSelectedAudioModel(m.id)}
                      className={`py-2 px-1 rounded-lg text-center transition flex flex-col items-center gap-0.5 ${selectedAudioModel === m.id ? 'bg-[#38bdf8] text-black font-bold shadow-sm' : 'text-[#92939e] hover:text-white'}`}
                    >
                      <span className="text-xs">{m.label}</span>
                      <span className={`text-[8px] uppercase tracking-wider font-mono ${selectedAudioModel === m.id ? 'text-black/70' : 'text-[#38bdf8]'}`}>{m.badge}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Voice Roster Library */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[10px] font-bold text-[#92939e] uppercase tracking-wider">
                    Voice Roster Presets
                  </label>
                  <span className="text-[10px] text-[#38bdf8] font-mono">48 kHz Studio</span>
                </div>

                <div className="space-y-2">
                  {AUDIO_VOICE_PRESETS.map(voice => (
                    <div
                      key={voice.id}
                      onClick={() => setActiveAudioSpeaker(voice.id)}
                      className={`p-2.5 rounded-xl border cursor-pointer transition flex items-center gap-3 ${activeAudioSpeaker === voice.id ? 'bg-[#0284c7]/15 border-[#38bdf8] ring-1 ring-[#38bdf8]/40' : 'bg-white/3 border-white/6 hover:bg-white/6'}`}
                    >
                      <img src={voice.avatar} alt={voice.name} className="w-10 h-10 rounded-full object-cover border border-white/10 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-bold text-white truncate">{voice.name}</p>
                          <span className="text-[9px] text-white/50 font-mono">{voice.accent}</span>
                        </div>
                        <p className="text-[10px] text-[#38bdf8] font-medium truncate">{voice.role}</p>
                        <p className="text-[9px] text-[#92939e] truncate">{voice.tone}</p>
                      </div>
                      <button 
                        onClick={(e) => { e.stopPropagation(); setIsAudioPlaying(!isAudioPlaying); }}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white transition shrink-0"
                      >
                        <Volume2 className="w-3.5 h-3.5 text-[#38bdf8]" />
                      </button>
                    </div>
                  ))}

                  <div className="border border-dashed border-white/15 hover:border-[#38bdf8]/50 rounded-xl p-2.5 text-center cursor-pointer transition bg-white/2 hover:bg-white/4">
                    <Mic className="w-3.5 h-3.5 text-white/60 mx-auto mb-1" />
                    <p className="text-[11px] font-semibold text-white">Clone New Voice</p>
                    <p className="text-[9px] text-[#92939e]">Upload 10s audio sample (MP3, WAV)</p>
                  </div>
                </div>
              </div>

              {/* Acoustic Tuning Sliders */}
              <div className="space-y-3 pt-2 border-t border-white/8">
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-[10px] font-bold text-[#92939e] uppercase">Stability</span>
                    <span className="font-mono text-[#38bdf8] text-[11px]">{audioStability}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={audioStability} 
                    onChange={e => setAudioStability(Number(e.target.value))}
                    className="w-full accent-[#38bdf8] h-1.5 bg-white/10 rounded-lg cursor-pointer"
                  />
                  <span className="text-[9px] text-[#92939e] block mt-0.5">Controls emotional range and vocal variation</span>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-[10px] font-bold text-[#92939e] uppercase">Clarity & Similarity</span>
                    <span className="font-mono text-[#38bdf8] text-[11px]">{audioSimilarity}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={audioSimilarity} 
                    onChange={e => setAudioSimilarity(Number(e.target.value))}
                    className="w-full accent-[#38bdf8] h-1.5 bg-white/10 rounded-lg cursor-pointer"
                  />
                  <span className="text-[9px] text-[#92939e] block mt-0.5">Closeness to original cloned vocal timbre</span>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-[10px] font-bold text-[#92939e] uppercase">Style Exaggeration</span>
                    <span className="font-mono text-[#38bdf8] text-[11px]">{audioExaggeration}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={audioExaggeration} 
                    onChange={e => setAudioExaggeration(Number(e.target.value))}
                    className="w-full accent-[#38bdf8] h-1.5 bg-white/10 rounded-lg cursor-pointer"
                  />
                  <span className="text-[9px] text-[#92939e] block mt-0.5">Amplifies dramatic inflections and dynamics</span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="text-[10px] font-bold text-[#92939e] uppercase tracking-wider block mb-1">
                      Pacing (Speed)
                    </label>
                    <select
                      value={audioSpeed}
                      onChange={e => setAudioSpeed(Number(e.target.value))}
                      className="w-full bg-[#18191C] border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-white outline-none"
                    >
                      <option value={0.85}>0.85x (Slow/Paced)</option>
                      <option value={1.0}>1.0x (Natural)</option>
                      <option value={1.15}>1.15x (Brisk)</option>
                      <option value={1.3}>1.30x (Dynamic)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-[#92939e] uppercase tracking-wider block mb-1">
                      Language
                    </label>
                    <select
                      value={audioLanguage}
                      onChange={e => setAudioLanguage(e.target.value)}
                      className="w-full bg-[#18191C] border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-white outline-none"
                    >
                      <option value="en">English (US/UK)</option>
                      <option value="pt">Portuguese (BR)</option>
                      <option value="es">Spanish</option>
                      <option value="ja">Japanese</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* MAIN MULTI-SPEAKER DIALOGUE CANVAS */}
          <section className="flex-1 flex flex-col overflow-hidden bg-[#0F1113]">
            {/* Action Top Bar */}
            <div className="h-12 border-b border-white/8 px-4 flex items-center justify-between bg-[#141518]/80 backdrop-blur-sm z-10">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                  <Headphones className="w-3.5 h-3.5 text-[#38bdf8]" />
                  <span>Scene Dialogue Sequence</span>
                  <span className="text-[#92939e]">({dialogueCards.length} Speakers)</span>
                </span>
                <span className="hidden sm:inline-block text-[11px] text-white/50 border border-white/10 bg-white/5 px-2 py-0.5 rounded-full font-mono">
                  14.1s Total Duration • 48 kHz Master Stereo
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleAddDialogueCard}
                  className="bg-white/10 hover:bg-white/15 text-white font-semibold text-xs px-3 py-1.5 rounded-xl transition flex items-center gap-1 border border-white/10 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Speaker Card</span>
                </button>

                <button
                  onClick={handleAttachAudioToCinema}
                  className="bg-[#d1fe17] hover:bg-[#b8e212] text-black font-bold text-xs px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Film className="w-3.5 h-3.5" />
                  <span>Attach to Cinema 4.0</span>
                </button>
              </div>
            </div>

            {/* Scrollable Dialogue Cards Container */}
            <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4">
              <div className="max-w-4xl mx-auto space-y-3.5">
                
                {dialogueCards.map((card, idx) => {
                  const assignedVoice = AUDIO_VOICE_PRESETS.find(v => v.id === card.voiceId) || AUDIO_VOICE_PRESETS[0];

                  return (
                    <div 
                      key={card.id} 
                      className="bg-[#18191C] border border-white/10 rounded-2xl p-4 shadow-xl space-y-3 transition hover:border-[#38bdf8]/40 group"
                    >
                      {/* Card Header */}
                      <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                        <div className="flex items-center gap-2.5">
                          <img src={assignedVoice.avatar} alt={assignedVoice.name} className="w-7 h-7 rounded-full object-cover border border-[#38bdf8]" />
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white">Speaker {card.speakerNumber}:</span>
                            <select
                              value={card.voiceId}
                              onChange={e => handleUpdateCardVoice(card.id, e.target.value)}
                              className="bg-black/50 border border-white/10 rounded-lg px-2 py-0.5 text-xs text-[#38bdf8] font-semibold outline-none cursor-pointer"
                            >
                              {AUDIO_VOICE_PRESETS.map(v => (
                                <option key={v.id} value={v.id}>{v.name} ({v.role.split(' ')[0]})</option>
                              ))}
                            </select>
                            <span className="text-[10px] text-white/50 font-mono hidden sm:inline">[{assignedVoice.accent}]</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-[#38bdf8] bg-[#38bdf8]/10 px-2 py-0.5 rounded-md border border-[#38bdf8]/20">
                            {card.duration}
                          </span>
                          <button
                            onClick={() => handleDeleteDialogueCard(card.id)}
                            disabled={dialogueCards.length <= 1}
                            className="p-1 text-white/40 hover:text-red-400 disabled:opacity-20 transition"
                            title="Delete Card"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Script Input Field */}
                      <div className="relative">
                        <textarea
                          rows={2}
                          value={card.script}
                          onChange={e => handleUpdateCardScript(card.id, e.target.value)}
                          placeholder={`Add dialogue script for ${assignedVoice.name}...`}
                          className="w-full bg-black/40 border border-white/5 focus:border-[#38bdf8]/50 rounded-xl p-3 text-sm text-white placeholder:text-[#92939e] outline-none resize-none font-sans"
                        />
                        <div className="flex items-center justify-between text-[10px] text-[#92939e] mt-1 px-1">
                          <span>Expressive cadence • Multilingual translation active</span>
                          <span className="font-mono">{card.script.length} / 2,500 chars</span>
                        </div>
                      </div>
                    </div>
                  );
                })}

                <button
                  onClick={handleAddDialogueCard}
                  className="w-full py-3.5 rounded-2xl border border-dashed border-white/15 hover:border-[#38bdf8] bg-white/2 hover:bg-[#38bdf8]/5 text-white/60 hover:text-white transition flex items-center justify-center gap-2 text-xs font-semibold cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-[#38bdf8]" />
                  <span>Add Next Speaker Dialogue Card (Up to 1,000 Cards)</span>
                </button>

              </div>
            </div>

            {/* Bottom Master Waveform Player Dock */}
            <div className="p-4 pt-1 pb-4 shrink-0 z-30">
              <div className="max-w-4xl mx-auto rounded-2xl border border-[#38bdf8]/30 bg-[#18191C]/95 backdrop-blur-xl p-3 shadow-[0_12px_40px_rgba(0,0,0,0.6)] space-y-3">
                
                {/* Waveform Visualizer */}
                <div className="bg-black/60 rounded-xl p-3 border border-white/5 flex items-center gap-3">
                  <button 
                    onClick={() => setIsAudioPlaying(!isAudioPlaying)}
                    className="w-10 h-10 rounded-full bg-[#38bdf8] text-black flex items-center justify-center hover:scale-105 transition shrink-0 shadow-[0_0_12px_rgba(56,189,248,0.4)] cursor-pointer"
                  >
                    {isAudioPlaying ? <Pause className="w-4 h-4 fill-black" /> : <Play className="w-4 h-4 fill-black ml-0.5" />}
                  </button>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-[#38bdf8] font-bold">00:04.8 / 00:14.1</span>
                      <span className="text-white/50">Higgsfield Speak 2.0 • 48 kHz Master</span>
                    </div>

                    {/* Simulated Waveform Bars */}
                    <div className="h-6 flex items-center gap-1 cursor-pointer">
                      {[35, 60, 80, 45, 90, 70, 30, 85, 100, 65, 40, 55, 95, 75, 50, 85, 40, 60, 70, 90, 30, 80, 65, 45, 85, 95, 40, 60, 50, 75, 90, 35, 60, 80, 50, 70, 95, 40, 85, 60].map((h, i) => (
                        <div 
                          key={i} 
                          style={{ height: `${h}%` }}
                          className={`flex-1 rounded-full transition-all ${i < 15 ? 'bg-[#38bdf8]' : 'bg-white/20 hover:bg-white/40'}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Trigger Bar */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#38bdf8]/15 border border-[#38bdf8]/30 text-xs text-[#38bdf8] font-bold">
                      <Mic className="w-3 h-3" />
                      {selectedAudioModel === 'speak_2_0' ? 'Speak 2.0' : selectedAudioModel === 'eleven_v4' ? 'Eleven v4' : 'Turbo Speech'}
                    </span>

                    <button 
                      onClick={() => copyText(dialogueCards.map(c => `${c.speakerName}: ${c.script}`).join('\n'))}
                      className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/8 transition flex items-center gap-1 cursor-pointer"
                      title="Copy full dialogue script"
                    >
                      <Copy className="w-3 h-3" />
                      <span>Copy Script</span>
                    </button>
                  </div>

                  <button 
                    onClick={handleGenerateAudio}
                    disabled={isAudioGenerating}
                    className="bg-[#38bdf8] hover:bg-[#0284c7] hover:text-white disabled:opacity-50 text-black px-5 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition shadow-[0_4px_16px_rgba(56,189,248,0.35)] cursor-pointer"
                  >
                    {isAudioGenerating ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Synthesizing Audio...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5 fill-black" /> Synthesize Dialogue • 10 credits
                      </>
                    )}
                  </button>
                </div>

              </div>
            </div>

          </section>

        </div>
      )}

      {activeTab === 'mcp' && (
        <main className="flex-1 overflow-y-auto px-4 lg:px-6 py-6 space-y-6 max-w-7xl mx-auto w-full">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold font-grotesk uppercase text-white">
              Higgsfield Model Context Protocol (MCP) Server
            </h2>
            <p className="text-sm text-[#92939e]">
              Connect Claude Desktop, Cursor, or local autonomous agent pipelines to Higgsfield models.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-[#18191C] border border-white/10 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-[#06b6d4]" />
                  <h4 className="font-bold text-sm text-white">Claude Desktop Configuration</h4>
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
            </div>

            <div className="bg-[#18191C] border border-white/10 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-[#22c55e]" />
                  <h4 className="font-bold text-sm text-white">Local Server Services</h4>
                </div>
                <span className="text-xs text-[#4ade80] bg-[#22c55e]/15 px-2.5 py-1 rounded-full border border-[#22c55e]/30 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-ping" /> Online (Port 8080)
                </span>
              </div>

              <div className="space-y-3 pt-2">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-semibold text-white">FastAPI Core Suite</p>
                    <p className="text-[#92939e]">http://localhost:8080</p>
                  </div>
                  <a href="/docs" target="_blank" className="text-[#ff5c00] hover:underline flex items-center gap-1">
                    API Docs <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

    </div>
  );
}
