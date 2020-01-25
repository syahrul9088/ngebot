const fetch = require('node-fetch');
const cheerio = require('cheerio');
const delay = require('delay');
const readlineSync = require('readline-sync');
const { URLSearchParams } = require('url');
var randomize = require('randomatic')
const rp = require('request-promise');

const functionName = () => new Promise((resolve, reject) => {

    fetch('https://uinames.com/api/?region=indonesia', { 
        method: 'GET'
    })
    .then(res => res.json())
    .then(result => {
   //  const $ = cheerio.load(result);
     // const resText = $('h7').text();
        resolve(result);
    })
    .catch(err => reject(err))
});

const functionRegist = (email, nickname, reff) => new Promise((resolve, reject) => {
    const params = new URLSearchParams;
    params.append('password', 'Jajang989');
    params.append('country_code', 'Indonesia');
    params.append('nickname', nickname);
    params.append('password_confirmation', 'Jajang989');
    params.append('email', email);
    params.append('referral_id', reff);
    params.append('isd_code', '');
    params.append('phone_number', '');

    fetch('https://api.jointandem.io/api/v2/register', { 
        method: 'POST', 
        body: params,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Host': 'api.jointandem.io',
            'Connection': 'Keep-Alive',
            'Accept-Encoding': 'gzip',
            'User-Agent': 'okhttp/3.12.0',
            //'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(result => {
    const $ = cheerio.load(result);
      //const resText = $('h7').text();
        resolve(result);
    })
    .catch(err => reject(err))
});

const functionGetLink = (nickname) =>
    new Promise((resolve, reject) => {
        fetch(`https://generator.email/`, {
            method: "get",
            headers: {
                'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                'accept-encoding': 'gzip, deflate, br',
                'accept-language': 'en-US,en;q=0.9',
                'cookie': `_ga=GA1.2.1434039633.1579610017; _gid=GA1.2.374838364.1579610017; _gat=1; surl=aminudin.me%2F${nickname}`,
                'sec-fetch-mode': 'navigate',
                'sec-fetch-site': 'same-origin',
                'upgrade-insecure-requests': 1,
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.117 Safari/537.36'
            }
        })
            .then(res => res.text())
            .then(text => {
                const $ = cheerio.load(text);
                const src = $("p[align=center] a").attr('href');
                resolve(src);
            })
            .catch(err => reject(err));
    });

const functionVeryf = (url) => new Promise((resolve, rejected) => {
        const options = {
            method: 'GET',
            uri: url
        };
        rp(options)
            .then(function (body) {
                const $ = cheerio.load(body);
                const src = $("strong").text();
                resolve(src)
            })
            .catch(function (err) {
                rejected(err)
            });
    });
    

(async () => {
    const jumlah = readlineSync.question('[?] Jumlah reff: ')
    for (var i = 0; i < jumlah; i++) {
    try {
      const reff = readlineSync.question('[?] Kode reff: ')
      const getName = await functionName()
      const angka4 = Math.floor((Math.random() * 5000) + 1000);
      const nickname = `${getName.name}${angka4}`
      const random = randomize('a', 6)
      const email = `${random}@aminudin.me`
      console.log(`[!] Mencoba regist dengan email: ${email}`)
      const regist = await functionRegist(email, nickname, reff)
      if (regist.access_key !== '') {
        console.log('[+] Regist berhasil!')
      } else {
        console.log('[!] Regist gagal!')
      }
      console.log('[!] Mencoba mendapatkan link verifikasi...')
      await delay(10000)
      const getLink = await functionGetLink(random)
      console.log(`[+] Link verifikasi: ${getLink}`)
      const verify = await functionVeryf(getLink)
      console.log('[+] Verifikasi Berhasil!')
    } catch (e) {
        console.log(e)
    }
}
})()
