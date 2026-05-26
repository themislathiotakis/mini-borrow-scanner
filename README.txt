This is a really minimal scanner! the only thing it does is to give you back the number of new borrowers in the last blocks and also their wallet addresses.

How to implement it:
1. Open .env and put you alchemy key
2. Install dependences if needed:
   Open cmd in the folder and Run:
       npm init -y
       npm install ethers dotenv

4. FINALLY RUN:
   node scanBorrowers.mjs 100 // [change the block numders in the desired one]


!!!THATS IT!!!



//Its a too basic code for Ethereum tooling. the parts of the code can be found in https://github.com/aave/aave-v3-core/blob/master/contracts/interfaces/IPool.sol //

!If you are in free tier of alchemy maybe it want allow to scan more that 1 block at once but this is not a problem just make a basic loop to send the request one by one block. 