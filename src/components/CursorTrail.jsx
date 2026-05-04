import React, { useEffect, useRef } from 'react';

const CursorTrail = ({ isDarkMode }) => {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      
      for (let i = 0; i < 2; i++) {
        particles.current.push(new Particle(mouse.current.x, mouse.current.y));
      }
    };

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 1.5;
        this.speedY = (Math.random() - 0.5) * 1.5;
        
        // --- PERUBAHAN DISINI ---
        // Dark mode: Biru Cerah (Tailwind blue-400: 96, 165, 250)
        // Light mode: Ungu Tua (Tailwind purple-600: 147, 51, 234) agar kontras di BG putih
        this.color = isDarkMode ? '96, 165, 250' : '147, 51, 234'; 
        // -------------------------

        this.alpha = 1;
        this.decay = Math.random() * 0.015 + 0.015;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.alpha -= this.decay;
      }

      draw() {
        ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.current.length; i++) {
        particles.current[i].update();
        particles.current[i].draw();

        if (particles.current[i].alpha <= 0) {
          particles.current.splice(i, 1);
          i--;
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    handleResize();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDarkMode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
      // --- PERUBAHAN DISINI ---
      // 'screen' di dark mode untuk efek glow
      // 'normal' di light mode agar warna ungu solid dan jelas
      style={{ mixBlendMode: isDarkMode ? 'screen' : 'normal' }}
      // -------------------------
    />
  );
};

export default CursorTrail;