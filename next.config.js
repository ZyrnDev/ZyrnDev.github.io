// @ts-check
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

const enviroment = process.env.NODE_ENV || "development";
const basePath = process.env.BASE_PATH || "";
const assetPrefix = process.env.ASSET_PREFIX || "";
const isProduction = enviroment === 'production';

// eslint-disable-next-line max-lines-per-function
module.exports = (phase, { defaultConfig }) => {
  
  /**
   * @type {import('next').NextConfig}
   **/
  const baseConfig = {
    ...defaultConfig,
      poweredByHeader: false,
      reactStrictMode: true, // Good Practice apparently
      trailingSlash: true,
      swcMinify: true,
      basePath,
      assetPrefix,
  };

  /* development only config options here */
  if (phase === PHASE_DEVELOPMENT_SERVER) return { ...baseConfig };

  /* config options for all phases except development here */
  return { ...baseConfig };
}
