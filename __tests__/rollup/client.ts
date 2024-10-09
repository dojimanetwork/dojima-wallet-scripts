import { ethers } from "ethers";
// import Web3 from "web3";

(async () => {
  const provider = new ethers.providers.WebSocketProvider(
    "ws://127.0.0.1:8548"
  );
  const wallet = ethers.Wallet.fromMnemonic(
    "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn"
  ).connect(provider);
  const balance = await wallet.getBalance();
  console.log("Local Balance : ", Number(balance));
  await provider.destroy();
})();

// `Funds Url :  ws://sequencer:8548
// Funds urls are :  {
//   _: [ 'send-l2' ],
//   ethamount: '100',
//   to: 'l2owner',
//   wait: true,
//   redisUrl: 'redis://redis:6379',
//   'redis-url': 'redis://redis:6379',
//   l1url: 'ws://geth:8546',
//   l2url: 'ws://sequencer:8548',
//   l3url: 'ws://l3node:3348',
//   validationNodeUrl: 'ws://validation_node:8549',
//   'validation-node-url': 'ws://validation_node:8549',
//   l2owner: '0x3f1Eae7D46d88F08fc2F8ed27FCb2AB183EB2d0E',
//   times: 1,
//   delay: 0,
//   threads: 1,
//   threadId: 0,
//   'thread-id': 0,
//   serial: false,
//   from: 'funnel',
//   '$0': 'index.js'
// }
// Provider :  WebSocketProvider {
//   _isProvider: true,
//   _events: [],
//   _emitted: { block: -2 },
//   disableCcipRead: false,
//   formatter: Formatter {
//     formats: {
//       transaction: [Object],
//       transactionRequest: [Object],
//       receiptLog: [Object],
//       receipt: [Object],
//       block: [Object],
//       blockWithTransactions: [Object],
//       filter: [Object],
//       filterLog: [Object]
//     }
//   },
//   anyNetwork: false,
//   _networkPromise: Promise { <pending> },
//   _maxInternalBlockNumber: -1024,
//   _lastBlockNumber: -2,
//   _maxFilterBlockRange: 10,
//   _pollingInterval: -1,
//   _fastQueryDate: 0,
//   connection: { url: 'ws://sequencer:8548' },
//   _nextId: 42,
//   _wsReady: false,
//   _websocket: WebSocket {
//     _events: [Object: null prototype] { open: [Function], message: [Function] },
//     _eventsCount: 2,
//     _maxListeners: undefined,
//     _binaryType: 'nodebuffer',
//     _closeCode: 1006,
//     _closeFrameReceived: false,
//     _closeFrameSent: false,
//     _closeMessage: '',
//     _closeTimer: null,
//     _extensions: {},
//     _protocol: '',
//     _readyState: 0,
//     _receiver: null,
//     _sender: null,
//     _socket: null,
//     _bufferedAmount: 0,
//     _isServer: false,
//     _redirects: 0,
//     _url: 'ws://sequencer:8548',
//     _req: ClientRequest {
//       _events: [Object: null prototype],
//       _eventsCount: 3,
//       _maxListeners: undefined,
//       outputData: [Array],
//       outputSize: 223,
//       writable: true,
//       destroyed: false,
//       _last: true,
//       chunkedEncoding: false,
//       shouldKeepAlive: true,
//       maxRequestsOnConnectionReached: false,
//       _defaultKeepAlive: true,
//       useChunkedEncodingByDefault: false,
//       sendDate: false,
//       _removedConnection: false,
//       _removedContLen: false,
//       _removedTE: false,
//       strictContentLength: false,
//       _contentLength: 0,
//       _hasBody: true,
//       _trailer: '',
//       finished: true,
//       _headerSent: true,
//       _closed: false,
//       socket: null,
//       _header: 'GET / HTTP/1.1\r\n' +
//         'Sec-WebSocket-Version: 13\r\n' +
//         'Sec-WebSocket-Key: 1N2ARSwA47HjxtfqLzIM1w==\r\n' +
//         'Connection: Upgrade\r\n' +
//         'Upgrade: websocket\r\n' +
//         'Sec-WebSocket-Extensions: permessage-deflate; client_max_window_bits\r\n' +
//         'Host: sequencer:8548\r\n' +
//         '\r\n',
//       _keepAliveTimeout: 0,
//       _onPendingData: [Function: nop],
//       agent: undefined,
//       socketPath: undefined,
//       method: 'GET',
//       maxHeaderSize: undefined,
//       insecureHTTPParser: undefined,
//       joinDuplicateHeaders: undefined,
//       path: '/',
//       _ended: false,
//       res: null,
//       aborted: false,
//       timeoutCb: null,
//       upgradeOrConnect: false,
//       parser: null,
//       maxHeadersCount: null,
//       reusedSocket: false,
//       host: 'sequencer',
//       protocol: 'http:',
//       [Symbol(kCapture)]: false,
//       [Symbol(kBytesWritten)]: 0,
//       [Symbol(kNeedDrain)]: false,
//       [Symbol(corked)]: 0,
//       [Symbol(kOutHeaders)]: [Object: null prototype],
//       [Symbol(errored)]: null,
//       [Symbol(kHighWaterMark)]: 16384,
//       [Symbol(kRejectNonStandardBodyWrites)]: false,
//       [Symbol(kUniqueHeaders)]: null
//     },
//     [Symbol(kCapture)]: false
//   },
//   _requests: {},
//   _subs: {},
//   _subIds: {},
//   _eventLoopCache: { detectNetwork: Promise { <pending> } },
//   _detectNetwork: Promise { <pending> }
// }`
