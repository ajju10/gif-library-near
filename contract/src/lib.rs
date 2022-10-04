use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::env;
use near_sdk::serde::{Deserialize, Serialize};
use near_sdk::{log, near_bindgen, AccountId};

#[derive(Clone, Debug, BorshDeserialize, BorshSerialize, Serialize, Deserialize)]
#[serde(crate = "near_sdk::serde")]
pub struct GifItem {
    gif_link: String,
    gif_id: String,
    owner: AccountId,
}

impl GifItem {
    fn new(link: String, gif_id: String) -> Self {
        Self {
            gif_link: link,
            gif_id,
            owner: env::signer_account_id(),
        }
    }
}

#[near_bindgen]
#[derive(Default, BorshDeserialize, BorshSerialize)]
pub struct GifCollections {
    gif_count: u64,
    gifs: Vec<GifItem>,
}

#[near_bindgen]
impl GifCollections {
    pub fn add_gif(&mut self, link: String, gif_id: String) {
        let item = GifItem::new(link, gif_id);
        self.gifs.push(item);
        self.gif_count += 1;
        log!("{:?} added a new GIF to NEAR", env::signer_account_id());
    }

    pub fn get_gif_count(&self) -> u64 {
        self.gif_count
    }

    pub fn get_gifs(&self) -> Vec<GifItem> {
        self.gifs.to_vec()
    }

    pub fn remove_all_gifs(&mut self) {
        self.gifs.clear();
        self.gif_count = 0;
        log!("Successfully reset the gif library")
    }
}

 /*
 * This part contains the unit tests for smart contracts
 */
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn get_default_gif_collection() {
        let mut contract = GifCollections::default();
        assert_eq!(contract.gif_count, 0);
        assert!(contract.gifs.is_empty());

        contract.add_gif("Hello".to_string(), "abc".to_string());
        assert_eq!(contract.gif_count, 1);
        assert_eq!(contract.gifs[0].gif_link, "Hello".to_string());
        assert_eq!(contract.gifs[0].gif_id, "abc".to_string());
        assert_eq!(contract.gifs[0].owner, env::signer_account_id());
    }
}
