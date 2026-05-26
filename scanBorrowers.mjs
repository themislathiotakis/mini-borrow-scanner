import "dotenv/config"; 
// Loads variables from the .env file into process.env

import { ethers } from "ethers";
// Imports the ethers library for blockchain interaction

const provider = new ethers.JsonRpcProvider(process.env.MAINNET_RPC_URL);
// Creates a connection to Ethereum mainnet using your RPC URL from .env

const POOL = "0x87870bca3f3fd6335c3f4ce8392d69350b4fa4e2";
// Official Aave V3 Pool contract on Ethereum mainnet

const BORROW_TOPIC = ethers.id("Borrow(address,address,address,uint256,uint8,uint256,uint16)");
// Converts the Borrow event signature into its keccak256 topic hash
// This lets us filter ONLY Borrow events from logs

const blocksBack = Number(process.argv[2] || 100);
// Reads the number passed in terminal
// Example: node scanBorrowers.mjs 500
// If nothing is passed, defaults to 100 blocks

const latest = await provider.getBlockNumber();
// Gets the current latest Ethereum block number

const logs = await provider.getLogs({
  address: POOL,
  // Only scan logs from the Aave Pool contract

  topics: [BORROW_TOPIC],
  // Only return logs matching the Borrow event topic

  fromBlock: latest - blocksBack,
  // Start scanning from X blocks ago

  toBlock: latest,
  // Stop scanning at latest block
});

const borrowers = [...new Set(logs.map(log =>
  ethers.getAddress("0x" + log.topics[2].slice(26))
))];
// Extract borrower addresses from logs
// topics[2] contains the indexed "onBehalfOf" address
// slice(26) removes zero padding from the 32-byte topic
// ethers.getAddress() formats it into a proper checksum address
// Set() removes duplicates
// ... converts Set back into a normal array

console.log(`Blocks scanned: ${blocksBack}`);
// Prints how many blocks were scanned

console.log(`New borrowers found: ${borrowers.length}`);
// Prints number of unique borrowers found

borrowers.forEach(a => console.log(a));
// Prints every borrower wallet address