import { useTitle } from '@hooks';
import { SPARoutes } from '@common';
import {
  Layout,
  Container,
  MovieCard,
  Input,
  Button,
  IconName,
} from '@components';
import { useNavigate, createSearchParams } from 'react-router-dom';
import { useRef } from 'react';
import bg from '@assets/images/home-bg.jpg';
import styles from './styles.module.scss';

const HomePage = () => {
  useTitle(SPARoutes.HOME);
  const recomendations = [
    {
      'id': '7a4b8c5e-ace0-407d-9ff3-1d11c4526839',
      'title': 'Maximum title movie smotret vsem +18',
      'description':
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pharetra convallis posuere morbi leo urna molestie. Morbi quis commodo odio aenean sed adipiscing. Ut sem nulla pharetra diam sit amet nisl suscipit. Sed nisi lacus sed viverra tellus in hac habitasse platea. Dictum sit amet justo donec. Tempor commodo ullamcorper a lacus vestibulum sed arcu. Ac tortor dignissim convallis aenean et tortor at. Faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis aliquam. Quis vel eros donec ac. A iaculis at erat pellentesque adipiscing commodo. Quam lacus suspendisse faucibus interdum posuere lorem ipsum dolor sit. A iaculis at erat pellentesque adipiscing commodo. Scelerisque in dictum non consectetur a erat nam at lectus. Sagittis vitae et leo duis ut diam quam. Ut tellus elementum sagittis vitae et leo duis ut. Hendrerit dolor magna eget est lorem',
      'tagline': 'Some tagline, just do it',
      'releaseDate': '2022-12-07T00:00:00.000Z',
      'runtime': 215,
      'budget': 3000000,
      'revenue': 400000000,
      'poster': '458a6a47-5c15-49c5-8c83-d2f61dc2735a.jpg',
      'trailer': 'https://www.youtube.com/watch?v=YoHD9XEInc0',
      'createdAt': '2022-12-26T16:29:01.155Z',
      'updatedAt': '2022-12-26T16:29:01.155Z',
      'genres': [
        {
          'id': 'a3391265-42fb-4d3c-8e1e-ef8500f310bd',
          'name': 'Drama',
          'createdAt': '2022-12-26T16:22:37.567Z',
          'updatedAt': '2022-12-26T16:22:37.567Z',
        },
      ],
      countries: [],
      actors: [],
      writers: [],
    },
    {
      'id': '7a4b8c5e-ace0-407d-9ff3-1d11c4526839',
      'title': 'Maximum title movie smotret vsem +18',
      'description':
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pharetra convallis posuere morbi leo urna molestie. Morbi quis commodo odio aenean sed adipiscing. Ut sem nulla pharetra diam sit amet nisl suscipit. Sed nisi lacus sed viverra tellus in hac habitasse platea. Dictum sit amet justo donec. Tempor commodo ullamcorper a lacus vestibulum sed arcu. Ac tortor dignissim convallis aenean et tortor at. Faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis aliquam. Quis vel eros donec ac. A iaculis at erat pellentesque adipiscing commodo. Quam lacus suspendisse faucibus interdum posuere lorem ipsum dolor sit. A iaculis at erat pellentesque adipiscing commodo. Scelerisque in dictum non consectetur a erat nam at lectus. Sagittis vitae et leo duis ut diam quam. Ut tellus elementum sagittis vitae et leo duis ut. Hendrerit dolor magna eget est lorem',
      'tagline': 'Some tagline, just do it',
      'releaseDate': '2022-12-07T00:00:00.000Z',
      'runtime': 215,
      'budget': 3000000,
      'revenue': 400000000,
      'poster': '458a6a47-5c15-49c5-8c83-d2f61dc2735a.jpg',
      'trailer': 'https://www.youtube.com/watch?v=YoHD9XEInc0',
      'createdAt': '2022-12-26T16:29:01.155Z',
      'updatedAt': '2022-12-26T16:29:01.155Z',
      'genres': [
        {
          'id': 'a3391265-42fb-4d3c-8e1e-ef8500f310bd',
          'name': 'Drama',
          'createdAt': '2022-12-26T16:22:37.567Z',
          'updatedAt': '2022-12-26T16:22:37.567Z',
        },
      ],
      countries: [],
      actors: [],
      writers: [],
    },
    {
      'id': '7a4b8c5e-ace0-407d-9ff3-1d11c4526839',
      'title': 'Maximum title movie smotret vsem +18',
      'description':
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pharetra convallis posuere morbi leo urna molestie. Morbi quis commodo odio aenean sed adipiscing. Ut sem nulla pharetra diam sit amet nisl suscipit. Sed nisi lacus sed viverra tellus in hac habitasse platea. Dictum sit amet justo donec. Tempor commodo ullamcorper a lacus vestibulum sed arcu. Ac tortor dignissim convallis aenean et tortor at. Faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis aliquam. Quis vel eros donec ac. A iaculis at erat pellentesque adipiscing commodo. Quam lacus suspendisse faucibus interdum posuere lorem ipsum dolor sit. A iaculis at erat pellentesque adipiscing commodo. Scelerisque in dictum non consectetur a erat nam at lectus. Sagittis vitae et leo duis ut diam quam. Ut tellus elementum sagittis vitae et leo duis ut. Hendrerit dolor magna eget est lorem',
      'tagline': 'Some tagline, just do it',
      'releaseDate': '2022-12-07T00:00:00.000Z',
      'runtime': 215,
      'budget': 3000000,
      'revenue': 400000000,
      'poster': '458a6a47-5c15-49c5-8c83-d2f61dc2735a.jpg',
      'trailer': 'https://www.youtube.com/watch?v=YoHD9XEInc0',
      'createdAt': '2022-12-26T16:29:01.155Z',
      'updatedAt': '2022-12-26T16:29:01.155Z',
      'genres': [
        {
          'id': 'a3391265-42fb-4d3c-8e1e-ef8500f310bd',
          'name': 'Drama',
          'createdAt': '2022-12-26T16:22:37.567Z',
          'updatedAt': '2022-12-26T16:22:37.567Z',
        },
      ],
      countries: [],
      actors: [],
      writers: [],
    },
    {
      'id': '7a4b8c5e-ace0-407d-9ff3-1d11c4526839',
      'title': 'Maximum title movie smotret vsem +18',
      'description':
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pharetra convallis posuere morbi leo urna molestie. Morbi quis commodo odio aenean sed adipiscing. Ut sem nulla pharetra diam sit amet nisl suscipit. Sed nisi lacus sed viverra tellus in hac habitasse platea. Dictum sit amet justo donec. Tempor commodo ullamcorper a lacus vestibulum sed arcu. Ac tortor dignissim convallis aenean et tortor at. Faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis aliquam. Quis vel eros donec ac. A iaculis at erat pellentesque adipiscing commodo. Quam lacus suspendisse faucibus interdum posuere lorem ipsum dolor sit. A iaculis at erat pellentesque adipiscing commodo. Scelerisque in dictum non consectetur a erat nam at lectus. Sagittis vitae et leo duis ut diam quam. Ut tellus elementum sagittis vitae et leo duis ut. Hendrerit dolor magna eget est lorem',
      'tagline': 'Some tagline, just do it',
      'releaseDate': '2022-12-07T00:00:00.000Z',
      'runtime': 215,
      'budget': 3000000,
      'revenue': 400000000,
      'poster': '458a6a47-5c15-49c5-8c83-d2f61dc2735a.jpg',
      'trailer': 'https://www.youtube.com/watch?v=YoHD9XEInc0',
      'createdAt': '2022-12-26T16:29:01.155Z',
      'updatedAt': '2022-12-26T16:29:01.155Z',
      'genres': [
        {
          'id': 'a3391265-42fb-4d3c-8e1e-ef8500f310bd',
          'name': 'Drama',
          'createdAt': '2022-12-26T16:22:37.567Z',
          'updatedAt': '2022-12-26T16:22:37.567Z',
        },
      ],
      countries: [],
      actors: [],
      writers: [],
    },
    {
      'id': '7a4b8c5e-ace0-407d-9ff3-1d11c4526839',
      'title': 'Maximum title movie smotret vsem +18',
      'description':
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pharetra convallis posuere morbi leo urna molestie. Morbi quis commodo odio aenean sed adipiscing. Ut sem nulla pharetra diam sit amet nisl suscipit. Sed nisi lacus sed viverra tellus in hac habitasse platea. Dictum sit amet justo donec. Tempor commodo ullamcorper a lacus vestibulum sed arcu. Ac tortor dignissim convallis aenean et tortor at. Faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis aliquam. Quis vel eros donec ac. A iaculis at erat pellentesque adipiscing commodo. Quam lacus suspendisse faucibus interdum posuere lorem ipsum dolor sit. A iaculis at erat pellentesque adipiscing commodo. Scelerisque in dictum non consectetur a erat nam at lectus. Sagittis vitae et leo duis ut diam quam. Ut tellus elementum sagittis vitae et leo duis ut. Hendrerit dolor magna eget est lorem',
      'tagline': 'Some tagline, just do it',
      'releaseDate': '2022-12-07T00:00:00.000Z',
      'runtime': 215,
      'budget': 3000000,
      'revenue': 400000000,
      'poster': '458a6a47-5c15-49c5-8c83-d2f61dc2735a.jpg',
      'trailer': 'https://www.youtube.com/watch?v=YoHD9XEInc0',
      'createdAt': '2022-12-26T16:29:01.155Z',
      'updatedAt': '2022-12-26T16:29:01.155Z',
      'genres': [
        {
          'id': 'a3391265-42fb-4d3c-8e1e-ef8500f310bd',
          'name': 'Drama',
          'createdAt': '2022-12-26T16:22:37.567Z',
          'updatedAt': '2022-12-26T16:22:37.567Z',
        },
      ],
      countries: [],
      actors: [],
      writers: [],
    },
  ];

  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const redirectToCatalogue = () => {
    console.log(searchInputRef.current?.value);

    if (!searchInputRef.current?.value) return;

    navigate({
      pathname: SPARoutes.CATALOGUE,
      search: createSearchParams({
        title: searchInputRef.current?.value,
      }).toString(),
    });
  };

  return (
    <Layout>
      <Container style={{ width: '100%' }}>
        <div className={styles.wrapper}>
          <div className={styles.search}>
            <div className={styles.searchTitle}>KinoBook</div>
            <img src={bg} alt="" />
            <div className={styles.searchInput}>
              <Input
                errorBlock={false}
                color={'dark'}
                ref={searchInputRef}
                icon={IconName.GLASS}
                onIconClick={redirectToCatalogue}
              />
            </div>
          </div>
          <div className={styles.recommendationsWrapper}>
            <h3>You might like</h3>
            <div className={styles.recommendations}>
              {recomendations.map((recomendation) => (
                <MovieCard
                  key={recomendation.id + Math.random()}
                  movie={recomendation}
                />
              ))}
            </div>
            <div className={styles.controls}>
              <Button>More</Button>
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export { HomePage };
