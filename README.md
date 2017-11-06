# blockexplorer
<div align="center">

  [![npm version](https://badge.fury.io/js/blockexplorer.svg)](https://badge.fury.io/js/blockexplorer)
  [![Build Status](https://travis-ci.org/barto-/blockexplorer.svg?branch=master)](https://travis-ci.org/barto-/blockexplorer)
  [![Coverage Status](https://coveralls.io/repos/github/barto-/blockexplorer/badge.svg?branch=master)](https://coveralls.io/github/barto-/blockexplorer?branch=master)
  [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
</div>
<br />

Unofficial Node.js client for blockexplorer.com API

## Install

`npm i blockexplorer --save`

## Example

```js
// require the module
const be = require('blockexplorer')

// get the genesis block hash
be.blockIndex(0)
  .then((result) => {
    console.log(result)
  })
  .catch((err) => {
    throw err
  })
```

## Test

`npm test`

## API

### blockexplorer.block(hash)
Get block info by `hash`
* Returns `Promise`

### blockexplorer.rawBlock(hash)
Get raw block info by `hash`
* Returns `Promise`

### blockexplorer.blockIndex(height)
Get block hash by `height`
* Returns `Promise`

### blockexplorer.tx(txid)
Get transaction by `txid`
* Returns `Promise`

### blockexplorer.rawTx(txid)
Get raw transaction by `txid`
* Returns `Promise`

### blockexplorer.addrValidate(address)
Validate `address`
* Returns `Promise`

### blockexplorer.addr(address, [options])
Get `address` info
```js
// Default options
{
  noTxList: false,
  noCache: false
}
```
* Pass an `Array` as first parameter to get info on multiple addresses
* Returns `Promise`

### blockexplorer.balance(address)
Get `address` balance
* Returns a `Promise`

### blockexplorer.totalReceived(address)
Get `address` received funds
* Returns a `Promise`

### blockexplorer.totalSent(address)
Get `address` sent funds
* Returns a `Promise`

### blockexplorer.unconfirmedBalance(address)
Get `address` unconfirmed balance
* Returns a `Promise`

### blockexplorer.utxo(address, [options])
Get `address` unspent outputs
```js
// Default options
{
  noCache: false
}
```
* Pass an `Array` as first parameter to get info on multiple addresses
* Returns a `Promise`

### blockexplorer.txsBlock(hash)
Get transactions by `hash`
* Returns a `Promise`

### blockexplorer.txsAddress(address, [options])
Get transactions by `address`
```js
// Default options
{
  from: '',
  to: ''
}
```
* Pass an `Array` as first parameter to get info on multiple addresses
* Returns a `Promise`

### blockexplorer.txSend(rawtx)
Broadcast signed trasaction in hex format `rawtx`
* Returns a `Promise`

### blockexplorer.getInfo()
Get blockchain info
* Returns a `Promise`

### blockexplorer.getBlockCount()
Get block count
* Returns a `Promise`

### blockexplorer.getDifficulty()
Get difficulty
* Returns a `Promise`

### blockexplorer.getBestBlockHash()
Get best block hash
* Returns a `Promise`

### blockexplorer.getLastBlockHash()
Get last block hash
* Returns a `Promise`

### blockexplorer.sync()
Get historic blockchain data sync status
* Returns a `Promise`

### blockexplorer.peer()
Get live network p2p data sync status
* Returns a `Promise`

### blockexplorer.estimateFee([nbBlocks = 2])
Get fee estimate
* Returns a `Promise`

-------
For additional information see [blockexplorer.com API reference](https://blockexplorer.com/api-ref)

## Contributing

Just send a PR

## License

Licensed under [MIT](https://github.com/barto-/blockexplorer/blob/master/LICENSE)

The author is not affiliated in any way with blockexplorer.com