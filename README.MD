# Logger Discord Bot
Log join/leave and delete/edit messages

## install
```sh
git clone https://github.com/papersaccul/paperLogger
cd paperLogger
npm i
```

## Start
U need create an `.env.production` or `.env.development` file, to store the `BOT_TOKEN`, `LOCALE`, `GUILD_ID` variable
```text
BOT_TOKEN=YOUBOTTOKEN
LOCALE=ua
GUILD_ID=111111111111111111       // For single server use
```
u can run it through npm
```sh
npm start
``` 
or through docker, u can also pass variables
```sh
docker-compose up -d
```

## U can use dev mode, which will autorestart the bot when files are changed
```sh
npm run dev
```
*uses variables from env.development, also the GUILD_ID variable of the test server is required*

# How do I use it?
- via `/log msg` - select a channel to send deleted or modified messages to
- via `/log member` - select the channel to send join/leave notifications 
