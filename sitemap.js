const excludedPaths = [ /\/api/, /\/uploads/, /\/blogs\/unreleased/ ];

const basePath = process.env.BASE_PATH || "";

module.exports = {
    siteUrl: process.env.SITE_URL,
    generateRobotsTxt: true,
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: [ '/' ],
                disallow: [
                    '/api/',
                    '/uploads/',
                    '/blogs/unreleased/',
                ],
            },
        ]
    },
    transform: async (config, path) => {
        if (excludedPaths.some(excludedPath => excludedPath.test(path))) {
            return null;
        }
        return {
            loc: path,
            changefreq: config.changefreq,
            priority: config.priority,
            lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
            alternateRefs: config.alternateRefs ?? [],
        }
    }
}