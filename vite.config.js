import { defineConfig } from 'vite';
export default defineConfig({ base: '/', build: { rollupOptions: { input: Object.fromEntries(['index','team','templeton','axialsc','painless','contact','construction'].map(n=>[n, n+'.html'])) } } });
