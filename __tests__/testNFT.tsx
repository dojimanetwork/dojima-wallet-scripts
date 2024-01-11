// import {Network} from "../../src/core/client";
// import {BinanceBeaconClient} from "../../src/core/binance";
// import {AssetBNB, baseToAsset} from "@d11k-ts/utils";
import {ethers} from "ethers";
import axios from "axios";
// import IPFS from "ipfs-http-client"
// import {create} from "ipfs-http-client"

async function checkBinance() {
    // const phrase =
    //     "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";

    // const bnbClient = new BinanceBeaconClient({
    //     phrase,
    //     network: Network.Testnet,
    //     dojClientUrl: 'https://bnb-test.h4s.dojima.network'
    //     // dojClientUrl: 'http://localhost:26660'
    // });
    // const address = bnbClient.getAddress();
    // console.log("Address :: ", address);
    // const bal = await bnbClient.getBalance(
    //     'tbnb1a7h84x4zur6ewqaj6fym9hej8xljkzwe82vgsu', [AssetBNB]
    // );
    // const balance = (baseToAsset(bal[0].amount)).amount();
    // console.log("Balance :: ", balance.toNumber());
    // const inboundbal = await bnbClient.getBalance(
    //     'tbnb1nh4y3gqxsn7ymm9t45zwsz3h8p9tm7pezkgkh4', [AssetBNB]
    // );
    // const inboundbalance = (baseToAsset(inboundbal[0].amount)).amount();
    // console.log("Inbound Balance :: ", inboundbalance.toNumber());
    // // 149.999625

    const tokenData =await axios.get(`https://doj-bex-test.dojima.network/api?module=account&action=tokenlist&address=0x0577e1E35C4f30cA8379269B7Fd85cBCE7F084f4`);
    console.log("Data : ", tokenData)
    const provider = new ethers.providers.JsonRpcProvider('https://api-test.d11k.dojima.network:8545/');
    console.log("Provider : ", provider)
    // Replace 'YOUR_CONTRACT_ADDRESS' with the actual contract address
    const contractAddress = '0x735a121728e018e2dc962aa572b88407a8bb5d12';

    // Replace 'YOUR_WALLET_PRIVATE_KEY' with the private key of your wallet
    const walletPrivateKey = 'ae1d058b9c5713848e7ac4c1901fac9a737729a34c10c997991c861dd7705ac0';

    // Connect to your wallet
    const wallet = new ethers.Wallet(walletPrivateKey, provider);
    console.log("Wallet : ", wallet)
    // Load the NFT contract
    const nftContract = new ethers.Contract(contractAddress, ['function tokenURI(uint256 tokenId) public view returns (string)'], wallet);
    console.log("Nft contract : ", nftContract)
    // Specify the token ID you want to fetch metadata for
    const tokenId = 1; // Replace with the desired token ID

    // Call the tokenURI function to get the metadata URI
    const metadataURI = await nftContract.tokenURI(tokenId);
    console.log("Metadata URI : ", metadataURI)
    const uri = metadataURI.replace("ipfs://", "")
    console.log("URI : ", uri)
    // Fetch the metadata from the URI (usually an HTTP request)
    // const response = await fetch(metadataURI);
    // const response = await axios.get(metadataURI);
    // console.log("Response : ", response)
    // const metadata = await response.json();

    const data = await axios.get(`https://ipfs.io/ipfs/${uri}`)
    console.log(data.data)

    // try {
    //     const balance = await nftContract.balanceOf(wallet.address);
    //     console.log("Balance : ", balance)
    //     console.log("Balance to number : ", balance.toNumber())
    //     // for (let index = 1; index < balance.toNumber(); index++) {
    //     //     console.log("Index : ", index)
    //     //     const tokenId = await nftContract.tokenOfOwnerByIndex(wallet.address, index);
    //     //     console.log(`Token ID at index ${index}: ${tokenId.toString()}`);
    //     // }
    // } catch (error) {
    //     console.error('Error fetching token IDs:', error);
    // }

    // const ipfsUrl = `https://ipfs.io/ipfs/${data.data.image}`
    // const imgData = await axios.get(`https://ipfs.io/ipfs/${data.data.image}`)
    // console.log(typeof imgData.data)

    // axios.get(`https://ipfs.io/ipfs/${data.data.image}`, { responseType: 'blob' }).then((response) => {
    //     const reader = new FileReader();
    //     reader.onloadend = () => {
    //         console.log(reader.result as string);
    //     };
    //     reader.readAsDataURL(response.data);
    // })

    // fetch(ipfsUrl)
    //     .then((response) => {
    //         if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //         }
    //         return response.blob();
    //     })
    //     .then((blob) => {
    //         // Create an object URL for the image data
    //         const objectUrl = URL.createObjectURL(blob);
    //         console.log(objectUrl);
    //     })
    //     .catch((error) => {
    //         console.error('Error fetching image:', error);
    //     });

    // fetch(ipfsUrl)
    //     .then((response) => {
    //         if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //         }
    //         return response.buffer(); // Use .buffer() instead of .blob() in Node.js
    //     })
    //     .then((buffer) => {
    //         // Create a data URL for the image data
    //         const dataUrl = `data:image/jpeg;base64,${buffer.toString('base64')}`;
    //         setImageUrl(dataUrl);
    //     })
    //     .catch((error) => {
    //         console.error('Error fetching image:', error);
    //     });

    // return () => {
    //     // Clean up the object URL when the component unmounts
    //     if (imageUrl) {
    //         URL.revokeObjectURL(imageUrl);
    //     }
    // };

    // const customRpcEndpoint = 'https://api-test.d11k.dojima.network:8545/';
    // // const ipfsGateway = 'https://ipfs.io/ipfs/'; // A public IPFS gateway
    //
    // // Create an IPFS client instance
    // const ipfs = IPFS({ host: 'localhost', port: '5001', protocol: 'http' });
    //
    // try {
    //     // Fetch the metadata URI from your custom RPC endpoint
    //     const { data } = await axios.get(customRpcEndpoint, {
    //         params: {
    //             uri: metadataURI,
    //         },
    //     });
    //
    //     // Assuming the response contains the IPFS CID as 'cid'
    //     const ipfsCID = data.cid;
    //
    //     // Fetch the metadata from IPFS using the CID
    //     const metadataBuffer = await ipfs.cat(ipfsCID);
    //
    //     // Convert the metadata buffer to a string
    //     const metadata = metadataBuffer.toString('utf-8');
    //
    //     console.log('NFT Metadata:', metadata);
    // } catch (error) {
    //     console.error('Error fetching NFT metadata:', error);
    // }

//     const ipfs = create({url:'https://ipfs.infura.io:5001'});
//
//     const metadata = { name: 'My NFT', description: 'This is an example NFT' };
//     const metadataBuffer = Buffer.from(JSON.stringify(metadata));
//     const { cid } = await ipfs.add(metadataBuffer);
//
//     console.log("CID : ", cid)
//
// // Retrieve NFT metadata from IPFS
//     const retrievedMetadataBuffer = await ipfs.cat(cid.toString());
//     const retrievedMetadata = JSON.parse(retrievedMetadataBuffer.toString());
//     console.log(retrievedMetadata);

    // const { create } = await import('ipfs-http-client');
    // const ipfs = create()
    // const source = ipfs.cat(metadataURI.replace("ipfs://", ""))
    // console.log("Source : ", source)
    // let contents = ''
    // const decoder = new TextDecoder('utf-8')
    //
    // for await (const chunk of source) {
    //     contents += decoder.decode(chunk, {
    //         stream: true
    //     })
    // }
    // contents += decoder.decode()
    // // console.log("Contents : ", contents)
    // const metadataJSON = JSON.parse(contents);
    // // const bufferedQuery = await toBuffer(ipfs.cat(metadataURI.replace("ipfs://", "")));
    // // const metadataJSON = JSON.parse(bufferedQuery);
    // console.log(`IPFS metadata based on metadata CID ${metadataURI}: `);
    // console.log(metadataJSON);
    // for (let i = 0; i < imagesSummary.length; i++) {
    //     // if (imagesSummary[i].metadataURI == metadataURI) {
    //     if (imagesSummary[i].metadataURI === metadataURI) {
    //         imagesSummary[i].metadataJSON = metadataJSON;
    //     }
    // }

    // console.log(metadata);

    const nftContract1 = new ethers.Contract(contractAddress, ['function balanceOf(address owner) public view returns (uint256)', 'function tokenOfOwnerByIndex(address owner, uint256 index) public view returns (uint256)', 'function tokenURI(uint256 tokenId) public view returns (string)'], wallet);

    try {
        const balance = await nftContract1.balanceOf(wallet.address);
        console.log("Balance : ", balance)
        console.log("Balance to number : ", balance.toNumber())
        for (let index = 1; index <= balance.toNumber(); index++) {
            console.log("Index : ", index)
            const tokenUri = await nftContract1.tokenURI(index);
            console.log("Token uri : ", tokenUri)
            // const tokenId = await nftContract1.tokenOfOwnerByIndex(wallet.address, index);
            // console.log(`Token ID at index ${index}: ${tokenId.toString()}`);
        }
    } catch (error) {
        console.error('Error fetching token IDs:', error);
    }
}

(async () => {
    await checkBinance();
})();