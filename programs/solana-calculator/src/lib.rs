use anchor_lang::prelude::*;

declare_id!("AyWDkUYKAx8SWdwiLywcvTXD7We7ZkDiC6PLc7pGUHtT");

#[program]
pub mod solana_calculator {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
