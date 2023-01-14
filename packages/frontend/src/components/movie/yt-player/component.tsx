import { YOUTUBE_LINK_REGEX } from '@common';
import { Spinner } from '@components';
import { useState } from 'react';
import styles from './styles.module.scss';

interface YouTubePlayerProps {
  link: string;
}

export const YouTubePlayer = ({ link }: YouTubePlayerProps) => {
  const match = link.match(YOUTUBE_LINK_REGEX);
  const [isLoaded, setIsLoaded] = useState(false);

  if (!match || match[2].length !== 11) {
    return <></>;
  }

  const onLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div className={styles.wrapper}>
      <iframe
        width="568"
        height="320"
        src={`https://www.youtube.com/embed/${match[2]}?autoplay=0`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Trailer"
        onLoad={onLoad}
        className={!isLoaded ? styles.hidden : ''}
      />
      {!isLoaded && <Spinner />}
    </div>
  );
};
