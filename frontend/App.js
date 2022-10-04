import 'regenerator-runtime/runtime';
import React from 'react';
import {nanoid} from 'nanoid';

import './assets/global.css';

import {GifList, SignInPrompt, SignOutButton} from './ui-components';
import {Button, Center, Input, VStack} from "@chakra-ui/react";

export default function App({isSignedIn, gifCollection, wallet}) {
  const [_uiPleaseWait, setUiPleaseWait] = React.useState(true);
  const [inputValue, setInputValue] = React.useState('');
  const [gifList, setGifList] = React.useState([]);
  const [_gifCount, setGifCount] = React.useState(0);

  const getGifCount = async () => {
    gifCollection.getGifCount()
        .then(setGifCount)
        .catch((err) => {
          alert(err);
          console.log(err)
        })
  };

  const getGifList = async () => {
    gifCollection.getGifs()
        .then((res) => {
          console.log("GIF List", res);
          setGifList(res);
        })
        .catch((error) => {
          alert(error);
          console.log(error);
        })
        .finally(async () => {
          await getGifCount();
        });
  };

  const sendGifToNear = async () => {
    if (inputValue.length === 0) {
      console.log("No gif link given!");
      return;
    }
    setInputValue('');
    let gifId = nanoid();
    console.log('Gif link:', inputValue, "Gif ID", gifId);
    gifCollection.addGif(inputValue, gifId)
        .then(async () => {
          await getGifList();
        })
        .catch((error) => {
          alert(error);
          console.log(error);
        })
  };

  const onInputChange = (event) => {
    const {value} = event.target;
    setInputValue(value);
  };

  React.useEffect(() => {
    getGifList()
        .finally(() => {
          setUiPleaseWait(false);
        })
  }, []);

  /// If user not signed-in with wallet - show prompt
  if (!isSignedIn) {
    // Sign-in flow will reload the page later
    return <SignInPrompt gifList={gifList} onClick={() => wallet.signIn()}/>;
  }

  return (
      <>
        <SignOutButton accountId={wallet.accountId} onClick={() => wallet.signOut()}/>
        <Center>
          <form onSubmit={(event) => {
            event.preventDefault();
            sendGifToNear();
          }}>
            <VStack>
              <Input
                  value={inputValue}
                  onChange={onInputChange}
                  placeholder='Enter GIF Link'/>
              <Button colorScheme='teal'>Add GIF</Button>
            </VStack>
          </form>
        </Center>
        <br/>
        <div className="gif-list-container">
          <GifList gifList={gifList}/>
        </div>
      </>
  );
}
