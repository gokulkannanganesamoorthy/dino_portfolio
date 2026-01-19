import { useState, useEffect } from 'react';
import { useDinoPhysics } from './hooks/useDinoPhysics';
import { LEVEL_CONFIG } from './components/DinoLevel';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const [gameActive, setGameActive] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [modalData, setModalData] = useState(null); // Data for popup

  // Physics Hook
  const {
    state: dino,
    reset: resetDino,
    jump: dinoJump,
  } = useDinoPhysics(gameActive && !modalData);
  const [autoPlay, setAutoPlay] = useState(false);

  // Computed Camera (World moves left)
  const cameraX = -dino.distance;

  // Render Logic
  // Everything is relative to cameraX
  // Dino X is always 100 on screen.
  // Object Screen X = Object World X + cameraX

  // Track collected IDs
  const [collectedIds, setCollectedIds] = useState(new Set());

  // Game Loop: Collision & Auto Play
  useEffect(() => {
    if (!gameActive || gameOver || modalData) return;

    const dinoRect = { x: 100 + dino.distance, y: dino.y, w: 40, h: 40 };

    // AUTO PLAY LOGIC
    if (autoPlay && dino.isGrounded) {
      // Look ahead for obstacles provided we are on ground
      const danger = LEVEL_CONFIG.find((obj) => {
        // Only care about obstacles
        if (obj.type === 'CACTUS') {
          // Check distance
          const dist = obj.x - dinoRect.x;
          return dist > 0 && dist < 120; // Jump closer
        }

        if (obj.type === 'PTERODACTYL') {
          // Ignore High Flyers (y=300, y=320)
          // Low Flyers are y=350.
          if (obj.y < 340) return false;

          const dist = obj.x - dinoRect.x;
          return dist > 0 && dist < 120;
        }

        return false;
      });

      if (danger) {
        dinoJump();
      }
    }

    // CHECK EACH OBJECT
    for (const obj of LEVEL_CONFIG) {
      if (collectedIds.has(obj.id)) continue;

      // 1. DETERMINE OBJECT BOX
      let objW = 0,
        objH = 0,
        objX = obj.x,
        objY = 400;

      if (obj.type === 'CACTUS') {
        objW = 20 * obj.count;
        objH = 40;
      } else if (obj.type === 'PTERODACTYL') {
        objW = 40;
        objH = 30;
        objY = obj.y;
      } else if (['CLOUD_DATA', 'BLOCK_DATA', 'BILLBOARD'].includes(obj.type)) {
        objW = 50;
        objH = 200;
      } else if (obj.type === 'VICTORY_BLOCK') {
        objW = 50;
        objH = 400;
      } else {
        continue;
      }

      const objLeft = objX;
      const objRight = objX + objW;
      const objBottom = objY;
      const objTop = objY - objH;

      // 2. CHECK OVERLAP
      const xOverlap = dinoRect.x + 40 > objLeft && dinoRect.x < objRight; // Standard AABB
      const yOverlap = dinoRect.y > objTop && dinoRect.y - 40 < objBottom;

      if (xOverlap && yOverlap) {
        if (['CACTUS', 'PTERODACTYL'].includes(obj.type)) {
          setGameActive(false);
          setGameOver(true);
          if (autoPlay) setAutoPlay(false); // Disable auto play on death
          return;
        } else if (obj.type === 'VICTORY_BLOCK') {
          setModalData({
            type: 'MISSION COMPLETE',
            title: 'YOU MADE IT',
            desc: "Congratulations on surviving the desert. Now, let's build something together.",
            isVictory: true,
          });
          return;
        } else {
          setModalData({ ...obj.data, id: obj.id });
          return;
        }
      }
    }
  }, [
    dino.distance,
    dino.y,
    gameActive,
    gameOver,
    modalData,
    collectedIds,
    autoPlay,
    dino.isGrounded,
    dinoJump,
  ]);

  // Add collected ID when modal opens
  useEffect(() => {
    if (modalData && modalData.id) {
      setCollectedIds((prev) => new Set(prev).add(modalData.id));
    }
  }, [modalData]);

  // Restart
  const handleStart = () => {
    setGameOver(false);
    setGameActive(true);
    setModalData(null);
    setCollectedIds(new Set());
    resetDino();
  };

  // Close Modal
  const closeModal = (e) => {
    e.stopPropagation();
    setModalData(null);
  };

  // Game Interaction (Jump / Start)
  const handleInteraction = (e) => {
    // If modal open, do nothing (let modal close handle it)
    if (modalData) return;

    if (!gameActive) {
      handleStart();
    } else {
      dinoJump();
    }
  };

  // Global Key Handler for Start/Restart/Jump
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault(); // Prevent scrolling
        handleInteraction();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleInteraction]); // Depend on handleInteraction

  return (
    <div
      className="w-full h-screen bg-white text-[#535353] overflow-hidden relative font-pixel uppercase select-none active:bg-gray-50 touch-manipulation"
      onPointerDown={handleInteraction}
    >
      {/* UI LAYER - HEADER */}
      <header className="fixed top-4 left-4 md:top-8 md:left-8 z-50 pointer-events-none">
        <h1 className="text-xl md:text-2xl font-display font-bold text-[#535353] tracking-widest leading-tight w-48 md:w-auto">
          GOKUL KANNAN GANESAMOORTHY
        </h1>
        <div className="text-[8px] md:text-[10px] opacity-40 mt-1 uppercase tracking-widest">
          DISTANCE: {Math.floor(dino.distance)}m
        </div>
      </header>

      {/* AUTO PLAY TOGGLE */}
      <div className="fixed top-24 left-4 md:top-24 md:left-8 z-50 flex items-center gap-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setAutoPlay(!autoPlay);
          }}
          className={`border-2 border-[#535353] px-4 py-2 hover:bg-[#535353] hover:text-white transition-colors ${
            autoPlay ? 'bg-[#535353] text-white' : 'bg-white'
          }`}
        >
          {autoPlay ? 'AUTO PILOT: ON' : 'AUTO PILOT: OFF'}
        </button>
        <span className="text-xs opacity-40 hidden md:inline">
          [SPACE] TO JUMP
        </span>
      </div>

      {/* START SCREEN */}
      {!gameActive && !gameOver && !modalData && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-white/50 backdrop-blur-sm pointer-events-none">
          <div className="text-xl md:text-2xl animate-pulse text-center">
            <span className="hidden md:inline">PRESS [SPACE] TO START</span>
            <span className="md:hidden">TAP TO START</span>
          </div>
        </div>
      )}

      {/* DEBUG / HUD */}
      <div className="fixed top-8 right-8 text-2xl z-50 flex gap-8">
        <span className="opacity-50">
          HI {Math.floor(dino.distance).toString().padStart(5, '0')}
        </span>
        <span>{Math.floor(dino.distance).toString().padStart(5, '0')}</span>
      </div>

      {/* GAME OVER SCREEN */}
      {gameOver && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
          <h1 className="text-6xl text-[#535353] mb-4">GAME OVER</h1>
          <div
            className="text-2xl animate-pulse cursor-pointer flex items-center gap-2 border border-[#535353] px-6 py-2 hover:bg-[#535353] hover:text-white transition-colors"
            onClick={handleStart}
          >
            <span>↻</span>
            <span>RESTART</span>
          </div>
        </div>
      )}

      {/* DATA MODAL */}
      {modalData && (
        <aside
          className="fixed inset-0 z-50 flex items-center justify-center bg-white/50 backdrop-blur-md p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-white border-4 border-[#535353] p-8 max-w-lg w-full relative shadow-[8px_8px_0px_#535353]">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-2xl hover:scale-110"
            >
              ✖
            </button>

            <h2 className="text-sm opacity-50 tracking-widest mb-2">
              {modalData.type || 'ARCHIVE'}
            </h2>
            <h1 className="text-4xl font-bold mb-4">
              {modalData.title || modalData.name}
            </h1>
            <div className="h-1 w-20 bg-[#535353] mb-6" />
            <p className="normal-case font-sans text-lg leading-relaxed mb-6">
              {modalData.desc || modalData.content || 'Details classified.'}
            </p>

            {modalData.isVictory ? (
              <a
                href="mailto:gokulkannan.dev@gmail.com"
                className="block w-full py-4 bg-[#535353] text-white text-xl hover:bg-black transition-colors text-center no-underline"
              >
                HIRE GOKUL
              </a>
            ) : (
              <button
                onClick={closeModal}
                className="w-full py-4 bg-[#535353] text-white text-xl hover:bg-black transition-colors"
              >
                RESUME CLIMB
              </button>
            )}
          </div>
        </aside>
      )}

      {/* WORLD CONTAINER */}
      <div
        className="absolute inset-0 will-change-transform"
        style={{ transform: `translateX(${cameraX}px)` }}
      >
        {/* HORIZON LINE */}
        <div className="absolute top-[440px] left-0 w-[20000px] h-[1px] bg-[#535353]" />

        {/* LEVEL OBJECTS */}
        {LEVEL_CONFIG.map((obj) => (
          <div
            key={obj.id}
            className="absolute"
            style={{
              left: obj.x,
              top: obj.y ? (obj.type === 'PTERODACTYL' ? obj.y : 400) : 400, // Explicit Y or Ground
              transform: 'translateY(-100%)', // Pivot from bottom
            }}
          >
            {/* VISUALS */}
            {obj.type === 'CACTUS' && (
              <div className="flex items-end">
                {[...Array(obj.count)].map((_, i) => (
                  <div
                    key={i}
                    className="w-5 h-10 bg-[#535353] mx-[2px] rounded-t-sm relative"
                  >
                    <div className="absolute top-2 -left-2 w-2 h-4 bg-[#535353] rounded-sm" />
                    <div className="absolute top-4 -right-2 w-2 h-3 bg-[#535353] rounded-sm" />
                  </div>
                ))}
              </div>
            )}

            {obj.type === 'PTERODACTYL' && (
              <div className="w-10 h-6 bg-[#535353] animate-pulse" />
            )}

            {obj.type === 'TEXT' && (
              <div className="text-2xl whitespace-nowrap mb-12">{obj.text}</div>
            )}

            {obj.type === 'FLOAT_TEXT' && (
              <div className="text-4xl font-bold whitespace-nowrap mb-32 opacity-20">
                {obj.text}
              </div>
            )}
            {/* ITEMS */}
            {(obj.type === 'CLOUD_DATA' ||
              obj.type === 'BLOCK_DATA' ||
              obj.type === 'BILLBOARD') &&
              obj.data && (
                <article
                  className={`flex flex-col items-center mb-12 w-64 text-center group`}
                >
                  {/* The Content Box */}
                  <div className="border-2 border-[#535353] p-4 bg-white hover:bg-[#535353] hover:text-white transition-colors cursor-pointer relative">
                    <div className="text-sm opacity-50 mb-1">
                      {obj.data.type || 'DATA'}
                    </div>
                    <div className="text-xl font-bold leading-none mb-2">
                      {obj.data.title || obj.data.name}
                    </div>
                    <div className="text-sm opacity-80 leading-tight">
                      {obj.data.subtitle || obj.data.desc}
                    </div>

                    {/* Read Badge */}
                    {collectedIds.has(obj.id) && (
                      <div className="absolute -top-3 -right-3 bg-[#535353] text-white text-[10px] px-2 py-1 rotate-12">
                        CHECKED
                      </div>
                    )}
                  </div>
                  {/* Connector Line */}
                  <div className="w-[2px] h-12 bg-[#535353] opacity-20" />
                </article>
              )}

            {obj.type === 'HIRE_ME' && (
              <div className="text-center mb-24">
                <h1 className="text-6xl font-bold">{obj.text}</h1>
                <a
                  href="mailto:gokulkannan.dev@gmail.com"
                  className="text-2xl underline mt-4 block hover:text-black"
                >
                  {obj.sub}
                </a>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* DINO (Fixed on Screen, transforms jumping) */}
      <div
        className="fixed left-[100px] z-10 w-10 h-10"
        style={{ top: dino.y - 40 }} // Render from top-left, physics is pivot bottom
      >
        {/* Simple CSS Dino */}
        <div
          className={`w-full h-full bg-[#535353] ${
            dino.isDead ? 'opacity-50' : ''
          }`}
        >
          <div className="absolute top-0 right-0 w-6 h-4 bg-white" />{' '}
          {/* Eye/Mouth Block */}
          <div className="absolute top-1 right-1 w-1 h-1 bg-[#535353]" />{' '}
          {/* Eye */}
        </div>
      </div>
    </div>
  );
}

export default App;
