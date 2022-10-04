#!/bin/sh

echo ">> Checking contract"

rustup target add wasm32-unknown-unknown
cargo check --all --target wasm32-unknown-unknown --release
