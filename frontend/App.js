import 'regenerator-runtime/runtime';
import React from 'react';

import './assets/global.css';

import {ShowGifs, SignInPrompt, SignOutButton} from './ui-components';

export default function App({isSignedIn, gifCollection, wallet}) {
  const [uiPleaseWait, setUiPleaseWait] = React.useState(true);
  const [inputValue, setInputValue] = React.useState('');
  const [gifList, setGifList] = React.useState([]);
  const [gifCount, setGifCount] = React.useState(0);

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
    console.log('Gif link:', inputValue);
    gifCollection.addGif(inputValue)
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
    return <SignInPrompt gifCount={gifCount} gifList={gifList} onClick={() => wallet.signIn()}/>;
  }

  return (
      <>
        <SignOutButton accountId={wallet.accountId} onClick={() => wallet.signOut()}/>
        <main className={uiPleaseWait ? 'please-wait' : ''}>
          <div className="add-gif-form">
            <form onSubmit={(event) => {
              event.preventDefault();
              sendGifToNear();
            }}>
              <input type="text" placeholder="Enter GIF Link"
                     value={inputValue} onChange={onInputChange}/>
              <button type="submit">Add to Library</button>
            </form>
          </div>
          <h3>Total GIFs: {gifCount}</h3>
          <ShowGifs gifList={gifList}/>
        </main>
      </>
  );
}
