import React from 'react';

export function SignInPrompt({gifCount, gifList, onClick}) {
  return (
      <main>
        <h1>Total GIFs: {gifCount}</h1>
        <ShowGifs gifList={gifList}/>
        <br/>
        <p style={{textAlign: 'center'}}>
          <button onClick={onClick}>Sign in with NEAR Wallet</button>
        </p>
      </main>
  );
}

export function SignOutButton({accountId, onClick}) {
  return (
      <button style={{float: 'right'}} onClick={onClick}>
        Sign out {accountId}
      </button>
  );
}

export function ShowGifs({gifList}) {
  return (
      <>
        <div className="gif-grid">
          {gifList.map((item, index) => (
              <div className="gif-item" key={index}>
                <img src={item.gif_link} alt="GIF Image"/>
              </div>
          ))}
        </div>
      </>
  );
}
