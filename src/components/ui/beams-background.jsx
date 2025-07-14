import React, { useRef, useEffect } from 'react';

// Utility: Simplex noise implementation (or use a lightweight npm package if available)
// For brevity, using a basic noise function here. For production, use 'simplex-noise' or similar.
function random(seed) {
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

const BEAM_COUNT = 20;
const BEAM_WIDTH = 3;
const BEAM_HEIGHT = 30;
const SPEED = 2;
const NOISE_INTENSITY = 1.75;
const NOISE_SCALE = 0.2;
const ROTATION = 30 * Math.PI / 180; // degrees to radians
const COLOR = '#fff';

const BeamsBackground = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);

    function drawBeam(x, y, angle, length, width, alpha) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      const grad = ctx.createLinearGradient(0, 0, 0, length);
      grad.addColorStop(0, `rgba(255,255,255,${alpha})`);
      grad.addColorStop(0.5, `rgba(255,255,255,${alpha * 0.5})`);
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.globalCompositeOperation = 'lighter';
      ctx.beginPath();
      ctx.rect(-width/2, 0, width, length);
      ctx.fill();
      ctx.restore();
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = '#0a0714'; // dark background
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'lighter';
      const t = timeRef.current;
      for (let i = 0; i < BEAM_COUNT; i++) {
        // Noise-driven position and angle
        const baseX = lerp(0, width, i / BEAM_COUNT);
        const noise = Math.sin(t * SPEED * 0.002 + i * 13.37) * NOISE_INTENSITY + Math.cos(t * SPEED * 0.001 + i * 7.77) * NOISE_INTENSITY * 0.5;
        const x = baseX + noise * 40;
        const y = lerp(height * 0.1, height * 0.9, random(i + 42));
        const angle = ROTATION + Math.sin(t * SPEED * 0.001 + i) * 0.1;
        drawBeam(x, y, angle, height * (BEAM_HEIGHT / 100), BEAM_WIDTH, 0.12);
      }
      timeRef.current += 1;
      animationRef.current = requestAnimationFrame(animate);
    }
    animate();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        display: 'block',
      }}
    />
  );
};

export default BeamsBackground; 