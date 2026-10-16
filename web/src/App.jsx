import React, { useState, useEffect } from 'react';
import { 
  Play, Video, Image as ImageIcon, Sparkles, Terminal, Copy, Check, 
  Upload, Wand2, Compass, Layers, Sliders, ArrowUpRight, Cpu, 
  RotateCw, RefreshCw, Film, Volume2, ShieldCheck, Zap
} from 'lucide-react';

const MOTIONS_CATALOG = [
  {
    id: "floating-fall",
    title: "Floating Fall",
    model: "seedance_2_5",
    type: "video",
    aspect: "9:16",
    camera: "camera_pull",
    preview: "https://static.higgsfield.ai/public/promotions/seedance-2-5-sale-hero-poster.jpg",
    prompt: "A stylish subject falling backwards in slow motion through a cloud of golden iridescent particles, slow cinematic camera pull-back revealing surrounding environment, natural and realistic motion"
  },
  {
    id: "high-flip",
    title: "High Flip",
    model: "kling3_0",
    type: "video",
    aspect: "16:9",
    camera: "tracking_shot",
    preview: "https://static.higgsfield.ai/explore/image-generate-block/cinema-studio.png",
    prompt: "An acrobatic parkour runner performing a high backflip off a concrete rooftop at golden hour, smooth horizontal tracking shot following primary subject movement, natural and realistic motion"
  },
  {
    id: "studio-slide",
    title: "Studio Slide",
    model: "seedance_2_5",
    type: "video",
    aspect: "16:9",
    camera: "camera_push",
    preview: "https://static-public-media.higgsfield.ai/cards/6603d9a7-fdfe-4d27-a49b-a074e3edbe97.webp",
    prompt: "A luxury tourbillon watch rotating smoothly on a dark obsidian podium with micro gear mechanics visible, slow cinematic camera push-in towards the subject, subtle parallax on background elements, natural and realistic motion"
  },
  {
    id: "burning-man",
    title: "Desert Mirage",
    model: "seedance_2_5",
    type: "video",
    aspect: "16:9",
    camera: "orbit_pan",
    preview: "https://static-public-media.higgsfield.ai/cards/f35128d2-0067-4ce8-a988-0c198b39669f.webp",
    prompt: "A lone traveler walking across desert dunes during twilight with glowing neon dust swirling, slow 45-degree lateral orbit around subject, shallow depth of field, natural and realistic motion"
  },
  {
    id: "street-colossus",
    title: "Street Colossus",
    model: "veo_3_1",
    type: "video",
    aspect: "9:16",
    camera: "drone_sweep",
    preview: "https://cdn.higgsfield.ai/card/9c6affe8-03a8-4434-97ef-2fc476f7a71e.webp",
    prompt: "Futuristic cyberpunk Tokyo street with giant holographic koi fish floating between skyscrapers in the rain, elevated crane or drone sweep rising slowly, natural and realistic motion"
  },
  {
    id: "act-natural",
    title: "Act Natural",
    model: "nano_banana_2",
    type: "image",
    aspect: "1:1",
    camera: "subtle_ambient",
    preview: "https://static-public-media.higgsfield.ai/cards/6603d9a7-fdfe-4d27-a49b-a074e3edbe97.webp",
    prompt: "High-fashion editorial portrait of a woman with braided hair wearing an architectural trench coat, natural soft window daylight, 35mm film grain, ultra sharp textures"
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
  const [prompt, setPrompt] = useState('The luxury chronograph tourbillon rotates continuously, slow cinematic camera push-in towards the subject, light glints over the sapphire crystal, natural and realistic motion');
  const [imageUrl, setImageUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationQueue, setGenerationQueue] = useState([]);
  const [currentOutput, setCurrentOutput] = useState(null);

  // Motion Engine State
  const [peSubject, setPeSubject] = useState('the sports car accelerates through the neon tunnel');
  const [peCamera, setPeCamera] = useState('tracking_shot');
  const [peEnv, setPeEnv] = useState('sparks and light trails reflecting on the wet asphalt');
  const [peLighting, setPeLighting] = useState('deep violet and amber rim lights casting sharp shadows');
  const [peResult, setPeResult] = useState('');

  // Update prompt engine result in real-time
  useEffect(() => {
    const camDesc = {
      camera_push: "slow cinematic camera push-in towards the subject, subtle parallax on background elements",
      camera_pull: "gentle camera pull-back revealing surrounding environment, smooth steady motion",
      orbit_pan: "slow 45-degree lateral orbit around subject, shallow depth of field, steady tracking",
      tracking_shot: "smooth horizontal tracking shot following primary subject movement",
      drone_sweep: "elevated crane or drone sweep rising slowly while tilting down slightly",
      subtle_ambient: "stationary camera with micro handheld breathing, natural wind and environmental secondary motion"
    }[peCamera] || peCamera;

    const parts = [peSubject.trim(), camDesc];
    if (peEnv.trim()) parts.push(peEnv.trim());
    if (peLighting.trim()) parts.push(peLighting.trim());
    parts.push("natural and realistic motion");

    setPeResult(parts.join(', '));
  }, [peSubject, peCamera, peEnv, peLighting]);

  const handleRecreate = (item) => {
    setSelectedModel(item.model);
    setPrompt(item.prompt);
    setAspectRatio(item.aspect);
    setCameraPreset(item.camera);
    setActiveTab('video');
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    const newJob = {
      id: "hf_" + Math.random().toString(36).substring(2, 9),
      model: selectedModel,
      prompt: prompt,
      status: 'generating',
      progress: 20,
      timestamp: new Date().toLocaleTimeString()
    };
    setGenerationQueue(prev => [newJob, ...prev]);

    // Simulate realistic generation pipeline
    setTimeout(() => {
      setGenerationQueue(prev => prev.map(j => j.id === newJob.id ? { ...j, progress: 65 } : j));
    }, 1800);

    setTimeout(() => {
      setGenerationQueue(prev => prev.map(j => j.id === newJob.id ? { 
        ...j, 
        status: 'completed', 
        progress: 100,
        resultUrl: "https://static.higgsfield.ai/public/promotions/seedance-2-5-sale-hero-poster.jpg" 
      } : j));
      setCurrentOutput({
        id: newJob.id,
        model: selectedModel,
        prompt: prompt,
        videoUrl: "https://static.higgsfield.ai/public/promotions/seedance-2-5-sale-hero-poster.jpg"
      });
      setIsGenerating(false);
    }, 3800);
  };

  const copyText = (txt) => {
    navigator.clipboard.writeText(txt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#030304] text-[#f4f4f8] flex flex-col">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 glass-panel border-b border-[rgba(255,255,255,0.08)] px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#ff3d00] to-[#ff7a29] flex items-center justify-center shadow-[0_0_20px_rgba(255,92,0,0.5)]">
            <svg className="w-5 h-5 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path d="M18.35 9.84L18.33 9.66C18.18 7.93 17.1 4.69 14.08 4.69C11.84 4.69 10.15 6.97 8.66 8.98C7.47 10.59 6.44 11.97 5.31 11.97C5.01 11.94 4.62 11.78 4.38 11.43C4.16 11.11 4.11 10.7 4.22 10.21C4.39 9.44 5.39 8.72 6.45 7.95C7.03 7.54 7.62 7.11 8.04 6.69C9.23 5.51 9.83 4.65 9.83 3.27C9.83 1.89 9.09 1.21 8.47 0.91C7.24 0.32 5.42 0.67 4.26 1.7C4.09 1.86 3.91 2.01 3.75 2.16C2.59 3.23 1.8 3.96 0 3.4V5.64C2.39 6.73 4.4 4.65 5.16 3.7C5.74 3.07 6.36 2.7 6.82 2.7H6.85C7.05 2.71 7.23 2.79 7.35 2.94C7.56 3.18 7.64 3.47 7.6 3.79C7.51 4.46 6.84 5.24 5.6 6.1C4.15 7.1 1.72 8.78 1.53 10.9C1.39 12.42 2.15 13.94 3.34 14.52C6.12 15.88 7.81 13.54 9.6 11.08C10.97 9.18 12.27 7.37 14.08 7.37C15.71 7.37 16.31 8.76 16.31 9.63V9.8L16.15 9.84C12.21 10.56 10.06 14.36 10.06 16.12C10.06 17.87 11.5 19.38 13.28 19.38C15.36 19.38 17.93 17.55 18.34 12.4L18.36 12.21H20V9.84H18.35Z" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-grotesk font-bold text-lg tracking-tight">Higgsfield</span>
              <span className="badge-orange">Recreated</span>
            </div>
            <p className="text-[11px] text-[#8e8f99] font-medium">AI-Native Creative Suite & MCP Studio</p>
          </div>
        </div>

        {/* Center Tabs */}
        <nav className="flex items-center gap-1 bg-[#090a0f] p-1 rounded-xl border border-[rgba(255,255,255,0.06)]">
          <button 
            onClick={() => setActiveTab('explore')}
            className={`pill-tab flex items-center gap-1.5 ${activeTab === 'explore' ? 'active' : ''}`}
          >
            <Compass className="w-4 h-4" /> Explore
          </button>
          <button 
            onClick={() => setActiveTab('video')}
            className={`pill-tab flex items-center gap-1.5 ${activeTab === 'video' ? 'active' : ''}`}
          >
            <Video className="w-4 h-4 text-[#ff5c00]" /> Video Studio
          </button>
          <button 
            onClick={() => setActiveTab('prompt-engine')}
            className={`pill-tab flex items-center gap-1.5 ${activeTab === 'prompt-engine' ? 'active' : ''}`}
          >
            <Wand2 className="w-4 h-4 text-[#a855f7]" /> 5s Motion Engine
          </button>
          <button 
            onClick={() => setActiveTab('mcp')}
            className={`pill-tab flex items-center gap-1.5 ${activeTab === 'mcp' ? 'active' : ''}`}
          >
            <Terminal className="w-4 h-4 text-[#06b6d4]" /> MCP Console
          </button>
        </nav>

        {/* Right Status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[rgba(34,197,94,0.1)] border border-[rgba(34,197,94,0.25)] text-[#4ade80] text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse"></span>
            MCP Server Ready
          </div>
          <a 
            href="https://github.com/LABCaramelo/Higgsfield" 
            target="_blank" 
            rel="noreferrer"
            className="btn-secondary text-xs"
          >
            GitHub Repo <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6">
        
        {/* TAB 1: EXPLORE / MOTIONS */}
        {activeTab === 'explore' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Hero Banner */}
            <div className="relative rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.08)] bg-gradient-to-r from-[#110e1a] via-[#1a0f0d] to-[#0e0f14] p-8 md:p-12">
              <div className="max-w-2xl space-y-4 relative z-10">
                <span className="badge-orange">Featured Flagship Model</span>
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white font-grotesk">
                  Seedance 2.5 Cinema
                </h1>
                <p className="text-[#a0a1ab] text-sm md:text-base leading-relaxed">
                  Breakthrough temporal stability, photorealistic physics, and dedicated camera controls. Generates 5-second cinematic motion shots directly from text or image prompts.
                </p>
                <div className="pt-2 flex flex-wrap gap-3">
                  <button onClick={() => setActiveTab('video')} className="btn-primary">
                    <Play className="w-4 h-4 fill-white" /> Open Video Studio
                  </button>
                  <button onClick={() => setActiveTab('prompt-engine')} className="btn-secondary">
                    <Sparkles className="w-4 h-4 text-[#ff5c00]" /> 5s Prompt Generator
                  </button>
                </div>
              </div>
              <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-30 bg-gradient-to-l from-[#ff5c00]/20 to-transparent pointer-events-none"></div>
            </div>

            {/* Motions Grid */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold font-grotesk">Trending Motion Presets</h2>
                  <p className="text-xs text-[#82838e]">Curated camera choreographies ready to recreate in 1-click</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {MOTIONS_CATALOG.map((item) => (
                  <div key={item.id} className="glass-card group overflow-hidden flex flex-col">
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#161720]">
                      <img 
                        src={item.preview} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#09090d] via-transparent to-transparent opacity-80"></div>
                      <div className="absolute top-3 left-3 flex gap-2">
                        <span className="badge-orange">{item.model}</span>
                        <span className="bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[10px] uppercase font-mono text-white/80">
                          {item.aspect}
                        </span>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                        <h3 className="font-grotesk font-bold text-base text-white">{item.title}</h3>
                        <button 
                          onClick={() => handleRecreate(item)}
                          className="btn-primary text-xs py-1.5 px-3"
                        >
                          <Wand2 className="w-3.5 h-3.5" /> Recreate
                        </button>
                      </div>
                    </div>
                    <div className="p-3.5 text-xs text-[#8e8f9b] line-clamp-2 italic">
                      "{item.prompt}"
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: VIDEO STUDIO */}
        {activeTab === 'video' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fadeIn">
            {/* Control Panel (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="glass-panel p-6 rounded-2xl space-y-5">
                <div>
                  <h2 className="text-lg font-bold font-grotesk flex items-center gap-2">
                    <Video className="w-5 h-5 text-[#ff5c00]" /> Video Generation Controls
                  </h2>
                  <p className="text-xs text-[#858692]">Select models, adjust cinematic parameters and compose motion</p>
                </div>

                {/* Model Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#b1b2be] uppercase tracking-wider">AI Video Model</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      { id: 'seedance_2_5', name: 'Seedance 2.5', badge: 'Default' },
                      { id: 'seedance_2_0', name: 'Seedance 2.0', badge: 'Fast' },
                      { id: 'kling3_0', name: 'Kling v3.0', badge: 'Pro' },
                      { id: 'veo_3_1', name: 'Veo 3.1', badge: 'Google' },
                      { id: 'gemini_omni', name: 'Gemini Omni', badge: 'Flash' },
                    ].map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setSelectedModel(m.id)}
                        className={`p-2.5 rounded-xl border text-left transition-all ${
                          selectedModel === m.id 
                            ? 'bg-[rgba(255,92,0,0.12)] border-[#ff5c00] text-white shadow-[0_0_15px_rgba(255,92,0,0.15)]' 
                            : 'bg-[#090a0f] border-[rgba(255,255,255,0.08)] text-[#91929e] hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-xs text-white">{m.name}</span>
                          <span className="text-[10px] text-[#ff772e]">{m.badge}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Prompt Textarea */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-[#b1b2be] uppercase tracking-wider">Motion Prompt</label>
                    <button 
                      onClick={() => setPrompt(peResult)}
                      className="text-xs text-[#ff772e] hover:underline flex items-center gap-1"
                    >
                      <Sparkles className="w-3.5 h-3.5" /> Pull from 5s Motion Engine
                    </button>
                  </div>
                  <textarea
                    rows={4}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="custom-input resize-none text-sm leading-relaxed"
                    placeholder="Describe scene, subject action, camera motion and finish with 'natural and realistic motion'..."
                  />
                  <div className="flex justify-between items-center text-[11px] text-[#696a75]">
                    <span>Format: Subject + Camera + Environment + 'natural and realistic motion'</span>
                    <span>{prompt.length} / 2500 chars</span>
                  </div>
                </div>

                {/* Aspect Ratio & Resolution */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-[#b1b2be] uppercase tracking-wider">Aspect Ratio</label>
                    <div className="flex gap-1.5 bg-[#090a0f] p-1 rounded-xl border border-[rgba(255,255,255,0.06)]">
                      {['16:9', '9:16', '1:1', '21:9'].map((ar) => (
                        <button
                          key={ar}
                          onClick={() => setAspectRatio(ar)}
                          className={`flex-1 py-1.5 text-xs rounded-lg font-medium transition-all ${
                            aspectRatio === ar ? 'bg-[#ff5c00] text-white' : 'text-[#82838e] hover:text-white'
                          }`}
                        >
                          {ar}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-[#b1b2be] uppercase tracking-wider">Resolution</label>
                    <div className="flex gap-1.5 bg-[#090a0f] p-1 rounded-xl border border-[rgba(255,255,255,0.06)]">
                      {['720p', '1080p'].map((res) => (
                        <button
                          key={res}
                          onClick={() => setResolution(res)}
                          className={`flex-1 py-1.5 text-xs rounded-lg font-medium transition-all ${
                            resolution === res ? 'bg-[#ff5c00] text-white' : 'text-[#82838e] hover:text-white'
                          }`}
                        >
                          {res}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Optional Image to Video */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#b1b2be] uppercase tracking-wider">
                    Starting Frame (Image-to-Video Optional)
                  </label>
                  <div className="border border-dashed border-[rgba(255,255,255,0.15)] rounded-xl p-4 text-center bg-[#090a0f]/60 hover:border-[#ff5c00]/50 transition-colors cursor-pointer">
                    <Upload className="w-5 h-5 mx-auto text-[#6b6c77] mb-1" />
                    <p className="text-xs text-[#a0a1ab]">Drop starting frame or paste image URL</p>
                    <input 
                      type="text" 
                      placeholder="https://example.com/start-frame.jpg"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      className="mt-2 text-xs bg-black/40 border border-white/10 rounded px-2.5 py-1.5 w-full text-white/90"
                    />
                  </div>
                </div>

                {/* Generate Button */}
                <button
                  disabled={isGenerating || !prompt.trim()}
                  onClick={handleGenerate}
                  className="w-full btn-primary py-3.5 text-sm uppercase tracking-wider font-bold"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" /> Generating with {selectedModel}...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 fill-white" /> Generate Video (5 Credits)
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Preview & Results Panel (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="glass-panel p-6 rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-grotesk font-bold text-sm">Studio Output Canvas</h3>
                  <span className="text-[11px] font-mono text-[#767784]">{resolution} • {aspectRatio}</span>
                </div>

                {/* Main Viewport */}
                <div className="aspect-video rounded-xl bg-black border border-[rgba(255,255,255,0.08)] flex items-center justify-center relative overflow-hidden group">
                  {currentOutput ? (
                    <img 
                      src={currentOutput.videoUrl} 
                      alt="Output" 
                      className="w-full h-full object-cover"
                    />
                  ) : isGenerating ? (
                    <div className="text-center space-y-3 p-6">
                      <div className="w-12 h-12 rounded-full border-2 border-[#ff5c00] border-t-transparent animate-spin mx-auto"></div>
                      <p className="text-xs text-[#a3a4af] font-medium">Rendering motion frames with Seedance AI engine...</p>
                    </div>
                  ) : (
                    <div className="text-center text-[#555661] p-6 space-y-2">
                      <Film className="w-10 h-10 mx-auto stroke-1" />
                      <p className="text-xs">Generated video will appear here</p>
                    </div>
                  )}

                  {currentOutput && (
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      <button className="btn-primary text-xs py-2 px-3">
                        <Play className="w-3.5 h-3.5 fill-white" /> Play Video
                      </button>
                      <button className="btn-secondary text-xs py-2 px-3">
                        Download MP4
                      </button>
                    </div>
                  )}
                </div>

                {/* Queue History */}
                <div className="space-y-2.5 pt-2">
                  <h4 className="text-xs font-semibold text-[#8b8c97] uppercase">Generation Tasks</h4>
                  {generationQueue.length === 0 ? (
                    <p className="text-xs text-[#52535d] italic">No active requests in queue</p>
                  ) : (
                    <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                      {generationQueue.map((job) => (
                        <div key={job.id} className="p-3 rounded-xl bg-[#090a0f] border border-[rgba(255,255,255,0.06)] space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-mono text-[11px] text-[#ff772e]">{job.id}</span>
                            <span className={`capitalize text-[11px] font-medium ${job.status === 'completed' ? 'text-green-400' : 'text-amber-400'}`}>
                              {job.status}
                            </span>
                          </div>
                          <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                            <div 
                              className="bg-gradient-to-r from-[#ff772e] to-[#ff3d00] h-full transition-all duration-300"
                              style={{ width: `${job.progress}%` }}
                            ></div>
                          </div>
                          <p className="text-[11px] text-[#71727d] truncate">{job.prompt}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: 5S MOTION PROMPT ENGINE */}
        {activeTab === 'prompt-engine' && (
          <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
            <div className="text-center space-y-3">
              <span className="badge-orange">Clean-Room Methodology</span>
              <h1 className="text-3xl font-bold font-grotesk">Higgsfield 5-Second Motion Engine</h1>
              <p className="text-sm text-[#92939e] max-w-xl mx-auto">
                Construct physically believable, one-line cinematic motion prompts guaranteed to respect the 5-second video shot limit.
              </p>
            </div>

            <div className="glass-panel p-6 md:p-8 rounded-2xl space-y-6">
              {/* Step 1: Subject Action */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#b1b2be] uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-[#ff5c00] text-black font-bold flex items-center justify-center text-[10px]">1</span>
                  Visible Subject Action
                </label>
                <input 
                  type="text" 
                  value={peSubject}
                  onChange={(e) => setPeSubject(e.target.value)}
                  className="custom-input text-sm"
                  placeholder="e.g. the dancer glides across the stage"
                />
              </div>

              {/* Step 2: Camera Movement Preset */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#b1b2be] uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-[#ff5c00] text-black font-bold flex items-center justify-center text-[10px]">2</span>
                  Camera Motion Model
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'camera_push', label: 'Push-In (Intimacy)' },
                    { id: 'camera_pull', label: 'Pull-Back (Reveal)' },
                    { id: 'orbit_pan', label: '45° Orbit (Parallax)' },
                    { id: 'tracking_shot', label: 'Lateral Tracking' },
                    { id: 'drone_sweep', label: 'Crane / Drone Sweep' },
                    { id: 'subtle_ambient', label: 'Micro Handheld' },
                  ].map((cm) => (
                    <button
                      key={cm.id}
                      onClick={() => setPeCamera(cm.id)}
                      className={`p-2.5 rounded-xl border text-xs font-medium text-left transition-all ${
                        peCamera === cm.id 
                          ? 'bg-[rgba(255,92,0,0.15)] border-[#ff5c00] text-white' 
                          : 'bg-[#090a0f] border-white/10 text-[#858692] hover:border-white/20'
                      }`}
                    >
                      {cm.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Environment Reaction */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#b1b2be] uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-[#ff5c00] text-black font-bold flex items-center justify-center text-[10px]">3</span>
                  Environmental Secondary Reaction
                </label>
                <input 
                  type="text" 
                  value={peEnv}
                  onChange={(e) => setPeEnv(e.target.value)}
                  className="custom-input text-sm"
                  placeholder="e.g. golden autumn leaves drifting in the wind"
                />
              </div>

              {/* Step 4: Lighting */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#b1b2be] uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-[#ff5c00] text-black font-bold flex items-center justify-center text-[10px]">4</span>
                  Lighting & Atmospherics
                </label>
                <input 
                  type="text" 
                  value={peLighting}
                  onChange={(e) => setPeLighting(e.target.value)}
                  className="custom-input text-sm"
                  placeholder="e.g. warm sunset rim light casting long soft shadows"
                />
              </div>

              {/* Output Display */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#ff772e] uppercase tracking-wider">
                    Compiled 5-Second Motion Prompt
                  </span>
                  <div className="flex gap-2">
                    <button onClick={() => copyText(peResult)} className="btn-secondary text-xs py-1.5 px-3">
                      {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                      {copied ? 'Copied' : 'Copy Prompt'}
                    </button>
                    <button 
                      onClick={() => {
                        setPrompt(peResult);
                        setActiveTab('video');
                      }} 
                      className="btn-primary text-xs py-1.5 px-3"
                    >
                      Send to Video Studio →
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-black border border-[#ff5c00]/30 font-mono text-xs text-[#ececf1] leading-relaxed select-all">
                  {peResult}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: MCP CONSOLE */}
        {activeTab === 'mcp' && (
          <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
            <div className="text-center space-y-2">
              <span className="badge-orange">Model Context Protocol</span>
              <h1 className="text-3xl font-bold font-grotesk">Higgsfield MCP Server Console</h1>
              <p className="text-sm text-[#92939e]">
                Direct integration with AI Coding Assistants (Antigravity IDE, Claude Desktop, Cursor, Claude Code).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="glass-panel p-5 rounded-xl space-y-2">
                <Cpu className="w-5 h-5 text-[#ff5c00]" />
                <h3 className="font-grotesk font-bold text-sm">Server Protocol</h3>
                <p className="text-xs text-[#8c8d98]">JSON-RPC 2.0 over Stdio with standard input/output framing</p>
              </div>
              <div className="glass-panel p-5 rounded-xl space-y-2">
                <Layers className="w-5 h-5 text-[#a855f7]" />
                <h3 className="font-grotesk font-bold text-sm">Registered Tools</h3>
                <p className="text-xs text-[#8c8d98]">7 native generation, prompt building & upload tools</p>
              </div>
              <div className="glass-panel p-5 rounded-xl space-y-2">
                <ShieldCheck className="w-5 h-5 text-[#22c55e]" />
                <h3 className="font-grotesk font-bold text-sm">REA Evidence</h3>
                <p className="text-xs text-[#8c8d98]">ev_584aa8aef5cbd481976a11e8e7237f25d1a3bbe8efd2d312d6e1d577387ebb79</p>
              </div>
            </div>

            {/* Connection Config Snippet */}
            <div className="glass-panel p-6 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-grotesk font-bold text-base">Antigravity / Claude Config Block</h3>
                  <p className="text-xs text-[#7f808c]">Paste in your mcp_config.json or claude_desktop_config.json</p>
                </div>
                <button 
                  onClick={() => copyText(`{
  "mcpServers": {
    "higgsfield": {
      "command": "python",
      "args": ["d:/meus documentos/higgsfield/src/mcp_server.py"],
      "env": {
        "HF_CREDENTIALS": "YOUR_KEY_ID:YOUR_KEY_SECRET"
      }
    }
  }
}`)}
                  className="btn-secondary text-xs"
                >
                  <Copy className="w-3.5 h-3.5" /> Copy JSON
                </button>
              </div>

              <pre className="p-4 rounded-xl bg-black/80 border border-white/10 font-mono text-xs text-[#e4e4ed] overflow-x-auto">
{`{
  "mcpServers": {
    "higgsfield": {
      "command": "python",
      "args": [
        "d:/meus documentos/higgsfield/src/mcp_server.py"
      ],
      "env": {
        "HF_CREDENTIALS": "YOUR_KEY_ID:YOUR_KEY_SECRET"
      }
    }
  }
}`}
              </pre>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[rgba(255,255,255,0.06)] py-6 text-center text-xs text-[#5e5f6a]">
        <p>Higgsfield AI Reconstructed Suite &copy; 2026. Built with MCP REA Clean-Room Architecture.</p>
      </footer>
    </div>
  );
}
