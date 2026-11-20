

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Html, Sparkles } from "@react-three/drei";
import * as THREE from "three";

const NODES = [
  {
    label: "EC2 INSTANCE 01",
    position: [-5.0, 1.8, -0.8],
    color: "#65B9FF",
  },
  {
    label: "EC2 INSTANCE 02",
    position: [5.0, 1.8, -0.8],
    color: "#9B7AFF",
  },
  {
    label: "MONITORING",
    position: [-5.0, -1.8, -0.8],
    color: "#57D8D0",
  },
  {
    label: "STORAGE",
    position: [5.0, -1.8, -0.8],
    color: "#C08AFF",
  },
  {
    label: "SECURITY",
    position: [0, 3.35, -1.2],
    color: "#70DCC0",
  },
  {
    label: "LINUX AGENT",
    position: [0, -3.35, -1.2],
    color: "#78A8FF",
  },
];

function createCircuitCurve(position) {
  return new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, 0.2),
    new THREE.Vector3(position[0] * 0.27, position[1] * 0.16, 0.55),
    new THREE.Vector3(position[0] * 0.65, position[1] * 0.72, 0.1),
    new THREE.Vector3(...position),
  ]);
}

function FlowPacket({ curve, color, speed, delay, reverse = false }) {
  const packetRef = useRef();

  useFrame(({ clock }) => {
    if (!packetRef.current) return;

    const progress = (clock.elapsedTime * speed + delay) % 1;
    const point = curve.getPointAt(
      reverse ? 1 - progress : progress
    );

    packetRef.current.position.copy(point);

    const pulse =
      0.8 + Math.sin(clock.elapsedTime * 9 + delay * 10) * 0.2;

    packetRef.current.scale.setScalar(pulse);
  });

  return (
    <mesh ref={packetRef}>
      <sphereGeometry args={[0.065, 16, 16]} />
      <meshBasicMaterial color={color} toneMapped={false} />
    </mesh>
  );
}

function CircuitConnection({ node, index }) {
  const curve = useMemo(
    () => createCircuitCurve(node.position),
    [node.position]
  );

  const glowGeometry = useMemo(
    () => new THREE.TubeGeometry(curve, 90, 0.055, 8, false),
    [curve]
  );

  const lineGeometry = useMemo(
    () => new THREE.TubeGeometry(curve, 90, 0.012, 8, false),
    [curve]
  );

  return (
    <group>
      {/* Soft outer glow */}
      <mesh geometry={glowGeometry}>
        <meshBasicMaterial
          color={node.color}
          transparent
          opacity={0.10}
          depthWrite={false}
        />
      </mesh>

      {/* Main circuit line */}
      <mesh geometry={lineGeometry}>
        <meshBasicMaterial
          color={node.color}
          transparent
          opacity={0.65}
          toneMapped={false}
        />
      </mesh>

      {/* Signal travelling outward from the cloud */}
      <FlowPacket
        curve={curve}
        color={node.color}
        speed={0.105}
        delay={index * 0.16}
      />

      {/* Monitoring signal travelling back to the cloud */}
      <FlowPacket
        curve={curve}
        color="#D9C5FF"
        speed={0.075}
        delay={index * 0.16 + 0.45}
        reverse
      />
    </group>
  );
}

function InfrastructureNode({ node, index }) {
  const nodeRef = useRef();

  useFrame(({ clock }) => {
    if (!nodeRef.current) return;

    const time = clock.elapsedTime;

    nodeRef.current.position.y =
      node.position[1] + Math.sin(time * 0.85 + index) * 0.075;

    nodeRef.current.rotation.y =
      Math.sin(time * 0.5 + index) * 0.09;
  });

  return (
    <group ref={nodeRef} position={node.position}>
      {/* Hexagonal platform */}
      <mesh position={[0, -0.18, 0]}>
        <cylinderGeometry args={[0.52, 0.62, 0.13, 6]} />
        <meshStandardMaterial
          color="#17132B"
          emissive={node.color}
          emissiveIntensity={0.28}
          metalness={0.65}
          roughness={0.3}
        />
      </mesh>

      {/* Platform rim */}
      <mesh
        position={[0, -0.09, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <torusGeometry args={[0.48, 0.012, 8, 48]} />
        <meshBasicMaterial color={node.color} toneMapped={false} />
      </mesh>

      {/* Three server units */}
      {[0, 1, 2].map((layer) => (
        <group key={layer}>
          <mesh position={[0, layer * 0.2 + 0.02, 0]}>
            <boxGeometry args={[0.43, 0.16, 0.34]} />
            <meshStandardMaterial
              color="#25213C"
              emissive={node.color}
              emissiveIntensity={0.17}
              metalness={0.7}
              roughness={0.3}
            />
          </mesh>

          {/* Server status light */}
          <mesh
            position={[0.13, layer * 0.2 + 0.025, 0.176]}
          >
            <sphereGeometry args={[0.025, 10, 10]} />
            <meshBasicMaterial color={node.color} />
          </mesh>
        </group>
      ))}

      {/* Floating node label */}
      <Html
        position={[0, -0.72, 0]}
        center
        distanceFactor={12}
        style={{ pointerEvents: "none" }}
      >
        <span className="infra-node-label">
          {node.label}
        </span>
      </Html>

      <pointLight
        position={[0, 0.25, 0.4]}
        color={node.color}
        intensity={0.35}
        distance={2.5}
      />
    </group>
  );
}

function CloudControlCore() {
  const coreRef = useRef();

  useFrame(({ clock }) => {
    if (!coreRef.current) return;

    coreRef.current.rotation.y = clock.elapsedTime * 0.16;
  });

  const cloudPuffs = [
    { position: [-0.43, -0.03, 0], size: 0.37 },
    { position: [-0.16, 0.25, 0], size: 0.43 },
    { position: [0.22, 0.22, 0], size: 0.40 },
    { position: [0.49, -0.04, 0], size: 0.32 },
    { position: [0.0, -0.20, 0.08], size: 0.42 },
  ];

  return (
    <group ref={coreRef}>
      <Float
        speed={1.3}
        rotationIntensity={0.08}
        floatIntensity={0.18}
      >
        <group>
          {/* Cloud-shaped central control core */}
          {cloudPuffs.map((puff, index) => (
            <mesh
              key={index}
              position={puff.position}
            >
              <sphereGeometry args={[puff.size, 32, 32]} />
              <meshPhysicalMaterial
                color="#8864D8"
                emissive="#582BA3"
                emissiveIntensity={0.65}
                metalness={0.25}
                roughness={0.24}
                clearcoat={1}
                transparent
                opacity={0.94}
              />
            </mesh>
          ))}

          {/* Bright central energy core */}
          <mesh position={[0, -0.03, 0.37]}>
            <sphereGeometry args={[0.24, 32, 32]} />
            <meshBasicMaterial
              color="#D8C1FF"
              toneMapped={false}
            />
          </mesh>

          {/* Inner glow */}
          <mesh position={[0, -0.03, 0.3]}>
            <sphereGeometry args={[0.55, 32, 32]} />
            <meshBasicMaterial
              color="#956AFF"
              transparent
              opacity={0.10}
              depthWrite={false}
            />
          </mesh>
        </group>
      </Float>

      {/* Multiple orbital rings */}
      <mesh rotation={[1.05, 0.25, 0.35]}>
        <torusGeometry args={[1.18, 0.015, 8, 120]} />
        <meshBasicMaterial
          color="#A27AFF"
          transparent
          opacity={0.8}
          toneMapped={false}
        />
      </mesh>

      <mesh rotation={[-0.75, 0.65, 0.25]}>
        <torusGeometry args={[1.36, 0.009, 8, 120]} />
        <meshBasicMaterial
          color="#56BFFF"
          transparent
          opacity={0.65}
          toneMapped={false}
        />
      </mesh>

      <pointLight
        position={[0, 0, 0.5]}
        color="#A478FF"
        intensity={2.2}
        distance={5}
      />
    </group>
  );
}

function InfrastructureScene() {
  const sceneRef = useRef();
  const { size } = useThree();

  useFrame(({ clock }) => {
    if (!sceneRef.current) return;

    const responsiveScale =
      size.width < 680 ? 0.76 :
      size.width < 980 ? 0.88 : 1;

    sceneRef.current.scale.setScalar(responsiveScale);

    sceneRef.current.rotation.y =
      Math.sin(clock.elapsedTime * 0.12) * 0.025;

    sceneRef.current.rotation.x =
      Math.sin(clock.elapsedTime * 0.15) * 0.014;
  });

  return (
    <>
      <ambientLight intensity={0.75} />

      <hemisphereLight
        args={["#AFA0FF", "#080716", 0.8]}
      />

      <pointLight
        position={[0, 0, 6]}
        intensity={1.5}
        color="#8761FF"
        distance={16}
      />

      <pointLight
        position={[-5, 4, 3]}
        intensity={0.8}
        color="#418EFF"
        distance={12}
      />

      <Sparkles
        count={85}
        scale={[13, 8, 5]}
        size={1.7}
        speed={0.2}
        opacity={0.45}
        color="#A58AFF"
      />

      <group ref={sceneRef}>
        {/* Network circuits */}
        {NODES.map((node, index) => (
          <CircuitConnection
            key={`connection-${node.label}`}
            node={node}
            index={index}
          />
        ))}

        {/* Central cloud */}
        <CloudControlCore />

        {/* Connected infrastructure nodes */}
        {NODES.map((node, index) => (
          <InfrastructureNode
            key={node.label}
            node={node}
            index={index}
          />
        ))}
      </group>
    </>
  );
}

export default function InfrastructureAnimation() {
  return (
    <div className="infra-animation-shell">
      <Canvas
        camera={{ position: [0, 0, 13.5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
      >
        <InfrastructureScene />
      </Canvas>

      <div className="infra-animation-core-label">
        INFRAMANAGE CONTROL
      </div>
    </div>
  );
}
