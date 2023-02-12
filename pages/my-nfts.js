import { useContext, useEffect, useState } from 'react';
import Image from 'next/image';

import { Loader, NFTCard, Banner } from '../components';
import { NFTContext } from '../context/NFTContext';

import images from '../assets';
import { shortenAddress } from '../utils';

const MyNFT = () => {
  const { fetchMyNFTsOrListedNFTs, currentAccount } = useContext(NFTContext);
  const [nfts, setNfts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  if (isLoading) {
    return (
      <div className="flexStart min-h-screen">
        <Loader />
      </div>
    );
  }

  useEffect(() => {
    fetchMyNFTsOrListedNFTs()
      .then((items) => {
        setNfts(items);
        setIsLoading(false);
      });
  }, []);
  // if (!isLoading && nfts.length === 0) {
  //   return (
  //     <div className="flexCenter sm:p-4 p-16 min-h-screen">
  //       <h1 className="font-poppins dark:text-white text-nft-black-1 text-3xl font-extrabold">No NFTs listed for Sale</h1>
  //     </div>
  //   );
  // }

  return (
    <div className="w-full flex justify-start items-center flex-col min-h-screen">
      <div className="w-full flexCenter flex-col">
        <Banner
          name="Your NFTs"
          childStyles="text-center mb-4"
          parentStyles="h-80 justify-center"
        />
        <div className="flexCenter flex-col -mt-20 z-0">
          <div className="flexCenter w-40 h-40 sm:w-36 sm:h-36 p-1 bg-nft-dark rounded-full">
            <Image
              src={images.creator2}
              className="rounded-full object-cover"
              objectFit="cover"
            />
          </div>
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-2xl mt-6">{shortenAddress(currentAccount)}</p>
        </div>
      </div>
      {!isLoading && !nfts.length ? (
        <div className="flexCenter sm:p-4 p-16 ">
          <h1 className="font-poppins dark:text-white text-nft-black-1 font-extrabold text-3xl">No NFTs Owned</h1>
        </div>
      )
        : (
          <div className="sm:px-4 p-12 w-full minmd:w-4/5 flexCenter flex-col">
            <div className="felx-1 w-full flex flex-row sm:flex-col px-4 sx:px-0 minlg:px-8">Search Bar</div>
            <div className="mt-3 w-full flex flex-wrap">{nfts.map((nft) => <NFTCard key={nft.tokenId} nft={nft} onProfilePage />)}</div>
          </div>
        )}
    </div>
  );
};

export default MyNFT;
