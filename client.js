import Nullstack from 'nullstack';
import Application from './src/Application';
import { create as ipfsHttpClient } from 'ipfs-http-client';
import NFTManager from './src/lib/NFTManager';

const context = Nullstack.start(Application);

context.start = async function start() {
  // https://nullstack.app/application-startup
  const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')
  context.ipfsClient = client;
  context.wallet = {};
  context._wallet = {}
  context._allNFTs = {};

  if (NFTManager.isConnected()) {
    context._wallet = await NFTManager.connectWallet(context);
  }
  context._allNFTs = await NFTManager.fetchAllNFTs();
}

export default context;