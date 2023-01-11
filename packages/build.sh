cd ./frontend
docker build -t voonya/kinobook-client -f Dockerfile .
cd ..

# cd ./backend
# docker build -t voonya/kinobook-server -f Dockerfile .
# cd ..

# cd ./backend
# docker build -t voonya/kinobook-migrations -f Dockerfile.migration .
# cd ..

docker push voonya/kinobook-client
# docker push voonya/kinobook-server
# docker push voonya/kinobook-migrations

