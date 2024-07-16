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
        ],
    },
};

export default withVanillaExtract(nextConfig);
