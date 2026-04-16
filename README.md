# KOR Counter

KOR Counter is a workout timer app built for interval-based training sessions.

It supports the most common training formats used in functional fitness:

- TABATA
- AMRAP
- EMOM
- FOR TIME

## Features

- Mode selection screen for all supported workout formats.
- Configurable setup form per mode before starting the timer.
- 3-2-1 pre-start countdown.
- Running timer with round/phase labels.
- Audio cues:
  - 3-2-1 voice cue near transitions.
  - Repeated times-up sound when the workout ends.
- Responsive typography and layout for desktop and mobile.

## Workout Modes

### TABATA

- Configure rounds, work seconds, and rest seconds.
- Timer alternates between WORK and REST phases.

### AMRAP

- Configure total workout minutes.
- Timer counts down until time reaches zero.

### EMOM

- Configure total rounds and interval duration (minutes + seconds).
- Timer resets every interval and advances rounds automatically.

### FOR TIME

- Configure an optional time cap in minutes.
- Timer counts up elapsed time.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- lucide-react (icons)

## Getting Started

1. Install dependencies:

	npm install

2. Run development server:

	npm run dev

3. Open:

	http://localhost:3000

## Available Scripts

- npm run dev: starts the local dev server.
- npm run build: creates a production build.
- npm run start: runs the production server.
- npm run lint: runs ESLint checks.

## Project Structure

- app/page.tsx: app entry and mode switching.
- app/components/Menu.tsx: workout mode selection.
- app/components/SetTimerMenu.tsx: mode-specific timer setup form.
- app/components/Countdown.tsx: pre-start countdown screen.
- app/components/Timer.tsx: main workout timer logic and controls.
- public/sounds/: audio assets used by countdown and finish cues.

## Notes

- Sound playback depends on browser autoplay policies and user interaction.
- FOR TIME supports zero cap (open-ended count-up).
