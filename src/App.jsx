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
    fontSize: 13,
    fontWeight: page === target ? 500 : 400,
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
          style={{ fontFamily:"'DM Sans',sans-serif",fontSize:13,color:C.muted,textDecoration:"none",transition:"color 0.2s" }}
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
  { id:"disney-platform",  title:"Disney+ Platform Design",         desc:"Led UX across key product surfaces for a streaming platform with 131M+ subscribers — interaction patterns, component behavior, and experience consistency at scale.", tags:["Product Design","Interaction Design","Design Systems"], bg:"linear-gradient(135deg,#0A1628,#1B2E5A)", span:"wide" },
  { id:"disney-com",       title:"Disney.com Mobile Redesign",      desc:"Redesigned the Disney.com mobile experience — a brand hub unifying Disney's full portfolio through immersive card-based screens and rich, annotated motion design.", tags:["Mobile Design","Motion Design","Disney"], bg:"linear-gradient(135deg,#3D1A00,#8B4500)" },
  { id:"takeovers",        title:"Taylor Swift & Toy Story Takeovers", desc:"Designed immersive, high-stakes UX for two of Disney+'s most visible cultural events — balancing brand fidelity with seamless user flow.",                   tags:["Experience Design","Event UX","Disney+"],             bg:"linear-gradient(135deg,#3D1A4A,#7A3A8A)" },
  { id:"ai-workflow",      title:"AI-Powered Design Workflow",       desc:"Built a rapid prototyping pipeline using Claude, Lovable, and Replit — faster iteration, smarter testing, tighter design-to-dev handoff.",                          tags:["AI Tooling","Prototyping","Figma","ProtoPie"],         bg:"linear-gradient(135deg,#1A3A2A,#2E6B4A)" },
  { id:"second-star",      title:"Second Star Events",               desc:"Founded and led all design for a luxury themed events company — brand, digital experience, and large-scale event design for thousands of guests.",                    tags:["Brand & UX","Experience Design","Founder"],           bg:"linear-gradient(135deg,#3A2010,#7A4A20)" },
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
            {[["131M+","users reached"],["6+","years experience"],["Columbia","CS graduate"]].map(([num,label])=>(
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

      {/* Work preview */}
      <section id="work" className="side-pad" style={{ padding:"80px 64px 100px" }}>
        <Reveal>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:56 }}>
            <h2 style={{ fontFamily:"'Playfair Display',Georgia,serif",fontStyle:"italic",fontSize:"clamp(36px,4vw,56px)",fontWeight:400,color:C.ink }}>Selected Work</h2>
            <button onClick={()=>go("work")} style={{ fontFamily:"'DM Sans',sans-serif",fontSize:13,color:C.muted,background:"none",border:"none",cursor:"pointer",transition:"color 0.2s" }}
              onMouseEnter={e=>e.currentTarget.style.color=C.rose}
              onMouseLeave={e=>e.currentTarget.style.color=C.muted}>
              View all →
            </button>
          </div>
        </Reveal>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:20 }}>
          {PROJECTS.map((p,i)=><HomeProjectCard key={p.id} project={p} delay={i*0.07} onOpen={()=>goWork(p.id)}/>)}
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
    <Reveal delay={delay} style={{ gridColumn:project.span==="wide"?"1 / -1":"auto" }}>
      <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} onClick={onOpen}
        style={{ background:C.cardA,borderRadius:20,overflow:"hidden",cursor:"pointer",transition:"transform 0.3s,box-shadow 0.3s",transform:hov?"translateY(-5px)":"translateY(0)",boxShadow:hov?"0 20px 50px rgba(0,0,0,0.12)":"0 2px 10px rgba(0,0,0,0.05)" }}>
        <div style={{ height:project.span==="wide"?280:210,background:project.bg,position:"relative",display:"flex",alignItems:"center",justifyContent:"center" }}>
          <span style={{ fontFamily:"'DM Sans',sans-serif",fontSize:11,letterSpacing:"0.15em",textTransform:"uppercase",color:"rgba(255,255,255,0.2)" }}>Add project image</span>
          {hov && <div style={{ position:"absolute",top:16,right:16,background:"rgba(255,255,255,0.15)",backdropFilter:"blur(8px)",borderRadius:100,padding:"6px 16px",fontFamily:"'DM Sans',sans-serif",fontSize:12,color:"white" }}>View case study →</div>}
        </div>
        <div style={{ padding:"24px 28px 28px" }}>
          <h3 style={{ fontFamily:"'Playfair Display',Georgia,serif",fontSize:22,fontWeight:400,fontStyle:"italic",color:C.ink,marginBottom:8 }}>{project.title}</h3>
          <p style={{ fontFamily:"'DM Sans',sans-serif",fontSize:14,fontWeight:300,color:C.muted,lineHeight:1.75,marginBottom:16 }}>{project.desc}</p>
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
  { id:"disney-platform",  title:"Disney+ Platform Design",            subtitle:"Designing at scale for 131M+ users",                          tags:["Product Design","Interaction Design","Design Systems","Disney+"], bg:"linear-gradient(135deg,#0A1628,#1B2E5A)", year:"2021–Present", role:"Product Designer", duration:"4+ years",    team:"Cross-functional with Engineering, Product & Brand",
    overview:"Led UX across key product surfaces for Disney+. The work spanned defining new interaction patterns to ensuring consistency across a complex, rapidly evolving design system.",
    challenge:"At the scale of 131M+ subscribers, even small UX decisions have massive downstream impact. The challenge was balancing business velocity with the quality and consistency users deserved.",
    process:[
      {step:"01",label:"Discovery",  desc:"Audited existing patterns across the platform. Identified inconsistencies in interaction behavior and component usage that created friction at scale."},
      {step:"02",label:"Define",     desc:"Workshopped with Product and Engineering to align on north-star principles for interaction. Established what 'on brand' meant in functional UX terms."},
      {step:"03",label:"Design",     desc:"Designed and iterated on component behavior, transition logic, and layout systems in Figma. Prototyped key flows in ProtoPie to validate feel before handoff."},
      {step:"04",label:"Deliver",    desc:"Partnered directly with engineers during implementation. Wrote detailed interaction specs and reviewed builds against prototypes to close design intent gaps."},
    ],
    outcome:"Contributed to a more cohesive, scalable platform experience used daily by millions. Interaction patterns became part of the broader Disney Streaming design system.",
    metrics:[["131M+","subscribers on platform"],["1 system","shared interaction language"],["2 years","continuous iteration"]],
  },
  { id:"disney-com",       title:"Disney.com Mobile Redesign",          subtitle:"A brand hub where every scroll feels alive",
    tags:["Mobile Design","Motion Design","Scroll Interaction","Disney"], bg:"linear-gradient(135deg,#3D1A00,#8B4500)", year:"2024–2025", role:"Product Designer", duration:"Ongoing", team:"Cross-functional with Engineering, Motion, Brand",
    overview:"Redesigned the Disney.com mobile experience — a brand hub that surfaces Disney's full portfolio (Disney+, Star Wars, Marvel, Avatar, Nat Geo, ESPN, 20th Century, Hulu) through immersive card-based screens. Both static UX and motion design were in scope: how each brand looks, and exactly how it feels to move between them.",
    challenge:"Disney.com needs to house dozens of distinct brand identities under one roof, each with its own visual DNA and emotional tone. The mobile redesign had to feel immersive enough to be a destination — not just a directory.",
    process:[
      {step:"01",label:"Brand Mapping",     desc:"Created mood boards to explore how Disney's visual identity could be expressed across different emotional territories — 'Enchanted Sky', 'Crystal Wonder', and 'FairyTale Twilight' — each capturing a different facet of what visitors associate with Disney: nostalgia and innovation, family and imagination, magic and wonder.", img:"/portfolio/disney-com-moodboards.jpg"},
      {step:"02",label:"Interaction Model", desc:"Designed the core swipe-between-cards mechanic. Explored parallax depths, timing curves, and how brand backgrounds should transition — hard cuts vs. cross-fades vs. morphs — and what each communicates emotionally."},
      {step:"03",label:"Motion Design",     desc:"Annotated every static screen with motion intent: parallax layers, scroll-triggered reveals, ambient brand animations (lantern swing, firefly twinkle, cherry blossoms, ESPN Tron-bar). Partnered with motion designers to translate annotations into timing and easing specs."},
      {step:"04",label:"Refinement",        desc:"Iterated on sub-nav collapse behavior for more immersive transitions, full-screen expand-on-tap for imagery, and curved section blending as users scroll between content areas."},
    ],
    outcome:"A redesigned Disney.com mobile experience where browsing brands feels as magical as the content itself — each brand with its own ambient personality, unified by a coherent motion language.",
    metrics:[["8+ brands","one interaction system"],["Static + Motion","both fully designed"],["Mobile-first","375px target viewport"]],
    screens:[
      {brand:"20th Century", bg:"linear-gradient(170deg,#DEC051 0%,#D8A14F 50%,#A06820 100%)", glow:"#FADE4B", card:"#070205"},
      {brand:"Star Wars",    bg:"linear-gradient(170deg,#08080F 0%,#12122A 50%,#1A1A35 100%)", glow:"#FFEF88", card:"#050505"},
      {brand:"Avatar",       bg:"linear-gradient(170deg,#050910 0%,#071525 50%,#0A1F35 100%)", glow:"#0066CC", card:"#050910"},
      {brand:"Nat Geo",      bg:"linear-gradient(170deg,#1A1200 0%,#2E2000 50%,#3D2A00 100%)", glow:"#FFD700", card:"#0D0900"},
      {brand:"ESPN",         bg:"linear-gradient(170deg,#0A0A0A 0%,#1A0000 50%,#2A0000 100%)", glow:"#CC0000", card:"#080404"},
    ],
    motionNotes:[
      {label:"Parallax on Swipe",       desc:"Text and hero imagery slide in slightly after the card itself on swipe — layers at different speeds create physical depth. Background imagery has its own independent parallax offset so the world feels larger than the card."},
      {label:"Cards Rotate into View",  desc:"Cards start slightly angled toward the top and flatten into position as the user scrolls — like a physical card rack spinning into focus. The Disney+ card would begin turned and settle front-and-center as the user lands on it."},
      {label:"Sub-nav Collapse",        desc:"Explored hiding the fixed sub-nav into the hamburger menu on scroll — reducing chrome and making brand backgrounds more immersive. Could allow for richer section-to-section transitions."},
      {label:"Curved Section Blends",   desc:"Rather than a flat scroll, each section curls over the previous one — new content emerges from underneath with the curved edge collapsing as it settles. Reference: jomor.design."},
      {label:"Ambient Brand Details",   desc:"Each brand has its own ambient micro-animation: a lantern that swings, fireflies that twinkle, cherry blossom petals drifting across the screen, animated water blending into the next section as waves."},
      {label:"ESPN Tron Expand",        desc:"On scroll, the ESPN section briefly expands to full-screen with a speed/glow racetrack animation — think Tron — then collapses on further scroll. High impact, contained moment that makes ESPN feel electric."},
    ],
  },
  { id:"takeovers",        title:"Taylor Swift & Toy Story Takeovers",  subtitle:"High-stakes UX for Disney+'s biggest cultural moments",       tags:["Experience Design","Event UX","Disney+"],                         bg:"linear-gradient(135deg,#3D1A4A,#7A3A8A)", year:"2023",      role:"Lead Product Designer",     duration:"8 weeks/event",  team:"Design, Brand, Marketing, Engineering",
    overview:"Designed the end-to-end UX for two of Disney+'s most high-profile platform events — the Taylor Swift Eras Tour film launch and the Toy Story thematic takeover.",
    challenge:"These moments had to feel special and brand-true without breaking the product. Any friction would be amplified by the scale and visibility of the events.",
    process:[
      {step:"01",label:"Brief & Align", desc:"Collaborated with Brand and Marketing to understand the creative vision. Translated marketing goals into UX requirements."},
      {step:"02",label:"Explore",       desc:"Explored a range of takeover concepts from subtle theming to bold contextual overrides. Tested against real user journeys to find the right balance."},
      {step:"03",label:"Prototype",     desc:"Built high-fidelity prototypes in ProtoPie to simulate the full experience — transitions, motion, and ambient effects — for stakeholder alignment."},
      {step:"04",label:"Launch",        desc:"Worked closely with engineering on phased rollout. Monitored behavior post-launch and iterated quickly on friction points before peak traffic."},
    ],
    outcome:"Both events launched on time and drove significant engagement spikes. The Eras Tour experience became one of the most-discussed Disney+ product moments of the year.",
    metrics:[["2 events","designed & shipped"],["8 weeks","design-to-launch"],["#1","trending on launch day"]],
  },
  { id:"ai-workflow",      title:"AI-Powered Design Workflow",          subtitle:"Prototyping faster with AI-native tools",                     tags:["AI Tooling","Prototyping","Figma","ProtoPie"],                    bg:"linear-gradient(135deg,#1A3A2A,#2E6B4A)", year:"2024–Now",  role:"Lead Designer",             duration:"Ongoing",        team:"Solo + Cross-functional",
    overview:"Built a personal design workflow integrating Claude, Lovable, and Replit alongside Figma and ProtoPie to close the gap between ideation and testable prototype.",
    challenge:"Traditional design-to-prototype pipelines create a slow feedback loop. The opportunity was to validate ideas earlier, at higher fidelity, without a full engineering sprint.",
    process:[
      {step:"01",label:"Tool Audit",      desc:"Evaluated AI-native tools for design utility — which accelerated ideation, which were best for testable prototypes, how each integrated with Figma."},
      {step:"02",label:"Workflow Design", desc:"Designed the workflow itself as a UX problem — mapping stages from concept sketch to testable build and identifying where AI tools compress each."},
      {step:"03",label:"Iterate",         desc:"Ran the workflow on real projects. Documented learnings, refined handoff prompts, and built a library of reusable patterns and component starters."},
      {step:"04",label:"Share",           desc:"Socialized the approach with cross-functional partners so engineers and PMs could engage earlier when high-fidelity prototypes were available sooner."},
    ],
    outcome:"Reduced time from concept to testable prototype by ~60%. More design decisions validated with real users before engineering investment.",
    metrics:[["~60%","faster to prototype"],["3 tools","integrated"],["Earlier","user validation"]],
  },
  { id:"second-star",      title:"Second Star Events",                  subtitle:"Building a brand & experience from scratch",                  tags:["Brand & UX","Experience Design","Founder"],                      bg:"linear-gradient(135deg,#3A2010,#7A4A20)", year:"2020–Now",  role:"Founder & Creative Director",duration:"4+ years",       team:"Founding team of 3",
    overview:"Founded Second Star Events, a luxury themed events company producing large-scale immersive experiences for thousands of guests across multiple U.S. cities.",
    challenge:"Building a brand that could compete with established event companies while staying true to a bold, whimsical creative vision — with a lean team and without compromising the guest experience.",
    process:[
      {step:"01",label:"Brand Foundation",  desc:"Developed the brand from scratch — name, identity, voice, and positioning to attract both guests who wanted magic and corporate partners who needed reliability."},
      {step:"02",label:"Experience Design", desc:"Designed the end-to-end guest journey — digital touchpoints (website, ticketing, email) through physical wayfinding, theming, and in-event moments."},
      {step:"03",label:"Digital Presence",  desc:"Built and iterated on the website and partner-facing materials. Applied UX research to optimize conversion and reduce friction in the ticketing flow."},
      {step:"04",label:"Scale & Partner",   desc:"Grew to produce events for thousands of guests. Secured partnerships with Leftfield Media/AwesomeCon. Launched the Neverland Foundation."},
    ],
    outcome:"Second Star Events is now an established name in luxury themed experiences, with a community impact arm and national partnerships.",
    metrics:[["1000s","guests per event"],["4+ years","in operation"],["National","U.S. partnerships"]],
  },
];

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
          <Reveal key={cs.id} delay={i*0.07} style={{ gridColumn:i===0?"1 / -1":"auto" }}>
            <WorkCard cs={cs} wide={i===0} onSelect={onSelect}/>
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
      <div style={{ height:wide?300:220,background:cs.bg,position:"relative",display:"flex",alignItems:"center",justifyContent:"center" }}>
        <span style={{ fontFamily:"'DM Sans',sans-serif",fontSize:11,letterSpacing:"0.15em",textTransform:"uppercase",color:"rgba(255,255,255,0.2)" }}>Add project image</span>
        {hov && <div style={{ position:"absolute",top:16,right:16,background:"rgba(255,255,255,0.15)",backdropFilter:"blur(8px)",borderRadius:100,padding:"6px 16px",fontFamily:"'DM Sans',sans-serif",fontSize:12,color:"white" }}>View case study →</div>}
        <span style={{ position:"absolute",bottom:16,left:20,fontFamily:"'DM Sans',sans-serif",fontSize:11,color:"rgba(255,255,255,0.5)" }}>{cs.year}</span>
      </div>
      <div style={{ padding:"24px 28px 30px" }}>
        <h3 style={{ fontFamily:"'Playfair Display',Georgia,serif",fontSize:22,fontWeight:400,fontStyle:"italic",color:C.ink,marginBottom:8 }}>{cs.title}</h3>
        <p style={{ fontFamily:"'DM Sans',sans-serif",fontSize:14,fontWeight:300,color:C.muted,lineHeight:1.7,marginBottom:16 }}>{cs.subtitle}</p>
        <div style={{ display:"flex",flexWrap:"wrap",gap:8 }}>
          {cs.tags.map(t=><span key={t} style={{ fontFamily:"'DM Sans',sans-serif",fontSize:12,color:C.pillTxt,background:C.pill,padding:"5px 14px",borderRadius:100 }}>{t}</span>)}
        </div>
      </div>
    </div>
  );
}

function CaseStudyDetail({ cs, onBack }) {
  const a = (d) => ({ opacity:0, animation:`fadeUp 0.7s ease ${d}s forwards` });
  const { go } = useRouter();
  const nextCs = CASE_STUDIES[(CASE_STUDIES.findIndex(c=>c.id===cs.id)+1) % CASE_STUDIES.length];

  return (
    <div className="page-enter">
      <div className="side-pad" style={{ padding:"120px 64px 80px",position:"relative",overflow:"hidden" }}>
        <FlowerDaisy style={{ position:"absolute",top:100,right:0,opacity:0.1,transform:"scale(3)",pointerEvents:"none" }}/>
        <button onClick={onBack} style={{ ...a(0.05),fontFamily:"'DM Sans',sans-serif",fontSize:13,color:C.muted,background:"none",border:"none",cursor:"pointer",marginBottom:32,display:"block",transition:"color 0.2s" }}
          onMouseEnter={e=>e.currentTarget.style.color=C.ink}
          onMouseLeave={e=>e.currentTarget.style.color=C.muted}>
          ← All work
        </button>
        <p style={{ ...a(0.1),fontFamily:"'DM Sans',sans-serif",fontSize:12,fontWeight:500,letterSpacing:"0.14em",textTransform:"uppercase",color:C.accent,marginBottom:16 }}>{cs.year} · {cs.role}</p>
        <h1 style={{ ...a(0.25),fontFamily:"'Playfair Display',Georgia,serif",fontStyle:"italic",fontWeight:400,fontSize:"clamp(40px,5vw,72px)",color:C.ink,lineHeight:1.1,marginBottom:16,maxWidth:800 }}>{cs.title}</h1>
        <p style={{ ...a(0.35),fontFamily:"'DM Sans',sans-serif",fontSize:20,fontWeight:300,color:C.muted,marginBottom:32 }}>{cs.subtitle}</p>
        <div style={{ ...a(0.45),display:"flex",flexWrap:"wrap",gap:8 }}>
          {cs.tags.map(t=><span key={t} style={{ fontFamily:"'DM Sans',sans-serif",fontSize:12,color:C.pillTxt,background:C.pill,padding:"5px 14px",borderRadius:100 }}>{t}</span>)}
        </div>
      </div>

      <div className="side-pad" style={{ padding:"0 64px 80px" }}>
        {cs.screens ? (
          <div style={{ height:440,borderRadius:24,background:cs.bg,display:"flex",alignItems:"flex-end",justifyContent:"center",gap:10,padding:"0 32px",overflow:"hidden",position:"relative" }}>
            <div style={{ position:"absolute",inset:0,background:"rgba(0,0,0,0.25)" }}/>
            {cs.screens.map((s,i)=>{
              const yOff = [50,20,0,20,50][i] || 0;
              const rot  = [-8,-3,0,3,8][i] || 0;
              return (
                <div key={i} style={{ flexShrink:0,width:130,height:280,borderRadius:18,background:s.bg,border:"1px solid rgba(255,255,255,0.18)",boxShadow:`0 0 28px ${s.glow}55, 0 24px 48px rgba(0,0,0,0.6)`,transform:`translateY(${yOff}px) rotate(${rot}deg)`,position:"relative",overflow:"hidden",zIndex:5-Math.abs(i-2) }}>
                  <div style={{ height:13,background:"rgba(0,0,0,0.45)",display:"flex",alignItems:"center",padding:"0 8px",justifyContent:"space-between" }}>
                    <span style={{ color:"white",fontSize:5,fontFamily:"sans-serif" }}>9:41</span>
                    <div style={{ width:9,height:2.5,background:"white",borderRadius:2,opacity:0.7 }}/>
                  </div>
                  <div style={{ height:13,background:"rgba(0,0,0,0.22)",display:"flex",alignItems:"center",justifyContent:"center",gap:5,borderBottom:"1px solid rgba(255,255,255,0.1)" }}>
                    {["D+","Shop","Parks","Movies"].map(item=>(
                      <span key={item} style={{ color:"rgba(255,255,255,0.85)",fontSize:4,fontFamily:"sans-serif" }}>{item}</span>
                    ))}
                  </div>
                  <div style={{ textAlign:"center",padding:"18px 0 8px",color:"rgba(255,255,255,0.7)",fontSize:5.5,letterSpacing:"0.06em",fontFamily:"sans-serif" }}>Our Brands</div>
                  <div style={{ margin:"0 9px",borderRadius:11,background:s.card,boxShadow:`0 0 10px ${s.glow}45, inset 0 0 0 1px ${s.glow}28`,padding:"9px",height:130,display:"flex",flexDirection:"column",justifyContent:"space-between",alignItems:"center" }}>
                    <div style={{ color:"rgba(255,255,255,0.55)",fontSize:5,letterSpacing:"0.06em",textAlign:"center",fontFamily:"sans-serif",marginTop:2 }}>{s.brand}</div>
                    <div style={{ color:"rgba(255,255,255,0.55)",fontSize:4.5,textAlign:"center",lineHeight:1.5,padding:"0 4px",fontFamily:"sans-serif" }}>Step into the magic</div>
                    <div style={{ background:"rgba(255,255,255,0.13)",borderRadius:100,padding:"4px 12px",color:"white",fontSize:4.5,fontFamily:"sans-serif" }}>Learn More</div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ height:440,borderRadius:24,background:cs.bg,display:"flex",alignItems:"center",justifyContent:"center" }}>
            <span style={{ fontFamily:"'DM Sans',sans-serif",fontSize:11,letterSpacing:"0.15em",textTransform:"uppercase",color:"rgba(255,255,255,0.25)" }}>Add cover image</span>
          </div>
        )}
      </div>

      <Reveal><div className="side-pad three-col" style={{ padding:"0 64px 80px",display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:32 }}>
        {[["Role",cs.role],["Duration",cs.duration],["Team",cs.team]].map(([label,val])=>(
          <div key={label} style={{ borderTop:`1px solid ${C.pill}`,paddingTop:20 }}>
            <p style={{ fontFamily:"'DM Sans',sans-serif",fontSize:11,fontWeight:500,letterSpacing:"0.12em",textTransform:"uppercase",color:C.muted,marginBottom:8 }}>{label}</p>
            <p style={{ fontFamily:"'DM Sans',sans-serif",fontSize:15,color:C.ink }}>{val}</p>
          </div>
        ))}
      </div></Reveal>

      <Reveal><div className="side-pad" style={{ padding:"0 64px 80px",maxWidth:800 }}>
        <p style={{ fontFamily:"'DM Sans',sans-serif",fontSize:11,fontWeight:500,letterSpacing:"0.14em",textTransform:"uppercase",color:C.accent,marginBottom:20 }}>Overview</p>
        <p style={{ fontFamily:"'DM Sans',sans-serif",fontSize:"clamp(17px,1.9vw,21px)",fontWeight:300,color:"#4A4438",lineHeight:1.9 }}>{cs.overview}</p>
      </div></Reveal>

      <Reveal><div className="side-pad" style={{ padding:"64px 64px",background:C.cardA,marginBottom:80 }}>
        <div style={{ maxWidth:800 }}>
          <p style={{ fontFamily:"'DM Sans',sans-serif",fontSize:11,fontWeight:500,letterSpacing:"0.14em",textTransform:"uppercase",color:C.accent,marginBottom:20 }}>The Challenge</p>
          <p style={{ fontFamily:"'Playfair Display',Georgia,serif",fontStyle:"italic",fontSize:"clamp(20px,2.4vw,30px)",fontWeight:400,color:C.ink,lineHeight:1.7 }}>"{cs.challenge}"</p>
        </div>
      </div></Reveal>

      <div className="side-pad" style={{ padding:"0 64px 80px" }}>
        <Reveal><p style={{ fontFamily:"'DM Sans',sans-serif",fontSize:11,fontWeight:500,letterSpacing:"0.14em",textTransform:"uppercase",color:C.accent,marginBottom:48 }}>Process</p></Reveal>
        {cs.process.map((p,i)=>(
          <Reveal key={i} delay={i*0.08}>
            <div style={{ display:"grid",gridTemplateColumns:"72px 1fr",gap:32,paddingBottom:48,borderBottom:i<cs.process.length-1?`1px solid ${C.pill}`:"none",marginBottom:i<cs.process.length-1?48:0 }}>
              <p style={{ fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:28,fontWeight:400,color:C.pill,paddingTop:4 }}>{p.step}</p>
              <div>
                <p style={{ fontFamily:"'Playfair Display',Georgia,serif",fontSize:22,fontWeight:400,color:C.ink,marginBottom:10 }}>{p.label}</p>
                <p style={{ fontFamily:"'DM Sans',sans-serif",fontSize:16,fontWeight:300,color:C.muted,lineHeight:1.8,maxWidth:640 }}>{p.desc}</p>
                <div style={{ marginTop:24,height:220,borderRadius:16,background:C.cardA,overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center" }}>
                  {p.img
                    ? <img src={p.img} alt={p.label} style={{ width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top" }}/>
                    : <span style={{ fontFamily:"'DM Sans',sans-serif",fontSize:11,letterSpacing:"0.12em",textTransform:"uppercase",color:C.muted,opacity:0.6 }}>Add process image</span>
                  }
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {cs.motionNotes && (
        <div className="side-pad" style={{ padding:"0 64px 80px" }}>
          <Reveal>
            <p style={{ fontFamily:"'DM Sans',sans-serif",fontSize:11,fontWeight:500,letterSpacing:"0.14em",textTransform:"uppercase",color:C.accent,marginBottom:16 }}>Motion Design</p>
            <p style={{ fontFamily:"'DM Sans',sans-serif",fontSize:16,fontWeight:300,color:C.muted,lineHeight:1.85,maxWidth:640,marginBottom:40 }}>
              Every static screen was annotated with motion intent — defining how the experience should feel in motion, from card parallax to ambient brand animations.
            </p>
          </Reveal>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16 }}>
            {cs.motionNotes.map((note,i)=>(
              <Reveal key={i} delay={i*0.06}>
                <div style={{ background:C.cardA,borderRadius:16,padding:"26px 30px",borderLeft:`3px solid ${C.rose}`,height:"100%",boxSizing:"border-box" }}>
                  <p style={{ fontFamily:"'Playfair Display',Georgia,serif",fontStyle:"italic",fontSize:18,fontWeight:400,color:C.ink,marginBottom:10 }}>{note.label}</p>
                  <p style={{ fontFamily:"'DM Sans',sans-serif",fontSize:14,fontWeight:300,color:C.muted,lineHeight:1.78 }}>{note.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      )}

      <div className="side-pad" style={{ padding:"0 64px 100px" }}>
        <Reveal>
          <div style={{ background:C.cardA,borderRadius:24,padding:"56px 64px" }}>
            <p style={{ fontFamily:"'DM Sans',sans-serif",fontSize:11,fontWeight:500,letterSpacing:"0.14em",textTransform:"uppercase",color:C.accent,marginBottom:20 }}>Outcome</p>
            <p style={{ fontFamily:"'DM Sans',sans-serif",fontSize:"clamp(16px,1.7vw,19px)",fontWeight:300,color:"#4A4438",lineHeight:1.9,maxWidth:720,marginBottom:48 }}>{cs.outcome}</p>
            <div className="three-col" style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:32 }}>
              {cs.metrics.map(([num,label])=>(
                <div key={label} style={{ borderTop:`2px solid ${C.rose}`,paddingTop:20 }}>
                  <p style={{ fontFamily:"'Playfair Display',serif",fontSize:32,fontWeight:700,color:C.ink,marginBottom:6 }}>{num}</p>
                  <p style={{ fontFamily:"'DM Sans',sans-serif",fontSize:13,color:C.muted }}>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      {/* Next project */}
      <Reveal><div className="side-pad" style={{ padding:"0 64px 80px" }}>
        <p style={{ fontFamily:"'DM Sans',sans-serif",fontSize:11,fontWeight:500,letterSpacing:"0.14em",textTransform:"uppercase",color:C.muted,marginBottom:24 }}>Next Project</p>
        <NextProjectCard cs={nextCs}/>
      </div></Reveal>

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
  { company:"Napster (formerly Infinite Reality)", role:"Product Designer (Contract)",   period:"Sep 2025",         desc:"Designed rich interactive experiences for Napster's web and mobile platforms. Built design systems with 100+ unified components for Napster Spaces and Companion. Worked directly with the CTO on a complete brand redesign." },
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
export default function App() {
  const [page, setPage]   = useState("home"); // "home" | "work" | "about" | "contact"
  const [workId, setWorkId] = useState(null);

  const go = (target) => {
    setWorkId(null);
    setPage(target);
    window.scrollTo({ top:0, behavior:"smooth" });
  };

  const goWork = (id) => {
    setWorkId(id);
    setPage("work");
    window.scrollTo({ top:0, behavior:"smooth" });
  };

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
