"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function sphericalPoint(lat: number, lon: number, r: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  );
}

const CITIES = [
  [37.7, -122.4], [51.5, -0.1], [1.35, 103.8], [40.7, -74], [35.6, 139.6],
  [-33.8, 151.2], [52.5, 13.4], [19, 72.8], [-23.5, -46.6], [25.2, 55.2],
  [48.8, 2.3], [22.3, 114], [-26.2, 28], [59.3, 18],
];

function buildArcs(r: number) {
  const arcs: { curve: THREE.QuadraticBezierCurve3; offset: number; speed: number }[] = [];
  for (let i = 0; i < 9; i++) {
    const a = sphericalPoint(
      CITIES[i % CITIES.length][0],
      CITIES[i % CITIES.length][1],
      r,
    );
    const b = sphericalPoint(
      CITIES[(i * 3 + 4) % CITIES.length][0],
      CITIES[(i * 3 + 4) % CITIES.length][1],
      r,
    );
    const mid = a.clone().add(b).multiplyScalar(0.5);
    const lift = 1 + a.distanceTo(b) * 0.28;
    mid.normalize().multiplyScalar(r * lift);
    arcs.push({
      curve: new THREE.QuadraticBezierCurve3(a, mid, b),
      offset: Math.random(),
      speed: 0.18 + Math.random() * 0.22,
    });
  }
  return arcs;
}

function Globe() {
  const r = 2.4;
  const group = useRef<THREE.Group>(null);
  const arcs = useMemo(() => buildArcs(r), []);
  const pulseRef = useRef<THREE.Points>(null);

  const cityPositions = useMemo(() => {
    const arr = new Float32Array(CITIES.length * 3);
    CITIES.forEach((c, i) => {
      const p = sphericalPoint(c[0], c[1], r);
      arr.set([p.x, p.y, p.z], i * 3);
    });
    return arr;
  }, []);

  const wire = useMemo(() => new THREE.IcosahedronGeometry(r, 4), []);
  const glow = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 64;
    const ctx = c.getContext("2d")!;
    const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.5, "rgba(255,255,255,0.4)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(c);
  }, []);

  const pulsePos = useMemo(() => new Float32Array(arcs.length * 3), [arcs]);

  useFrame((state, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.08;
    const t = state.clock.elapsedTime;
    arcs.forEach((a, i) => {
      const f = (a.offset + t * a.speed) % 1;
      const p = a.curve.getPoint(f);
      pulsePos[i * 3] = p.x;
      pulsePos[i * 3 + 1] = p.y;
      pulsePos[i * 3 + 2] = p.z;
    });
    if (pulseRef.current) {
      const attr = pulseRef.current.geometry.attributes.position as THREE.BufferAttribute;
      attr.array.set(pulsePos);
      attr.needsUpdate = true;
    }
  });

  return (
    <group ref={group} rotation={[0.3, 0, 0.1]}>
      {/* faint sphere shell */}
      <mesh>
        <sphereGeometry args={[r * 0.99, 48, 48]} />
        <meshBasicMaterial color="#1d3124" transparent opacity={0.55} />
      </mesh>
      {/* wireframe */}
      <lineSegments>
        <wireframeGeometry args={[wire]} />
        <lineBasicMaterial color="#9fb39c" transparent opacity={0.12} />
      </lineSegments>

      {/* cities */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[cityPositions, 3]}
            count={CITIES.length}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.16}
          map={glow}
          color="#f0a36e"
          transparent
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* arcs */}
      {arcs.map((a, i) => {
        const pts = a.curve.getPoints(40);
        const geo = new THREE.BufferGeometry().setFromPoints(pts);
        return (
          <primitive
            key={i}
            object={
              new THREE.Line(
                geo,
                new THREE.LineBasicMaterial({
                  color: "#d97a4a",
                  transparent: true,
                  opacity: 0.32,
                }),
              )
            }
          />
        );
      })}

      {/* travelling pulses */}
      <points ref={pulseRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[pulsePos, 3]} count={arcs.length} />
        </bufferGeometry>
        <pointsMaterial
          size={0.22}
          map={glow}
          color="#ffffff"
          transparent
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

export default function GlobeField() {
  return (
    <Canvas
      dpr={[1, 1.8]}
      camera={{ position: [0, 0, 7], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%" }}
    >
      <Globe />
    </Canvas>
  );
}
