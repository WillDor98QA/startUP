"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function makeGlow() {
  const s = 128;
  const c = document.createElement("canvas");
  c.width = c.height = s;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.35, "rgba(255,255,255,0.6)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function Core() {
  const glow = useMemo(makeGlow, []);
  const ringRefs = [useRef<THREE.Points>(null), useRef<THREE.Points>(null), useRef<THREE.Points>(null)];
  const coreRef = useRef<THREE.Sprite>(null);

  const rings = useMemo(() => {
    return [2.4, 3.4, 4.4].map((radius, ri) => {
      const n = 60 + ri * 24;
      const pos = new Float32Array(n * 3);
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2;
        const wobble = 0.12;
        pos[i * 3] = Math.cos(a) * radius;
        pos[i * 3 + 1] = Math.sin(a) * radius * 0.62 + (Math.random() - 0.5) * wobble;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 0.6;
      }
      return { pos, n, radius };
    });
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    ringRefs.forEach((r, i) => {
      if (r.current) {
        r.current.rotation.z = t * (0.05 + i * 0.03) * (i % 2 ? -1 : 1);
        r.current.rotation.x = Math.sin(t * 0.2 + i) * 0.18;
      }
    });
    if (coreRef.current) {
      const s = 2.6 + Math.sin(t * 1.1) * 0.18;
      coreRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group>
      <sprite ref={coreRef} scale={[2.6, 2.6, 2.6]}>
        <spriteMaterial
          map={glow}
          color="#e8843f"
          transparent
          opacity={0.95}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </sprite>
      {rings.map((ring, i) => (
        <points key={i} ref={ringRefs[i]}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[ring.pos, 3]} count={ring.n} />
          </bufferGeometry>
          <pointsMaterial
            size={0.16}
            map={glow}
            color={i === 0 ? "#e7d9c4" : "#a8b2a6"}
            transparent
            opacity={0.9}
            sizeAttenuation
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>
      ))}
    </group>
  );
}

export default function CoreField() {
  return (
    <Canvas
      dpr={[1, 1.8]}
      camera={{ position: [0, 0, 11], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%" }}
    >
      <Core />
    </Canvas>
  );
}
