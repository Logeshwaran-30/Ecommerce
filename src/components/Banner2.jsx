import React from 'react';
import { SfButton } from '@storefront-ui/react';
import classNames from 'classnames';


const rawDetails = [
  {
    id: 7,
    image: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
    title: "WHITE GOLD PLATED PRINCESS",
    subtitle: 'Be inspired',
    description: "Classic Created Wedding Engagement Solitaire Diamond Promise Ring.",
    reverse: false,
    backgroundColor: 'bg-purple-200',
    reducedImage: true,
  },
  {
    id: 14,
    image: "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg",
    title: "SAMSUNG 49-INCH CHG90 MONITOR",
    subtitle: 'Gadget',
    description: "49-inch super ultrawide QLED gaming monitor with HDR support.",
    buttonText: 'Order now',
    reverse: true,
    backgroundColor: 'bg-yellow-200',
    center: true,
  },
  {
    id: 16,
    image: "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg",
    title: "LOCK AND LOVE LEATHER JACKET",
    subtitle: 'New collection',
    description: "Stylish faux leather jacket with removable hood and 2 pockets.",
    reverse: false,
    backgroundColor: 'bg-negative-200',
  },
];



export default function Banner2() {
  return (
    <div className="flex flex-col md:flex-row flex-wrap gap-6 max-w-[1540px]">
      {displayDetails.map(
        ({
          image,
          title,
          subtitle,
          description,
          buttonText,
          backgroundColor,
          reverse,
          titleClass,
          subtitleClass,
          descriptionClass,
          link,
          center,
          reducedImage,
        }) => (
          <div
            key={title}
            className={classNames(
              'relative flex md:max-w-[1536px] md:[&:not(:first-of-type)]:flex-1 md:first-of-type:w-full',
              backgroundColor,
              {
                'items-center justify-center': center, 
              },
            )}
          >
            {link && (
              <a
                className="absolute w-full h-full z-1 focus-visible:outline focus-visible:rounded-lg"
                aria-label={title}
                href={link}
              />
            )}
            <div
              className={classNames('flex justify-between overflow-hidden grow', {
                'flex-row-reverse': reverse,
              })}
            >
              <div className="flex flex-col justify-center items-start p-4 md:p-10 basis-2/4 items-center text-center">
                <p
                  className={classNames(
                    "mb-2 uppercase text-sm text-neutral-900 font-headings font-bold tracking-widest",
                    subtitleClass,
                  )}
                >
                  {subtitle}
                </p>
                <h1 className={classNames("typography-heading-3 md:typograhy-headline-2 font-medium mb-4", titleClass)}>{title}</h1>
                <p className={classNames("mb-6", descriptionClass)}>{description}</p>
                <SfButton className="!bg-black">{buttonText}</SfButton>
              </div>
              <img
                src={image}
                alt={title}
                className={classNames('self-end object-contain', {
                  'w-1/3': reducedImage, // Reduce the image size for specific cards
                  'w-1/2': !reducedImage, // Default image size
                })}
              />
            </div>
          </div>
        ),
      )}
    </div>
  );
}
