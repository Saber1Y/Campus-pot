"use client";

import {
  AuthCoreContextProvider,
  type AuthCoreModalOptions,
} from "@particle-network/auth-core-modal";
import { AuthType } from "@particle-network/auth-core";

const particleOptions: AuthCoreModalOptions = {
  projectId: process.env.NEXT_PUBLIC_PARTICLE_PROJECT_ID!,
  clientKey: process.env.NEXT_PUBLIC_PARTICLE_CLIENT_KEY!,
  appId: process.env.NEXT_PUBLIC_PARTICLE_APP_ID!,
  authTypes: [AuthType.email, AuthType.google],
  themeType: "dark",
  fiatCoin: "USD",
  customStyle: {
    projectName: "CampusPots",
    modalWidth: 420,
  },
  promptSettingConfig: {
    promptMasterPasswordSettingWhenLogin: 0,
    promptPaymentPasswordSettingWhenSign: 0,
  },
  wallet: {
    visible: false,
  },
};

export default function ParticleAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthCoreContextProvider options={particleOptions}>
      {children}
    </AuthCoreContextProvider>
  );
}
