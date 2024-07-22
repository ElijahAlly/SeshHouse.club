// eslint-disable-next-line @typescript-eslint/no-var-requires
import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin'
const withVanillaExtract = createVanillaExtractPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [''],
        remotePatterns: [
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
        ],
    },
};

export default withVanillaExtract(nextConfig);
