const fetch = require('node-fetch');
const cheerio = require('cheerio');
const { URLSearchParams } = require('url');
const readline = require("readline-sync");
const rp = require('request-promise');
var random = require('random-name')
var randomize = require('randomatic')
const delay = require('delay');

const functionRegist = (name, email, reff) => new Promise((resolve, reject) => {
    const params = new URLSearchParams;
    params.append('itemtype', 'lead ')
    params.append('layout', 'captcha')
    params.append('c', 'c')
    params.append('txt_name', name);
    params.append('txt_email', email);
    params.append('reflink', reff);
    params.append('refshare', '');
    params.append('lp_id', '120872');
    params.append('uv_submit', 'submit');
    params.append('cid', 'lp85272')
    params.append('call', 'ajax')
    params.append('camp', '85272')
    params.append('a', 'a')
    params.append('captcha', 'captcha')

    fetch('https://comp.bitcoinpete.guru/thanks/85272/lp85272', { 
        method: 'POST', 
        body: params,
        headers: {
            'Host': 'comp.bitcoinpete.guru',
            'Origin': 'https://comp.bitcoinpete.guru',
            'Upgrade-Insecure-Requests': 1,
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': '',
            'Sec-Fetch-Dest': 'document',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'Sec-Fetch-User': '?1',
            'Referer': 'https://comp.bitcoinpete.guru/lp/85272/lp85272?ref_id=WV33486568',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'en-US,en;q=0.9'
        }
    })
    .then(res => res.text())
    .then(result => {
      //const $ = cheerio.load(result);
      //const resText = $('h7').text();
        resolve(result);
    })
    .catch(err => reject(err))
});

const functionGetLink = (email, domain) =>
    new Promise((resolve, reject) => {
        fetch(`https://generator.email/`, {
            method: "get",
            headers: {
                accept:
                    "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
                "accept-encoding": "gzip, deflate, br",
                cookie: `_ga=GA1.2.1164348503.1554262465; _gid=GA1.2.905585996.1554262465; embx=%5B%22${email}%40${domain}%22%2C%22hcycl%40nongzaa.tk%22%5D; _gat=1; io=-aUNS6XIdbbHj__faWS_; surl=${domain}%2F${email}`,
                "upgrade-insecure-requests": 1,
                "user-agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36"
            }
        })
            .then(res => res.text())
            .then(text => {
                const $ = cheerio.load(text);
                const src = $("p[dir=ltr] a").attr('href');
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
    const reff = readline.question('[?] Code reff: ')
    const jumlah = readline.question('[?] Jumlah reff: ')
    for(var i = 0; i < jumlah; i++) {
    try {
        const name = random.first()
        const rand = randomize('a', 10)
        const email = `${rand}@aminudin.me`
        console.log(`[!] Email: ${email}\n[!] Name: ${name}`)
        const regist = await functionRegist(name, email, reff)
        console.log('[!] Sukses regist')
        console.log('[!] Mencoba mendapatkan link verif..')
        const getLink = await functionGetLink(rand, 'aminudin.me')
        await delay(5000)
        if(getLink){
            console.log(`[!] Link verif berhasil didapatkan: ${getLink}`)
            console.log('[!] Mencoba verif...')
            const verif = await functionVeryf(getLink)
            console.log('[!] Berhasil verif\n')
        } else {
            console.log('[!] Failed getting link verif !\n')
        }
    } catch (e) {
        console.log(e);
   }
}
})()
