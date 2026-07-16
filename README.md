# CampusPots

Chain-abstracted fundraising for students, creators, and communities.

Contributors pay from any chain using any asset they hold.
Organizers see one clean balance settled on Arbitrum.

Built for the UXMAXX Hackathon using Particle Network Universal Accounts (EIP-7702 mode) and Arbitrum One.

## What is supposed to happen

1. A user connects with email or Google via Particle Auth — an embedded wallet is created automatically.
2. They browse pots on the dashboard or create a new one.
3. To contribute, they enter an amount in USDC.
4. Particle Universal Accounts SDK sources the USDC from whatever chain the user holds it on (Base, Ethereum, BNB Chain, etc.), bridges and swaps it invisibly, and calls `contribute()` on the CampusPots contract on Arbitrum.
5. The organizer sees the pot balance grow in real time. When ready, they withdraw all USDC to their address on Arbitrum.
6. The user never sees a chain name, never manages gas, never switches networks.

## Status

**We requested deployment funds from the hackathon organisers to deploy the CampusPots contract on Arbitrum One mainnet. We did not receive any.**

- The frontend and Particle Auth integration are fully built and deployed.
- Particle Universal Accounts require mainnet — testnets are not supported.
- The contract (Solidity + Foundry, 14 passing tests) is ready to deploy once mainnet gas is available.
- All contract interactions (create pot, contribute, withdraw) are wired to the UI and will work immediately upon deployment.

## Tech Stack

- **Frontend**: Next.js 16.2 (webpack), Tailwind CSS v4, Framer Motion
- **Auth + Wallets**: Particle Network Auth Core + Auth Core Modal (email/Google)
- **Cross-chain**: Particle Network Universal Accounts SDK v2 (EIP-7702 mode)
- **Contract**: Solidity 0.8.20 + Foundry
- **Settlement chain**: Arbitrum One (chain ID 42161)
- **Token**: USDC (6 decimals)
- **Deployment**: Vercel

## Local Development

```bash
pnpm install
echo "NEXT_PUBLIC_PARTICLE_PROJECT_ID=..." >> .env.local
echo "NEXT_PUBLIC_PARTICLE_CLIENT_KEY=..." >> .env.local
echo "NEXT_PUBLIC_PARTICLE_APP_ID=..." >> .env.local
cd apps/web && pnpm dev --webpack
```

## Environment Variables

See `.env.example` for all required variables.

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_PARTICLE_PROJECT_ID` | Particle Network project ID |
| `NEXT_PUBLIC_PARTICLE_CLIENT_KEY` | Particle Network client key |
| `NEXT_PUBLIC_PARTICLE_APP_ID` | Particle Network app ID |
| `NEXT_PUBLIC_CAMPUSPOTS_CONTRACT` | Deployed contract address |
| `NEXT_PUBLIC_ARBITRUM_CHAIN_ID` | Arbitrum One (42161) |
| `NEXT_PUBLIC_USDC_ADDRESS` | USDC on Arbitrum One |
| `ARBITRUM_MAINNET_RPC_URL` | RPC for deployment |
| `PRIVATE_KEY` | Deployer wallet |
| `ARBISCAN_API_KEY` | Contract verification |

## Contract

```bash
cd contracts
forge build
forge test
forge script script/DeployCampusPots.s.sol:DeployCampusPots --rpc-url arbitrum_one --broadcast
```

## Live Site

https://campus-pot.vercel.app
