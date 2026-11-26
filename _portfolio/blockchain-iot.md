---
title: "Blockchain-integrated IoT system"
excerpt: "A prototype where a simulated device signs its readings, a backend verifies them, and the data hash is stored in a smart contract."
tagline: "A prototype that signs IoT readings per device, verifies them in a FastAPI backend and anchors their hashes in a Solidity contract."
collection: portfolio
when: "Aug 2025"   # first/last push month on GitHub, from _data/projects.yml
start: "2025-08"
end: "2025-08"
stack: [Python, FastAPI, Solidity, web3.py, IPFS, ECDSA]
code: "https://github.com/khoadangnguyenn/Blockchain-integrated-IoT-System"
card_summary: "IoT prototype: devices sign readings with ECDSA, a FastAPI backend verifies them, raw data goes to IPFS and its hash to a Solidity contract."
permalink: /portfolio/blockchain-iot/
---

This prototype guards IoT data against two risks: a forged reading from an impersonated device, and a reading altered on its way to storage. A central server would also be a single point of trust. The project docs frame the work around those risks and target a testnet, not mainnet.

A simulated device generates mock temperature and humidity readings and hashes them with SHA-256. It signs the hash with ECDSA on the secp256k1 curve, registers its public key and posts the payload to the backend.

The backend is a FastAPI service with one upload endpoint. It checks that the device is registered and verifies the signature. Then it adds the JSON to IPFS and writes the resulting content ID and the data hash to the chain through the web3 library.

The Solidity contract is about 296 lines. It keeps a device registry with DIDs, stores data hashes and answers integrity checks for a given IPFS hash and data hash. It also handles access grants that expire. It builds on OpenZeppelin's ownership and reentrancy-guard contracts, and its deploy script targets Polygon Amoy or a local node.

I tested the prototype on a testnet with simulated devices and did not evaluate scalability. Next steps are real IoT hardware, mainnet deployment and lower transaction cost.
