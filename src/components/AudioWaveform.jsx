import React, { useEffect, useRef } from 'react';

export default function AudioWaveform({ isListening }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!isListening) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let step = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      step += 0.08;

      const bars = 18;
      const barWidth = 4;
      const gap = 6;
      const startX = (canvas.width - (bars * (barWidth + gap))) / 2;

      for (let i = 0; i < bars; i++) {
        // Generate pseudo audio reactive heights
        const height = Math.abs(Math.sin(step + i * 0.4) * 24) + 6;
        const x = startX + i * (barWidth + gap);
        const y = (canvas.height - height) / 2;

        const gradient = ctx.createLinearGradient(0, y, 0, y + height);
        gradient.addColorStop(0, '#f43f5e');
        gradient.addColorStop(0.5, '#6366f1');
        gradient.addColorStop(1, '#38bdf8');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, height, 4);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isListening]);

  if (!isListening) return null;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0' }}>
      <canvas ref={canvasRef} width={220} height={40} />
    </div>
  );
}
