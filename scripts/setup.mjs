#!/usr/bin/env node
/**
 * One-shot setup for the ZCBC website.
 *
 * Checks the Node version, creates both .env files (generating real Strapi
 * secrets rather than leaving the "tobemodified" placeholders in place), then
 * installs dependencies in the root, the frontend and the CMS.
 *
 * Run with --check to verify the project is ready without changing anything;
 * "npm run dev" uses that to fail with a useful message on a half-set-up clone.
 *
 * Deliberately dependency-free: this has to run on a fresh clone, before
 * anything has been installed.
 */
import { randomBytes } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const rel = (p) => relative(root, p) || '.';
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const checkOnly = process.argv.includes('--check');

const ok = (m) => console.log(`  \x1b[32m✓\x1b[0m ${m}`);
const info = (m) => console.log(`  \x1b[2m·\x1b[0m ${m}`);
const warn = (m) => console.log(`  \x1b[33m!\x1b[0m ${m}`);
const step = (m) => console.log(`\n\x1b[1m${m}\x1b[0m`);
const die = (m) => {
  console.error(`\n\x1b[31m✗ ${m}\x1b[0m\n`);
  process.exit(1);
};

/* 1 ── Node version ─────────────────────────────────────────────────────── */

if (!checkOnly) step('Checking Node version');

const pinned = existsSync(join(root, '.nvmrc'))
  ? readFileSync(join(root, '.nvmrc'), 'utf8').trim()
  : null;

const [major, minor] = process.versions.node.split('.').map(Number);
const supported = (major > 20 || (major === 20 && minor >= 19)) && major < 23;

if (!supported) {
  die(
    `Node ${process.versions.node} is not supported.\n` +
      `  This project needs Node >=20.19 and <23${pinned ? ` (pinned: ${pinned})` : ''}.\n\n` +
      `  With nvm:     nvm install${pinned ? ` ${pinned}` : ''} && nvm use\n` +
      `  Without nvm:  install Node ${pinned ?? '22.21.1'} from https://nodejs.org`
  );
}

if (!checkOnly) {
  ok(`Node ${process.versions.node}`);
  if (pinned && process.versions.node !== pinned) {
    warn(`.nvmrc pins ${pinned}; run "nvm use" to match it exactly`);
  }
}

/* 1b ── --check: is the project ready to run? ──────────────────────────── */

const PACKAGES = ['.', 'frontend', 'backend/church-cms'];

if (checkOnly) {
  const missing = [
    ...PACKAGES.filter((d) => !existsSync(join(root, d, 'node_modules'))).map(
      (d) => `dependencies not installed in ${rel(join(root, d))}`
    ),
    ...['frontend', 'backend/church-cms']
      .filter((d) => !existsSync(join(root, d, '.env')))
      .map((d) => `${rel(join(root, d, '.env'))} does not exist`),
  ];

  if (missing.length) {
    die(
      `This project is not set up yet:\n` +
        missing.map((m) => `    - ${m}`).join('\n') +
        `\n\n  Run \x1b[1mnpm run setup\x1b[0m first.`
    );
  }
  process.exit(0);
}

/* 2 ── Environment files ────────────────────────────────────────────────── */

step('Creating environment files');

// Strapi refuses to be secure with the placeholder values its .env.example
// ships, so these get real random values on first run.
const GENERATED = new Set([
  'APP_KEYS',
  'API_TOKEN_SALT',
  'ADMIN_JWT_SECRET',
  'TRANSFER_TOKEN_SALT',
  'JWT_SECRET',
  'ENCRYPTION_KEY',
]);

// Matches the format Strapi's own project generator produces.
const secret = () => randomBytes(16).toString('base64');

function seedEnv(dir, { generateSecrets = false } = {}) {
  const env = join(root, dir, '.env');
  const example = join(root, dir, '.env.example');

  if (existsSync(env)) {
    info(`${rel(env)} already exists — left untouched`);
    return;
  }
  if (!existsSync(example)) {
    warn(`${rel(example)} is missing — skipped`);
    return;
  }

  let body = readFileSync(example, 'utf8');

  if (generateSecrets) {
    body = body
      .split('\n')
      .map((line) => {
        const match = line.match(/^(\s*)([A-Z0-9_]+)\s*=/);
        if (!match || !GENERATED.has(match[2])) return line;
        const [, indent, key] = match;
        const value =
          key === 'APP_KEYS'
            ? `"${Array.from({ length: 4 }, secret).join(',')}"`
            : secret();
        return `${indent}${key}=${value}`;
      })
      .join('\n');
  }

  writeFileSync(env, body);
  ok(`created ${rel(env)}${generateSecrets ? ' with freshly generated secrets' : ''}`);
}

seedEnv('frontend');
seedEnv('backend/church-cms', { generateSecrets: true });

/* 3 ── Dependencies ────────────────────────────────────────────────────── */

step('Installing dependencies');

for (const dir of PACKAGES) {
  const cwd = join(root, dir);
  info(`npm install in ${rel(cwd)} …`);
  const result = spawnSync(npm, ['install'], {
    cwd,
    stdio: 'inherit',
    // Suppresses the root postinstall hint, which would tell us to run setup
    // while setup is what is running.
    env: { ...process.env, ZCBC_SETUP: '1' },
  });
  if (result.status !== 0) die(`npm install failed in ${rel(cwd)}`);
  ok(`${rel(cwd)}`);
}

/* 4 ── Done ────────────────────────────────────────────────────────────── */

console.log(`
\x1b[1m\x1b[32mSetup complete.\x1b[0m

  Start both servers:   \x1b[1mnpm run dev\x1b[0m
    frontend            http://localhost:5174
    Strapi admin        http://localhost:1337/admin

  First run? Create your Strapi administrator at the admin URL above.
  The site's own /admin additionally needs a users-permissions user with
  create/update/delete on Sermon and Leader.
`);
