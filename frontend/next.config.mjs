// eslint-disable-next-line @typescript-eslint/no-var-requires
import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin'
const withVanillaExtract = createVanillaExtractPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'sesh-house-koa-server-production.up.railway.app',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'external-content.duckduckgo.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: "https",
                hostname: "utfs.io",
                pathname: `/a/${process.env.UPLOADTHING_APP_ID}/*`,
            },
            {
                protocol: "https",
                hostname: "www.vectary.com",
                pathname: '/studio-lite/scripts/**',
            },
        ],
    },
};

export default withVanillaExtract(nextConfig);
