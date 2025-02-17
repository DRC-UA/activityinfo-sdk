import {defineConfig} from 'tsup'

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    interface: 'src/interface/index.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
  splitting: false,
  clean: true,
})
