const fetch = require('node-fetch');
const cheerio = require('cheerio');
const delay = require('delay');
const readlineSync = require('readline-sync');
const randomstring = require("randomstring");
const { URLSearchParams } = require('url');

const functionName = () => new Promise((resolve, reject) => {

    fetch('https://uinames.com/api/?region=indonesia', { 
        method: 'GET'
    })
    .then(res => res.json())
    .then(result => {
        resolve(result);
    })  
    .catch(err => reject(err))
});

const getCookie = (reff) => new Promise((resolve, reject) => {
    fetch(`https://techobible.com/register?ref=${reff}`, {
        method: 'GET',
    })
    .then(async res => {
        const $ = cheerio.load(await res.text());
        const result = {
            cookie: res.headers.raw()['set-cookie']
        }

        resolve(result)
    })
    .catch(err => reject(err))
});

const functionRegist = (username, realCookie, kelamin) => new Promise((resolve, reject) => {
    const params = new URLSearchParams;
    params.append('username', username);
    params.append('email', `${username}@gmail.com`);
    params.append('password', 'Asdklmqwe987');
    params.append('confirm_password', 'Asdklmqwe987');
    params.append('gender', kelamin);
    params.append('accept_terms', 'on');
    
    fetch('https://techobible.com/requests.php?f=register', { 
        method: 'POST', 
        body: params,
        headers: {
            'Host': 'techobible.com',
            'Accept': '*/*',
            'Origin': 'https://techobible.com',
            'X-Requested-With': 'XMLHttpRequest',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Referer': 'https://techobible.com/register?ref=Syahrul9088',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'en-US,en;q=0.9',
            'Cookie': realCookie

        }
    })
    .then(res => res.json())
    .then(result => {
        //const $ = cheerio.load(result);
        //const resText = $('h7').text();
            resolve(result);
    })
    .catch(err => reject(err))
});

(async () => {
    const reff = readlineSync.question('[?] Reff id: ')
    const jumlah = readlineSync.question('[?] Jumlah reff: ')
    for (var i = 0; i < jumlah; i++) {
    try {
        const getName = await functionName()
        const number = Math.floor(Math.random() * 10000) + 100;
        const username = `${getName.name}${number}`
        var jenis = [   
            "male",
            "female",
          ];
        var kelamin = jenis[Math.floor(Math.random()*jenis.length)];
        const cookie = await getCookie(reff)
        const cook = cookie.cookie.join().split(',');
        const session = cook[0].split(';')[0];
        const ad = cook[3].split(';')[0]
        const us = cook[5].split(';')[0]
        const realCookie = `${session}; ${ad}; mode=day; access=1; src=1; _ga=GA1.2.79560195.1575427248; _gid=GA1.2.1128287706.1575427248; _gat_gtag_UA_148732261_1=1; ${us}`
        const regist = await functionRegist(username, realCookie, kelamin)
        if (regist.status == 200) {
            console.log('[+] Register berhasil!')
        } else {
            console.log(regist)
        }
    } catch (e) {
        console.log(e)
  }
}
})()
