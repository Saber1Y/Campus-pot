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
  buildCreatePotTransaction,
  signAndSendTransaction,
  toUSDCUnits,
  type ContributionParams,
} from "@/lib/ua";
import { USDC_ADDRESSES, SUPPORTED_CHAINS } from "@campuspots/shared";

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

export interface CreatePotParams {
  title: string;
  description: string;
  goalAmount: string;
  deadline: string;
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

      const tx = await buildContributionTransaction(ua, {
        ...params,
        amount: toUSDCUnits(params.amount),
      });
      return signAndSendTransaction(ua, tx, signMessage);
    },
    [ua, signMessage]
  );

  const createPot = useCallback(
    async (params: CreatePotParams) => {
      if (!ua || !signMessage || !address) {
        throw new Error("Universal Account not initialized");
      }

      const goalAmountUSDC = toUSDCUnits(params.goalAmount);
      const token = USDC_ADDRESSES[SUPPORTED_CHAINS.ARBITRUM_ONE];
      const deadlineUnix = Math.floor(
        new Date(params.deadline + "T23:59:59Z").getTime() / 1000
      ).toString();
      const metadataURI = JSON.stringify({
        title: params.title,
        description: params.description,
      });

      const tx = await buildCreatePotTransaction(
        ua,
        address,
        token,
        goalAmountUSDC,
        deadlineUnix,
        metadataURI
      );

      return signAndSendTransaction(ua, tx, signMessage);
    },
    [ua, signMessage, address]
  );

  return {
    ua,
    initializing,
    contribute,
    createPot,
  };
}
