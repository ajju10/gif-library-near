#!/bin/sh

./build.sh

if [ $? -ne 0 ]; then
  echo ">> Error building contract"
  exit 1
fi

echo ">> Deploying Contract 'gif-library.ajju0.testnet' To NEAR TestNet"

near deploy --accountId gif-library.ajju0.testnet -v -f --wasmFile ./target/wasm32-unknown-unknown/release/hello_near.wasm
