/* eslint-env mocha */
'use strict'

const expect = require('chai').expect
/* eslint-disable no-unused-vars */
const nock = require('nock')
/* eslint-disable no-unused-vars */
const url = require('url')

describe('#blockexplorer', function () {
  const be = require('../blockexplorer')
  var scope = nock(be.host)
    .persist()
    .get('/api/block/0000000000000000079c58e8b5bce4217f7515a74b170049398ed9b8428beb4a').reply(200, 'block')
    .get('/api/rawblock/0000000000000000079c58e8b5bce4217f7515a74b170049398ed9b8428beb4a').reply(200, 'rawBlock')
    .get('/api/block-index/0').reply(200, 'blockIndex')
    .get('/api/tx/5756ff16e2b9f881cd15b8a7e478b4899965f87f553b6210d0f8e5bf5be7df1d').reply(200, 'tx')
    .get('/api/rawtx/5756ff16e2b9f881cd15b8a7e478b4899965f87f553b6210d0f8e5bf5be7df1d').reply(200, 'rawTx')
    .get('/api/addr-validate/19SokJG7fgk8iTjemJ2obfMj14FM16nqzj').reply(200, 'addrValidate')
    .get('/api/addr/19SokJG7fgk8iTjemJ2obfMj14FM16nqzj').query({noTxList: '0', noCache: '0'}).reply(200, 'addr')
    .get('/api/addr/19SokJG7fgk8iTjemJ2obfMj14FM16nqzj').query({noTxList: '1', noCache: '1'}).reply(200, 'addr opts')
    .get('/api/addr/19SokJG7fgk8iTjemJ2obfMj14FM16nqzj/balance').reply(200, 'balance')
    .get('/api/addr/19SokJG7fgk8iTjemJ2obfMj14FM16nqzj/totalReceived').reply(200, 'totalReceived')
    .get('/api/addr/19SokJG7fgk8iTjemJ2obfMj14FM16nqzj/totalSent').reply(200, 'totalSent')
    .get('/api/addr/19SokJG7fgk8iTjemJ2obfMj14FM16nqzj/unconfirmedBalance').reply(200, 'unconfirmedBalance')
    .get('/api/addr/n2PuaAguxZqLddRbTnAoAuwKYgN2w2hZk7/utxo').query({noCache: '0'}).reply(200, 'utxo')
    .get('/api/addr/n2PuaAguxZqLddRbTnAoAuwKYgN2w2hZk7/utxo').query({noCache: '1'}).reply(200, 'utxo opts')
    .get('/api/addrs/2NF2baYuJAkCKo5onjUKEPdARQkZ6SYyKd5,2NAre8sX2povnjy4aeiHKeEh97Qhn97tB1f/utxo').reply(200, 'utxo multi')
    .get('/api/txs/').query({block: '00000000fa6cf7367e50ad14eb0ca4737131f256fc4c5841fd3c3f140140e6b6'}).reply(200, 'txsBlock')
    .get('/api/txs/').query({address: 'mmhmMNfBiZZ37g1tgg2t8DDbNoEdqKVxAL'}).reply(200, 'txsAddress')
    .get('/api/addrs/2NF2baYuJAkCKo5onjUKEPdARQkZ6SYyKd5,2NAre8sX2povnjy4aeiHKeEh97Qhn97tB1f/txs').query({from: '', to: ''}).reply(200, 'txsAddress multi')
    .get('/api/addrs/2NF2baYuJAkCKo5onjUKEPdARQkZ6SYyKd5,2NAre8sX2povnjy4aeiHKeEh97Qhn97tB1f/txs').query({from: '0', to: '1'}).reply(200, 'txsAddress multi opts')
    .post('/api/tx/send', {rawtx: '01000000017b1eabe0209b1fe794124575ef807057c77ada2138ae4fa8d6c4de0398a14f3f00000000494830450221008949f0cb400094ad2b5eb399d59d01c14d73d8fe6e96df1a7150deb388ab8935022079656090d7f6bac4c9a94e0aad311a4268e082a725f8aeae0573fb12ff866a5f01ffffffff01f0ca052a010000001976a914cbc20a7664f2f69e5355aa427045bc15e7c6c77288ac00000000'}).reply(200, 'txSend')
    .get('/api/status').query(function (query) {
      if (query.hasOwnProperty('q') === false) {
        return false
      }

      switch (query.q) {
        case 'getInfo':
        case 'getBlockCount':
        case 'getDifficulty':
        case 'getBestBlockHash':
        case 'getLastBlockHash':
          return true
        default:
          return false
      }
    }).reply(200, function (uri, requestBody) {
      let parsedUri = url.parse(uri, true)
      return parsedUri.query.q
    })
    .get('/api/sync').reply(200, 'sync')
    .get('/api/peer').reply(200, 'peer')
    .get('/api/utils/estimatefee').query({nbBlocks: '2'}).reply(200, 'estimateFee')
    .get('/api/utils/estimatefee').query({nbBlocks: '4'}).reply(200, 'estimateFee opts')

  function unknown () {
    return 'unknown'
  }

  it('should generate the correct endpoint for block API', function () {
    return be.block('0000000000000000079c58e8b5bce4217f7515a74b170049398ed9b8428beb4a').then(function (response) {
      expect(response).to.be.equal('block')
    })
  })

  it('should generate the correct endpoint for rawBlock API', function () {
    return be.rawBlock('0000000000000000079c58e8b5bce4217f7515a74b170049398ed9b8428beb4a').then(function (response) {
      expect(response).to.be.equal('rawBlock')
    })
  })

  it('should generate the correct endpoint for blockIndex API', function () {
    return be.blockIndex(0).then(function (response) {
      expect(response).to.be.equal('blockIndex')
    })
  })

  it('should generate the correct endpoint for tx API', function () {
    return be.tx('5756ff16e2b9f881cd15b8a7e478b4899965f87f553b6210d0f8e5bf5be7df1d').then(function (response) {
      expect(response).to.be.equal('tx')
    })
  })

  it('should generate the correct endpoint for rawTx API', function () {
    return be.rawTx('5756ff16e2b9f881cd15b8a7e478b4899965f87f553b6210d0f8e5bf5be7df1d').then(function (response) {
      expect(response).to.be.equal('rawTx')
    })
  })

  it('should generate the correct endpoint for addrValidate API', function () {
    return be.addrValidate('19SokJG7fgk8iTjemJ2obfMj14FM16nqzj').then(function (response) {
      expect(response).to.be.equal('addrValidate')
    })
  })

  it('should generate the correct endpoint for addr API', function () {
    return be.addr('19SokJG7fgk8iTjemJ2obfMj14FM16nqzj').then(function (response) {
      expect(response).to.be.equal('addr')
    })
  })

  it('should generate the correct endpoint for addr API, with options', function () {
    return be.addr('19SokJG7fgk8iTjemJ2obfMj14FM16nqzj', {noTxList: true, noCache: true}).then(function (response) {
      expect(response).to.be.equal('addr opts')
    })
  })

  it('should generate the correct endpoint for balance API', function () {
    return be.balance('19SokJG7fgk8iTjemJ2obfMj14FM16nqzj').then(function (response) {
      expect(response).to.be.equal('balance')
    })
  })

  it('should generate the correct endpoint for totalReceived API', function () {
    return be.totalReceived('19SokJG7fgk8iTjemJ2obfMj14FM16nqzj').then(function (response) {
      expect(response).to.be.equal('totalReceived')
    })
  })

  it('should generate the correct endpoint for totalSent API', function () {
    return be.totalSent('19SokJG7fgk8iTjemJ2obfMj14FM16nqzj').then(function (response) {
      expect(response).to.be.equal('totalSent')
    })
  })

  it('should generate the correct endpoint for unconfirmedBalance API', function () {
    return be.unconfirmedBalance('19SokJG7fgk8iTjemJ2obfMj14FM16nqzj').then(function (response) {
      expect(response).to.be.equal('unconfirmedBalance')
    })
  })

  it('should generate the correct endpoint for utxo API', function () {
    return be.utxo('n2PuaAguxZqLddRbTnAoAuwKYgN2w2hZk7').then(function (response) {
      expect(response).to.be.equal('utxo')
    })
  })

  it('should generate the correct endpoint for utxo API, with options', function () {
    return be.utxo('n2PuaAguxZqLddRbTnAoAuwKYgN2w2hZk7', {noCache: true}).then(function (response) {
      expect(response).to.be.equal('utxo opts')
    })
  })

  it('should generate the correct endpoint for utxo API, with multiple addresses', function () {
    return be.utxo(['2NF2baYuJAkCKo5onjUKEPdARQkZ6SYyKd5', '2NAre8sX2povnjy4aeiHKeEh97Qhn97tB1f']).then(function (response) {
      expect(response).to.be.equal('utxo multi')
    })
  })

  it('should generate the correct endpoint for txsBlock API', function () {
    return be.txsBlock('00000000fa6cf7367e50ad14eb0ca4737131f256fc4c5841fd3c3f140140e6b6').then(function (response) {
      expect(response).to.be.equal('txsBlock')
    })
  })

  it('should generate the correct endpoint for txsAddress API', function () {
    return be.txsAddress('mmhmMNfBiZZ37g1tgg2t8DDbNoEdqKVxAL').then(function (response) {
      expect(response).to.be.equal('txsAddress')
    })
  })

  it('should generate the correct endpoint for txsAddress API, with multiple addresses', function () {
    return be.txsAddress(['2NF2baYuJAkCKo5onjUKEPdARQkZ6SYyKd5', '2NAre8sX2povnjy4aeiHKeEh97Qhn97tB1f']).then(function (response) {
      expect(response).to.be.equal('txsAddress multi')
    })
  })

  it('should generate the correct endpoint for txsAddress API, with multiple addresses, with options', function () {
    return be.txsAddress(['2NF2baYuJAkCKo5onjUKEPdARQkZ6SYyKd5', '2NAre8sX2povnjy4aeiHKeEh97Qhn97tB1f'], {from: 0, to: 1}).then(function (response) {
      expect(response).to.be.equal('txsAddress multi opts')
    })
  })

  it('should generate the correct endpoint for txSend API', function () {
    return be.txSend('01000000017b1eabe0209b1fe794124575ef807057c77ada2138ae4fa8d6c4de0398a14f3f00000000494830450221008949f0cb400094ad2b5eb399d59d01c14d73d8fe6e96df1a7150deb388ab8935022079656090d7f6bac4c9a94e0aad311a4268e082a725f8aeae0573fb12ff866a5f01ffffffff01f0ca052a010000001976a914cbc20a7664f2f69e5355aa427045bc15e7c6c77288ac00000000').then(function (response) {
      expect(response).to.be.equal('txSend')
    })
  })

  it('should generate the correct endpoint for getInfo API', function () {
    return be.getInfo().then(function (response) {
      expect(response).to.be.equal('getInfo')
    })
  })

  it('should generate the correct endpoint for getBlockCount API', function () {
    return be.getBlockCount().then(function (response) {
      expect(response).to.be.equal('getBlockCount')
    })
  })

  it('should generate the correct endpoint for getDifficulty API', function () {
    return be.getDifficulty().then(function (response) {
      expect(response).to.be.equal('getDifficulty')
    })
  })

  it('should generate the correct endpoint for getBestBlockHash API', function () {
    return be.getBestBlockHash().then(function (response) {
      expect(response).to.be.equal('getBestBlockHash')
    })
  })

  it('should generate the correct endpoint for getLastBlockHash API', function () {
    return be.getLastBlockHash().then(function (response) {
      expect(response).to.be.equal('getLastBlockHash')
    })
  })

  it('should generate the correct endpoint for sync API', function () {
    return be.sync().then(function (response) {
      expect(response).to.be.equal('sync')
    })
  })

  it('should generate the correct endpoint for peer API', function () {
    return be.peer().then(function (response) {
      expect(response).to.be.equal('peer')
    })
  })

  it('should generate the correct endpoint for estimateFee API', function () {
    return be.estimateFee().then(function (response) {
      expect(response).to.be.equal('estimateFee')
    })
  })

  it('should generate the correct endpoint for estimateFee API, with options', function () {
    return be.estimateFee(4).then(function (response) {
      expect(response).to.be.equal('estimateFee opts')
    })
  })
})
