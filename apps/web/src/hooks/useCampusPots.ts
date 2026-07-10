"use client";

import { useCallback, useEffect, useState } from "react";
import { useConnect, useEthereum, useUserInfo } from "@particle-network/auth-core-modal";
import {
  UniversalAccount,
  type EIP7702Authorization,
} from "@particle-network/universal-account-sdk";
import {
  createUAInstance,
  buildContributionTransaction,
  type ContributionParams,
} from "@/lib/ua";

export function useAuth() {
  const { connect, disconnect, connected, connectionStatus } = useConnect();
  const { address, chainId, chainInfo, signMessage } = useEthereum();
  const { userInfo } = useUserInfo();

  const login = useCallback(() => connect(), [connect]);

  return {
    login,
    logout: disconnect,
    connected,
    connecting: connectionStatus === "connecting" || connectionStatus === "loading",
    address,
    chainId,
    chainInfo,
    userInfo,
    signMessage,
  };
}

export function useUniversalAccount() {
  const { address, signMessage } = useEthereum();
  const [ua, setUA] = useState<UniversalAccount | null>(null);
  const [initializing, setInitializing] = useState(false);

  useEffect(() => {
    if (!address) {
      setUA(null);
      return;
    }

    setInitializing(true);
    const instance = createUAInstance(address, true);
    setUA(instance);
    setInitializing(false);
  }, [address]);

  const contribute = useCallback(
    async (params: ContributionParams) => {
      if (!ua || !signMessage) {
        throw new Error("Universal Account not initialized");
      }

      const tx = await buildContributionTransaction(ua, params);

      const signature = await signMessage(tx.rootHash);

      const authorizations: EIP7702Authorization[] = [];
      for (const userOpGroup of tx.userOps) {
        const auth = userOpGroup.eip7702Auth;
        if (auth && !userOpGroup.eip7702Delegated) {
          const authSig = await signMessage(
            JSON.stringify(auth)
          );
          authorizations.push({
            userOpHash: userOpGroup.userOpHash,
            signature: authSig,
          });
        }
      }

      const result = await ua.sendTransaction(
        tx,
        signature,
        authorizations.length > 0 ? authorizations : undefined
      );

      return result;
    },
    [ua, signMessage]
  );

  return {
    ua,
    initializing,
    contribute,
  };
}
