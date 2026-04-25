import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { Publication, Research } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import {
  Float,
  Line,
  MeshDistortMaterial,
  Sphere,
  Stars,
  Torus,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  ChevronDown,
  FlaskConical,
  Linkedin,
  Mail,
  Youtube,
} from "lucide-react";
import { motion } from "motion/react";
import { Suspense, useMemo, useRef } from "react";
import type * as THREE from "three";
import { createActor } from "../backend";

// ─────────────────────────── 3D Scene Components ────────────────────────────

function OrbitingRing({
  radius,
  speed,
  color,
  tilt,
}: { radius: number; speed: number; color: string; tilt: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * speed;
  });
  return (
    <group ref={ref} rotation={[tilt, 0, 0]}>
      <Torus args={[radius, 0.012, 16, 120]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.6}
          transparent
          opacity={0.5}
        />
      </Torus>
    </group>
  );
}

function AtomNode({
  position,
  color,
  scale = 1,
}: { position: [number, number, number]; color: string; scale?: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.position.y =
        position[1] +
        Math.sin(clock.getElapsedTime() * 0.8 + position[0]) * 0.08;
    }
  });
  return (
    <Sphere ref={ref} args={[0.08 * scale, 16, 16]} position={position}>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.9}
      />
    </Sphere>
  );
}

function DNAStrand() {
  const nodes = useMemo(() => {
    const pts: Array<{ pos: [number, number, number]; color: string }> = [];
    for (let i = 0; i < 14; i++) {
      const t = (i / 13) * Math.PI * 2.5;
      const y = (i / 13) * 4 - 2;
      const x1 = Math.cos(t) * 0.7;
      const z1 = Math.sin(t) * 0.7;
      const x2 = Math.cos(t + Math.PI) * 0.7;
      const z2 = Math.sin(t + Math.PI) * 0.7;
      pts.push({ pos: [x1, y, z1], color: "#00e5ff" });
      pts.push({ pos: [x2, y, z2], color: "#ff00d4" });
    }
    return pts;
  }, []);

  const strand1 = useMemo(() => {
    const pts: [number, number, number][] = [];
    for (let i = 0; i < 40; i++) {
      const t = (i / 39) * Math.PI * 2.5;
      const y = (i / 39) * 4 - 2;
      pts.push([Math.cos(t) * 0.7, y, Math.sin(t) * 0.7]);
    }
    return pts;
  }, []);

  const strand2 = useMemo(() => {
    const pts: [number, number, number][] = [];
    for (let i = 0; i < 40; i++) {
      const t = (i / 39) * Math.PI * 2.5;
      const y = (i / 39) * 4 - 2;
      pts.push([Math.cos(t + Math.PI) * 0.7, y, Math.sin(t + Math.PI) * 0.7]);
    }
    return pts;
  }, []);

  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.12;
    }
  });

  return (
    <group ref={ref} position={[-1.2, 0, 0]}>
      <Line points={strand1} color="#00e5ff" lineWidth={1.5} />
      <Line points={strand2} color="#ff00d4" lineWidth={1.5} />
      {nodes.map((n, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: static geometry nodes, no reordering
        <AtomNode key={i} position={n.pos} color={n.color} scale={0.9} />
      ))}
    </group>
  );
}

function FloatingMolecule({
  position,
  color,
  speed,
}: { position: [number, number, number]; color: string; speed: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.x = clock.getElapsedTime() * speed * 0.7;
      ref.current.rotation.y = clock.getElapsedTime() * speed;
      ref.current.position.y =
        position[1] +
        Math.sin(clock.getElapsedTime() * 0.5 + position[0]) * 0.15;
    }
  });
  return (
    <Sphere ref={ref} args={[0.22, 32, 32]} position={position}>
      <MeshDistortMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        distort={0.35}
        speed={2}
        transparent
        opacity={0.85}
      />
    </Sphere>
  );
}

function ParticleField() {
  const count = 120;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return arr;
  }, []);
  const ref = useRef<THREE.Points>(null);
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.03;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute args={[positions, 3]} attach="attributes-position" />
      </bufferGeometry>
      <pointsMaterial
        color="#00e5ff"
        size={0.03}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function HeroScene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[3, 3, 3]} intensity={1.5} color="#00e5ff" />
      <pointLight position={[-3, -2, -3]} intensity={1.2} color="#ff00d4" />
      <pointLight position={[0, 4, 0]} intensity={0.8} color="#ffffff" />

      <Stars radius={80} depth={50} count={1800} factor={3} fade speed={0.5} />
      <ParticleField />
      <DNAStrand />

      <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.4}>
        <FloatingMolecule
          position={[1.8, 0.4, -0.5]}
          color="#00e5ff"
          speed={0.4}
        />
      </Float>
      <Float speed={1.1} rotationIntensity={0.4} floatIntensity={0.5}>
        <FloatingMolecule
          position={[2.4, -0.8, 0.6]}
          color="#ff00d4"
          speed={0.5}
        />
      </Float>
      <Float speed={0.9} rotationIntensity={0.2} floatIntensity={0.3}>
        <FloatingMolecule
          position={[-2.6, 0.2, -0.3]}
          color="#7c3aed"
          speed={0.3}
        />
      </Float>

      <OrbitingRing radius={1.6} speed={0.5} color="#00e5ff" tilt={0.4} />
      <OrbitingRing radius={2.2} speed={-0.3} color="#ff00d4" tilt={1.1} />
      <OrbitingRing radius={1.1} speed={0.7} color="#7c3aed" tilt={0.9} />
    </>
  );
}

// ───────────────────────── React Query hooks ────────────────────────────────

function useRecentResearch() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Research[]>({
    queryKey: ["researches"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getResearches();
    },
    enabled: !!actor && !isFetching,
  });
}

function useRecentPublications() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Publication[]>({
    queryKey: ["publications"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPublications();
    },
    enabled: !!actor && !isFetching,
  });
}

// ───────────────────────── Sub-Components ───────────────────────────────────

function HeroOverlay() {
  const scrollToHighlights = () => {
    document
      .getElementById("highlights")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4">
      {/* Decorative top line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="h-px w-48 mb-6"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(0.65 0.2 200), transparent)",
        }}
      />

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Badge
          variant="outline"
          className="mb-6 px-4 py-1.5 text-xs tracking-widest uppercase border-primary/50 text-primary font-display"
          style={{
            background: "oklch(0.12 0.02 280 / 0.7)",
            backdropFilter: "blur(8px)",
          }}
        >
          Pharmacologist &amp; Researcher
        </Badge>
      </motion.div>

      {/* Name */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="font-display font-bold text-center leading-tight mb-4 text-foreground"
        style={{
          fontSize: "clamp(2.2rem, 6vw, 5.5rem)",
          textShadow: "0 0 40px oklch(0.65 0.2 200 / 0.3)",
        }}
        data-ocid="hero.heading"
      >
        Dr. Ashwin Singh Chouhan
      </motion.h1>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="font-display text-center font-semibold tracking-widest uppercase mb-10"
        style={{
          fontSize: "clamp(0.9rem, 2vw, 1.4rem)",
          background:
            "linear-gradient(135deg, oklch(0.65 0.2 200), oklch(0.65 0.25 320))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        Advancing Pharmacology Through Quantum Discovery
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="flex flex-wrap gap-3 justify-center mb-10"
      >
        <a
          href="mailto:ashwinsingh26061992@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          data-ocid="hero.email_button"
          className="flex items-center gap-2 px-5 py-2.5 rounded-full font-display text-sm font-semibold transition-smooth hover:scale-105 glass-card neon-border-cyan text-foreground hover:glow-cyan"
        >
          <Mail className="w-4 h-4 text-primary" />
          Email
        </a>
        <a
          href="https://linkedin.com/in/ashwin-singh-chouhan-abba34161"
          target="_blank"
          rel="noopener noreferrer"
          data-ocid="hero.linkedin_button"
          className="flex items-center gap-2 px-5 py-2.5 rounded-full font-display text-sm font-semibold transition-smooth hover:scale-105 glass-card neon-border-fuchsia text-foreground hover:glow-fuchsia"
        >
          <Linkedin className="w-4 h-4 text-accent" />
          LinkedIn
        </a>
        <a
          href="https://www.youtube.com/@ashwinsinghchouhan5221"
          target="_blank"
          rel="noopener noreferrer"
          data-ocid="hero.youtube_button"
          className="flex items-center gap-2 px-5 py-2.5 rounded-full font-display text-sm font-semibold transition-smooth hover:scale-105 glass-card neon-border-cyan text-foreground"
          style={{
            borderColor: "oklch(0.58 0.21 22 / 0.8)",
            boxShadow: "0 0 20px oklch(0.58 0.21 22 / 0.3)",
          }}
        >
          <Youtube
            className="w-4 h-4"
            style={{ color: "oklch(0.58 0.21 22)" }}
          />
          YouTube
        </a>
      </motion.div>

      {/* Scroll cue */}
      <motion.button
        onClick={scrollToHighlights}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
        aria-label="Scroll to content"
        data-ocid="hero.scroll_button"
      >
        <span className="text-xs font-display tracking-widest uppercase">
          Explore
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.button>
    </div>
  );
}

function ResearchHighlightCard({
  item,
  index,
}: { item: Research; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      data-ocid={`research.item.${index + 1}`}
      className="glass-card rounded-xl p-5 flex flex-col gap-3 hover:neon-border-cyan transition-smooth group"
    >
      <div className="flex items-start justify-between gap-2">
        <FlaskConical className="w-5 h-5 text-primary mt-0.5 shrink-0" />
        <span className="text-xs text-muted-foreground font-body">
          {item.date}
        </span>
      </div>
      <h3 className="font-display font-semibold text-foreground text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors">
        {item.title}
      </h3>
      <p className="text-xs text-muted-foreground font-body line-clamp-3">
        {item.summary}
      </p>
      <div className="flex flex-wrap gap-1 mt-auto">
        {item.tags.slice(0, 3).map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="text-xs px-2 py-0.5 font-body"
          >
            {tag}
          </Badge>
        ))}
      </div>
    </motion.div>
  );
}

function PublicationHighlightCard({
  item,
  index,
}: { item: Publication; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      data-ocid={`publication.item.${index + 1}`}
      className="glass-card rounded-xl p-5 flex flex-col gap-3 hover:neon-border-fuchsia transition-smooth group"
    >
      <div className="flex items-start justify-between gap-2">
        <BookOpen className="w-5 h-5 text-accent mt-0.5 shrink-0" />
        <span className="text-xs text-muted-foreground font-body">
          {String(item.year)}
        </span>
      </div>
      <h3 className="font-display font-semibold text-foreground text-sm leading-snug line-clamp-2 group-hover:text-accent transition-colors">
        {item.title}
      </h3>
      <p className="text-xs text-muted-foreground font-body italic line-clamp-1">
        {item.journal}
      </p>
      <p className="text-xs text-muted-foreground font-body line-clamp-2">
        {item.abstract}
      </p>
      {item.doi && (
        <a
          href={`https://doi.org/${item.doi}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-primary hover:underline font-mono mt-auto"
        >
          DOI: {item.doi}
        </a>
      )}
    </motion.div>
  );
}

function HighlightsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="glass-card rounded-xl p-5 flex flex-col gap-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-5/6" />
        </div>
      ))}
    </div>
  );
}

// ───────────────────────── Static intro content ─────────────────────────────

const EXPERTISE_ITEMS = [
  {
    icon: "⚗️",
    label: "Drug Discovery",
    desc: "Novel molecular target identification and lead optimization",
  },
  {
    icon: "🧬",
    label: "Pharmacogenomics",
    desc: "Genetic variation impact on drug response and metabolism",
  },
  {
    icon: "🔬",
    label: "Computational Pharmacology",
    desc: "In silico modeling and molecular docking simulations",
  },
  {
    icon: "🧪",
    label: "Clinical Research",
    desc: "Phase I–III trial design and biomarker development",
  },
];

// ───────────────────────── Main Page ────────────────────────────────────────

export default function HomePage() {
  const { data: researches, isLoading: researchLoading } = useRecentResearch();
  const { data: publications, isLoading: pubLoading } = useRecentPublications();

  const recentResearch = researches?.slice(0, 3) ?? [];
  const recentPublications = publications?.slice(0, 3) ?? [];

  return (
    <Layout heroMode>
      {/* ── 3D HERO ── */}
      <section
        className="relative w-full overflow-hidden"
        style={{ height: "100vh", minHeight: "600px" }}
        data-ocid="home.hero_section"
      >
        {/* Canvas background */}
        <div className="absolute inset-0 z-0">
          <Canvas
            camera={{ position: [0, 0, 5], fov: 60 }}
            gl={{ antialias: true, alpha: false }}
            style={{ background: "oklch(0.10 0.02 280)" }}
          >
            <Suspense fallback={null}>
              <HeroScene />
            </Suspense>
          </Canvas>
        </div>

        {/* Gradient overlay for text readability */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 50%, oklch(0.10 0.02 280 / 0.3) 0%, oklch(0.10 0.02 280 / 0.7) 100%)",
          }}
        />

        {/* Hero content overlay */}
        <HeroOverlay />
      </section>

      {/* ── INTRO SECTION ── */}
      <section
        id="highlights"
        className="py-20 px-4"
        style={{ background: "oklch(0.14 0.03 275)" }}
        data-ocid="home.intro_section"
      >
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <p className="text-xs font-display tracking-widest uppercase text-primary mb-3">
              About the Researcher
            </p>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-6">
              Bridging Science &amp; Discovery
            </h2>
            <p className="text-muted-foreground font-body text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
              Dr. Ashwin Singh Chouhan is a distinguished pharmacologist and
              researcher dedicated to unlocking the molecular mechanisms of drug
              action. With expertise spanning computational pharmacology, drug
              discovery, and clinical research, his work pushes the boundaries
              of modern pharmaceutical science.
            </p>
          </motion.div>

          {/* Expertise grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {EXPERTISE_ITEMS.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="glass-card rounded-xl p-5 text-center flex flex-col items-center gap-3 hover:neon-border-cyan transition-smooth"
                data-ocid={`expertise.item.${i + 1}`}
              >
                <span className="text-3xl">{item.icon}</span>
                <h3 className="font-display font-semibold text-sm text-foreground">
                  {item.label}
                </h3>
                <p className="text-xs text-muted-foreground font-body leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RECENT RESEARCH HIGHLIGHTS ── */}
      <section
        className="py-20 px-4 bg-background"
        data-ocid="home.research_section"
      >
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-end justify-between mb-10 gap-4"
          >
            <div>
              <p className="text-xs font-display tracking-widest uppercase text-primary mb-2">
                Latest Work
              </p>
              <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground">
                Recent Research
              </h2>
            </div>
            <Link to="/research" data-ocid="home.view_all_research_link">
              <Button
                variant="ghost"
                size="sm"
                className="gap-1 text-primary hover:text-primary/80 font-display"
              >
                View All <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>

          {researchLoading ? (
            <HighlightsSkeleton />
          ) : recentResearch.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentResearch.map((item, i) => (
                <ResearchHighlightCard
                  key={String(item.id)}
                  item={item}
                  index={i}
                />
              ))}
            </div>
          ) : (
            <div
              className="glass-card rounded-xl p-10 text-center"
              data-ocid="research.empty_state"
            >
              <FlaskConical className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground font-body">
                Research highlights will appear here soon.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── RECENT PUBLICATIONS ── */}
      <section
        className="py-20 px-4"
        style={{ background: "oklch(0.14 0.03 275)" }}
        data-ocid="home.publications_section"
      >
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-end justify-between mb-10 gap-4"
          >
            <div>
              <p className="text-xs font-display tracking-widest uppercase text-accent mb-2">
                Peer-Reviewed
              </p>
              <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground">
                Recent Publications
              </h2>
            </div>
            <Link
              to="/publications"
              data-ocid="home.view_all_publications_link"
            >
              <Button
                variant="ghost"
                size="sm"
                className="gap-1 text-accent hover:text-accent/80 font-display"
              >
                View All <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>

          {pubLoading ? (
            <HighlightsSkeleton />
          ) : recentPublications.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentPublications.map((item, i) => (
                <PublicationHighlightCard
                  key={String(item.id)}
                  item={item}
                  index={i}
                />
              ))}
            </div>
          ) : (
            <div
              className="glass-card rounded-xl p-10 text-center"
              data-ocid="publications.empty_state"
            >
              <BookOpen className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground font-body">
                Publication highlights will appear here soon.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── CALL TO ACTION ── */}
      <section
        className="py-20 px-4 bg-background"
        data-ocid="home.cta_section"
      >
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass-card rounded-2xl p-10 neon-border-cyan"
          >
            <p className="text-xs font-display tracking-widest uppercase text-primary mb-3">
              Get In Touch
            </p>
            <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-4">
              Collaborate on Cutting-Edge Research
            </h2>
            <p className="text-muted-foreground font-body mb-8 leading-relaxed">
              Interested in research collaboration, academic partnerships, or
              pharmaceutical consultancy? Reach out through any of the channels
              below.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/contact" data-ocid="cta.contact_button">
                <Button className="gradient-primary text-primary-foreground font-display px-6 gap-2 hover:scale-105 transition-smooth">
                  <Mail className="w-4 h-4" />
                  Contact Dr. Chouhan
                </Button>
              </Link>
              <Link to="/research" data-ocid="cta.research_button">
                <Button
                  variant="outline"
                  className="font-display px-6 gap-2 border-primary/50 text-primary hover:bg-primary/10 hover:scale-105 transition-smooth"
                >
                  <FlaskConical className="w-4 h-4" />
                  Explore Research
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
