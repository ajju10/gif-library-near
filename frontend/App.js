import 'regenerator-runtime/runtime';
import React from 'react';

import './assets/global.css';

import {EducationalText, SignInPrompt, SignOutButton} from './ui-components';

export default function App({isSignedIn, helloNEAR, wallet}) {
  const [valueFromBlockchain, setValueFromBlockchain] = React.useState('');

  const [uiPleaseWait, setUiPleaseWait] = React.useState(true);

  // Get blockchain state once on component load
  React.useEffect(() => {
    helloNEAR.getMessage()
        .then(setValueFromBlockchain)
        .catch(alert)
        .finally(() => {
          setUiPleaseWait(false);
        });
  }, []);

  /// If user not signed-in with wallet - show prompt
  if (!isSignedIn) {
    // Sign-in flow will reload the page later
    return <SignInPrompt greeting={valueFromBlockchain} onClick={() => wallet.signIn()}/>;
  }

  return (
      <>
        <SignOutButton accountId={wallet.accountId} onClick={() => wallet.signOut()}/>
        <main className={uiPleaseWait ? 'please-wait' : ''}>
          <h1>
            The contract says: <span className="greeting">{valueFromBlockchain}</span>
          </h1>
          <EducationalText/>
        </main>
      </>
  );
}
