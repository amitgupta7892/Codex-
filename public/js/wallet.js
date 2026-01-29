async function connectWallet() {
  if (!window.ethereum) {
    alert("MetaMask not detected");
    return;
  }

  try {
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    alert("Wallet connected: " + accounts[0]);
  } catch (err) {
    alert("Wallet connection failed");
  }
}
