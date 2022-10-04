import React from 'react';
import {Image, SimpleGrid} from "@chakra-ui/react";

export function SignInPrompt({gifList, onClick}) {
  return (
      <>
        <GifList gifList={gifList}/>
        <br/>
        <p style={{textAlign: 'center'}}>
          <button onClick={onClick}>Sign in with NEAR Wallet</button>
        </p>
      </>
  );
}

export function SignOutButton({accountId, onClick}) {
  return (
      <button style={{float: 'right'}} onClick={onClick}>
        Sign out {accountId}
      </button>
  );
}

export function GifList({gifList}) {
  return (
      <SimpleGrid columns={[2, null, 3]} spacing='40px'>
        {gifList.map((gif) => (
            <Image key={gif.gif_id} src={gif.gif_link} alt="GIF Image"/>
        ))}
      </SimpleGrid>
  );
}
