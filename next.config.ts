import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 90 pour les photos plein écran, 75 pour le reste
    qualities: [75, 90],
  },
};

export default nextConfig;
