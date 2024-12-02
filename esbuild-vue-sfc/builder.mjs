#!/usr/bin/env node

import { build } from 'esbuild';
import vue from 'esbuild-plugin-vue3';

build({
   entryPoints: ['src/main.js'],
   outfile: 'dist/compiled.js',
   bundle: true,
   plugins: [vue()]
}).catch(() => process.exit(1));
