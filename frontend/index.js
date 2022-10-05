// React
import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';

// NEAR
import {GifCollectionContract} from './near-interface';
import {Wallet} from './near-wallet';

const CONTRACT_NAME = 'gif-library.ajju0.testnet';

let contractId = process.env.CONTRACT_NAME || CONTRACT_NAME;

console.log("Account Id", contractId);

// When creating the wallet you can optionally ask to create an access key
// Having the key enables to call non-payable methods without interrupting the user to sign
const wallet = new Wallet({
  createAccessKeyFor: contractId
});

// Abstract the logic of interacting with the contract to simplify your flow
const gifCollection = new GifCollectionContract({
  contractId: contractId,
  walletToUse: wallet,
});

// Setup on page load
window.onload = async () => {
  const isSignedIn = await wallet.startUp()
  const container = document.getElementById('root');
  const root = createRoot(container);
  root.render(<App isSignedIn={isSignedIn} gifCollection={gifCollection} wallet={wallet}/>)
}
