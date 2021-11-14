const excludedPaths = [];

const basePath = process.env.BASE_PATH || "";

module.exports = {
    siteUrl: process.env.SITE_URL,
    generateRobotsTxt: true,
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: [ `${basePath}/` ],
                disallow: [ ],
            },
        ]
    },
    transform: async (config, path) => {
        if (excludedPaths.some(excludedPath => excludedPath.test(path))) {
            return null;
        }
        return {
            loc: `${basepath}${path}`,
            changefreq: config.changefreq,
            priority: config.priority,
            lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
            alternateRefs: config.alternateRefs ?? [],
        }
    }
}