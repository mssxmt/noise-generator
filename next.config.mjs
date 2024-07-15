const { createVanillaExtractPlugin } = require('@vanilla-extract/babel-plugin');
const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {};
const consfig = withVanillaExtract(nextConfig);
export default consfig;
