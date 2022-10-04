#!/bin/sh

echo ">> Checking contract"

rustup target add wasm32-unknown-unknown

echo ">> Formatting crate" && cargo fmt

echo ">> Running clippy" && cargo clippy --all --target wasm32-unknown-unknown --release
