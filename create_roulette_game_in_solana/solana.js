const web3 = require("@solana/web3.js");
const chalk = require("chalk");

const getWalletBalance = async (pubk) => {
  try {
    const connection = new web3.Connection(
      web3.clusterApiUrl("devnet"),
      "confirmed"
    );
    const balance = await connection.getBalance(new web3.PublicKey(pubk));
    console.log(`=> For wallet address ${pubk}`);
    const walletBalance = parseInt(balance) / web3.LAMPORTS_PER_SOL;
    console.log(`Wallet balance: ${walletBalance} SOL`);
    return walletBalance;
  } catch (err) {
    console.log(err);
  }
};

const transferSOL = async (from, to, transferAmt) => {
  try {
    const connection = new web3.Connection(
      web3.clusterApiUrl("devnet"),
      "confirmed"
    );
    const transaction = new web3.Transaction().add(
      web3.SystemProgram.transfer({
        fromPubkey: new web3.PublicKey(from.publicKey.toString()),
        toPubkey: new web3.PublicKey(to.publicKey.toString()),
        lamports: transferAmt * web3.LAMPORTS_PER_SOL,
      })
    );
    const signature = await web3.sendAndConfirmTransaction(
      connection,
      transaction,
      [from]
    );
    return signature;
  } catch (err) {
    console.log(err);
  }
};

const airDropSol = async (pubk, transferAmt) => {
  try {
    const connection = new web3.Connection(
      web3.clusterApiUrl("devnet"),
      "confirmed"
    );
    const fromAirDropSignature = await connection.requestAirdrop(
      new web3.PublicKey(pubk),
      transferAmt * web3.LAMPORTS_PER_SOL
    );
    await connection.confirmTransaction(fromAirDropSignature);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getWalletBalance,
  transferSOL,
  airDropSol,
};
