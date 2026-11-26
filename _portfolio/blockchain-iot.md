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

IoT data can be forged by an impersonated device or altered on the way, and a central server is a single point of trust. `docs/problem_scope.md` frames the project around those two risks and targets a testnet prototype, not a mainnet deployment.

## What is in the repo

- `iot_device/device_simulator.py` generates mock temperature and humidity readings, hashes them with SHA-256, signs the hash with ECDSA on secp256k1, registers the public key and posts the payload to the backend.
- `app/` is a FastAPI service. `POST /api/iot/upload` checks that the device is registered, verifies the signature (`services/signature.py`), adds the JSON to IPFS (`services/ipfs.py`) and writes the CID and data hash to the chain through web3.py (`services/blockchain.py`).
- `contracts/DataStorage.sol` (296 lines) keeps a device registry with DIDs, stores data hashes, answers `verifyDataIntegrity(ipfsHash, dataHash)` and handles access grants with expiry, built on OpenZeppelin `Ownable` and `ReentrancyGuard`. `contracts/deploy.py` targets Polygon Amoy or a local node.

## Limits and next steps

The prototype was tested on a testnet with simulated devices; scalability was not evaluated. The planned next steps are real IoT hardware, mainnet deployment and lower transaction cost.
