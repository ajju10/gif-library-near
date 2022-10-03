import 'regenerator-runtime/runtime';
import React from 'react';

import './assets/global.css';

import {ShowGifs, SignInPrompt, SignOutButton} from './ui-components';

const gifs = [
  'https://i.giphy.com/media/eIG0HfouRQJQr1wBzz/giphy.webp',
  'https://media3.giphy.com/media/L71a8LW2UrKwPaWNYM/giphy.gif?cid=ecf05e47rr9qizx2msjucl1xyvuu47d7kf25tqt2lvo024uo&rid=giphy.gif&ct=g',
  'https://media4.giphy.com/media/AeFmQjHMtEySooOc8K/giphy.gif?cid=ecf05e47qdzhdma2y3ugn32lkgi972z9mpfzocjj6z1ro4ec&rid=giphy.gif&ct=g',
  'https://i.giphy.com/media/PAqjdPkJLDsmBRSYUp/giphy.webp',
]

export default function App({isSignedIn, gifCollection, wallet}) {
  const greeting = 'Hello';
  const [uiPleaseWait, setUiPleaseWait] = React.useState(true);

  React.useEffect(() => {
    gifCollection.getGifCount()
        .then((count) => {
          console.log("Gif Count is", count);
        })
        .catch((err) => {
          alert(err);
          console.log(err)
        })
        .finally(() => {
          setUiPleaseWait(false);
        })
  }, []);

  /// If user not signed-in with wallet - show prompt
  if (!isSignedIn) {
    // Sign-in flow will reload the page later
    return <SignInPrompt greeting={greeting} onClick={() => wallet.signIn()}/>;
  }

  return (
      <>
        <SignOutButton accountId={wallet.accountId} onClick={() => wallet.signOut()}/>
        <main className={uiPleaseWait ? 'please-wait' : ''}>
          <h1>
            The contract says: <span className="greeting">{greeting}</span>
          </h1>
          <ShowGifs gifList={gifs}/>
        </main>
      </>
  );
}
