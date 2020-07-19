MongoDB

To install

1. Tap the MongoDB Homebrew Tap => brew tap mongodb/brew
2. Procedure => brew install mongodb-community@4.2
3. Run MongoDB Community Edition => brew services start mongodb-community@4.2
4. To stop a mongod running as a macOS service => brew services stop mongodb-community@4.2
5. To run MongoDB (i.e. the mongod process) manually as a background process => mongod --config /usr/local/etc/mongod.conf --fork
6. To begin using MongoDB, connect a mongo shell to the running instance. From a new terminal, issue the following: => mongo