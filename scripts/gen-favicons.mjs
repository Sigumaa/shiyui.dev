import sharp from 'sharp'
import fs from 'node:fs/promises'

const src = 'shiyui-chan.jpg'
const outDir = 'public/favicon'
await fs.mkdir(outDir, { recursive: true })

const sizes = [
  { name: 'android-chrome-192x192.png', size: 192 },
  { name: 'android-chrome-512x512.png', size: 512 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 }
]

for (const { name, size } of sizes) {
  await sharp(src).resize(size, size).png().toFile(`${outDir}/${name}`)
}

// Simple .ico as 32x32
await sharp(src).resize(32, 32).toFile(`${outDir}/favicon.ico`)

const manifest = {
  name: 'shiyui blog',
  short_name: 'shiyui',
  icons: [
    { src: '/favicon/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
    { src: '/favicon/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' }
  ],
  theme_color: '#ffffff',
  background_color: '#ffffff',
  display: 'standalone'
}
await fs.writeFile(`${outDir}/site.webmanifest`, JSON.stringify(manifest, null, 2))
console.log('Favicons generated at', outDir)
