import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: [
    "@aws-sdk/client-cognito-identity",
    "@aws-sdk/client-kms",
    "@aws-sdk/credential-providers",
  ],
  webpack: (config, { isServer, webpack }) => {
    if (!isServer) {
      config.plugins = [
        ...(config.plugins || []),
        new webpack.NormalModuleReplacementPlugin(/^node:/, (resource: any) => {
          resource.request = resource.request.replace(/^node:/, "");
        }),
      ];
      config.resolve.fallback = {
        ...(config.resolve.fallback || {}),
        fs: false,
        path: false,
        os: false,
        crypto: false,
        child_process: false,
        net: false,
        tls: false,
        http: false,
        https: false,
        stream: false,
        zlib: false,
        url: false,
        util: false,
        assert: false,
        constants: false,
      };
    }
    return config;
  },
};

export default nextConfig;
