import {
  UniversalAccount,
  CHAIN_ID,
  SUPPORTED_TOKEN_TYPE,
  UNIVERSAL_ACCOUNT_VERSION,
  type EVMTransaction,
  type IUniversalAccountConfig,
  type ITransaction,
  type EIP7702Authorization,
} from "@particle-network/universal-account-sdk";
import { Interface, getBytes } from "ethers";
import { CAMPUSPOTS_ABI } from "@campuspots/shared";

const PARTICLE_PROJECT_ID = process.env.NEXT_PUBLIC_PARTICLE_PROJECT_ID!;
const PARTICLE_CLIENT_KEY = process.env.NEXT_PUBLIC_PARTICLE_CLIENT_KEY!;
const PARTICLE_APP_ID = process.env.NEXT_PUBLIC_PARTICLE_APP_ID!;
const CAMPUSPOTS_CONTRACT = process.env.NEXT_PUBLIC_CAMPUSPOTS_CONTRACT!;

export function createUAConfig(
  ownerAddress: string,
  useEIP7702 = true
): IUniversalAccountConfig {
  return {
    projectId: PARTICLE_PROJECT_ID,
    projectClientKey: PARTICLE_CLIENT_KEY,
    projectAppUuid: PARTICLE_APP_ID,
    smartAccountOptions: {
      name: "UNIVERSAL",
      version: UNIVERSAL_ACCOUNT_VERSION,
      ownerAddress,
      useEIP7702,
    },
    tradeConfig: {
      slippageBps: 100,
    },
  };
}

export function createUAInstance(ownerAddress: string, useEIP7702 = true) {
  return new UniversalAccount(createUAConfig(ownerAddress, useEIP7702));
}

const contributeInterface = new Interface(CAMPUSPOTS_ABI);

export interface ContributionParams {
  potId: number;
  amount: string;
  message: string;
}

export function encodeContributeCall({ potId, amount, message }: ContributionParams) {
  return contributeInterface.encodeFunctionData("contribute", [
    BigInt(potId),
    BigInt(amount),
    message,
  ]);
}

export function encodeCreatePotCall(
  payoutAddress: string,
  token: string,
  goalAmount: string,
  deadline: string,
  metadataURI: string
) {
  return contributeInterface.encodeFunctionData("createPot", [
    payoutAddress,
    token,
    BigInt(goalAmount),
    BigInt(deadline),
    metadataURI,
  ]);
}

export async function buildContributionTransaction(
  ua: UniversalAccount,
  params: ContributionParams
): Promise<ITransaction> {
  const callData = encodeContributeCall(params);

  const evmTx: EVMTransaction = {
    to: CAMPUSPOTS_CONTRACT,
    data: callData,
  };

  return ua.createUniversalTransaction({
    chainId: CHAIN_ID.ARBITRUM_MAINNET_ONE,
    expectTokens: [
      {
        type: SUPPORTED_TOKEN_TYPE.USDC,
        amount: params.amount,
      },
    ],
    transactions: [evmTx],
  });
}

export async function buildCreatePotTransaction(
  ua: UniversalAccount,
  payoutAddress: string,
  token: string,
  goalAmount: string,
  deadline: string,
  metadataURI: string
): Promise<ITransaction> {
  const callData = encodeCreatePotCall(
    payoutAddress,
    token,
    goalAmount,
    deadline,
    metadataURI
  );

  const evmTx: EVMTransaction = {
    to: CAMPUSPOTS_CONTRACT,
    data: callData,
  };

  return ua.createUniversalTransaction({
    chainId: CHAIN_ID.ARBITRUM_MAINNET_ONE,
    expectTokens: [],
    transactions: [evmTx],
  });
}

export const USDC_DECIMALS = 6;

export function toUSDCUnits(amount: string): string {
  const [whole, fraction = ""] = amount.split(".");
  const padded = fraction.padEnd(USDC_DECIMALS, "0").slice(0, USDC_DECIMALS);
  return whole + padded;
}

export function fromUSDCUnits(units: string): string {
  const padded = units.padStart(USDC_DECIMALS + 1, "0");
  const splitAt = padded.length - USDC_DECIMALS;
  const whole = padded.slice(0, splitAt);
  const fraction = padded.slice(splitAt);
  return `${parseInt(whole, 10)}.${fraction}`;
}

export type SignMessageFn = (message: string) => Promise<string>;

export async function signAndSendTransaction(
  ua: UniversalAccount,
  transaction: ITransaction,
  signMessage: SignMessageFn,
) {
  const signature = await signMessage(transaction.rootHash);

  const authorizations: EIP7702Authorization[] = [];
  for (const userOpGroup of transaction.userOps) {
    const auth = userOpGroup.eip7702Auth;
    if (auth && !userOpGroup.eip7702Delegated) {
      const authSig = await signMessage(JSON.stringify(auth));
      authorizations.push({
        userOpHash: userOpGroup.userOpHash,
        signature: authSig,
      });
    }
  }

  return ua.sendTransaction(
    transaction,
    signature,
    authorizations.length > 0 ? authorizations : undefined
  );
}
