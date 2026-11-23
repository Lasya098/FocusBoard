# FocusBoard

A responsive, single-user task dashboard built for the FocusBoard frontend trainee assessment.

## Features

- React + Vite + JavaScript, reusable components and Lucide icons
- 7 starter tasks with unique IDs and all required fields
- Create, edit, delete (with confirmation) and status updates
- Combined case-insensitive title search, status tabs and priority filter
- Dynamic total, in-progress, completed and completion percentage
- Three-slide Focus Notes carousel with previous/next and direct indicators
- Safe `localStorage` persistence; starter data is only the initial value
- Responsive sidebar/navigation and layouts for desktop, tablet and mobile
- Accessible form labels, buttons, tab semantics, focus states and empty states

## Run from scratch

1. Install **Node.js LTS** from https://nodejs.org (npm is included).
2. Extract the ZIP file.
3. Open the extracted `focusboard` folder in VS Code.
4. Open Terminal → New Terminal.
5. Run:

   ```bash
   npm install
   npm run dev
   ```

6. Vite prints a local URL, usually `http://localhost:5173`. Ctrl+click it or paste it into your browser.
7. Make changes in `src/`; the browser refreshes automatically.

To verify a production build:

```bash
npm run build
npm run preview
```

## Project structure

```text
focusboard/
├── public/
├── src/
│   ├── components/
│   │   ├── FocusNotes.jsx
│   │   ├── Header.jsx
│   │   ├── Sidebar.jsx
│   │   ├── StatCard.jsx
│   │   ├── TaskForm.jsx
│   │   ├── TaskList.jsx
│   │   └── TaskRow.jsx
│   ├── data/sampleTasks.js
│   ├── hooks/useLocalStorage.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── AI_USAGE.md
├── package.json
└── README.md
```

## State-management choice

React `useState` is used for task data and transient UI state; `useMemo` derives the filtered task list. Task mutations use immutable `map`, `filter`, and array spread operations. Statistics are derived from the complete task array, never from filtered results. The `useLocalStorage` hook safely restores and persists task data under `focusboard_tasks`.

The carousel keeps its active slide in component state and synchronizes the slide content and indicators.

## Deployment

Push the project to a public GitHub repository. Import the repository into Vercel or Netlify using:

- Build command: `npm run build`
- Output directory: `dist`

After deployment, add the live HTTPS URL and GitHub URL here before submission.

## Design notes / limitations

- The provided screenshot is a visual reference; the live Figma file should remain the source of truth for exact typography, measurements, and slide copy. The three Focus Notes copy entries are modeled on the supplied screenshot and can be adjusted in `src/components/FocusNotes.jsx`.
- Calendar and Settings are navigation placeholders because no additional screens or backend are required by the assessment.
- Data is stored locally in the current browser only; it is not synced between devices or users.


Status tabs include All tasks, To do, In progress and Completed.
