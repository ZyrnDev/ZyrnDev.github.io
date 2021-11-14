export const environment = process.env.NODE_ENV || "development";
export const basePath = process.env.BASE_PATH || "";
export const assetPrefix = process.env.ASSET_PREFIX || "";
export const is_dev = process.env.NODE_ENV === "development";

const env =  {
  environment,
  basePath,
  assetPrefix,
  is_dev,
};

export default env;