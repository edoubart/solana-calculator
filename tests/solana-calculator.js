// NPM Packages
const assert = require('assert');
const anchor = require('@project-serum/anchor');
const { SystemProgram } = anchor.web3;

//import * as anchor from "@coral-xyz/anchor";
//import { Program } from "@coral-xyz/anchor";
//import { SolanaCalculator } from "../target/types/solana_calculator";

describe("solana-calculator", () => {
  const provider = anchor.Provider.local();

  anchor.setProvider(provider);

  const calculator = anchor.web3.Keypair.generate();

  const program = anchor.workspace.Mycalculatordapp;

  // Configure the client to use the local cluster.
  //anchor.setProvider(anchor.AnchorProvider.env());

  //const program = anchor.workspace.SolanaCalculator as Program<SolanaCalculator>;

  it("Creates a calculator", async () => {
    await program.rpc.create("Welcome to Solana", {
      accounts: {
        calculator: calculator.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [calculator],
    });

    const account = await program.account.calculator
      .fetch(calculator.publicKey);

    assert.ok(account.greeting === "Welcome to Solana");
  });

  //it("Is initialized!", async () => {
  //  // Add your test here.
  //  const tx = await program.methods.initialize().rpc();
  //  console.log("Your transaction signature", tx);
  //});
});
