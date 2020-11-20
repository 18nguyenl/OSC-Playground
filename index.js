import { Server, Client, Message } from 'node-osc';

const client = new Client('192.168.1.24', 8000);
var oscServer = new Server(3333, '0.0.0.0', () => {
  console.log('OSC Server is listening');
});

oscServer.on('message', function (msg) {
  console.log(msg);
  switch (msg[0]) {
    case '/1/fader1':
      
      break;
    case '/1/fader4':
      client.send('/Slide/loopCount', msg[1] * 20, (err) => {
        if (err) {
          console.log(err);
        }
      })
      break;
    case '/3/xy':
      client.send('/Slide/base', msg[0], msg[1], 1, 1)
    case '/1/toggle4':
      if (msg[1] === 1)
        client.send('/Slide/base', 0, 1, 0, 1) 
      else if (msg[1] === 0)
        client.send('/Slide/base', 1, 1, 0, 1);
  }

  // oscServer.close();
});
