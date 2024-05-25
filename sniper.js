console.log("\n");
console.log('\x1b[31m%s\x1b[0m', '     ██████  ███▄    █  ██▓ ██▓███  ▓█████  ██▀███  ');
console.log('\x1b[31m%s\x1b[0m', '  ▒██    ▒  ██ ▀█   █ ▓██▒▓██░  ██▒▓█   ▀ ▓██ ▒ ██▒');
console.log('\x1b[31m%s\x1b[0m', '▒░   ░ ▓██▄   ▓██  ▀█ ██▒▒██▒▓██░ ██▓▒▒███   ▓██ ░▄█ ▒');
console.log('\x1b[31m%s\x1b[0m', '░     ▒   ██▒▓██▒  ▐▌██▒░██░▒██▄█▓▒ ▒▒▓█  ▄ ▒██▀▀█▄  ');
console.log('\x1b[31m%s\x1b[0m', '  ▒██████▒▒▒██░   ▓██░░██░▒██▒ ░  ░░▒████▒░██▓ ▒██▒');
console.log('\x1b[31m%s\x1b[0m', ' ▒    ▒ ▒▓▒ ▒ ░░ ▒░   ▒ ▒ ░▓  ▒▓▒░ ░  ░░░ ▒░ ░░ ▒▓ ░▒▓░');
console.log('\x1b[31m%s\x1b[0m', '  ▒ ▒░ ░░░▒░ ░ ░    ░ ░▒  ░ ░░ ░░   ░ ▒░ ▒ ░░▒ ░      ░ ░  ░  ░▒ ░ ▒░');
console.log('\x1b[31m%s\x1b[0m', '  ░   ▒   ▒ ▒ ░░   ░  ░░ ░ ░░░ ░ ░    ░  ░  ░     ');
console.log('\x1b[31m%s\x1b[0m', '      ░  ░░                                                                            ');
console.log('\x1b[31m%s\x1b[0m', '                               > Vanity URL Spammer                                            \n');
console.log('\x1b[31m%s\x1b[0m', '                               > Works                    \n');


const readline = require("readline");
const request = require("request");
const delay = require("delay");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("\x1b[36m> Tokeninizi giriniz:\x1b[0m ", (token) => {//Buraya botun değil, kendi tokeninizi giriniz.
  rl.question("\x1b[36m> Sunucu ID'nizi giriniz:\x1b[0m ", (guildId) => {
    rl.question("\x1b[36m> Discord webhook linkinizi giriniz:\x1b[0m ", (webhookUrl) => {
      rl.question("\x1b[36m> GEÇERLİ URL:\x1b[0m ", (vanityUrl) => {
        const headers = {
          "authorization": token,
          "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36"
        };

        async function checkVanity() {
          while (true) {
            try {
              if (vanityUrl === "") {
                console.log('\x1b[36m%s\x1b[0m',"> Vanity URL is empty, waiting for a new URL...");
              } else {
                request.get({
                  url: `https://discord.com/api/v9/invites/${vanityUrl}?with_counts=true&with_expiration=true`,
                  headers: headers
                }, (error, response, body) => {
                  if (response && response.statusCode == 404) {
                    console.log('\x1b[36m%s\x1b[0m',`> Changing Vanity URL: ${vanityUrl}`);
                    changeVanity();
                  } else {
                    console.log('\x1b[36m%s\x1b[0m',`> Url bekleniyor..: ${vanityUrl}`);
                  }
                });
              }
              await delay(100);
            } catch (error) {
              console.log('\x1b[31m%s\x1b[0m', "> Rate limited :(");
              await delay(8000000000000000000000);
            }
          }
        }

        function changeVanity() {
          const payload = { "code": vanityUrl };
          request.patch({
            url: `https://discord.com/api/v9/guilds/${guildId}/vanity-url`,
            headers: headers,
            json: payload
          }, (error, response, body) => {
            if (response.statusCode == 100) {
              console.log('\x1b[36m%s\x1b[0m',`> URL changed: ${vanityUrl}`);
              const data = {
                content: `@everyone discord.gg/${vanityUrl} sniped!`,
                username: "1928 Spammer",
                avatar_url: "https://cdn.discordapp.com/attachments/1168573688438849566/1191440514780770385/1954.png?ex=65a57272&is=6592fd72&hm=8c15ef5995a7953391a73db08658da6dd185449f6270c7c38e93030e0e5eb51e&"
              };      
              request.post({
                url: webhookUrl,
                json: data
              }, () => {
                process.exit(); 
              });
            } else {
              console.log('\x1b[36m%s\x1b[0m',`> Vanity URL could not be changed, error code: ${response.statusCode}`);
            }
          });
        }

        checkVanity();
      });
    });
  });
});

