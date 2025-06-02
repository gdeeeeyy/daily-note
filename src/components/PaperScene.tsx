"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useEffect, useRef, useState } from "react";

type PaperProps = {
  texture: THREE.Texture;
};

function Paper({ texture }: PaperProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <planeGeometry args={[2.5, 2.5]} />
      <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
    </mesh>
  );
}

function generateCanvasTexture(
  text: string,
  fontSize: number,
  fontColor: string,
  fontFamily: string
): THREE.Texture {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = fontColor;
  ctx.font = `${fontSize}px ${fontFamily}`;

  const lines = text.split("\n");
  lines.forEach((line, i) => ctx.fillText(line, 50, 80 + i * (fontSize + 10)));

  return new THREE.CanvasTexture(canvas);
}

type PaperSceneProps = {
  text: string;
  fontSize: number;
  fontColor: string;
  fontFamily: string;
};

export default function PaperScene({ text, fontSize, fontColor, fontFamily }: PaperSceneProps) {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    const tex = generateCanvasTexture(text, fontSize, fontColor, fontFamily);
    setTexture(tex);
  }, [text, fontSize, fontColor, fontFamily]);

  return (
    <Canvas style={{ width: "100%", height: "500px" }}>
      <ambientLight />
      <OrbitControls enableZoom />
      {texture && <Paper texture={texture} />}
    </Canvas>
  );
}
