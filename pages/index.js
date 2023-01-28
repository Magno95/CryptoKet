import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { Banner, CreatorCard, NFTCard } from '../components';

import images from '../assets';
// import { makeId } from '../utils';

const Home = () => {
  const [hideButtons, setHideButtons] = useState(false);
  const { theme } = useTheme();
  const parentRef = useRef(null);
  const scrollRef = useRef(null);

  const handleScroll = (dir) => {
    const { current } = scrollRef;

    const scrollAmount = window.innerWidth > 1800 ? 270 : 210;

    if (dir === 'left') {
      current.scrollLeft -= scrollAmount;
    } else {
      current.scrollLeft += scrollAmount;
    }
  };

  const isScrollable = () => {
    const { current } = scrollRef;
    const { current: parent } = parentRef;

    if (current?.scrollWidth >= parent?.offsetWidth) {
      setHideButtons(false);
    } else {
      setHideButtons(true);
    }
  };

  useEffect(() => {
    isScrollable();
    window.addEventListener('resize', isScrollable);
    return () => {
      window.removeEventListener('resize', isScrollable);
    };
  });

  const mockUsrs = ['0x232...kmmd', '0x345...klsp', '0x233...abid', '0x325...ldjn', '0x999...23md', '0x987...a8jd', '0x233...abid', '0x233...abid', '0x233...abid', '0x325...ldjn', '0x345...klsp'];

  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-full minmd:w-4/5">
        <Banner
          parentStyles="justify-start mb-6 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded-3xl"
          childStyles="md:text-4xl sm:text-2xl xs:text-xl text-left"
          name=" Discover, collect and sell extraordinary NFTs"
        />
        <div>
          <h1 className="font-poppin dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold ml-4 sx:ml-0">Best Creators</h1>
          <div className="relative flex-1 max-w-full flex mt-3" ref={parentRef}>
            <div className="flex flex-row w-max overflow-x-scroll no-scrollbar select-none" ref={scrollRef}>
              {[6, 7, 8, 9, 10].map((i, index) => (
                <CreatorCard
                  key={`creator-${i}`}
                  rank={i}
                  creatorImage={images[`creator${i}`]}
                  creatorName={`${mockUsrs[index]}`}
                  creatorEths={10 - i * 0.5}
                />
              ))}
              {!hideButtons && (
                <>
                  <div onClick={() => handleScroll('left')} className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 cursor-pointer left-0">
                    <div className="relative w-full h-full">
                      <Image src={images.left} layout="fill" objectFit="contain" alt="left_arrow" className={theme === 'light' ? 'filter invert' : undefined} />
                    </div>
                  </div>
                  <div onClick={() => handleScroll('right')} className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 cursor-pointer right-0">
                    <div className="relative w-full h-full">
                      <Image src={images.right} layout="fill" objectFit="contain" alt="right_arrow" className={`w-8 h-8 minlg:w-12 minlg:h-12 ${theme === 'light' ? 'filter invert' : undefined}`} />
                    </div>
                  </div>

                </>
              )}
            </div>
          </div>
        </div>
        <div className="mt-10">
          <div className="flexBetween mx-4 xs:mx-0 minlg:mx-8 sm:flex-col sm:items-start">
            <h2 className="font-poppin flex-1 dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold sm:mb-4">Hot bids</h2>
            <div>SearchBar</div>
          </div>
          <div className="mt-3 w-full flex flex-wrap justify-start md:justify-center">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
              <NFTCard
                key={`nft-${i}`}
                nft={{
                  i,
                  name: `NFT ${i}`,
                  seller: mockUsrs[i],
                  owner: mockUsrs[10 - i],
                  price: (10 - i * 0.531).toFixed(2),
                  description: 'Cool NFT on Sale',
                }}

              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;
