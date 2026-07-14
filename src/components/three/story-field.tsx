import { useMemo, useRef, type RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function makeGlow() {
  const s = 128;
  const c = document.createElement("canvas");
  c.width = c.height = s;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.3, "rgba(255,255,255,0.7)");
  g.addColorStop(0.6, "rgba(255,255,255,0.18)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

const COLS = 14;
const ROWS = 10;
const COUNT = COLS * ROWS;

function smoothstep(e0: number, e1: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
}

type GraphData = {
  chaos: Float32Array;
  order: Float32Array;
  seeds: Float32Array;
  edges: number[];
  pulses: { a: number; b: number; offset: number; speed: number }[];
};

function build(): GraphData {
  const chaos = new Float32Array(COUNT * 3);
  const order = new Float32Array(COUNT * 3);
  const seeds = new Float32Array(COUNT * 3);
  const gw = 13;
  const gh = 8.5;

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const i = r * COLS + c;
      // ordered lattice
      order[i * 3] = (c / (COLS - 1) - 0.5) * gw;
      order[i * 3 + 1] = (0.5 - r / (ROWS - 1)) * gh;
      order[i * 3 + 2] = (Math.random() - 0.5) * 0.6;
      // scattered chaos
      chaos[i * 3] = (Math.random() - 0.5) * 17;
      chaos[i * 3 + 1] = (Math.random() - 0.5) * 11;
      chaos[i * 3 + 2] = (Math.random() - 0.5) * 7;
      seeds[i * 3] = Math.random() * Math.PI * 2;
      seeds[i * 3 + 1] = Math.random() * Math.PI * 2;
      seeds[i * 3 + 2] = 0.5 + Math.random();
    }
  }

  const edges: number[] = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const i = r * COLS + c;
      if (c < COLS - 1) edges.push(i, i + 1);
      if (r < ROWS - 1) edges.push(i, i + COLS);
    }
  }

  const pulses = Array.from({ length: 16 }, () => {
    const e = Math.floor(Math.random() * (edges.length / 2)) * 2;
    return { a: edges[e], b: edges[e + 1], offset: Math.random(), speed: 0.25 + Math.random() * 0.3 };
  });

  return { chaos, order, seeds, edges, pulses };
}

const C_DULL = new THREE.Color("#8c9389");
const C_ALIVE = new THREE.Color("#e7d9c4");
const C_LINE_DULL = new THREE.Color("#6f7a6f");
const C_LINE_ALIVE = new THREE.Color("#a8b2a6");

function Scene({ progress }: { progress: RefObject<number> }) {
  const data = useMemo(build, []);
  const glow = useMemo(makeGlow, []);
  const group = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const pulseRef = useRef<THREE.Points>(null);
  const lineMat = useRef<THREE.LineBasicMaterial>(null);
  const ptMat = useRef<THREE.PointsMaterial>(null);
  const pulseMat = useRef<THREE.PointsMaterial>(null);
  const { pointer } = useThree();

  const live = useMemo(() => new Float32Array(COUNT * 3), []);
  const linePos = useMemo(() => new Float32Array(data.edges.length * 3), [data]);
  const pulsePos = useMemo(() => new Float32Array(data.pulses.length * 3), [data]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const p = progress.current ?? 0;
    const settle = smoothstep(0, 0.55, p); // chaos -> order
    const jitter = (1 - settle) * 1.4 + 0.06;
    const lift = smoothstep(0.7, 1, p) * 2.2; // growth rise
    const linkOn = smoothstep(0.22, 0.6, p);
    const aliveness = smoothstep(0.1, 0.95, p);

    for (let i = 0; i < COUNT; i++) {
      const ix = i * 3;
      const cx = data.chaos[ix],
        cy = data.chaos[ix + 1],
        cz = data.chaos[ix + 2];
      const ox = data.order[ix],
        oy = data.order[ix + 1] + lift * (0.4 + data.order[ix + 1] * 0.06),
        oz = data.order[ix + 2];
      const sx = data.seeds[ix],
        sy = data.seeds[ix + 1],
        amp = data.seeds[ix + 2];
      live[ix] = cx + (ox - cx) * settle + Math.sin(t * 0.6 + sx) * jitter * amp;
      live[ix + 1] = cy + (oy - cy) * settle + Math.cos(t * 0.55 + sy) * jitter * amp;
      live[ix + 2] = cz + (oz - cz) * settle + Math.sin(t * 0.5 + sx) * jitter * amp * 0.5;
    }

    if (pointsRef.current) {
      const a = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
      a.array.set(live);
      a.needsUpdate = true;
    }
    for (let e = 0; e < data.edges.length; e++) {
      const n = data.edges[e];
      linePos[e * 3] = live[n * 3];
      linePos[e * 3 + 1] = live[n * 3 + 1];
      linePos[e * 3 + 2] = live[n * 3 + 2];
    }
    if (linesRef.current) {
      const a = linesRef.current.geometry.attributes.position as THREE.BufferAttribute;
      a.array.set(linePos);
      a.needsUpdate = true;
    }

    const pulseVisible = smoothstep(0.5, 0.7, p);
    data.pulses.forEach((pl, i) => {
      const f = (pl.offset + t * pl.speed) % 1;
      pulsePos[i * 3] = THREE.MathUtils.lerp(live[pl.a * 3], live[pl.b * 3], f);
      pulsePos[i * 3 + 1] = THREE.MathUtils.lerp(live[pl.a * 3 + 1], live[pl.b * 3 + 1], f);
      pulsePos[i * 3 + 2] = THREE.MathUtils.lerp(live[pl.a * 3 + 2], live[pl.b * 3 + 2], f);
    });
    if (pulseRef.current) {
      const a = pulseRef.current.geometry.attributes.position as THREE.BufferAttribute;
      a.array.set(pulsePos);
      a.needsUpdate = true;
    }

    if (ptMat.current) ptMat.current.color.copy(C_DULL).lerp(C_ALIVE, aliveness);
    if (lineMat.current) {
      lineMat.current.color.copy(C_LINE_DULL).lerp(C_LINE_ALIVE, aliveness);
      lineMat.current.opacity = 0.04 + linkOn * 0.28;
    }
    if (pulseMat.current) pulseMat.current.opacity = pulseVisible;

    if (group.current) {
      group.current.rotation.y += (pointer.x * 0.18 - group.current.rotation.y) * 0.04;
      group.current.rotation.x += (-pointer.y * 0.12 - group.current.rotation.x) * 0.04;
    }
  });

  return (
    <group ref={group}>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePos, 3]} count={data.edges.length} />
        </bufferGeometry>
        <lineBasicMaterial
          ref={lineMat}
          transparent
          opacity={0.05}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>

      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[live, 3]} count={COUNT} />
        </bufferGeometry>
        <pointsMaterial
          ref={ptMat}
          size={0.34}
          map={glow}
          transparent
          opacity={0.95}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <points ref={pulseRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[pulsePos, 3]} count={data.pulses.length} />
        </bufferGeometry>
        <pointsMaterial
          ref={pulseMat}
          size={0.26}
          map={glow}
          color="#e8843f"
          transparent
          opacity={0}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

export default function StoryField({ progress }: { progress: RefObject<number> }) {
  return (
    <Canvas
      dpr={[1, 1.8]}
      camera={{ position: [0, 0, 13], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%" }}
    >
      <Scene progress={progress} />
    </Canvas>
  );
}
