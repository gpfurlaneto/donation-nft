import Nullstack from 'nullstack';
import Application from './src/Application';
import { create as ipfsHttpClient } from 'ipfs-http-client';

const context = Nullstack.start(Application);

context.start = async function start() {
  // https://nullstack.app/application-startup
  const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')
  context.ipfsClient = client;
}

export default context;