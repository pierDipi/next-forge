import {withContentCollections} from '@content-collections/next';
import {env} from '@repo/env';
import {config, withAnalyzer} from '@repo/next-config';
import type {NextConfig} from 'next';

let nextConfig: NextConfig = {...config};

if (env.NODE_ENV === 'production') {
    nextConfig.redirects = async () => [
        {
            source: '/legal',
            destination: '/legal/privacy',
            statusCode: 301,
        },
    ];
}

if (env.ANALYZE === 'true') {
    nextConfig = withAnalyzer(nextConfig);
}

export default withContentCollections(nextConfig);
