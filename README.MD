# Logger Discord Bot
Log join/leave and delete/edit messages

## install
```sh
git clone https://github.com/papersaccul/paperlogger
cd paperLogger
npm i
```

## Start
U need create an `.env.production` or `.env.development` file, to store the `BOT_TOKEN`, `LOCALE`, `GUILD_ID` variable
```text
BOT_TOKEN=YOURBOTTOKEN
LOCALE=en
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

Turn on `Server Members Intent` on [Discord Developer Portal](https://discord.com/developers/applications/)
![Server Members Intent](https://media.discordapp.net/attachments/762837041955733554/1221447712608620544/image.png?ex=66129cd4&is=660027d4&hm=fbcb2af5056e8927638bebeb54754888e2458317f4e7e11375c1f2a127fe0fdc&=&format=webp&quality=lossless&)

# How do I use it?
- via `/log msg` - select a channel to send deleted or modified messages to
- via `/log member` - select the channel to send join/leave notifications 
*Only administrators can use this command*

## It's looks like this
![image_msg](https://cdn.discordapp.com/attachments/762837041955733554/1221833121838927872/image.png?ex=661403c4&is=66018ec4&hm=c20e39a8818a9f7f55313e67ac7a8f21bdd5ef96b2f05b51c901dbf7cb3f9035&)
![image_join_leave](https://cdn.discordapp.com/attachments/762837041955733554/1221833400034525285/image.png?ex=66140407&is=66018f07&hm=fe43adb898da03335ccd3423aa482c5a7ac53dd624a559543b74181362e0d96e&)
