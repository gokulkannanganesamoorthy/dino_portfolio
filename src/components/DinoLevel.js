import { LEVELS } from '../data/gameData';

export const LEVEL_CONFIG = [
  // --- BIO SECTION ---
  { id: 'BIO_TITLE', x: 800, type: 'FLOAT_TEXT', text: 'IDENTITY' },
  { id: 'BIO_1', x: 1200, type: 'CLOUD_DATA', data: LEVELS[0].targets[0] }, // Bio

  // --- OBSTACLE 1 ---
  { id: 'C_1', x: 2000, type: 'CACTUS', count: 1 },

  // --- SKILLS: DEV ---
  { id: 'SKILL_TITLE', x: 2800, type: 'FLOAT_TEXT', text: 'CAPABILITIES' },
  { id: 'SKILL_WEB', x: 3200, type: 'BLOCK_DATA', data: LEVELS[1].targets[0] }, // Web
  { id: 'SKILL_APP', x: 3800, type: 'BLOCK_DATA', data: LEVELS[1].targets[1] }, // App

  // --- OBSTACLE 2 ---
  { id: 'C_2', x: 4400, type: 'CACTUS', count: 2 },
  { id: 'P_1', x: 4800, type: 'PTERODACTYL', y: 350 }, // Low

  // --- SKILLS: TECH ---
  { id: 'SKILL_AUTO', x: 5400, type: 'BLOCK_DATA', data: LEVELS[1].targets[2] }, // Automation
  { id: 'SKILL_SEC', x: 6000, type: 'BLOCK_DATA', data: LEVELS[1].targets[3] }, // Security

  // --- OBSTACLE 3 ---
  { id: 'C_3', x: 6600, type: 'CACTUS', count: 2 },
  { id: 'P_2', x: 7000, type: 'PTERODACTYL', y: 320 }, // High

  // --- EXPERIENCE ---
  { id: 'EXP_TITLE', x: 7600, type: 'FLOAT_TEXT', text: 'LOGS' },
  { id: 'EXP_LUNO', x: 8000, type: 'CLOUD_DATA', data: LEVELS[2].targets[0] }, // Luno
  { id: 'EXP_AXTR', x: 8600, type: 'CLOUD_DATA', data: LEVELS[2].targets[1] }, // Axtr
  { id: 'EXP_HACK', x: 9200, type: 'CLOUD_DATA', data: LEVELS[2].targets[2] }, // Hackup

  // --- OBSTACLE 4 ---
  { id: 'C_4', x: 9800, type: 'CACTUS', count: 3 },
  { id: 'P_3', x: 10200, type: 'PTERODACTYL', y: 350 },

  // --- PROJECTS ---
  { id: 'WORK_TITLE', x: 10800, type: 'FLOAT_TEXT', text: 'ARTIFACTS' },
  { id: 'PROJ_VULN', x: 11200, type: 'BILLBOARD', data: LEVELS[3].targets[0] }, // VulnScan
  { id: 'PROJ_SATTA', x: 11800, type: 'BILLBOARD', data: LEVELS[3].targets[1] }, // Satta Pai
  { id: 'C_5', x: 12400, type: 'CACTUS', count: 2 },
  { id: 'PROJ_LEAD', x: 12800, type: 'BILLBOARD', data: LEVELS[3].targets[2] }, // Lead Scraper

  // --- WARNING ---
  {
    id: 'WARN_1',
    x: 13500,
    type: 'TEXT',
    text: '!!! CHECKPOINT !!!',
    sub: 'SLOWING DOWN',
  },

  // --- END ---
  {
    id: 'END_TRIGGER',
    x: 14000,
    type: 'VICTORY_BLOCK',
    text: 'GAME OVER',
    sub: 'HIRE GOKUL?',
  },
];
