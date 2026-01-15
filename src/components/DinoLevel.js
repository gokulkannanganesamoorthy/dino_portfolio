import { LEVELS } from '../data/gameData';

export const LEVEL_CONFIG = [
  // --- BIO SECTION ---
  { id: 'BIO_TITLE', x: 800, type: 'FLOAT_TEXT', text: 'IDENTITY' },
  { id: 'BIO_1', x: 1200, type: 'CLOUD_DATA', data: LEVELS[0].targets[0] }, // Bio

  // --- OBSTACLE 1 (Easier) ---
  { id: 'C_1', x: 2000, type: 'CACTUS', count: 1 },

  // --- SKILLS SECTION ---
  { id: 'SKILL_TITLE', x: 2800, type: 'FLOAT_TEXT', text: 'CAPABILITIES' },
  { id: 'SKILL_1', x: 3200, type: 'BLOCK_DATA', data: LEVELS[1].targets[0] }, // Web

  // --- OBSTACLE 2 (Medium) ---
  { id: 'C_3', x: 3800, type: 'CACTUS', count: 2 },
  { id: 'P_2', x: 4200, type: 'PTERODACTYL', y: 350 }, // Low flyer (Duck/Jump)

  { id: 'SKILL_2', x: 5500, type: 'BLOCK_DATA', data: LEVELS[1].targets[1] }, // App

  // --- WORK SECTION ---
  { id: 'WORK_TITLE', x: 6200, type: 'FLOAT_TEXT', text: 'PROJECTS' },
  { id: 'PROJ_1', x: 6600, type: 'BILLBOARD', data: LEVELS[3].targets[0] },

  { id: 'C_6', x: 7200, type: 'CACTUS', count: 2 },
  { id: 'PROJ_2', x: 8000, type: 'BILLBOARD', data: LEVELS[3].targets[1] },

  // --- WARNING ---
  {
    id: 'WARN_1',
    x: 8500,
    type: 'TEXT',
    text: '!!! CHECKPOINT !!!',
    sub: 'SLOWING DOWN',
  },

  // --- END ---
  {
    id: 'END_TRIGGER',
    x: 9000,
    type: 'VICTORY_BLOCK',
    text: 'GAME OVER',
    sub: 'HIRE GOKUL?',
  },
];
