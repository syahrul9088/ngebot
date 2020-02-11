const fetch = require('node-fetch');
const uuid = require('uuid/v4');
const sessionID = uuid();
const readlineSync = require('readline-sync');
var randomstring = require('randomstring')
var randomize = require('randomatic')
const cheerio = require('cheerio');

const functionRegist = (email, reff) => new Promise((resolve, reject) => {
      fetch(`https://api.hupayx.com/api.php?_plugin=user&_action=sign_up&_submit_data=%7B%22email%22%3A%22${email}%22%2C%22user_password%22%3A%22Japro908%40%22%2C%22access_type%22%3A%22email%22%2C%22country_code%22%3A%2282%22%2C%22friend_code%22%3A%22${reff}%22%7D`, { 
          method: 'POST', 
          //body: JSON.stringify(bodys),
          headers: {
            'locale': 'en_US',
            'Content-Length': 0,
            'Host': 'api.hupayx.com',
            'Connection': 'Keep-Alive',
            'Accept-Encoding': 'gzip',
            'User-Agent': 'okhttp/3.12.0'
          }
      })
      .then(res => res.json())
      .then(result => {
          resolve(result);
      })
      .catch(err => reject(err))
  });

const functionGetToken = (email, deviceToken, lapan, tulas, papan, las, elas, puluh, ma) => new Promise((resolve, reject) => {
    fetch(`https://api.hupayx.com/api.php?_plugin=user&_action=sign_in&_submit_data=%7B%22user_id%22%3A%22${email}%22%2C%22user_password%22%3A%22Japro908%40%22%2C%22android_device_token%22%3A%22${las}%3AAPA91bHtV${elas}-${lapan}-${puluh}-${ma}_-${tulas}_${deviceToken}_${papan}%22%7D`, { 
        method: 'POST', 
        //body: JSON.stringify(bodys),
        headers: {
          'locale': 'en_US',
          'Content-Length': 0,
          'Host': 'api.hupayx.com',
          'Connection': 'Keep-Alive',
          'Accept-Encoding': 'gzip',
          'User-Agent': 'okhttp/3.12.0'
        }
    })
    .then(res => res.json())
    .then(result => {
        resolve(result);
    })
    .catch(err => reject(err))
});

const functionSendOtp = (token, nomor) => new Promise((resolve, reject) => {
    fetch(`https://api.hupayx.com/api.php?_plugin=user&_action=verify_mobile_add&_submit_data=%7B%22mobile%22%3A%22${nomor}%22%2C%22country_code%22%3A%221%22%7D`, { 
        method: 'POST', 
        //body: JSON.stringify(bodys),
        headers: {
          'user-access-code': token,
          'locale': 'en_US',
          'Content-Length': 0,
          'Host': 'api.hupayx.com',
          'Connection': 'Keep-Alive',
          'Accept-Encoding': 'gzip',
          'User-Agent': 'okhttp/3.12.0'
        }
    })
    .then(res => res.json())
    .then(result => {
        resolve(result);
    })
    .catch(err => reject(err))
});

const functionVerifOtp = (token, nomor, otp) => new Promise((resolve, reject) => {
    fetch(`https://api.hupayx.com/api.php?_plugin=user&_action=verify_mobile_add&_submit_data=%7B%22mobile%22%3A%22${nomor}%22%2C%22country_code%22%3A%221%22%2C%22verification_code%22%3A%22${otp}%22%7D`, { 
        method: 'POST', 
        //body: JSON.stringify(bodys),
        headers: {
          'user-access-code': token,
          'locale': 'en_US',
          'Content-Length': 0,
          'Host': 'api.hupayx.com',
          'Connection': 'Keep-Alive',
          'Accept-Encoding': 'gzip',
          'User-Agent': 'okhttp/3.12.0'
        }
    })
    .then(res => res.json())
    .then(result => {
        resolve(result);
    })
    .catch(err => reject(err))
});

const functionVerifPin = (token, pin) => new Promise((resolve, reject) => {
    fetch(`https://api.hupayx.com/api.php?_plugin=user&_action=user&_action_type=submit&_submit_type=update&_submit_data=%7B%22pin_number%22%3A%22${pin}%22%7D`, { 
        method: 'POST', 
        //body: JSON.stringify(bodys),
        headers: {
          'user-access-code': token,
          'locale': 'en_US',
          'Content-Length': 0,
          'Host': 'api.hupayx.com',
          'Connection': 'Keep-Alive',
          'Accept-Encoding': 'gzip',
          'User-Agent': 'okhttp/3.12.0'
        }
    })
    .then(res => res.json())
    .then(result => {
        resolve(result);
    })
    .catch(err => reject(err))
});

const functionRefer = (token) => new Promise((resolve, reject) => {
    fetch(`https://api.hupayx.com/api.php?_plugin=user&_action=verify_email`, { 
        method: 'POST', 
        //body: JSON.stringify(bodys),
        headers: {
          'user-access-code': token,
          'locale': 'en_US',
          'Content-Length': 0,
          'Host': 'api.hupayx.com',
          'Connection': 'Keep-Alive',
          'Accept-Encoding': 'gzip',
          'User-Agent': 'okhttp/3.12.0'
        }
    })
    .then(res => res.json())
    .then(result => {
        resolve(result);
    })
    .catch(err => reject(err))
});

(async () => {
    const reff = readlineSync.question('[?] Reff: ')
    for (var i = 0; i < 10000; i++) {
      try {
        const elas = randomize('aA0', 16)
        const puluh = randomize('aA0', 10)
        const ma = randomize('aA0', 5)
        const las = randomize('aA0', 11)
        const lapan = randomize('aA0', 8)
        const tulas = randomize('aA0', 17)
        const papan = randomize('aA0', 48)
        const rand = randomize('a', 10)
        const email = `${rand}@aminudin.me`
        console.log(`[!] Email: ${email}`)
        const regist = await functionRegist(email, reff)
        if (regist.message === 'success') {
            console.log('[!] Regist sukses!')
        } else {
            console.log('[!] Regist gagal!')
        }
        var deviceToken = randomize('aA0', 21)
        const getToken = await functionGetToken(email, deviceToken, lapan, tulas, papan, las, elas, puluh, ma)
        const token = getToken.list[0].access_code
        const nomor = randomize('0', 10)
        const sendOtp = await functionSendOtp(token, nomor)
        if (sendOtp.code == 000) {
            console.log('[!] Code berhasil dikirim!')
        } else {
            console.log('[!] Code gagal dikirim!')
            console.log(sendOtp)
            console.log("")
        }
        const otp = randomize('0', 6)
        const Verif = await functionVerifOtp(token, nomor, otp)
        console.log('[!] Verifikasi berhasil!')
        const pin = randomize('0', 6)
        const verifPin = await functionVerifPin(token, pin)
        if(verifPin.message == 'success') {
            console.log('[!] PIN berhasil')
        } else {
            console.log('[!] PIN gagal!')
            console.log(verifPin)
        }
        const refer = await functionRefer(token)
        console.log('[!] Done, cek wallet!\n')
      } catch (e) {
          console.log(e)
    }
}
  })()
