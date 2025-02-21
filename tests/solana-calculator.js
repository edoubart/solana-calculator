// NPM Packages
import * as anchor from '@coral-xyz/anchor';
import { Program } from '@coral-xyz/anchor';
import assert from 'assert';

const { BN } = anchor.default;
const { SystemProgram } = anchor.web3;

describe("solana-calculator", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();

  anchor.setProvider(provider);

  const calculator = anchor.web3.Keypair.generate();

  const program = anchor.workspace.SolanaCalculator;

  it("Creates a calculator", async () => {
    await program.rpc.create("Welcome to Solana", {
      accounts: {
        calculator: calculator.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [calculator],
    });

    const account = await program.account.calculator.fetch(
      calculator.publicKey
    );

    assert.ok(account.greeting === "Welcome to Solana");
  });

  it("Adds two numbers", async () => {
    let number_1 = 2;
    let number_2 = 3;
    let result = number_1 + number_2;

    number_1 = new BN(number_1);
    number_2 = new BN(number_2);
    result = new BN(result);

    await program.rpc.add(number_1, number_2, {
      accounts: {
        calculator: calculator.publicKey,
      },
    });

    const account = await program.account.calculator.fetch(
      calculator.publicKey
    );

    assert.ok(account.result.eq(result));
  });
});
