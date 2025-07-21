'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useEffect, useState } from 'react';

function createCanvasTexture(
  text: string,
  baseFontSize: number,
  fontColor: string,
  fontFamily: string,
  date: string,
  imageUrl?: string,
  imageWidthPercent = 100,
  imageHeightPercent = 100
): Promise<{ texture: THREE.Texture; width: number; height: number }> {
  return new Promise((resolve) => {
    const width = 800;
    const height = 800;
    const margin = 40;
    const imageAreaHeight = 160;

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d')!;

    ctx.fillStyle = '#c7c7c7';
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = fontColor || '#000000';
    ctx.textBaseline = 'top';
    ctx.font = `${baseFontSize || 20}px ${fontFamily || 'Poppins'}`;
    const maxTextWidth = width - margin * 2;
    const textHeightLimit = height - imageAreaHeight - margin * 2;

    const wrapText = (text: string, maxWidth: number) => {
      const words = text.split(' ');
      const lines: string[] = [];
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
    };

    let fontSize = baseFontSize || 20;
    let lines = wrapText(text, maxTextWidth);
    let lineHeight = fontSize * 1.3;
    while (lines.length * lineHeight > textHeightLimit && fontSize > 10) {
      fontSize--;
      ctx.font = `${fontSize}px ${fontFamily || 'Poppins'}`;
      lines = wrapText(text, maxTextWidth);
      lineHeight = fontSize * 1.3;
    }

    for (let i = 0; i < lines.length; i++) {
      ctx.fillText(lines[i], margin, margin + i * lineHeight);
    }

    const finalize = () => {
      ctx.font = `12px ${fontFamily || 'Poppins'}`;
      ctx.textAlign = 'right';
      ctx.fillText(`Date: ${date || ''}`, width - margin, height - 20);
      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      resolve({ texture, width, height });
    };

    if (imageUrl) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = imageUrl;
      img.onload = () => {
        const imgWidth = (width - margin * 2) * (imageWidthPercent / 100);
        const imgHeight = (imageAreaHeight - 30) * (imageHeightPercent / 100);
        const x = margin + (width - margin * 2 - imgWidth) / 2;
        const y = height - imageAreaHeight + (imageAreaHeight - imgHeight) / 2;
        ctx.drawImage(img, x, y, imgWidth, imgHeight);
        finalize();
      };
      img.onerror = () => {
        console.warn('Image failed to load:', imageUrl);
        finalize();
      };
    } else {
      finalize();
    }
  });
}

function PaperPlane({
  text,
  fontSize,
  fontColor,
  fontFamily,
  date,
  imageUrl,
  imageWidthPercent,
  imageHeightPercent,
}: {
  text: string;
  fontSize: number;
  fontColor: string;
  fontFamily: string;
  date: string;
  imageUrl?: string;
  imageWidthPercent?: number;
  imageHeightPercent?: number;
}) {
  const [textureData, setTextureData] = useState<{
    texture: THREE.Texture;
    width: number;
    height: number;
  } | null>(null);

  useEffect(() => {
    createCanvasTexture(
      text,
      fontSize,
      fontColor,
      fontFamily,
      date,
      imageUrl,
      imageWidthPercent,
      imageHeightPercent
    ).then((data) => setTextureData(data));
  }, [
    text,
    fontSize,
    fontColor,
    fontFamily,
    date,
    imageUrl,
    imageWidthPercent,
    imageHeightPercent,
  ]);

  if (!textureData) return null;

  const scale = 0.005;
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
  imageUrl,
  imageWidthPercent = 100,
  imageHeightPercent = 100,
}: {
  text: string;
  fontSize: number;
  fontColor: string;
  fontFamily: string;
  date: string;
  imageUrl?: string;
  imageWidthPercent?: number;
  imageHeightPercent?: number;
}) {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#e5e5e5' }}>
      <Canvas camera={{ position: [0, 0, 2], fov: 40 }}>
        <ambientLight />
        <PaperPlane
          text={text}
          fontSize={fontSize}
          fontColor={fontColor}
          fontFamily={fontFamily}
          date={date}
          imageUrl={imageUrl}
          imageWidthPercent={imageWidthPercent}
          imageHeightPercent={imageHeightPercent}
        />
        <OrbitControls enableZoom enablePan />
      </Canvas>
    </div>
  );
}
