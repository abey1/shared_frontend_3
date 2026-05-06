import relumePreset from '@relume_io/relume-tailwind'

/** Local `content` paths pick up your JSX and `index.html`; Relume components live under `node_modules`. */
export default {
  content: [
    './node_modules/@relume_io/relume-ui/dist/**/*.{js,ts,jsx,tsx}',
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  presets: [relumePreset],
  theme: {
    extend: {
      // Relume preset uses sm/md "100%" for `.container`, which yields invalid
      // `@media (min-width: 100%)` and breaks Vite's lightningcss minifier.
      container: {
        screens: {
          sm: '480px',
          md: '768px',
        },
      },
    },
  },
}
