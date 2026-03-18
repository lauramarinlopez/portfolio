import { useState, useEffect, useRef, createContext, useContext } from "react";

// ── shared imports from your three page files would live here in a real project.
// For now this is a self-contained single-file app that includes all three pages.

const FONT_URL =
  "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=DM+Sans:wght@300;400;500&display=swap";

const C = {
  bg:      "#F2EDE4",
  cardA:   "#E8E3D8",
  cardB:   "#DDD8CC",
  ink:     "#1E1C18",
  rose:    "#A0522D",
  accent:  "#7C6E5A",
  muted:   "#8A8070",
  pill:    "#D8D2C6",
  pillTxt: "#3E3A32",
};

const G = `
  @import url('${FONT_URL}');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  html{scroll-behavior:smooth}
  body,#root{background:${C.bg};color:${C.ink};font-family:'DM Sans',sans-serif;font-size:16px;line-height:1.6}
  @keyframes float1{0%,100%{transform:translateY(0) rotate(-6deg)}50%{transform:translateY(-14px) rotate(-2deg)}}
  @keyframes float2{0%,100%{transform:translateY(0) rotate(8deg)}50%{transform:translateY(-18px) rotate(12deg)}}
  @keyframes float3{0%,100%{transform:translateY(0) rotate(-2deg)}50%{transform:translateY(-10px) rotate(3deg)}}
  @keyframes float4{0%,100%{transform:translateY(0) rotate(14deg)}50%{transform:translateY(-12px) rotate(9deg)}}
  @keyframes float5{0%,100%{transform:translateY(0) rotate(-10deg)}50%{transform:translateY(-16px) rotate(-6deg)}}
  @keyframes fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
  @keyframes pageFadeIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
  .reveal{opacity:0;transform:translateY(30px);transition:opacity 0.75s ease,transform 0.75s ease}
  .reveal.visible{opacity:1;transform:translateY(0)}
  .page-enter{animation:pageFadeIn 0.45s ease forwards}
  @media(max-width:768px){
    .two-col{grid-template-columns:1fr !important;gap:40px !important}
    .three-col{grid-template-columns:1fr !important;gap:24px !important}
    .side-pad{padding-left:24px !important;padding-right:24px !important}
    .hero-grid{grid-template-columns:1fr !important}
    .hide-sm{display:none !important}
  }
`;

// ── Router context ──────────────────────────────────────────────────────────
const RouterContext = createContext(null);
function useRouter() { return useContext(RouterContext); }

// ── Reveal ──────────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add("visible"); obs.disconnect(); }
    }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref} className="reveal" style={{ transitionDelay:`${delay}s`, ...style }}>{children}</div>;
}

// ── Flowers ─────────────────────────────────────────────────────────────────
function FlowerPeony({ style }) {
  return (
    <svg width="88" height="88" viewBox="0 0 88 88" style={style} fill="none">
      {[0,45,90,135,180,225,270,315].map((deg,i)=>(
        <ellipse key={i} cx="44" cy="44" rx="10" ry="22"
          fill={i%2===0?"#E8A0A0":"#D4787E"} opacity="0.85"
          transform={`rotate(${deg} 44 44) translate(0 -16)`}/>
      ))}
      {[22,67,112,157,202,247,292,337].map((deg,i)=>(
        <ellipse key={i} cx="44" cy="44" rx="7" ry="16"
          fill={i%2===0?"#F0B8B8":"#E89098"} opacity="0.9"
          transform={`rotate(${deg} 44 44) translate(0 -10)`}/>
      ))}
      <circle cx="44" cy="44" r="10" fill="#F5D0A0"/>
      <circle cx="44" cy="44" r="6"  fill="#E8B870"/>
      <circle cx="44" cy="44" r="3"  fill="#D4993A"/>
    </svg>
  );
}
function FlowerDaisy({ style }) {
  return (
    <svg width="76" height="76" viewBox="0 0 76 76" style={style} fill="none">
      {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg,i)=>(
        <ellipse key={i} cx="38" cy="38" rx="6" ry="18"
          fill={i%3===0?"#F5E070":i%3===1?"#F0D050":"#EAC840"} opacity="0.9"
          transform={`rotate(${deg} 38 38) translate(0 -14)`}/>
      ))}
      <circle cx="38" cy="38" r="10" fill="#E07820"/>
      <circle cx="38" cy="38" r="6"  fill="#C86010"/>
    </svg>
  );
}
function FlowerBlossom({ style }) {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" style={style} fill="none">
      <path d="M40 75 Q30 55 20 40 Q30 30 40 20" stroke="#6A4830" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M40 75 Q50 55 60 42 Q50 30 40 20" stroke="#6A4830" strokeWidth="2" strokeLinecap="round" fill="none"/>
      {[[20,40],[60,42],[40,20],[30,58],[52,56]].map(([x,y],i)=>(
        <g key={i}>
          {[0,72,144,216,288].map((deg,j)=>(
            <ellipse key={j} cx={x} cy={y} rx="5" ry="9"
              fill={j%2===0?"#F0A8C0":"#E890B0"} opacity="0.88"
              transform={`rotate(${deg} ${x} ${y}) translate(0 -6)`}/>
          ))}
          <circle cx={x} cy={y} r="4" fill="#FAE0E8"/>
          <circle cx={x} cy={y} r="2" fill="#F0B8C8"/>
        </g>
      ))}
    </svg>
  );
}
function FlowerLavender({ style }) {
  return (
    <svg width="56" height="90" viewBox="0 0 56 90" style={style} fill="none">
      <path d="M28 88 Q26 60 28 10" stroke="#7A6A9A" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M28 50 Q18 40 12 28" stroke="#7A6A9A" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M28 50 Q38 40 44 28" stroke="#7A6A9A" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      {[10,18,26,34,42,50].map((y,i)=>(
        <ellipse key={i} cx={28+(i%2===0?-5:5)} cy={y} rx="5" ry="7"
          fill={i%2===0?"#A088C8":"#8870B8"} opacity="0.9"/>
      ))}
      {[[14,32],[42,32],[12,22],[44,22]].map(([x,y],i)=>(
        <ellipse key={i} cx={x} cy={y} rx="4" ry="6" fill="#9878C0" opacity="0.8"/>
      ))}
    </svg>
  );
}
function FlowerSunflower({ style }) {
  return (
    <svg width="82" height="82" viewBox="0 0 82 82" style={style} fill="none">
      {[0,22.5,45,67.5,90,112.5,135,157.5,180,202.5,225,247.5,270,292.5,315,337.5].map((deg,i)=>(
        <ellipse key={i} cx="41" cy="41" rx="7" ry="20"
          fill={i%2===0?"#F0C030":"#E0A820"} opacity="0.9"
          transform={`rotate(${deg} 41 41) translate(0 -16)`}/>
      ))}
      <circle cx="41" cy="41" r="14" fill="#6B3A10"/>
      <circle cx="41" cy="41" r="10" fill="#7A4418"/>
      {[0,60,120,180,240,300].map((deg,i)=>(
        <circle key={i} cx={41+6*Math.cos(deg*Math.PI/180)} cy={41+6*Math.sin(deg*Math.PI/180)} r="1.5" fill="#3A1A08" opacity="0.7"/>
      ))}
    </svg>
  );
}

// ── Shared Nav ───────────────────────────────────────────────────────────────
function Nav() {
  const { page, go } = useRouter();

  const linkStyle = (target) => ({
    fontFamily: "'DM Sans',sans-serif",
    fontSize: 15,
    fontWeight: 600,
    color: page === target ? C.ink : C.muted,
    textDecoration: "none",
    cursor: "pointer",
    background: "none",
    border: "none",
    padding: 0,
    borderBottom: page === target ? `1.5px solid ${C.rose}` : "1.5px solid transparent",
    paddingBottom: 2,
    transition: "color 0.2s, border-color 0.2s",
  });

  return (
    <nav className="side-pad" style={{ position:"fixed",top:0,left:0,right:0,zIndex:100,display:"flex",justifyContent:"space-between",alignItems:"center",padding:"20px 64px",background:"rgba(242,237,228,0.92)",backdropFilter:"blur(14px)" }}>
      <div style={{ display:"flex", gap:36 }}>
        <button onClick={()=>go("work")} style={linkStyle("work")}
          onMouseEnter={e=>{ if(page!=="work") e.currentTarget.style.color=C.ink; }}
          onMouseLeave={e=>{ if(page!=="work") e.currentTarget.style.color=C.muted; }}>
          Work
        </button>
        <button onClick={()=>go("about")} style={linkStyle("about")}
          onMouseEnter={e=>{ if(page!=="about") e.currentTarget.style.color=C.ink; }}
          onMouseLeave={e=>{ if(page!=="about") e.currentTarget.style.color=C.muted; }}>
          About
        </button>
      </div>

      <button onClick={()=>go("home")} style={{ fontFamily:"'Playfair Display',Georgia,serif",fontSize:20,fontWeight:700,fontStyle:"italic",color:C.ink,textDecoration:"none",background:"none",border:"none",cursor:"pointer" }}>
        Laura Marin
      </button>

      <div style={{ display:"flex", gap:36 }}>
        <button onClick={()=>go("contact")} style={linkStyle("contact")}
          onMouseEnter={e=>{ if(page!=="contact") e.currentTarget.style.color=C.ink; }}
          onMouseLeave={e=>{ if(page!=="contact") e.currentTarget.style.color=C.muted; }}>
          Contact
        </button>
        <a href="/portfolio/resume.pdf" target="_blank" rel="noreferrer"
          style={{ fontFamily:"'DM Sans',sans-serif",fontSize:15,fontWeight:600,color:C.muted,textDecoration:"none",transition:"color 0.2s" }}
          onMouseEnter={e=>e.currentTarget.style.color=C.ink}
          onMouseLeave={e=>e.currentTarget.style.color=C.muted}>
          Resume ↗
        </a>
      </div>
    </nav>
  );
}

// ── Shared Footer ────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="side-pad" style={{ padding:"22px 64px",borderTop:`1px solid ${C.pill}`,display:"flex",justifyContent:"space-between",alignItems:"center" }}>
      <span style={{ fontFamily:"'DM Sans',sans-serif",fontSize:12,color:C.muted }}>© 2026 Laura Marin</span>
      <div style={{ display:"flex",gap:6,alignItems:"center" }}>
        <FlowerPeony style={{ width:20,height:20 }}/>
        <FlowerDaisy style={{ width:18,height:18 }}/>
        <FlowerBlossom style={{ width:20,height:20 }}/>
      </div>
      <span style={{ fontFamily:"'Playfair Display',Georgia,serif",fontStyle:"italic",fontSize:12,color:C.muted }}>Designed by Laura</span>
    </footer>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// HOME PAGE
// ═══════════════════════════════════════════════════════════════════════════════
const PROJECTS = [
  { id:"disney-com",      title:"Disney.com Mobile Redesign", desc:"Redesigned the Disney.com mobile experience — a brand hub unifying Disney's full portfolio through immersive card-based screens and rich, annotated motion design.", tags:["Mobile Design","Motion Design","Disney"], bg:"linear-gradient(135deg,#3D1A00,#8B4500)", cardImage:"/portfolio/disney-com-cover.png" },
  { id:"napster-spaces",  title:"Napster Spaces",             desc:"Designed rich interactive experiences and a unified design system with 100+ components for Napster's web platform.", tags:["Product Design","Design Systems","Web"], bg:"linear-gradient(135deg,#1A0A2E,#3D1A6E)", cardImage:"/portfolio/napster-spaces-cover.png" },
];

function HomePage() {
  const { go, goWork } = useRouter();
  const a = (d) => ({ opacity:0, animation:`fadeUp 0.7s ease ${d}s forwards` });
  const btnPrimary = { display:"inline-block",background:C.ink,color:"#FAF8F4",fontFamily:"'DM Sans',sans-serif",fontSize:13,fontWeight:500,padding:"13px 30px",borderRadius:100,textDecoration:"none",transition:"background 0.2s,transform 0.2s",letterSpacing:"0.04em",border:"none",cursor:"pointer" };

  return (
    <div className="page-enter">
      {/* Hero */}
      <section className="side-pad hero-grid" style={{ minHeight:"100vh",display:"grid",gridTemplateColumns:"1fr 1fr",padding:"0 64px",position:"relative",overflow:"hidden",alignItems:"center" }}>
        <div style={{ position:"absolute",inset:0,pointerEvents:"none" }}>
          <FlowerPeony     style={{ position:"absolute",top:"10%", left:"-10px", animation:"float1 6s ease-in-out infinite" }}/>
          <FlowerBlossom   style={{ position:"absolute",top:"55%", left:"-16px", animation:"float3 8s ease-in-out infinite 0.8s" }}/>
          <FlowerSunflower style={{ position:"absolute",top:"8%",  right:"-14px",animation:"float4 6.5s ease-in-out infinite 0.5s" }}/>
          <FlowerLavender  style={{ position:"absolute",top:"52%", right:"-8px", animation:"float5 7.5s ease-in-out infinite 1s" }}/>
          <FlowerDaisy     style={{ position:"absolute",bottom:"6%",left:"5%",   animation:"float2 7s ease-in-out infinite 0.3s" }}/>
          <FlowerDaisy     style={{ position:"absolute",bottom:"8%",right:"14%", animation:"float1 5.5s ease-in-out infinite 1.5s",transform:"scale(0.75)" }}/>
        </div>
        <div style={{ position:"relative",zIndex:1,paddingTop:80 }}>
          <p style={{ ...a(0.2),fontFamily:"'DM Sans',sans-serif",fontSize:13,fontWeight:500,letterSpacing:"0.12em",textTransform:"uppercase",color:C.accent,marginBottom:20 }}>UX Designer</p>
          <h1 style={{ ...a(0.35),fontFamily:"'Playfair Display',Georgia,serif",fontSize:"clamp(46px,5.2vw,74px)",fontWeight:400,fontStyle:"italic",color:C.ink,lineHeight:1.1,letterSpacing:"-0.01em",marginBottom:28 }}>
            Hi, I'm Laura.<br/>I bring <em style={{ color:C.rose }}>whimsy</em><br/>to everyday experiences.
          </h1>
          <p style={{ ...a(0.5),fontFamily:"'DM Sans',sans-serif",fontSize:16,fontWeight:300,color:C.muted,maxWidth:440,lineHeight:1.85,marginBottom:40 }}>
            Product designer with 6+ years crafting experiences for 131M+ users. I care about the details that take a product from functional to genuinely memorable.
          </p>
          <div style={{ ...a(0.65),display:"flex",gap:16,flexWrap:"wrap" }}>
            <button onClick={()=>go("work")} style={btnPrimary}
              onMouseEnter={e=>{e.currentTarget.style.background=C.rose;e.currentTarget.style.transform="translateY(-2px)"}}
              onMouseLeave={e=>{e.currentTarget.style.background=C.ink;e.currentTarget.style.transform="translateY(0)"}}>
              See my work
            </button>
            <button onClick={()=>go("contact")} style={{ background:"none",border:"none",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:13,fontWeight:400,color:C.accent,transition:"color 0.2s",padding:"13px 0" }}
              onMouseEnter={e=>e.currentTarget.style.color=C.rose}
              onMouseLeave={e=>e.currentTarget.style.color=C.accent}>
              Get in touch →
            </button>
          </div>
          <div style={{ ...a(0.8),display:"flex",gap:40,marginTop:56 }}>
            {[["131M+","users reached"],["6+","years experience"],["Columbia University","Computer Science, UX and Applications track"]].map(([num,label])=>(
              <div key={label}>
                <p style={{ fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:700,color:C.ink }}>{num}</p>
                <p style={{ fontFamily:"'DM Sans',sans-serif",fontSize:11,color:C.muted,marginTop:2 }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="hide-sm" style={{ display:"flex",justifyContent:"flex-end",alignItems:"center",paddingTop:80,opacity:0,animation:"fadeUp 0.8s ease 0.5s forwards",position:"relative",zIndex:1 }}>
          <div style={{ width:360,height:460,borderRadius:24,background:`linear-gradient(160deg,${C.cardA},${C.cardB})`,display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden" }}>
            <FlowerPeony style={{ position:"absolute",top:-18,right:-18,opacity:0.35,transform:"scale(0.9)" }}/>
            <FlowerDaisy style={{ position:"absolute",bottom:-14,left:-14,opacity:0.35,transform:"scale(0.75)" }}/>
            <img src="/portfolio/laura.jpg" alt="Laura Marin" style={{ width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top" }}/>
          </div>
        </div>
      </section>

      {/* About teaser */}
      <section className="side-pad" style={{ padding:"0 64px 100px" }}>
        <Reveal>
          <div style={{ background:C.cardA,borderRadius:24,padding:"56px 64px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:64,alignItems:"center",position:"relative",overflow:"hidden" }}>
            <FlowerBlossom style={{ position:"absolute",right:0,bottom:0,opacity:0.1,transform:"scale(3)",pointerEvents:"none" }}/>
            <div style={{ position:"relative",zIndex:1 }}>
              <h2 style={{ fontFamily:"'Playfair Display',Georgia,serif",fontStyle:"italic",fontSize:"clamp(32px,3.5vw,48px)",fontWeight:400,color:C.ink,marginBottom:20 }}>
                A designer who also builds.
              </h2>
              <p style={{ fontFamily:"'DM Sans',sans-serif",fontSize:16,fontWeight:300,color:"#4A4438",lineHeight:1.85 }}>
                My CS background means I work alongside engineering, not just hand things off to them. Lately that means AI-native prototyping tools that close the gap between idea and testable product.
              </p>
            </div>
            <div style={{ position:"relative",zIndex:1 }}>
              <p style={{ fontFamily:"'Playfair Display',Georgia,serif",fontStyle:"italic",fontSize:"clamp(20px,2.2vw,28px)",fontWeight:400,color:C.rose,lineHeight:1.5,marginBottom:32 }}>
                "The details are what make an experience go from functional to memorable."
              </p>
              <button onClick={()=>go("about")} style={{ fontFamily:"'DM Sans',sans-serif",fontSize:13,fontWeight:500,color:C.ink,background:"none",border:"none",borderBottom:`1.5px solid ${C.ink}`,cursor:"pointer",paddingBottom:3,transition:"color 0.2s,border-color 0.2s" }}
                onMouseEnter={e=>{e.currentTarget.style.color=C.rose;e.currentTarget.style.borderColor=C.rose}}
                onMouseLeave={e=>{e.currentTarget.style.color=C.ink;e.currentTarget.style.borderColor=C.ink}}>
                More about me →
              </button>
            </div>
          </div>
        </Reveal>
      </section>

      <Footer/>
    </div>
  );
}

function HomeProjectCard({ project, delay, onOpen }) {
  const [hov, setHov] = useState(false);
  return (
    <Reveal delay={delay}>
      <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} onClick={onOpen}
        style={{ background:C.cardA,borderRadius:20,overflow:"hidden",cursor:"pointer",transition:"transform 0.3s,box-shadow 0.3s",transform:hov?"translateY(-5px)":"translateY(0)",boxShadow:hov?"0 20px 50px rgba(0,0,0,0.12)":"0 2px 10px rgba(0,0,0,0.05)" }}>
        <div style={{ aspectRatio:"16/9",background:project.bg,position:"relative",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden" }}>
          {project.cardImage
            ? <img src={project.cardImage} alt={project.title} style={{ width:"100%",height:"100%",objectFit:"cover",objectPosition:"center" }}/>
            : <span style={{ fontFamily:"'DM Sans',sans-serif",fontSize:11,letterSpacing:"0.15em",textTransform:"uppercase",color:"rgba(255,255,255,0.2)" }}>Add project image</span>
          }
          {hov && <div style={{ position:"absolute",top:16,right:16,background:"rgba(255,255,255,0.15)",backdropFilter:"blur(8px)",borderRadius:100,padding:"6px 16px",fontFamily:"'DM Sans',sans-serif",fontSize:12,color:"white" }}>View case study →</div>}
        </div>
        <div style={{ padding:"28px 32px 36px" }}>
          <h3 style={{ fontFamily:"'Playfair Display',Georgia,serif",fontSize:24,fontWeight:400,fontStyle:"italic",color:C.ink,marginBottom:10 }}>{project.title}</h3>
          <p style={{ fontFamily:"'DM Sans',sans-serif",fontSize:15,fontWeight:300,color:C.muted,lineHeight:1.75,marginBottom:20 }}>{project.desc}</p>
          <div style={{ display:"flex",flexWrap:"wrap",gap:8 }}>
            {project.tags.map(t=><span key={t} style={{ fontFamily:"'DM Sans',sans-serif",fontSize:12,color:C.pillTxt,background:C.pill,padding:"5px 14px",borderRadius:100 }}>{t}</span>)}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// WORK PAGE
// ═══════════════════════════════════════════════════════════════════════════════
const CASE_STUDIES = [
  {
    id:"disney-com",
    title:"Disney.com Mobile Redesign",
    subtitle:"A brand hub where every scroll feels alive",
    tags:["Mobile Design","Motion Design","Scroll Interaction","Disney"],
    bg:"linear-gradient(135deg,#3D1A00,#8B4500)",
    year:"2024–2025",
    role:"Product Designer\nCross-collaboration",
    platform:"Mobile Web",
    contribution:"Mobile Design,\nMotion Design,\nPrototyping",
    heroImage:"/portfolio/disney/disney-hero.png",
    cardImage:"/portfolio/disney-com-cover.png",
    overview:"Redesigned Disney.com for mobile to create a more engaging, delightful, and motion-enhanced experience that reflects the magic of the brand. I created static high-fidelity comps, translated them into functional interactive prototypes, identified key moments to enhance with motion, and worked closely with engineering to define motion documentation for handoff.",
    metrics:[],
    gallery:[
      {
        label:"Theme Explorations",
        images:[
          "/portfolio/disney/disney-theme-1.png",
          "/portfolio/disney/disney-theme-2.png",
          "/portfolio/disney/disney-theme-3.png",
          "/portfolio/disney/disney-theme-4.png",
          "/portfolio/disney/disney-theme-5.png",
          "/portfolio/disney/disney-theme-6.png",
        ],
        columns:3, aspectRatio:"4/3",
      },
      {
        label:"Design and Interaction — First Iterations",
        images:[
          "/portfolio/disney/disney-iteration-1.png",
          "/portfolio/disney/disney-iteration-2.png",
        ],
        columns:2, aspectRatio:"3/2",
      },
      {
        label:"Designing for motion",
        images:[
          "/portfolio/disney/disney-motion-brandtiles.png",
          "/portfolio/disney/disney-motion-1.mp4",
          "/portfolio/disney/disney-motion-2.mov",
        ],
        columns:3, aspectRatio:"9/16",
        imageCaptions:["Brand tiles","Fireworks celebratory moment","Design and motion"],
      },
      {
        label:"Final Versions: Brands",
        images:[
          "/portfolio/disney/disney-brand-pixar.mp4",
          "/portfolio/disney/disney-brand-hulu.mp4",
          "/portfolio/disney/disney-brand-espn.mp4",
          "/portfolio/disney/disney-brand-avatar.mp4",
          "/portfolio/disney/disney-brand-natgeo.mp4",
        ],
        columns:5, aspectRatio:"9/16",
      },
      {
        label:"Final Versions: Fireworks celebratory moment",
        images:["/portfolio/disney/disney-fireworks-final.png"],
        columns:1, aspectRatio:"16/9",
      },
      {
        label:"Final Versions: Sections",
        images:[
          "/portfolio/disney/disney-sections-1.mp4",
          "/portfolio/disney/disney-sections-2.mp4",
          "/portfolio/disney/disney-sections-3.mp4",
          "/portfolio/disney/disney-sections-4.mp4",
          "/portfolio/disney/disney-sections-5.mp4",
        ],
        columns:5, aspectRatio:"9/16",
      },
    ],
    impact:[
      { color:"#4A7B9D", text:"Elevated brand storytelling through subtle, narrative-driven motion that reinforced Disney's emotional tone" },
      { color:"#A0522D", text:"Helped leadership see motion as a brand signature — not just a design flourish" },
      { color:"#6A8A5A", text:"Strengthened cross-functional relationships between visual design, product, and engineering" },
      { color:"#8A6A9A", text:"Designed both static UX and motion end-to-end across 8+ brand identities" },
    ],
  },
  {
    id:"napster-spaces",
    title:"Napster Spaces",
    subtitle:"Building a design system for the future of music",
    tags:["Product Design","Design Systems","Web"],
    bg:"linear-gradient(135deg,#1A0A2E,#3D1A6E)",
    year:"2025–2026",
    role:"Product Designer (Contract)",
    platform:"Web",
    contribution:"Product Design, Design Systems, Visual Design",
    heroImage:"/portfolio/napster-spaces-cover.png",
    cardImage:"/portfolio/napster-spaces-cover.png",
    overview:"Designed rich interactive experiences for Napster's web platform. Built a unified design system with 100+ components for Napster Spaces and Companion, and worked directly with the CTO on a complete brand redesign.",
    metrics:[["100+","unified components"],["1","complete brand redesign"],["Direct","CTO collaboration"]],
    gallery:[
      { label:"", desc:"", images:["/portfolio/napster-spaces-cover.png","/portfolio/napster-spaces-1.png","/portfolio/napster-spaces-2.png","/portfolio/napster-spaces-3.png"] },
    ],
    impact:[
      { color:"#6A4A9A", text:"Built a unified design system with 100+ components used across Napster Spaces and Companion" },
      { color:"#4A7B9D", text:"Led a complete brand redesign working directly with the CTO" },
      { color:"#A0522D", text:"Designed rich interactive experiences for Napster's web platform" },
      { color:"#6A8A5A", text:"Established a scalable visual language for the future of the product" },
    ],
  },
];

const WORK_PASSWORD = "LM26";

function PasswordGate({ onUnlock }) {
  const [val, setVal] = useState("");
  const [err, setErr] = useState(false);
  const [shake, setShake] = useState(false);

  function attempt() {
    if (val === WORK_PASSWORD) {
      onUnlock();
    } else {
      setErr(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  }

  return (
    <div style={{ minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"0 24px" }}>
      <div style={{ textAlign:"center",maxWidth:380,width:"100%" }}>
        <FlowerDaisy style={{ margin:"0 auto 32px",display:"block" }}/>
        <h2 style={{ fontFamily:"'Playfair Display',Georgia,serif",fontStyle:"italic",fontWeight:400,fontSize:"clamp(28px,4vw,40px)",color:C.ink,marginBottom:12 }}>
          This work is private.
        </h2>
        <p style={{ fontFamily:"'DM Sans',sans-serif",fontSize:15,fontWeight:300,color:C.muted,lineHeight:1.75,marginBottom:36 }}>
          Enter the password to view my projects.
        </p>
        <div style={{ animation:shake?"shake 0.4s ease":"none" }}>
          <style>{`@keyframes shake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-8px)}40%,80%{transform:translateX(8px)}}`}</style>
          <input
            type="password"
            value={val}
            onChange={e=>{setVal(e.target.value);setErr(false);}}
            onKeyDown={e=>e.key==="Enter"&&attempt()}
            placeholder="Password"
            style={{ width:"100%",boxSizing:"border-box",padding:"13px 20px",borderRadius:100,border:`1.5px solid ${err?C.rose:C.pill}`,background:"white",fontFamily:"'DM Sans',sans-serif",fontSize:15,color:C.ink,outline:"none",marginBottom:12,transition:"border-color 0.2s" }}
          />
          {err && <p style={{ fontFamily:"'DM Sans',sans-serif",fontSize:13,color:C.rose,marginBottom:12 }}>Incorrect password. Try again.</p>}
          <button onClick={attempt}
            style={{ width:"100%",padding:"13px",borderRadius:100,background:C.ink,color:"#FAF8F4",fontFamily:"'DM Sans',sans-serif",fontSize:14,fontWeight:500,border:"none",cursor:"pointer",transition:"background 0.2s" }}
            onMouseEnter={e=>e.currentTarget.style.background=C.rose}
            onMouseLeave={e=>e.currentTarget.style.background=C.ink}>
            View work →
          </button>
        </div>
      </div>
    </div>
  );
}

function WorkPage() {
  const { workId, goWork } = useRouter();
  const selected = CASE_STUDIES.find(c => c.id === workId);
  useEffect(() => { window.scrollTo(0,0); }, [workId]);

  return selected
    ? <CaseStudyDetail cs={selected} onBack={()=>goWork(null)}/>
    : <WorkIndex onSelect={(id)=>goWork(id)}/>;
}

function WorkIndex({ onSelect }) {
  const a = (d) => ({ opacity:0, animation:`fadeUp 0.7s ease ${d}s forwards` });
  return (
    <div className="page-enter">
      <div className="side-pad" style={{ padding:"120px 64px 72px",position:"relative",overflow:"hidden" }}>
        <FlowerPeony style={{ position:"absolute",top:80,right:0,opacity:0.1,transform:"scale(3)",pointerEvents:"none" }}/>
        <p style={{ ...a(0.1),fontFamily:"'DM Sans',sans-serif",fontSize:13,fontWeight:500,letterSpacing:"0.12em",textTransform:"uppercase",color:C.accent,marginBottom:16 }}>Selected Work</p>
        <h1 style={{ ...a(0.25),fontFamily:"'Playfair Display',Georgia,serif",fontStyle:"italic",fontWeight:400,fontSize:"clamp(48px,6vw,80px)",color:C.ink,lineHeight:1.05 }}>Case Studies</h1>
      </div>
      <div className="side-pad" style={{ padding:"0 64px 100px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:20 }}>
        {CASE_STUDIES.map((cs,i)=>(
          <Reveal key={cs.id} delay={i*0.07}>
            <WorkCard cs={cs} onSelect={onSelect}/>
          </Reveal>
        ))}
      </div>
      <Footer/>
    </div>
  );
}

function WorkCard({ cs, wide, onSelect }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} onClick={()=>onSelect(cs.id)}
      style={{ background:C.cardA,borderRadius:20,overflow:"hidden",cursor:"pointer",transition:"transform 0.3s,box-shadow 0.3s",transform:hov?"translateY(-5px)":"translateY(0)",boxShadow:hov?"0 20px 50px rgba(0,0,0,0.12)":"0 2px 10px rgba(0,0,0,0.05)" }}>
      <div style={{ aspectRatio:"16/9",background:cs.bg,position:"relative",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden" }}>
        {cs.cardImage
          ? <img src={cs.cardImage} alt={cs.title} style={{ width:"100%",height:"100%",objectFit:"cover",objectPosition:"center" }}/>
          : <span style={{ fontFamily:"'DM Sans',sans-serif",fontSize:11,letterSpacing:"0.15em",textTransform:"uppercase",color:"rgba(255,255,255,0.2)" }}>Add project image</span>
        }
        {hov && <div style={{ position:"absolute",top:16,right:16,background:"rgba(255,255,255,0.15)",backdropFilter:"blur(8px)",borderRadius:100,padding:"6px 16px",fontFamily:"'DM Sans',sans-serif",fontSize:12,color:"white" }}>View case study →</div>}
      </div>
      <div style={{ padding:"28px 32px 36px" }}>
        <h3 style={{ fontFamily:"'Playfair Display',Georgia,serif",fontSize:24,fontWeight:400,fontStyle:"italic",color:C.ink,marginBottom:10 }}>{cs.title}</h3>
        <p style={{ fontFamily:"'DM Sans',sans-serif",fontSize:15,fontWeight:300,color:C.muted,lineHeight:1.75,marginBottom:20 }}>{cs.subtitle}</p>
        <div style={{ display:"flex",flexWrap:"wrap",gap:8 }}>
          {cs.tags.map(t=><span key={t} style={{ fontFamily:"'DM Sans',sans-serif",fontSize:12,color:C.pillTxt,background:C.pill,padding:"5px 14px",borderRadius:100 }}>{t}</span>)}
        </div>
      </div>
    </div>
  );
}

function CaseStudyDetail({ cs, onBack }) {
  const a = (d) => ({ opacity:0, animation:`fadeUp 0.7s ease ${d}s forwards` });
  const nextCs = CASE_STUDIES[(CASE_STUDIES.findIndex(c=>c.id===cs.id)+1) % CASE_STUDIES.length];

  return (
    <div className="page-enter">

      {/* ── Header ── */}
      <div className="side-pad" style={{ padding:"120px 64px 48px",position:"relative",overflow:"hidden" }}>
        <FlowerDaisy style={{ position:"absolute",top:100,right:0,opacity:0.08,transform:"scale(3)",pointerEvents:"none" }}/>
        <button onClick={onBack} style={{ ...a(0.05),fontFamily:"'DM Sans',sans-serif",fontSize:13,color:C.muted,background:"none",border:"none",cursor:"pointer",marginBottom:32,display:"block",transition:"color 0.2s" }}
          onMouseEnter={e=>e.currentTarget.style.color=C.ink}
          onMouseLeave={e=>e.currentTarget.style.color=C.muted}>
          ← All work
        </button>
        <h1 style={{ ...a(0.2),fontFamily:"'Playfair Display',Georgia,serif",fontStyle:"italic",fontWeight:400,fontSize:"clamp(32px,3.5vw,52px)",color:C.ink,lineHeight:1.1,whiteSpace:"nowrap" }}>{cs.title}</h1>
      </div>

      {/* ── Hero image ── */}
      <div className="side-pad" style={{ padding:"0 64px 72px" }}>
        <div style={{ borderRadius:24,overflow:"hidden",background:cs.bg,minHeight:480,display:"flex",alignItems:"center",justifyContent:"center",position:"relative" }}>
          {cs.heroImage
            ? <img src={cs.heroImage} alt={cs.title} style={{ width:"100%",height:"100%",objectFit:"cover" }}/>
            : <span style={{ fontFamily:"'DM Sans',sans-serif",fontSize:11,letterSpacing:"0.15em",textTransform:"uppercase",color:"rgba(255,255,255,0.2)" }}>Add hero image</span>
          }
        </div>
      </div>

      {/* ── Meta sidebar + Overview ── */}
      <Reveal>
        <div className="side-pad" style={{ padding:"56px 64px 100px" }}><div style={{ display:"grid",gridTemplateColumns:"200px 1fr",gap:88,alignItems:"start",maxWidth:900,margin:"0 auto" }}>
          {/* Left: role / platform / contribution */}
          <div style={{ display:"flex",flexDirection:"column",gap:52 }}>
            {[
              ["ROLE",         cs.role,         C.rose],
              ["PLATFORM",     cs.platform,     "#4A7B9D"],
              ["CONTRIBUTION", cs.contribution, "#6A8A5A"],
            ].map(([label,val,color])=>(
              <div key={label}>
                <p style={{ fontFamily:"'DM Sans',sans-serif",fontSize:11,fontWeight:600,letterSpacing:"0.14em",textTransform:"uppercase",color,marginBottom:10 }}>{label}</p>
                <p style={{ fontFamily:"'DM Sans',sans-serif",fontSize:17,color:C.ink,lineHeight:1.65 }}>{val}</p>
              </div>
            ))}
          </div>
          {/* Right: overview text + metrics */}
          <div>
            <p style={{ fontFamily:"'DM Sans',sans-serif",fontSize:"clamp(16px,1.7vw,19px)",fontWeight:300,color:"#4A4438",lineHeight:1.9,marginBottom:48 }}>{cs.overview}</p>
            <div style={{ display:"flex",gap:40,flexWrap:"wrap" }}>
              {cs.metrics.map(([num,label])=>(
                <div key={label} style={{ borderTop:`2px solid ${C.rose}`,paddingTop:16,minWidth:100 }}>
                  <p style={{ fontFamily:"'Playfair Display',serif",fontSize:30,fontWeight:700,color:C.ink,marginBottom:4 }}>{num}</p>
                  <p style={{ fontFamily:"'DM Sans',sans-serif",fontSize:13,color:C.muted }}>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div></div>
      </Reveal>

      {/* ── Gallery sections ── */}
      {cs.gallery && cs.gallery.map((section,si)=>{
        const cols = section.columns ?? (section.images?.length===1?1:section.images?.length===2?2:3);
        const ar   = section.aspectRatio ?? (section.images?.length===1?"16/9":"4/3");
        return (
          <Reveal key={si}>
            <div className="side-pad" style={{ padding:"0 64px 72px" }}>
              {section.label && (
                <h3 style={{ fontFamily:"'DM Sans',sans-serif",fontSize:18,fontWeight:500,color:C.ink,marginBottom:24 }}>{section.label}</h3>
              )}
              {section.images && section.images.length > 0 ? (
                <div style={{ display:"grid",gridTemplateColumns:`repeat(${cols},1fr)`,gap:section.imageCaptions?20:16,alignItems:"start" }}>
                  {section.images.map((src,ii)=>{
                    const isVideo = /\.(mp4|mov|webm)$/i.test(src);
                    return (
                      <div key={ii}>
                        <div style={{ borderRadius:16,overflow:"hidden",background:C.cardB,aspectRatio:ar }}>
                          {isVideo
                            ? <video src={src} autoPlay muted loop playsInline style={{ width:"100%",height:"100%",objectFit:"contain",display:"block" }}/>
                            : <img src={src} alt="" style={{ width:"100%",height:"100%",objectFit:"contain" }}/>
                          }
                        </div>
                        {section.imageCaptions?.[ii] && (
                          <p style={{ fontFamily:"'DM Sans',sans-serif",fontSize:12,color:C.muted,marginTop:10,textAlign:"center" }}>{section.imageCaptions[ii]}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div style={{ borderRadius:16,background:C.cardA,aspectRatio:"16/9",display:"flex",alignItems:"center",justifyContent:"center" }}>
                  <span style={{ fontFamily:"'DM Sans',sans-serif",fontSize:11,letterSpacing:"0.12em",textTransform:"uppercase",color:C.muted,opacity:0.5 }}>Add images</span>
                </div>
              )}
              {section.desc && (
                <p style={{ fontFamily:"'DM Sans',sans-serif",fontSize:15,fontWeight:300,color:C.muted,maxWidth:680,lineHeight:1.8,marginTop:20 }}>{section.desc}</p>
              )}
            </div>
          </Reveal>
        );
      })}

      {/* ── Impact ── */}
      {cs.impact && (
        <Reveal>
          <div className="side-pad" style={{ padding:"0 64px 96px",display:"grid",gridTemplateColumns:"200px 1fr",gap:88,alignItems:"start" }}>
            <h2 style={{ fontFamily:"'Playfair Display',Georgia,serif",fontStyle:"italic",fontWeight:400,fontSize:"clamp(28px,3vw,40px)",color:C.ink }}>Impact</h2>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:0 }}>
              {cs.impact.map((item,i)=>{
                const isLeft = i % 2 === 0;
                const isTop  = i < 2;
                return (
                  <div key={i} style={{ padding:"32px 40px 32px 0",borderBottom:isTop?`1px dashed ${C.pill}`:"none",borderRight:isLeft?`1px dashed ${C.pill}`:"none",paddingRight:isLeft?40:0,paddingLeft:isLeft?0:40 }}>
                    <div style={{ width:44,height:44,borderRadius:"50%",background:item.color,marginBottom:16 }}/>
                    <p style={{ fontFamily:"'DM Sans',sans-serif",fontSize:15,color:C.ink,lineHeight:1.75,maxWidth:280 }}>{item.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      )}

      {/* ── Next project ── */}
      <Reveal>
        <div className="side-pad" style={{ padding:"0 64px 80px" }}>
          <p style={{ fontFamily:"'DM Sans',sans-serif",fontSize:11,fontWeight:500,letterSpacing:"0.14em",textTransform:"uppercase",color:C.muted,marginBottom:24 }}>Next Project</p>
          <NextProjectCard cs={nextCs}/>
        </div>
      </Reveal>

      <Footer/>
    </div>
  );
}

function NextProjectCard({ cs }) {
  const [hov, setHov] = useState(false);
  const { goWork } = useRouter();
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} onClick={()=>goWork(cs.id)}
      style={{ background:C.cardA,borderRadius:20,overflow:"hidden",cursor:"pointer",display:"grid",gridTemplateColumns:"1fr 2fr",transition:"transform 0.3s,box-shadow 0.3s",transform:hov?"translateY(-4px)":"translateY(0)",boxShadow:hov?"0 16px 40px rgba(0,0,0,0.1)":"none" }}>
      <div style={{ height:160,background:cs.bg }}/>
      <div style={{ padding:"28px 40px",display:"flex",flexDirection:"column",justifyContent:"center" }}>
        <h3 style={{ fontFamily:"'Playfair Display',Georgia,serif",fontStyle:"italic",fontWeight:400,fontSize:24,color:C.ink,marginBottom:8 }}>{cs.title}</h3>
        <p style={{ fontFamily:"'DM Sans',sans-serif",fontSize:14,color:C.muted,fontWeight:300 }}>{cs.subtitle}</p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ABOUT PAGE
// ═══════════════════════════════════════════════════════════════════════════════
const SKILLS_DATA = [
  { category:"Design & Prototyping", items:["Figma","ProtoPie","Framer","After Effects","Adobe Creative Suite"] },
  { category:"AI-Augmented Design",  items:["Claude Code","Lovable","Replit","Cursor","ProtoPie AI","Prompt-driven iteration"] },
  { category:"Platforms",            items:["Living Room / TV OS","iOS","Android","Web","Multi-platform Systems"] },
  { category:"Core Skills",          items:["Product Design","Interaction Design","Motion Design","Design Systems","UX Research"] },
];
const VALUES = [
  { label:"Details matter",         desc:"The micro-interactions, the transitions, the copy — these are what separate a product people tolerate from one they love." },
  { label:"Whimsy is intentional",  desc:"Delight isn't decoration. It's a signal that someone cared enough to go beyond the obvious solution." },
  { label:"Design is a conversation",desc:"The best work happens when designers, engineers, and PMs are genuinely building together — not just handing things off." },
  { label:"Curiosity over certainty",desc:"I'd rather ask a question that reframes the problem than defend a solution I've fallen in love with." },
];
const EXPERIENCE = [
  { company:"Disney Streaming",               role:"Product Designer",                  period:"May 2021–Present", desc:"Design and prototype high-fidelity living room, mobile, and web experiences for Disney+, Hulu, and ESPN+ — spanning motion systems, design infrastructure, AI-powered prototyping workflows, and marquee in-app moments for 131M+ subscribers globally." },
  { company:"Napster (formerly Infinite Reality)", role:"Product Designer (Contract)",   period:"Sep 2025–Sep 2026",         desc:"Designed rich interactive experiences for Napster's web and mobile platforms. Built design systems with 100+ unified components for Napster Spaces and Companion. Worked directly with the CTO on a complete brand redesign." },
  { company:"Anywhere",                       role:"Full-Stack UX Designer (Contract)", period:"Mar 2022–Mar 2023", desc:"Led mobile and web UX for multiple B2B products used by 49,000+ agents across Anywhere's brand portfolio. Designed a mobile onboarding experience now deployed to 200,000+ agents." },
];

function AboutPage() {
  const { go } = useRouter();
  const a = (d) => ({ opacity:0, animation:`fadeUp 0.7s ease ${d}s forwards` });

  return (
    <div className="page-enter">
      {/* Hero */}
      <section className="side-pad" style={{ padding:"120px 64px 80px",position:"relative",overflow:"hidden" }}>
        <FlowerPeony    style={{ position:"absolute",top:80,  left:"-10px", animation:"float1 6s ease-in-out infinite",pointerEvents:"none" }}/>
        <FlowerLavender style={{ position:"absolute",top:100, right:"-8px", animation:"float2 7s ease-in-out infinite",pointerEvents:"none" }}/>
        <FlowerBlossom  style={{ position:"absolute",bottom:0,right:"3%",   animation:"float3 8s ease-in-out infinite 0.5s",pointerEvents:"none",opacity:0.6 }}/>
        <div style={{ maxWidth:840,position:"relative",zIndex:1 }}>
          <p style={{ ...a(0.1),fontFamily:"'DM Sans',sans-serif",fontSize:13,fontWeight:500,letterSpacing:"0.12em",textTransform:"uppercase",color:C.accent,marginBottom:20 }}>About Me</p>
          <h1 style={{ ...a(0.25),fontFamily:"'Playfair Display',Georgia,serif",fontStyle:"italic",fontWeight:400,fontSize:"clamp(48px,6vw,80px)",color:C.ink,lineHeight:1.1,marginBottom:32 }}>
            Designer. Builder.<br/>Storyteller.
          </h1>
          <p style={{ ...a(0.4),fontFamily:"'DM Sans',sans-serif",fontSize:"clamp(17px,1.8vw,21px)",fontWeight:300,color:"#4A4438",lineHeight:1.9,maxWidth:680 }}>
            I'm a Product Designer with 6+ years of experience building products people interact with every day. I care about the intersection of interaction and feel — the details that take a product from functional to genuinely memorable.
          </p>
        </div>
      </section>

      {/* Photo + Bio */}
      <section className="side-pad two-col" style={{ padding:"0 64px 100px",display:"grid",gridTemplateColumns:"1fr 1.3fr",gap:72,alignItems:"start" }}>
        <Reveal>
          <div style={{ position:"relative" }}>
            <div style={{ width:"100%",aspectRatio:"3/4",borderRadius:24,background:`linear-gradient(160deg,${C.cardA},${C.cardB})`,display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden" }}>
              <FlowerDaisy style={{ position:"absolute",top:-16,right:-16,opacity:0.35,transform:"scale(0.9)" }}/>
              <FlowerPeony style={{ position:"absolute",bottom:-14,left:-14,opacity:0.3,transform:"scale(0.8)" }}/>
              <img src="/portfolio/laura.jpg" alt="Laura Marin" style={{ width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top" }}/>
            </div>
            <div style={{ position:"absolute",bottom:-24,right:-24,background:C.cardA,borderRadius:16,padding:"20px 24px",boxShadow:"0 8px 32px rgba(0,0,0,0.08)",maxWidth:220 }}>
              <p style={{ fontFamily:"'Playfair Display',Georgia,serif",fontStyle:"italic",fontSize:14,color:C.rose,marginBottom:4 }}>Fun fact</p>
              <p style={{ fontFamily:"'DM Sans',sans-serif",fontSize:13,fontWeight:300,color:C.muted,lineHeight:1.6 }}>I also produce large-scale immersive events for thousands of guests ✨</p>
            </div>
          </div>
        </Reveal>
        <div>
          <Reveal>
            <p style={{ fontFamily:"'DM Sans',sans-serif",fontSize:"clamp(15px,1.5vw,17px)",fontWeight:300,color:"#4A4438",lineHeight:1.9,marginBottom:20 }}>
              My CS degree from <strong style={{ fontWeight:500,color:C.ink }}>Barnard College, Columbia University</strong> means I speak both design and engineering — making cross-functional work something I genuinely enjoy. I've designed across living room, mobile, and web for <strong style={{ fontWeight:500,color:C.ink }}>Disney+, Hulu, and ESPN+</strong>, reaching over 131 million subscribers.
            </p>
            <p style={{ fontFamily:"'DM Sans',sans-serif",fontSize:"clamp(15px,1.5vw,17px)",fontWeight:300,color:"#4A4438",lineHeight:1.9,marginBottom:20 }}>
              Lately I've been leaning into AI-powered workflows — using Claude, Lovable, and Replit alongside Figma and ProtoPie to compress prototyping cycles and bring ideas to life faster.
            </p>
            <p style={{ fontFamily:"'DM Sans',sans-serif",fontSize:"clamp(15px,1.5vw,17px)",fontWeight:300,color:"#4A4438",lineHeight:1.9 }}>
              Beyond the screen, I founded <strong style={{ fontWeight:500,color:C.ink }}>Second Star Events</strong> and give back through the <strong style={{ fontWeight:500,color:C.ink }}>Neverland Foundation</strong>.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:24,marginTop:40 }}>
              {[["131M+","users reached"],["6+","years experience"]].map(([num,label])=>(
                <div key={label} style={{ borderTop:`1px solid ${C.pill}`,paddingTop:16 }}>
                  <p style={{ fontFamily:"'Playfair Display',serif",fontSize:26,fontWeight:700,color:C.ink }}>{num}</p>
                  <p style={{ fontFamily:"'DM Sans',sans-serif",fontSize:12,color:C.muted,marginTop:4 }}>{label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="side-pad" style={{ padding:"80px 64px 100px",background:C.cardA,position:"relative",overflow:"hidden" }}>
        <FlowerSunflower style={{ position:"absolute",right:0,top:0,opacity:0.07,transform:"scale(4)",pointerEvents:"none" }}/>
        <div style={{ position:"relative",zIndex:1 }}>
          <Reveal><h2 style={{ fontFamily:"'Playfair Display',Georgia,serif",fontStyle:"italic",fontWeight:400,fontSize:"clamp(32px,4vw,52px)",color:C.ink,marginBottom:56 }}>What I believe</h2></Reveal>
          <div className="two-col" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:40 }}>
            {VALUES.map((v,i)=>(
              <Reveal key={v.label} delay={i*0.08}>
                <div style={{ borderTop:`2px solid ${C.rose}`,paddingTop:24 }}>
                  <h3 style={{ fontFamily:"'Playfair Display',Georgia,serif",fontSize:20,fontWeight:400,fontStyle:"italic",color:C.ink,marginBottom:12 }}>{v.label}</h3>
                  <p style={{ fontFamily:"'DM Sans',sans-serif",fontSize:15,fontWeight:300,color:C.muted,lineHeight:1.8 }}>{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="side-pad" style={{ padding:"80px 64px 100px" }}>
        <Reveal><h2 style={{ fontFamily:"'Playfair Display',Georgia,serif",fontStyle:"italic",fontWeight:400,fontSize:"clamp(32px,4vw,52px)",color:C.ink,marginBottom:56 }}>Skills & Tools</h2></Reveal>
        <div className="two-col" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:48 }}>
          {SKILLS_DATA.map((group,i)=>(
            <Reveal key={group.category} delay={i*0.07}>
              <p style={{ fontFamily:"'DM Sans',sans-serif",fontSize:11,fontWeight:500,letterSpacing:"0.14em",textTransform:"uppercase",color:C.accent,marginBottom:16 }}>{group.category}</p>
              <div style={{ display:"flex",flexWrap:"wrap",gap:9 }}>
                {group.items.map(item=><span key={item} style={{ fontFamily:"'DM Sans',sans-serif",fontSize:13,color:C.pillTxt,background:C.pill,padding:"6px 16px",borderRadius:100 }}>{item}</span>)}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="side-pad" style={{ padding:"80px 64px 100px",background:C.cardA }}>
        <Reveal><h2 style={{ fontFamily:"'Playfair Display',Georgia,serif",fontStyle:"italic",fontWeight:400,fontSize:"clamp(32px,4vw,52px)",color:C.ink,marginBottom:56 }}>Experience</h2></Reveal>
        {EXPERIENCE.map((exp,i)=>(
          <Reveal key={i} delay={i*0.07}>
            <div style={{ display:"grid",gridTemplateColumns:"200px 1fr",gap:40,paddingBottom:i<EXPERIENCE.length-1?48:0,borderBottom:i<EXPERIENCE.length-1?`1px solid ${C.pill}`:"none",marginBottom:i<EXPERIENCE.length-1?48:0 }}>
              <div>
                <p style={{ fontFamily:"'DM Sans',sans-serif",fontSize:12,color:C.muted,marginBottom:4 }}>{exp.period}</p>
                <p style={{ fontFamily:"'DM Sans',sans-serif",fontSize:13,fontWeight:500,color:C.accent }}>{exp.company}</p>
              </div>
              <div>
                <h3 style={{ fontFamily:"'Playfair Display',Georgia,serif",fontSize:20,fontWeight:400,color:C.ink,marginBottom:10 }}>{exp.role}</h3>
                <p style={{ fontFamily:"'DM Sans',sans-serif",fontSize:15,fontWeight:300,color:C.muted,lineHeight:1.8,maxWidth:600 }}>{exp.desc}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </section>

      {/* Second Star */}
      <section className="side-pad" style={{ padding:"80px 64px 100px",position:"relative",overflow:"hidden" }}>
        <FlowerBlossom style={{ position:"absolute",right:0,bottom:40,opacity:0.1,transform:"scale(3)",pointerEvents:"none" }}/>
        <Reveal>
          <div className="two-col" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:72,alignItems:"center",position:"relative",zIndex:1 }}>
            <div>
              <p style={{ fontFamily:"'DM Sans',sans-serif",fontSize:11,fontWeight:500,letterSpacing:"0.14em",textTransform:"uppercase",color:C.accent,marginBottom:16 }}>Beyond the screen</p>
              <h2 style={{ fontFamily:"'Playfair Display',Georgia,serif",fontStyle:"italic",fontWeight:400,fontSize:"clamp(32px,4vw,50px)",color:C.ink,lineHeight:1.2,marginBottom:24 }}>Second Star Events</h2>
              <p style={{ fontFamily:"'DM Sans',sans-serif",fontSize:"clamp(15px,1.5vw,17px)",fontWeight:300,color:"#4A4438",lineHeight:1.9,marginBottom:20 }}>
                I founded Second Star Events — a luxury themed events company producing large-scale immersive experiences for thousands of guests across multiple U.S. cities. Partners include Leftfield Media/AwesomeCon.
              </p>
              <p style={{ fontFamily:"'DM Sans',sans-serif",fontSize:"clamp(15px,1.5vw,17px)",fontWeight:300,color:"#4A4438",lineHeight:1.9,marginBottom:32 }}>
                Through the <strong style={{ fontWeight:500,color:C.ink }}>Neverland Foundation</strong>, we give back to local communities and create access to magical experiences for those who need it most.
              </p>
            </div>
            <div style={{ borderRadius:24,background:"linear-gradient(135deg,#3A2010,#7A4A20)",aspectRatio:"4/3",display:"flex",alignItems:"center",justifyContent:"center" }}>
              <span style={{ fontFamily:"'DM Sans',sans-serif",fontSize:11,letterSpacing:"0.15em",textTransform:"uppercase",color:"rgba(255,255,255,0.25)" }}>Add event photo</span>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Contact CTA */}
      <section className="side-pad" style={{ padding:"80px 64px 100px",textAlign:"center",background:C.cardA,position:"relative",overflow:"hidden" }}>
        <FlowerLavender  style={{ position:"absolute",left:"5%", bottom:20,opacity:0.12,transform:"scale(2.2)",pointerEvents:"none" }}/>
        <FlowerSunflower style={{ position:"absolute",right:"5%",bottom:20,opacity:0.12,transform:"scale(2.2)",pointerEvents:"none" }}/>
        <Reveal style={{ position:"relative",zIndex:1 }}>
          <h2 style={{ fontFamily:"'Playfair Display',Georgia,serif",fontStyle:"italic",fontWeight:400,fontSize:"clamp(36px,5vw,68px)",color:C.ink,lineHeight:1.1,marginBottom:20 }}>Let's work together.</h2>
          <p style={{ fontFamily:"'DM Sans',sans-serif",fontSize:16,fontWeight:300,color:C.muted,maxWidth:480,margin:"0 auto 36px",lineHeight:1.8 }}>Always happy to connect with designers, founders, and creatives doing work they're proud of.</p>
          <a href="mailto:laruay99@gmail.com"
            style={{ display:"inline-block",fontFamily:"'DM Sans',sans-serif",fontSize:20,fontWeight:400,color:C.ink,textDecoration:"none",borderBottom:`1.5px solid ${C.ink}`,paddingBottom:3,transition:"color 0.2s,border-color 0.2s",marginBottom:40 }}
            onMouseEnter={e=>{e.currentTarget.style.color=C.rose;e.currentTarget.style.borderColor=C.rose}}
            onMouseLeave={e=>{e.currentTarget.style.color=C.ink;e.currentTarget.style.borderColor=C.ink}}>
            laruay99@gmail.com
          </a>
          <div style={{ display:"flex",justifyContent:"center",gap:36,flexWrap:"wrap" }}>
            {[["LinkedIn","https://www.linkedin.com/in/laura-marin-lopez/"]].map(([label,href])=>(
              <a key={label} href={href} target="_blank" rel="noreferrer"
                style={{ fontFamily:"'DM Sans',sans-serif",fontSize:13,color:C.muted,textDecoration:"none",transition:"color 0.2s" }}
                onMouseEnter={e=>e.currentTarget.style.color=C.rose}
                onMouseLeave={e=>e.currentTarget.style.color=C.muted}>
                {label}
              </a>
            ))}
          </div>
        </Reveal>
      </section>

      <Footer/>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// CONTACT PAGE (simple)
// ═══════════════════════════════════════════════════════════════════════════════
function ContactPage() {
  const a = (d) => ({ opacity:0, animation:`fadeUp 0.7s ease ${d}s forwards` });
  return (
    <div className="page-enter" style={{ minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",textAlign:"center",padding:"120px 64px 100px",position:"relative",overflow:"hidden" }}>
      <FlowerPeony    style={{ position:"absolute",top:"10%",left:"-10px", animation:"float1 6s ease-in-out infinite",pointerEvents:"none" }}/>
      <FlowerLavender style={{ position:"absolute",top:"12%",right:"-8px", animation:"float2 7s ease-in-out infinite",pointerEvents:"none" }}/>
      <FlowerSunflower style={{ position:"absolute",bottom:"8%",left:"4%",  animation:"float4 6.5s ease-in-out infinite",pointerEvents:"none",opacity:0.7 }}/>
      <FlowerBlossom  style={{ position:"absolute",bottom:"10%",right:"4%", animation:"float3 8s ease-in-out infinite",pointerEvents:"none",opacity:0.7 }}/>
      <div style={{ position:"relative",zIndex:1,maxWidth:600 }}>
        <p style={{ ...a(0.1),fontFamily:"'DM Sans',sans-serif",fontSize:13,fontWeight:500,letterSpacing:"0.12em",textTransform:"uppercase",color:C.accent,marginBottom:20 }}>Get in touch</p>
        <h1 style={{ ...a(0.25),fontFamily:"'Playfair Display',Georgia,serif",fontStyle:"italic",fontWeight:400,fontSize:"clamp(48px,7vw,88px)",color:C.ink,lineHeight:1.05,marginBottom:24 }}>
          Got a project<br/>in mind?
        </h1>
        <p style={{ ...a(0.4),fontFamily:"'DM Sans',sans-serif",fontSize:17,fontWeight:300,color:C.muted,lineHeight:1.85,marginBottom:44 }}>
          Always happy to connect with designers, founders, and creatives doing work they're proud of.
        </p>
        <div style={{ ...a(0.55) }}>
          <a href="mailto:laruay99@gmail.com"
            style={{ fontFamily:"'DM Sans',sans-serif",fontSize:22,fontWeight:400,color:C.ink,textDecoration:"none",borderBottom:`1.5px solid ${C.ink}`,paddingBottom:3,transition:"color 0.2s,border-color 0.2s",display:"inline-block",marginBottom:52 }}
            onMouseEnter={e=>{e.currentTarget.style.color=C.rose;e.currentTarget.style.borderColor=C.rose}}
            onMouseLeave={e=>{e.currentTarget.style.color=C.ink;e.currentTarget.style.borderColor=C.ink}}>
            laruay99@gmail.com
          </a>
        </div>
        <div style={{ ...a(0.65),display:"flex",justifyContent:"center",gap:36,flexWrap:"wrap" }}>
          {[["LinkedIn","https://www.linkedin.com/in/laura-marin-lopez/"]].map(([label,href])=>(
            <a key={label} href={href} target="_blank" rel="noreferrer"
              style={{ fontFamily:"'DM Sans',sans-serif",fontSize:13,color:C.muted,textDecoration:"none",transition:"color 0.2s" }}
              onMouseEnter={e=>e.currentTarget.style.color=C.rose}
              onMouseLeave={e=>e.currentTarget.style.color=C.muted}>
              {label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ROOT APP — router lives here
// ═══════════════════════════════════════════════════════════════════════════════
const BASE = "/portfolio";

function parseRoute() {
  const path = window.location.pathname.replace(BASE, "") || "/";
  if (path === "/" || path === "") return { page: "home", workId: null };
  if (path === "/about")   return { page: "about",   workId: null };
  if (path === "/contact") return { page: "contact", workId: null };
  if (path === "/work")    return { page: "work",    workId: null };
  if (path.startsWith("/work/")) return { page: "work", workId: path.replace("/work/", "") };
  return { page: "home", workId: null };
}

export default function App() {
  const initial = parseRoute();
  const [page, setPage]   = useState(initial.page);
  const [workId, setWorkId] = useState(initial.workId);
  const [unlocked, setUnlocked] = useState(false);

  const go = (target) => {
    const path = target === "home" ? `${BASE}/` : `${BASE}/${target}`;
    window.history.pushState({ page: target, workId: null }, "", path);
    setWorkId(null);
    setPage(target);
    if (target !== "work") setUnlocked(false);
    window.scrollTo({ top:0, behavior:"smooth" });
  };

  const goWork = (id) => {
    const path = id ? `${BASE}/work/${id}` : `${BASE}/work`;
    window.history.pushState({ page: "work", workId: id ?? null }, "", path);
    setWorkId(id ?? null);
    setPage("work");
    window.scrollTo({ top:0, behavior:"smooth" });
  };

  useEffect(() => {
    const onPop = () => {
      const { page, workId } = parseRoute();
      setPage(page);
      setWorkId(workId);
      window.scrollTo({ top:0, behavior:"smooth" });
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  return (
    <RouterContext.Provider value={{ page, go, workId, goWork }}>
      <style>{G}</style>
      <Nav/>
      {page === "home"    && <HomePage/>}
      {page === "work"    && <WorkPage/>}
      {page === "about"   && <AboutPage/>}
      {page === "contact" && <ContactPage/>}
    </RouterContext.Provider>
  );
}
