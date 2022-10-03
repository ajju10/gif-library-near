use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{log, near_bindgen};

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct HelloContract {
    message: String,
}

impl Default for HelloContract {
    fn default() -> Self {
        Self { message: "This is default hello message from NEAR".to_string() }
    }
}

#[near_bindgen]
impl HelloContract {
    pub fn get_message(&self) -> String {
        log!("get_message rpc call made");
        self.message.clone()
    }
}

/*
 * This part contains the unit tests for smart contracts
 */
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn get_default_message() {
        let contract = HelloContract::default();
        assert_eq!(contract.get_message(),
                   "This is default hello message from NEAR".to_string())
    }
}
