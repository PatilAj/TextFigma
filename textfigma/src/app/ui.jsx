import React, {useEffect, useState} from 'react';
import styles from './ui.module.scss';

import Button from './components/Button';
const UI = ({}) => {
  const [socket, setSocket] = useState (null);
  const [msg, setmsg] = useState ();
  const onChange = () => {
    sendmessage (msg);
  };
  const onchange = () => {
    const textinput = document.getElementById ('text-input');
    const newtext = textinput.value;
    parent.postMessage (
      {
        pluginMessage: {
          type: 'changetext',
          inputtext: newtext,
        },
      },
      '*'
    );
  };
  useEffect (() => {
    const newSocket = new WebSocket ('ws://localhost:3000');
    setmsg ('requested to change');
    newSocket.addEventListener ('open', _event => {
      console.log ('WebSocket connection opened.');
    });

    newSocket.addEventListener ('message', async event => {
      console.log (`Received message: ${await event.data.text ()}`);
      onchange ();
    });

    newSocket.addEventListener ('close', _event => {
      console.log ('WebSocket connection closed.');
    });

    newSocket.addEventListener ('error', event => {
      console.error ('WebSocket error:', event);
    });

    setSocket (newSocket);
    return () => {
      newSocket.close ();
    };
  }, []);
  const sendmessage = message => {
    if (socket) {
      socket.send (message);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Replace Text</h2>
      <div>
        <input id="text-input" type="text" />
        <Button onClick={onChange}>Change Text</Button>
      </div>
    </div>
  );
};

export default UI;
