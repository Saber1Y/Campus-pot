# CampusPots — Demo Script

## Intro (30 sec)

"Hey, this is CampusPots — a cross-chain fundraising platform. The problem we're solving is simple: if I want to chip into a friend's fundraiser and my money is on Base while the pot is on Arbitrum, I shouldn't have to bridge, swap, or even know what a chain is. With CampusPots, you just connect and contribute. Everything else happens invisibly."

## The UX Flow (2 min)

**1. Landing page**
"This is the landing. Dark, cinematic vibe. Explains the value prop — one link, one balance, any chain."

**2. Login**
"Click 'Get Started' — Particle Auth pops up. Email or Google. No wallet, no seed phrase. Just login like any app."

**3. Dashboard**
"Here's the dashboard. You see all the fundraising pots. Progress bars, status badges, contributor counts. If you're connected, you can create a new pot or contribute to an existing one."

**4. Create a pot**
"Click 'Create a pot' — fill in the title, description, goal amount in USDC, and a deadline. Hit create. Particle UA SDK bundles the transaction and sends it to Arbitrum. The pot is live."

**5. Contribute**
"Open any active pot. Click 'Contribute from any chain'. Enter an amount — say $50. Notice the 'Pay from' field says 'Auto (best route via Particle UA)'. This is the magic: the user doesn't pick a chain. They just type $50 and click send. The Universal Accounts SDK finds where they hold USDC — Base, Ethereum, BNB, wherever — bridges and swaps it invisibly, and settles the contribution on Arbitrum. One signature. Done."

**6. Withdraw**
"The organizer sees the balance grow in real time. When ready, they click withdraw and all the USDC goes to their wallet on Arbitrum."

## The Gas Issue (30 sec)

"There's one thing we couldn't fully complete. The CampusPots contract needs to be deployed on Arbitrum One mainnet — that costs about 0.01 ETH in gas, roughly $25. We asked the hackathon organisers for deployment funds and didn't get any. Particle Universal Accounts are mainnet-only, so everything is wired and ready — the contract compiles, all 14 tests pass, the deploy script is one command away — we just need mainnet gas to push it live."

## Tech Stack (30 sec)

"Quick rundown of what's under the hood:
- Next.js 16 with webpack (Particle Auth's AWS SDK needs node polyfills, so no Turbopack)
- Particle Auth for email/Google login
- Particle Universal Accounts SDK v2 in EIP-7702 mode — this is the core chain abstraction layer
- A Solidity contract on Arbitrum One for pot logic
- viem for reading contract state
- Hosted on Vercel"

## Closing (15 sec)

"Link to the live site and repo in the chat. Happy to answer questions or walk through any part of the code."

---

## Key URLs

- Live: https://campus-pot.vercel.app
- Repo: https://github.com/Saber1Y/Campus-pot
