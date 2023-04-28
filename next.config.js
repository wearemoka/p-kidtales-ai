/** @type {import('next').NextConfig} */
const path = require('path')

const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public',
  register: false,
  skipWaiting: true
})

const nextConfig = {
  experimental: {
    appDir: true
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  }
}

module.exports = withPWA(nextConfig)
