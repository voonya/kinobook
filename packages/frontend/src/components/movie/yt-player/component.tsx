import { YOUTUBE_LINK_REGEX } from '@common';

interface YouTubePlayerProps {
  link: string;
}

export const YouTubePlayer = ({ link }: YouTubePlayerProps) => {
  const match = link.match(YOUTUBE_LINK_REGEX);

  if (!match || match[2].length !== 11) {
    return <></>;
  }

  return (
    <div className="video-responsive">
      <iframe
        width="568"
        height="320"
        src={`https://www.youtube.com/embed/${match[2]}?autoplay=0`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Trailer"
      />
    </div>
  );
};
