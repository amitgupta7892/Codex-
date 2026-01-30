let contract;
let signer;

const contractAddress = "PASTE_DEPLOYED_ADDRESS";
const abi = [
  "function settleExpense(address _to, string memory _groupName) payable"
];

async function connectWallet() {
  if (!window.ethereum) {
    alert("Install MetaMask");
    return;
  }

  await ethereum.request({ method: "eth_requestAccounts" });

  const provider = new ethers.BrowserProvider(window.ethereum);
  signer = await provider.getSigner();
  contract = new ethers.Contract(contractAddress, abi, signer);

  alert("Wallet Connected");
}

async function settleOnChain(toAddress, amount, groupName) {
  try {
    const tx = await contract.settleExpense(
      toAddress,
      groupName,
      { value: ethers.parseEther(amount.toString()) }
    );

    await tx.wait();
    alert("Settlement successful on blockchain");
  } catch (err) {
    alert("Transaction failed");
    console.log(err);
  }
}
