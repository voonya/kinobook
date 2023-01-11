import type { IMoviePricing, IMovie } from '@common';
import { useEffect, useState } from 'react';
import { getPricing } from 'src/services';
import styles from './styles.module.scss';

interface MoviePricingProps {
  movie: IMovie;
}

export const MoviePricing = ({ movie }: MoviePricingProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [pricing, setPricing] = useState<IMoviePricing[]>([]);

  useEffect(() => {
    setIsLoading(true);
    getPricing(movie.id).then((res) => {
      if (!res.error) {
        setPricing(res);
      }
    });
  }, [movie]);

  const redirectToPlatform = (link: string) => {
    window.open(link, '_blank');
  };

  const renderPricing = (el: IMoviePricing) => (
    <div
      className={styles.pricingWrapper}
      onClick={() => redirectToPlatform(movie.megogoLink as string)}
    >
      <div>{el.platform}</div>
      <div>
        {el.type.charAt(0).toUpperCase() + el.type.toLowerCase().slice(1)}
        {el.subscriptionType ? ` (${el.subscriptionType})` : ''}
      </div>
      {el.price && <div className={styles.price}>{el.price}</div>}
    </div>
  );

  return (
    <div className={styles.wrapper}>
      {/* <div className={styles.plug}>No Pricing</div> */}
      {pricing.map((el) => renderPricing(el))}
    </div>
  );
};
