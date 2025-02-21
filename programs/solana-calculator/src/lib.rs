/***********
 * Imports *
 ***********/
use anchor_lang::prelude::*;
use anchor_lang::solana_program::entrypoint::ProgramResult;

declare_id!("AyWDkUYKAx8SWdwiLywcvTXD7We7ZkDiC6PLc7pGUHtT");

#[program]
pub mod solana_calculator {
    use super::*;

    /*
     * The context ('ctx') is the list of accounts that the function needs to
     * retrieve data from the blockchain.
     */
    pub fn create(ctx: Context<Create>, init_message: String) -> ProgramResult {
        let calculator = &mut ctx.accounts.calculator;

        calculator.greeting = init_message;

        Ok(())
    }
}

/***********
 * Structs *
 ***********/

/*
 * Create
 */
#[derive(Accounts)]
pub struct Create<'info> {
    // Calculator Account
    #[account(init, payer=user, space=264)]
    pub calculator: Account<'info, Calculator>,

    // User that is going to sign transactions
    #[account(mut)]
    pub user: Signer<'info>,

    // System Program
    pub system_program: Program<'info, System>,
}

/*
 * Calculator:
 *
 * This is the data that we would like to store in the Calculator account on the
 * blockchain.
 * Remember that in Solana, Programs are stateless and cannot persist data.
 * Therefore, they need Accounts (= "files")  to persist data on the blockchain
 * for them.
 */
#[account]
pub struct Calculator {
    pub greeting: String,
    pub result: i64,
    pub remainder: i64,
}
