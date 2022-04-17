export const environment = process.env.NODE_ENV || "development";
export const basePath = process.env.BASE_PATH || "";
export const assetPrefix = process.env.ASSET_PREFIX || "";
export const is_dev = process.env.NODE_ENV === "development";
export const version = process.env.VERSION || "unknown_development_build";

const env =  {
  environment,
  basePath,
  assetPrefix,
  is_dev,
  version,
};

export default env;