export default {
  addFile: async (ipfsClient, file) => {
    try {
      const added = await ipfsClient.add(
        file,
        {
          progress: (prog) => console.log(`received: ${prog}`)
        }
      )
      return `https://ipfs.infura.io/ipfs/${added.path}`
    } catch (error) {
      console.log('Error uploading file: ', error)
    }
  },
  uploadToIPFS: async (ipfsClient, name, description, price, url) => {
    if (!name || !description || !price || !url) return
    
    /* first, upload metadata to IPFS */
    const data = JSON.stringify({
      name: name, description: description, image: url
    })
    try {
      const added = await ipfsClient.add(data)
      return `https://ipfs.infura.io/ipfs/${added.path}`
    } catch (error) {
      console.log('Error uploading file: ', error)
    }
  } 
}