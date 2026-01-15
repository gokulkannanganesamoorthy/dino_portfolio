import { useState, useEffect, useRef } from 'react';

// Dino Config
const GRAVITY = 0.6;
const JUMP_FORCE = -12; // Snappy short jump
const SPEED = 5; // Reduced from 8 for better readability
const GROUND_Y = 400; // Baseline

export function useDinoPhysics(gameActive) {
  const [state, setState] = useState({
    y: GROUND_Y,
    vy: 0,
    isGrounded: true,
    distance: 0,
    isDead: false,
  });

  const p = useRef({ y: GROUND_Y, vy: 0, dist: 0 });
  const keys = useRef(new Set());
  const reqRef = useRef();

  // Reset Function
  const reset = () => {
    p.current = { y: GROUND_Y, vy: 0, dist: 0 };
    setState({
      y: GROUND_Y,
      vy: 0,
      isGrounded: true,
      distance: 0,
      isDead: false,
    });
  };

  // External Jump Trigger (for Auto Play / Touch)
  const jump = () => {
    if (p.current.y === GROUND_Y) {
      p.current.vy = JUMP_FORCE;
    }
  };

  useEffect(() => {
    const handleDown = (e) => keys.current.add(e.code);
    const handleUp = (e) => keys.current.delete(e.code);

    window.addEventListener('keydown', handleDown);
    window.addEventListener('keyup', handleUp);

    const loop = () => {
      if (!gameActive) return;

      const phys = p.current;

      // 1. INPUT (Jump)
      if (
        (keys.current.has('Space') || keys.current.has('ArrowUp')) &&
        phys.y === GROUND_Y
      ) {
        phys.vy = JUMP_FORCE;
      }

      // 2. PHYSICS
      phys.vy += GRAVITY;
      phys.y += phys.vy;

      // Ground Collision
      if (phys.y >= GROUND_Y) {
        phys.y = GROUND_Y;
        phys.vy = 0;
      }

      // 3. PROGRESS (Auto-Run)
      phys.dist += SPEED;

      // 4. SYNC
      setState({
        y: Math.round(phys.y),
        vy: phys.vy,
        isGrounded: phys.y === GROUND_Y,
        distance: Math.floor(phys.dist),
        isDead: false,
      });

      reqRef.current = requestAnimationFrame(loop);
    };

    if (gameActive) {
      reqRef.current = requestAnimationFrame(loop);
    }

    return () => {
      window.removeEventListener('keydown', handleDown);
      window.removeEventListener('keyup', handleUp);
      cancelAnimationFrame(reqRef.current);
    };
  }, [gameActive]);

  return { state, reset, jump };
}
