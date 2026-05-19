import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  AlertCircle,
  Layers,
  Activity,
  Info,
  CheckCircle2,
  X,
  Maximize2,
  Menu,
  ChevronDown,
  ArrowRight,
  Filter,
  BarChart3,
  Search,
  BookOpen,
  TrendingUp,
  Map as MapIcon
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// --- Components ---

const Lightbox = ({ src, caption, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-12"
    onClick={onClose}
  >
    <button
      className="absolute top-6 right-6 text-white hover:text-slate-300 transition-colors"
      onClick={onClose}
    >
      <X size={32} />
    </button>
    <div className="max-w-7xl w-full h-full flex flex-col items-center justify-center gap-6" onClick={e => e.stopPropagation()}>
      <img
        src={src}
        alt={caption}
        className="max-w-full max-h-[80vh] object-contain shadow-2xl"
      />
      <p className="text-white text-center text-lg md:text-xl font-medium max-w-4xl px-4">
        {caption}
      </p>
    </div>
  </motion.div>
);

const Figure = ({ src, caption, title, onExpand }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="my-12 group">
      {title && <h4 className="text-center mb-6 text-navy-900 font-semibold text-lg">{title}</h4>}
      <div
        className="relative overflow-hidden rounded-xl border border-slate-200 bg-white cursor-pointer group-hover:border-muted-blue transition-all duration-300 shadow-sm group-hover:shadow-md"
        onClick={() => !imgError && onExpand(src, caption)}
      >
        {imgError ? (
          <div className="aspect-video flex flex-col items-center justify-center bg-slate-50 text-slate-400 p-8 border-2 border-dashed border-slate-200">
            <Info size={48} className="mb-4 opacity-50" />
            <p className="font-mono text-sm">Figure placeholder — asset not found.</p>
            <p className="font-mono text-xs mt-2 text-slate-300">{src}</p>
          </div>
        ) : (
          <>
            <img
              src={src}
              alt={caption}
              className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.01]"
              onError={() => setImgError(true)}
            />
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
              <Maximize2 size={20} className="text-navy-900" />
            </div>
          </>
        )}
      </div>
      <p className="figure-caption italic mt-5 text-slate-500 text-sm text-center px-8 leading-relaxed max-w-3xl mx-auto">
        {caption}
      </p>
    </div>
  );
};

const Section = ({ id, children, className, containerClassName }) => (
  <section id={id} className={cn("scroll-mt-20", className)}>
    <div className={cn("section-container", containerClassName)}>
      {children}
    </div>
  </section>
);

const Card = ({ title, children, icon: Icon, className }) => (
  <div className={cn("card h-full flex flex-col border-slate-200/60", className)}>
    {Icon && <Icon className="text-muted-blue mb-4" size={24} />}
    {title && <h3 className="text-lg font-bold mb-3 text-navy-900 tracking-tight">{title}</h3>}
    <div className="text-slate-600 text-[15px] leading-relaxed">{children}</div>
  </div>
);

const CautionBox = ({ title = "Methodological caution", children, className }) => (
  <div className={cn("caution-box", className)}>
    <div className="flex items-start gap-4">
      <AlertCircle className="text-muted-orange shrink-0 mt-1" size={22} />
      <div>
        <h4 className="text-navy-900 font-bold mb-1.5 text-xs uppercase tracking-widest">{title}</h4>
        <div className="text-slate-700 text-[15px] leading-relaxed">{children}</div>
      </div>
    </div>
  </div>
);

const KeyTakeaway = ({ children, className }) => (
  <div className={cn("key-takeaway border-l-8 border-muted-blue", className)}>
    <div className="flex items-start gap-5">
      <div className="bg-white/10 p-2 rounded-full shrink-0">
        <CheckCircle2 className="text-muted-teal" size={24} />
      </div>
      <p className="font-semibold text-xl leading-snug m-0">{children}</p>
    </div>
  </div>
);

// --- Main Application ---

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxContent, setLightboxContent] = useState({ src: '', caption: '' });
  const [showMexico, setShowMexico] = useState(false);
  const [showTechnical, setShowTechnical] = useState(false);

  const openLightbox = (src, caption) => {
    setLightboxContent({ src, caption });
    setIsLightboxOpen(true);
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const navItems = [
    { id: 'hero', label: 'Overview' },
    { id: 'problem', label: 'Implementation' },
    { id: 'ici', label: 'The Index' },
    { id: 'regional', label: 'Regional View' },
    { id: 'persistence', label: 'Trajectories' },
    { id: 'profiles', label: 'Institutional Profiles' },
    { id: 'structural', label: 'Structural Predictors' },
    { id: 'interpretive-guide', label: 'How to Read' },
    { id: 'residuals', label: 'Diagnostic Signals' },
    { id: 'methodology', label: 'Transparency' },
    { id: 'configurations', label: 'Strategic Configurations' },
    { id: 'outcomes', label: 'Evidence & Authority' },
    { id: 'entry-points', label: 'Entry Points' },
    { id: 'spotlight', label: 'Mexico Spotlight' },
    { id: 'relevance', label: 'Policy Relevance' },
  ];

  return (
    <div className="relative min-h-screen bg-white selection:bg-muted-blue/20">
      {/* Sticky Navigation - Desktop */}
      <nav className="fixed left-0 top-0 bottom-0 w-72 hidden xl:flex flex-col p-10 border-r border-slate-100 bg-slate-50/50 z-40">
        <div className="mb-14">
          <h1 className="text-navy-900 font-extrabold text-2xl leading-tight tracking-tighter uppercase">Legal <span className="text-muted-blue">Internalisation</span></h1>
          <p className="text-[10px] text-slate-400 mt-2 font-bold tracking-[0.2em] uppercase">Policy Diagnostic Framework</p>
        </div>
        <div className="space-y-1 flex-1 overflow-y-auto no-scrollbar py-4 -mx-4 px-4">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={cn(
                "sticky-nav-item py-2.5",
                activeSection === item.id && "active"
              )}
            >
              {item.label}
            </a>
          ))}
        </div>
        <div className="mt-8 pt-8 border-t border-slate-200/60">
          <div className="flex items-center gap-3 text-slate-400">
             <div className="w-2 h-2 rounded-full bg-muted-teal animate-pulse" />
             <p className="text-[10px] uppercase tracking-widest font-bold">Research Prototype v1.0</p>
          </div>
        </div>
      </nav>

      {/* Top Progress Nav - Mobile/Tablet */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200/50 z-40 flex items-center px-6 xl:hidden justify-between">
        <span className="text-navy-900 font-bold text-base tracking-tight uppercase">Internalisation Mapping</span>
        <button className="text-navy-900 p-2 hover:bg-slate-50 rounded-md transition-colors">
            <Menu size={20} />
        </button>
      </nav>

      <main className="xl:ml-72 relative">
        {/* SECTION 0 — Landing / hero */}
        <Section id="hero" className="min-h-screen flex flex-col justify-center bg-gradient-to-br from-white to-slate-50/50">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-4 py-1.5 bg-navy-900 text-white text-[10px] font-bold tracking-[0.3em] uppercase rounded-full mb-8">
              Governance Analysis
            </div>
            <h1 className="text-2xl md:text-4xl md:text-2xl md:text-4xl md:text-6xl lg:text-7xl font-black text-navy-900 mb-8 leading-[1.1] tracking-tight max-w-5xl">
              From Global Health Commitments to Domestic Implementation
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl font-light leading-relaxed">
              A diagnostic-configurational mapping framework for identifying legal, institutional and political entry points in Latin America
            </p>

            <div className="bg-white p-10 rounded-2xl border border-slate-200/60 shadow-xl shadow-slate-200/20 mb-14 max-w-4xl relative overflow-hidden">
               <div className="absolute top-0 left-0 w-2 h-full bg-muted-blue" />
              <p className="text-lg text-slate-700 leading-relaxed mb-10">
                International health agreements do not implement themselves. Once adopted, they must be translated into domestic legal authority, regulatory mandates, institutional routines, budgets, oversight and accountability mechanisms. This project maps that domestic conversion process across Latin America and Cuba.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-10 border-y border-slate-100 mb-10">
                <div className="flex flex-col items-center text-center px-2">
                  <div className="w-14 h-14 rounded-2xl bg-navy-900 text-white flex items-center justify-center mb-4 font-black shadow-lg shadow-navy-900/20">
                     <Layers size={24} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Global commitment</span>
                </div>
                <div className="flex flex-col items-center text-center px-2">
                  <div className="w-14 h-14 rounded-2xl bg-muted-blue text-white flex items-center justify-center mb-4 font-black shadow-lg shadow-muted-blue/20">
                    <BookOpen size={24} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Legal anchoring</span>
                </div>
                <div className="flex flex-col items-center text-center px-2">
                  <div className="w-14 h-14 rounded-2xl bg-muted-teal text-white flex items-center justify-center mb-4 font-black shadow-lg shadow-muted-teal/20">
                    <Activity size={24} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Institutional routines</span>
                </div>
                <div className="flex flex-col items-center text-center px-2">
                  <div className="w-14 h-14 rounded-2xl bg-muted-orange text-white flex items-center justify-center mb-4 font-black shadow-lg shadow-muted-orange/20">
                    <TrendingUp size={24} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Implementation capacity</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium italic">
                <Info size={14} />
                <span>Diagnostic prototype. Not a legal compliance ranking. Not a mechanical forecast.</span>
              </div>
            </div>

            <a
              href="#problem"
              className="inline-flex items-center gap-3 bg-navy-900 text-white px-10 py-5 rounded-xl font-bold hover:bg-navy-950 transition-all shadow-2xl shadow-navy-900/20 active:scale-95"
            >
              Explore the diagnostic mapping
              <ChevronDown size={20} />
            </a>
          </motion.div>
        </Section>

        {/* SECTION 1 — The implementation problem */}
        <Section id="problem" className="bg-slate-50/50">
          <div className="max-w-4xl">
            <h2 className="text-2xl md:text-4xl font-extrabold mb-10 tracking-tight">The problem is not only ratification. <br /><span className="text-muted-blue">It is domestic conversion.</span></h2>
            <p className="text-xl text-slate-600 mb-14 leading-relaxed font-light">
              Countries may ratify international instruments, participate in global health governance, or report formal capacity while still facing uneven domestic ability to convert commitments into enforceable legal and institutional action.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <Card title="1. Ratification" icon={CheckCircle2}>
                Formal international commitment through treaty signatures and accessions.
              </Card>
              <Card title="2. Reporting" icon={Activity}>
                Declared or self-assessed capacity through standard international reporting channels.
              </Card>
              <Card title="3. Internalisation" icon={Layers}>
                Domestic legal-institutional uptake through laws, mandates, budgets, regulatory routines and accountability mechanisms.
              </Card>
            </div>

            <div className="bg-navy-900 text-white p-10 rounded-2xl shadow-xl">
               <p className="text-2xl font-light leading-relaxed mb-0">
                The central question is therefore not only whether countries commit internationally, but <span className="font-semibold text-muted-teal">whether those commitments become domestically actionable.</span>
              </p>
            </div>
          </div>
        </Section>

        {/* SECTION 2 — What the ICI captures */}
        <Section id="ici">
          <div className="max-w-4xl">
            <h2 className="text-2xl md:text-4xl font-extrabold mb-10 tracking-tight">A diagnostic proxy for domestic internalisation capacity</h2>
            <p className="text-xl text-slate-600 mb-12 leading-relaxed font-light">
              The Internalisation Capacity Index (ICI) does not provide a legal finding of compliance. It is a diagnostic proxy for the domestic capacity to convert international health commitments into national legal and institutional action.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {[
                { id: 'D1', label: 'IHR legal/regulatory capacity' },
                { id: 'D2', label: 'Treaty ratification and formal commitments' },
                { id: 'D3', label: 'FCTC/MPOWER implementation' },
                { id: 'D4', label: 'PAHO/WHO governance engagement' },
                { id: 'D5', label: 'Domestic legislative/normative change' },
              ].map(dim => (
                <div key={dim.id} className="p-6 bg-white border border-slate-200/80 rounded-xl shadow-sm flex flex-col gap-4 hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-lg bg-muted-blue/10 text-muted-blue flex items-center justify-center font-black text-sm">
                    {dim.id}
                  </div>
                  <span className="text-base font-semibold text-navy-900 leading-snug">{dim.label}</span>
                </div>
              ))}
            </div>

            <CautionBox>
              The ICI should be read as an analytical proxy, not as a definitive assessment of country compliance or institutional quality.
            </CautionBox>
          </div>
        </Section>

        {/* SECTION 3 — Regional variation */}
        <Section id="regional" className="bg-slate-50/30">
          <div className="max-w-5xl">
            <h2 className="text-2xl md:text-4xl font-extrabold mb-10 tracking-tight">Domestic internalisation capacity varies across the region</h2>

            <Figure
              src="assets/01_regional_internalisation_capacity_2024.png"
              caption="ICI scores provide a diagnostic proxy for legal-institutional internalisation capacity. They should not be read as a legal compliance ranking."
              onExpand={openLightbox}
            />

            <div className="max-w-3xl mt-12">
              <p className="text-xl text-slate-600 leading-relaxed font-light">
                The regional distribution shows that countries do not face the same implementation terrain. A common international commitment may encounter different legal, institutional and political pathways across countries.
              </p>
            </div>
          </div>
        </Section>

        {/* SECTION 4 — Institutional persistence */}
        <Section id="persistence">
          <div className="max-w-5xl">
            <h2 className="text-2xl md:text-4xl font-extrabold mb-10 tracking-tight">Internalisation capacity changes slowly and unevenly</h2>

            <Figure
              src="assets/02_internalisation_trajectories_2011_2024.png"
              caption="The trajectories suggest that internalisation capacity is institutionally sticky: countries move, but usually within historically structured ranges."
              onExpand={openLightbox}
            />

            <div className="max-w-4xl grid md:grid-cols-2 gap-10 mt-12">
              <div>
                <p className="text-lg text-slate-600 leading-relaxed">
                  This matters for implementation support. New international obligations do not enter a blank institutional space. They interact with prior legal capacity, administrative routines, regulatory authority and political-institutional trajectories.
                </p>
              </div>
              <div>
                <KeyTakeaway>
                  Implementation support should begin from each country’s institutional baseline rather than assuming that all countries can absorb new commitments in the same way.
                </KeyTakeaway>
              </div>
            </div>
          </div>
        </Section>

        {/* SECTION 5 — Component profiles and institutional pathways */}
        <Section id="profiles" className="bg-slate-50/30">
          <div className="max-w-5xl">
            <h2 className="text-2xl md:text-4xl font-extrabold mb-10 tracking-tight">Similar scores can reflect different institutional pathways</h2>

            <Figure
              src="assets/03_component_profiles_2024.png"
              caption="The component profile helps identify whether a country’s internalisation capacity is driven by legal/regulatory capacity, treaty commitments, tobacco-control implementation, WHA engagement or norm-change capacity."
              onExpand={openLightbox}
            />

            <div className="max-w-4xl mt-12">
              <p className="text-xl text-slate-600 leading-relaxed font-light mb-10">
                This is where the mapping becomes operational. Similar aggregate ICI scores may hide different configurations of strengths and bottlenecks. One country may have strong treaty commitment but weaker norm-change capacity. Another may have stronger legal anchoring but lower engagement in global health governance processes.
              </p>

              <KeyTakeaway>
                The value of the index is not only the score. It is the profile behind the score.
              </KeyTakeaway>
            </div>
          </div>
        </Section>

        {/* SECTION 6 — Structural predictors */}
        <Section id="structural">
          <div className="max-w-5xl">
            <h2 className="text-2xl md:text-4xl font-extrabold mb-10 tracking-tight">Predicted internalisation capacity is not only a health-sector signal</h2>

            <Figure
              src="assets/04_model_explanation_structural_predictors.png"
              caption="Permutation importance is used as model explanation, not causal evidence. The figure shows which variables structure the model’s diagnostic reading."
              onExpand={openLightbox}
            />

            <div className="max-w-4xl mt-12">
              <p className="text-lg text-slate-600 leading-relaxed mb-10">
                The model suggests that internalisation capacity is structured by broader governance and political-institutional conditions, not only by health-sector indicators. Regulatory quality, time trends, political polarisation, leader-centred legitimation, corruption control, rule of law, participatory democracy and health expenditure can all contribute to the model’s diagnostic reading.
              </p>

              <CautionBox>
                These variables should not be interpreted as causal effects. They identify patterns the model uses to organise the diagnostic space.
              </CautionBox>
            </div>
          </div>
        </Section>


        {/* NEW SECTION — How to read the political-institutional configurations */}
        <Section id="interpretive-guide" className="bg-white border-y border-slate-50">
          <div className="max-w-4xl">
            <h2 className="text-3xl font-bold mb-8 text-navy-900 tracking-tight">How to read the political-institutional configurations</h2>
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed font-light">
              <p>
                This mapping should be read configurationally rather than as a linear ranking. The ICI captures domestic legal-institutional internalisation capacity, but the central analytical question is how that capacity is embedded in different political and institutional environments.
              </p>
              <p>
                Countries may reach similar ICI scores through different pathways: stronger legal anchoring, higher regulatory quality, more stable democratic institutions, denser international participation, or greater legislative capacity. Conversely, similar formal commitments may produce different domestic implementation conditions when executive dominance, weak oversight, democratic erosion, institutional volatility, or limited legal anchoring are present.
              </p>
              <p>
                These configurations are not causal claims. They are structured diagnostic patterns that help identify where domestic implementation capacity may be more resilient, fragile, executive-dependent, legally anchored, or institutionally underdeveloped.
              </p>
            </div>

            <div className="mt-12 p-8 bg-slate-50 rounded-2xl border border-slate-200/60 shadow-sm max-w-3xl">
              <div className="flex items-start gap-4">
                <div className="bg-navy-900/5 p-3 rounded-xl shrink-0">
                  <Info className="text-navy-900" size={24} />
                </div>
                <div>
                  <h4 className="text-navy-900 font-bold mb-3 text-lg">What the configurations show</h4>
                  <p className="text-slate-600 text-[15px] leading-relaxed mb-0">
                    The configurations highlight that domestic internalisation is not only a question of treaty ratification or formal commitment. It depends on the interaction between legal anchoring, institutional capacity, democratic conditions, executive-legislative relations, regulatory quality, governance capacity and participation in global health governance. The visualisations are designed to support policy discussion about where international health commitments are more likely to be domestically absorbed, sustained, or remain vulnerable to political and institutional disruption.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* SECTION 7 — Residuals as diagnostic signals */}
        <Section id="residuals" className="bg-slate-50/30">
          <div className="max-w-5xl">
            <h2 className="text-2xl md:text-4xl font-extrabold mb-10 tracking-tight">Where the model fails is analytically useful</h2>

            <Figure
              src="assets/06_residuals_as_diagnostic_signals.png"
              caption="Average prediction errors can flag countries where observed internalisation is higher or lower than expected, pointing to possible unobserved capacities or hidden bottlenecks."
              onExpand={openLightbox}
            />

            <div className="max-w-4xl mt-12">
              <p className="text-lg text-slate-600 leading-relaxed mb-12">
                Prediction errors are not discarded. They are used as diagnostic signals. A country performing above what the structural model expects may have latent institutional capacity, sector-specific reforms, bureaucratic resilience or international cooperation channels not fully captured by broad indicators. A country performing below expectations may have formal assets that do not translate into domestic legal-institutional uptake.
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="p-8 bg-white rounded-2xl border-t-4 border-muted-teal shadow-lg shadow-slate-200/40">
                  <h4 className="text-navy-900 font-extrabold mb-4 uppercase tracking-wider text-sm flex items-center gap-2">
                    <TrendingUp size={18} className="text-muted-teal" />
                    Observed higher than expected
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed mb-0">
                    Possible unobserved capacity, sectoral reform, bureaucratic resilience or external cooperation.
                  </p>
                </div>
                <div className="p-8 bg-white rounded-2xl border-t-4 border-muted-orange shadow-lg shadow-slate-200/40">
                  <h4 className="text-navy-900 font-extrabold mb-4 uppercase tracking-wider text-sm flex items-center gap-2">
                    <TrendingUp size={18} className="text-muted-orange rotate-180" />
                    Observed lower than expected
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed mb-0">
                    Possible conversion bottlenecks, weak legal anchoring, institutional fragmentation or implementation gaps.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* SECTION 8 — Methodological transparency */}
        <Section id="methodology">
          <div className="max-w-4xl mb-10 flex items-center justify-between">
             <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight">Methodological transparency</h2>
             <button
                onClick={() => setShowTechnical(!showTechnical)}
                className="flex items-center gap-2 text-muted-blue font-bold text-sm uppercase tracking-widest px-4 py-2 bg-muted-blue/5 rounded-lg hover:bg-muted-blue/10 transition-colors"
             >
                <Filter size={16} />
                {showTechnical ? 'Hide Technical Details' : 'Show Technical Details'}
             </button>
          </div>

          <div className="max-w-4xl">
            <h3 className="text-2xl font-bold mb-6 text-navy-900">Why this is diagnostic rather than predictive</h3>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              The model captures some structure, but it does not produce strong country-level forecasts. This is substantively important. The point is not to automate prediction. The point is to structure comparison, identify anomalies and guide qualitative legal-institutional follow-up.
            </p>

            <AnimatePresence>
              {showTechnical && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <Figure
                    src="assets/05_observed_vs_predicted_validation.png"
                    caption="The validation result supports a diagnostic rather than predictive use. The model is more useful for identifying patterns, anomalies and follow-up questions than for forecasting country performance."
                    onExpand={openLightbox}
                  />
                  <CautionBox className="mb-12">
                    The framework should be used as a decision-support layer, not as an automated assessment of country performance.
                  </CautionBox>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Section>

        {/* SECTION 9 — Strategic configurations */}
        <Section id="configurations" className="bg-navy-950 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-muted-blue/5 -skew-x-12 translate-x-20" />
          <div className="max-w-5xl relative z-10">
            <h2 className="text-2xl md:text-4xl font-extrabold mb-10 tracking-tight text-white">Strategic configurations identify different implementation terrains</h2>

            <div className="bg-white rounded-2xl p-4 md:p-8 mb-16">
               <Figure
                  src="assets/07_strategic_configurations_mapping.png"
                  caption="The configurations are descriptive heuristics, not natural types or causal regimes. They support comparison, case selection and entry-point identification."
                  onExpand={openLightbox}
                />
            </div>

            <div className="max-w-4xl">
              <p className="text-xl text-slate-300 leading-relaxed font-light mb-16">
                The configurational layer groups country-years into strategic patterns. These patterns are not deterministic classifications. They help identify whether a country’s implementation terrain appears more structured, developing or constrained by political-institutional conditions.
              </p>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
                  <div className="w-12 h-12 rounded-xl bg-muted-teal/20 text-muted-teal flex items-center justify-center mb-6 font-black">1</div>
                  <h4 className="text-white font-bold text-lg mb-4">High-capacity structured</h4>
                  <p className="text-slate-400 text-sm leading-relaxed mb-0">
                    Stronger institutional and governance profile; potential for more durable domestic conversion.
                  </p>
                </div>
                <div className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
                  <div className="w-12 h-12 rounded-xl bg-muted-blue/20 text-muted-blue flex items-center justify-center mb-6 font-black">2</div>
                  <h4 className="text-white font-bold text-lg mb-4">Moderate-capacity developing</h4>
                  <p className="text-slate-400 text-sm leading-relaxed mb-0">
                    Intermediate profile; possible reform opportunities but uneven institutional anchoring.
                  </p>
                </div>
                <div className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
                  <div className="w-12 h-12 rounded-xl bg-muted-orange/20 text-muted-orange flex items-center justify-center mb-6 font-black">3</div>
                  <h4 className="text-white font-bold text-lg mb-4">Constrained polarised</h4>
                  <p className="text-slate-400 text-sm leading-relaxed mb-0">
                    Weaker or more fragmented institutional profile; support may require sequencing, coalition-building or legal-institutional scaffolding.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* SECTION 10 & 11 — Outcomes & Authority */}
        <Section id="outcomes">
          <div className="max-w-5xl">
            <h2 className="text-2xl md:text-4xl font-extrabold mb-10 tracking-tight">Evidence and institutional authority</h2>

            <div className="grid md:grid-cols-2 gap-12 mb-16">
               <div>
                  <h3 className="text-2xl font-bold mb-6">Configuration profiles differ in average internalisation capacity</h3>
                  <Figure
                    src="assets/08_configuration_outcomes_2024.png"
                    caption="Mean ICI differs across strategic configurations, with country points overlaid. This should be read descriptively, not causally."
                    onExpand={openLightbox}
                  />
                  <p className="text-slate-600 mt-6 leading-relaxed">
                    The configuration profiles help show how different institutional terrains correspond to different levels of internalisation capacity. This does not mean the configuration causes the outcome. It means that the mapping can help distinguish different implementation contexts.
                  </p>
               </div>
               <div>
                  <h3 className="text-2xl font-bold mb-6">How political authority shapes conversion</h3>
                  <Figure
                    src="assets/09_configuration_profiles_political_authority.png"
                    caption="Configuration profiles are descriptive heuristics, not causal regimes. Values are standardised for comparability."
                    onExpand={openLightbox}
                  />
                  <p className="text-slate-600 mt-6 leading-relaxed">
                    The configuration profiles show that political authority, executive constraints, regulatory quality, democratic institutions, populism, polarisation and governance conditions may combine in different ways. Health commitments pass through political authority, legal mandates and institutional constraints.
                  </p>
               </div>
            </div>
          </div>
        </Section>

        {/* SECTION 12 — From configurations to entry points */}
        <Section id="entry-points" className="bg-slate-50/50">
          <div className="max-w-5xl">
            <h2 className="text-2xl md:text-4xl font-extrabold mb-10 tracking-tight text-navy-900">From configurations to entry points</h2>
            <p className="text-xl text-slate-600 mb-12 leading-relaxed font-light max-w-3xl">
              The mapping translates analytical findings into practical implementation questions, identifying specific legal and institutional entry points.
            </p>

            <Figure
              src="assets/10_political_authority_conversion_matrix.png"
              caption="The matrix is a heuristic interpretation of the model results. It should guide qualitative follow-up and implementation conversations, not be read as a causal classification."
              onExpand={openLightbox}
            />

            <div className="mt-16 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xl">
              <table className="min-w-[800px] w-full text-left border-collapse">
                <thead>
                  <tr className="bg-navy-900 text-white">
                    <th className="p-6 font-bold uppercase tracking-widest text-[10px] w-1/3 border-r border-white/10">Configuration signal</th>
                    <th className="p-6 font-bold uppercase tracking-widest text-[10px] w-1/3 border-r border-white/10">Possible bottleneck</th>
                    <th className="p-6 font-bold uppercase tracking-widest text-[10px] w-1/3">Strategic entry point</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="p-6 font-bold text-navy-900 border-r border-slate-100">1. Strong formal commitments + <br />weak legal anchoring</td>
                    <td className="p-6 text-slate-600 border-r border-slate-100 italic">Possible bottleneck: Commitments may not be domestically actionable.</td>
                    <td className="p-6 font-medium text-muted-blue">Strategic entry point: Legal preparedness review; statutory mandates; regulatory clarification.</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="p-6 font-bold text-navy-900 border-r border-slate-100">2. Executive mobilisation + <br />weak institutional anchoring</td>
                    <td className="p-6 text-slate-600 border-r border-slate-100 italic">Possible bottleneck: Fast uptake but uncertain durability.</td>
                    <td className="p-6 font-medium text-muted-blue">Strategic entry point: Budgetary anchoring; oversight routines; parliamentary committee engagement.</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="p-6 font-bold text-navy-900 border-r border-slate-100">3. Institutional continuity + <br />weak signalling</td>
                    <td className="p-6 text-slate-600 border-r border-slate-100 italic">Possible bottleneck: Administrative routines may exist but remain politically invisible.</td>
                    <td className="p-6 font-medium text-muted-blue">Strategic entry point: Documentation, reporting, inter-ministerial coordination and legal traceability.</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="p-6 font-bold text-navy-900 border-r border-slate-100">4. Low baseline capacity + <br />high external engagement</td>
                    <td className="p-6 text-slate-600 border-r border-slate-100 italic">Possible bottleneck: Support may exceed absorptive capacity.</td>
                    <td className="p-6 font-medium text-muted-blue">Strategic entry point: Sequenced technical cooperation; institutional scaffolding; implementation roadmaps.</td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="p-6 font-bold text-navy-900 border-r border-slate-100">5. Strong technical profile + <br />low political conversion</td>
                    <td className="p-6 text-slate-600 border-r border-slate-100 italic">Possible bottleneck: Technical readiness may not become legal or policy change.</td>
                    <td className="p-6 font-medium text-muted-blue">Strategic entry point: Policy brokerage; executive-legislative coordination; regulatory reform windows.</td>
                  </tr>
</tbody>
              </table>
            </div>
          </div>
        </Section>

        {/* SECTION 13 — Country spotlight: Mexico */}
        <Section id="spotlight">
          <div className="max-w-5xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
               <div>
                  <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-4">Country spotlight: Mexico</h2>
                  <p className="text-xl text-slate-600 font-light max-w-2xl leading-relaxed">
                    Mexico illustrates how the framework can move from regional mapping to country-level diagnostic questions.
                  </p>
               </div>
               <button
                  onClick={() => setShowMexico(!showMexico)}
                  className="flex items-center gap-3 bg-white border-2 border-navy-900 text-navy-900 px-8 py-3 rounded-xl font-bold hover:bg-navy-900 hover:text-white transition-all active:scale-95"
               >
                  <Search size={20} />
                  {showMexico ? 'Close Spotlight' : 'Explore Mexico Case'}
               </button>
            </div>

            <AnimatePresence>
              {showMexico && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="space-y-16 py-10 border-t border-slate-100"
                >
                  <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                       <h3 className="text-2xl font-bold mb-4">Mexico’s main gap is norm-change capacity</h3>
                       <p className="text-slate-600 leading-relaxed mb-6">
                         The component profile suggests that Mexico’s challenge is not formal treaty commitment, but the translation of commitments into domestic legal and normative change.
                       </p>
                    </div>
                    <Figure
                      src="assets/mexico_02_component_profile.png"
                      caption="Mexico Component Profile (2024)"
                      onExpand={openLightbox}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-12 items-center">
                    <Figure
                      src="assets/mexico_01_internalisation_trajectory.png"
                      caption="Mexico Internalisation Trajectory (2011–2024)"
                      onExpand={openLightbox}
                    />
                    <div>
                       <h3 className="text-2xl font-bold mb-4">Internalisation capacity has declined since 2015</h3>
                       <p className="text-slate-600 leading-relaxed mb-6">
                         The trajectory suggests a decline in Mexico’s ICI over time, while remaining near the regional median in recent years.
                       </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                       <h3 className="text-2xl font-bold mb-4">Mexico performs slightly above structural expectations</h3>
                       <p className="text-slate-600 leading-relaxed mb-6">
                         A negative prediction error means observed ICI is higher than predicted. This may suggest latent institutional capacity not fully captured by general governance indicators.
                       </p>
                    </div>
                    <Figure
                      src="assets/mexico_03_structural_outlier.png"
                      caption="Mexico Structural Residual Analysis"
                      onExpand={openLightbox}
                    />
                  </div>

                  <CautionBox>
                    These figures identify diagnostic questions. They do not establish causal mechanisms or make a legal compliance judgement.
                  </CautionBox>
                </motion.div>
              )}
            </AnimatePresence>

            {!showMexico && (
              <div className="p-16 bg-slate-50 rounded-2xl text-center border-2 border-dashed border-slate-200">
                 <p className="text-slate-400 font-medium italic mb-0">Click the button above to explore the Mexico diagnostic example.</p>
              </div>
            )}
          </div>
        </Section>

        {/* SECTION 14 — Potential relevance for PAHO/WHO-style work */}
        <Section id="relevance" className="bg-slate-50/50">
          <div className="max-w-4xl">
            <h2 className="text-2xl md:text-4xl font-extrabold mb-10 tracking-tight">Potential use as an implementation-intelligence layer</h2>

            <div className="grid sm:grid-cols-2 gap-6 mb-16">
              <Card title="Legal preparedness mapping" icon={MapIcon}>
                Identify where IHR or Pandemic Agreement commitments may require stronger domestic legal anchoring.
              </Card>
              <Card title="Differentiated country support" icon={Activity}>
                Tailor technical cooperation according to institutional configuration rather than one-size-fits-all assumptions.
              </Card>
              <Card title="Reform-window identification" icon={Layers}>
                Detect where legal or regulatory change may be more plausible and where longer sequencing may be required.
              </Card>
              <Card title="Country follow-up prioritisation" icon={BarChart3}>
                Use residuals and component profiles to identify cases where qualitative legal-institutional review would be most valuable.
              </Card>
            </div>

            <KeyTakeaway className="bg-navy-900">
               The value of the mapping is not to replace country expertise, but to make implementation conversations more targeted, more legally grounded and more institutionally realistic.
            </KeyTakeaway>
          </div>
        </Section>

        {/* SECTION 15 — What this tool does and does not claim */}
        <Section id="claims">
          <div className="max-w-5xl">
            <h2 className="text-2xl md:text-4xl font-extrabold mb-12 tracking-tight">What this tool does — and does not — claim</h2>

            <div className="grid md:grid-cols-2 gap-0 border border-slate-200 rounded-3xl overflow-hidden shadow-2xl">
              <div className="p-10 bg-slate-50/50">
                <h3 className="text-xl font-black uppercase tracking-widest text-muted-blue mb-8">This tool does:</h3>
                <ul className="space-y-6">
                  {[
                    "Map domestic internalisation capacity.",
                    "Compare legal-institutional profiles.",
                    "Identify possible bottlenecks.",
                    "Support differentiated implementation conversations.",
                    "Generate questions for country-level legal and institutional review."
                  ].map((item, idx) => (
                    <li key={idx} className="flex gap-4 items-start">
                      <div className="w-6 h-6 rounded-full bg-muted-blue/20 flex items-center justify-center shrink-0 mt-1">
                         <div className="w-2 h-2 rounded-full bg-muted-blue" />
                      </div>
                      <span className="text-slate-700 font-medium leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-10 bg-white border-l border-slate-200">
                <h3 className="text-xl font-black uppercase tracking-widest text-muted-orange mb-8">This tool does not:</h3>
                <ul className="space-y-6">
                  {[
                    "Make legal compliance determinations.",
                    "Claim causal identification.",
                    "Forecast implementation mechanically.",
                    "Rank countries as successes or failures.",
                    "Replace country expertise or qualitative legal analysis."
                  ].map((item, idx) => (
                    <li key={idx} className="flex gap-4 items-start">
                      <div className="w-6 h-6 rounded-full bg-muted-orange/20 flex items-center justify-center shrink-0 mt-1">
                         <div className="w-2 h-2 rounded-full bg-muted-orange" />
                      </div>
                      <span className="text-slate-700 font-medium leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Section>

        {/* SECTION 16 — Footer */}
        <footer className="bg-navy-950 text-white py-24 px-10 border-t border-white/5 relative overflow-hidden">
           <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-muted-blue via-muted-teal to-muted-orange" />
           <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between gap-16 relative z-10">
              <div className="max-w-md">
                 <h2 className="text-2xl font-extrabold text-white mb-6 uppercase tracking-tight">Legal <span className="text-muted-blue">Internalisation</span></h2>
                 <p className="text-slate-400 text-sm leading-relaxed mb-8">
                   Research prototype for diagnostic and policy discussion purposes regarding domestic legal-institutional internalisation capacity in global health governance.
                 </p>
                 <div className="space-y-4">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-2">Repository and Archiving</span>
                      <p className="text-slate-400 text-xs leading-relaxed">
                        The project is being prepared for open-source release. Code, documentation, and versioned materials will be made available through GitHub and Zenodo after formal launch. Preliminary access may be available upon reasonable request.
                      </p>
                    </div>
                    <div className="flex gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                        <span>© 2026</span>
                    </div>
                 </div>
              </div>

              <div className="grid grid-cols-1 gap-8 text-sm">
                 <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-4">Author</span>
                    <div className="text-white space-y-1">
                      <p className="font-bold">Adela Santos</p>
                      <p className="text-xs text-slate-400">adela.santos@graduateinstitute.ch</p>
                      <p className="text-xs text-slate-400">Postdoctoral Visiting Fellow, Global Health Centre, Geneva Graduate Institute (IHEID)</p>
                      <p className="text-xs text-slate-400">Swiss Government Excellence Scholarship Holder, 2025–2026</p>
                    </div>
                 </div>
                 <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-4">Source Note</span>
                    <p className="text-slate-300">Author’s calculations. Updated ICI panel, 18 Latin American countries plus Cuba, 2011–2024.</p>
                 </div>
              </div>
           </div>

           <div className="max-w-5xl mx-auto mt-20 pt-10 border-t border-white/5">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">Disclaimer</h4>
              <p className="text-[10px] text-slate-600 leading-relaxed max-w-2xl italic">
                 This framework is intended for analytical and academic purposes. The Internalisation Capacity Index (ICI), country mappings, and political-institutional configurations are diagnostic proxies. They should not be interpreted as definitive legal findings, official country rankings, compliance determinations, causal estimates, or forecasts. No international organization has endorsed or validated these results.
              </p>
           </div>
        </footer>
      </main>

      <AnimatePresence>
        {isLightboxOpen && (
          <Lightbox
            src={lightboxContent.src}
            caption={lightboxContent.caption}
            onClose={() => setIsLightboxOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
