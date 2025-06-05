'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useEffect, useState } from 'react';

function createSquareWrappedCanvasTexture(
  text: string,
  baseFontSize: number,
  fontColor: string,
  fontFamily: string,
  date: string
) {
  const width = 800;
  const height = 800;
  const margin = 40;
  const maxHeight = height - margin * 2 - 30;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#d9d9d9';
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = fontColor;
  ctx.textBaseline = 'top';
  ctx.font = `${baseFontSize}px ${fontFamily}`;

  const maxTextWidth = width - margin * 2;

  function wrapText(text: string, maxWidth: number) {
    const words = text.split(' ');
    let lines: string[] = [];
    let currentLine = '';

    for (const word of words) {
      const testLine = currentLine ? currentLine + ' ' + word : word;
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) lines.push(currentLine);
    return lines;
  }

  let fontSize = baseFontSize;
  let lines = wrapText(text, maxTextWidth);
  let lineHeight = fontSize * 1.3;

  while (lines.length * lineHeight > maxHeight && fontSize > 10) {
    fontSize -= 1;
    ctx.font = `${fontSize}px ${fontFamily}`;
    lines = wrapText(text, maxTextWidth);
    lineHeight = fontSize * 1.3;
  }

  for (let i = 0; i < lines.length; i++) {
    ctx.fillText(lines[i], margin, margin + i * lineHeight);
  }

  if (date) {
    ctx.font = `12px ${fontFamily}`;
    ctx.fillText(`Date: ${date}`, margin, height - 25);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;

  return { texture, width, height };
}

function PaperPlaneFixed({
  text,
  fontSize,
  fontColor,
  fontFamily,
  date,
}: {
  text: string;
  fontSize: number;
  fontColor: string;
  fontFamily: string;
  date: string;
}) {
  const [textureData, setTextureData] = useState<{
    texture: THREE.Texture;
    width: number;
    height: number;
  } | null>(null);

  useEffect(() => {
    const data = createSquareWrappedCanvasTexture(
      text,
      fontSize,
      fontColor,
      fontFamily,
      date
    );
    setTextureData(data);
  }, [text, fontSize, fontColor, fontFamily, date]);

  if (!textureData) return null;

  const scale = 0.0025;
  const planeWidth = textureData.width * scale;
  const planeHeight = textureData.height * scale;

  return (
    <mesh>
      <planeGeometry args={[planeWidth, planeHeight]} />
      <meshBasicMaterial
        map={textureData.texture}
        side={THREE.DoubleSide}
        toneMapped={false}
      />
    </mesh>
  );
}

export default function PaperScene({
  text,
  fontSize,
  fontColor,
  fontFamily,
  date,
}: {
  text: string;
  fontSize: number;
  fontColor: string;
  fontFamily: string;
  date: string;
}) {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [0, 0, 2.5], fov: 50 }}>
        <ambientLight />
        <PaperPlaneFixed
          text={text}
          fontSize={fontSize}
          fontColor={fontColor}
          fontFamily={fontFamily}
          date={date}
        />
        <OrbitControls enableZoom={true} enablePan={true} />
      </Canvas>
    </div>
  );
}
