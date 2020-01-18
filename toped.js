const fetch = require('node-fetch');
const delay = require('delay');
const readlineSync = require('readline-sync');
const uuidv1 = require('uuid/v1');
var randomize = require('randomatic')
const md5Hex = require('md5-hex');
var randomstring = require("randomstring");
const fs = require('fs-extra');
const cheerio = require('cheerio');

const functionReqEmail = (random) => new Promise((resolve, reject) => {
    const bodys = {
        name: random,
        domain: "privacy-mail.top"
    }
  
      fetch('https://api.internal.temp-mail.io/api/v2/email/new', { 
          method: 'POST', 
          body: JSON.stringify(bodys),
          headers: {
            'accept': 'application/json, text/plain, */*',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-US,en;q=0.9',
            'content-type': 'application/json;charset=UTF-8',
            'origin': 'https://temp-mail.io',
            'referer': 'https://temp-mail.io/en',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.117 Safari/537.36'
          }
      })
      .then(res => res.json())
      .then(result => {
          resolve(result);
      })
      .catch(err => reject(err))
  });

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


const functionSendOtp = (email, gaid, md5, auth, real, fingerprint, realData) => new Promise((resolve, reject) => {
    const bodys = {
        "variables": {
            "otpType": "126",
            "mode": "email",
            "email": email
          },
          "operationName": null,
          "query": "query otp_request($otpType: String!, $mode: String, $email: String){\n    OTPRequest(otpType: $otpType, mode: $mode, email: $email) {\n        success\n        message\n        errorMessage\n    }\n}\n"
    }
  
      fetch('https://gql.tokopedia.com/', { 
          method: 'POST', 
          body: JSON.stringify(bodys),
          headers: {
            "Content-Type": "application/json",
            'Cshld-SessionID': '',
            'X-Method': 'POST',
            'User-Agent': 'TkpdConsumer/3.56 (Android 5.1.1;)',
            'X-User-ID': '',
            'Request-Method': 'POST',
            'Authorization': `TKPDROID AndroidApps:${auth}=`,
            'X-Tkpd-App-Version': 'android-3.56',
            'X-Tkpd-App-Name': 'com.tokopedia.customerappp',
            'Date': 'Fri, 17 Jan 2020 12:10:16 +0700',
            'os_version': '22',
            'Content-MD5': md5,
            'X-APP-VERSION': '315600000',
            'X-Device': 'android-3.56',
            'Tkpd-SessionId': real,
            'Tkpd-UserId': '',
            'Fingerprint-Hash': fingerprint,
            'Accounts-Authorization': 'Bearer',
            'Fingerprint-Data': realData,
            'X-GA-ID': gaid,
            'Content-Type': 'application/json; charset=UTF-8',
            'Content-Length': '369',
            'Host': 'gql.tokopedia.com',
            'Connection': 'Keep-Alive',
            'Accept-Encoding': 'gzip'
           
          }
      })
      .then(res => res.json())
      .then(result => {
          resolve(result);
      })
      .catch(err => reject(err))
  });

const functionGetOtp = (email) => new Promise((resolve, reject) => {
    fetch(`https://api.internal.temp-mail.io/api/v2/email/${email}/messages`, {
        method: 'GET'
    })
    .then(res => res.json())
    .then(result => {
        const $ = cheerio.load(result)
        const otepe = $('').text()
        resolve(result)
    })
    .catch(err => reject(err))
});

const functionVerifOtp = (otp, email, gaid, md5, auth, real, fingerprint, realData) => new Promise((resolve, reject) => {
    const bodys = {
        "variables": {
          "otpType": "126",
          "code": otp,
          "email": email
        },
        "operationName": null,
        "query": "query otp_validate($code: String!, $otpType: String, $email: String){\n    OTPValidate(code: $code, otpType: $otpType, email: $email) {\n        success\n        message\n        errorMessage\n        validateToken\n    }\n}\n"
      }
    
  
      fetch('https://gql.tokopedia.com/', { 
          method: 'POST', 
          body: JSON.stringify(bodys),
          headers: {
            "Content-Type": "application/json",
            'Cshld-SessionID': '',
            'X-Method': 'POST',
            'User-Agent': 'TkpdConsumer/3.56 (Android 5.1.1;)',
            'X-User-ID': '',
            'Request-Method': 'POST',
            'Authorization': `TKPDROID AndroidApps:${auth}`,
            'X-Tkpd-App-Version': 'android-3.56',
            'X-Tkpd-App-Name': 'com.tokopedia.customerappp',
            'Date': 'Fri, 17 Jan 2020 12:10:16 +0700',
            'os_version': '22',
            'Content-MD5': md5,
            'X-APP-VERSION': '315600000',
            'X-Device': 'android-3.56',
            'Tkpd-SessionId': real,
            'Tkpd-UserId': '',
            'Fingerprint-Hash': fingerprint,
            'Accounts-Authorization': 'Bearer',
            'Fingerprint-Data': realData,
            'X-GA-ID': gaid,
            'Content-Type': 'application/json; charset=UTF-8',
            'Content-Length': '369',
            'Host': 'gql.tokopedia.com',
            'Connection': 'Keep-Alive',
            'Accept-Encoding': 'gzip'
          }
      })
      .then(res => res.json())
      .then(result => {
          resolve(result);
      })
      .catch(err => reject(err))
  });

const functionfillForm = (email, fullName, gaid, md5, token, auth, four, real, fingerprint, realData) => new Promise((resolve, reject) => {
    const bodys = {
        "variables": {
          "email": email,
          "password": "kmaway87aaa",
          "osType": "1",
          "regType": "email",
          "fullname": fullName,
          "validateToken": token
        },
        "operationName": null,
        "query": "mutation register($regType: String!, $fullname: String, $email: String, $password: String, $osType: String, $validateToken: String) {\n    register(input: {\n        reg_type: $regType\n        fullname: $fullname\n        email: $email\n        password: $password\n        os_type: $osType\n        validate_token: $validateToken\n    }) {\n        user_id\n        sid\n        access_token\n        refresh_token\n        token_type\n        is_active\n        action\n        errors {\n            name\n            message\n        }\n    }\n}\n"
      }
    
    
  
      fetch('https://gql.tokopedia.com/', { 
          method: 'POST', 
          body: JSON.stringify(bodys),
          headers: {
            "Content-Type": "application/json",
            'Cshld-SessionID': '',
            'X-Method': 'POST',
            'User-Agent': 'TkpdConsumer/3.56 (Android 5.1.1;)',
            'X-User-ID': '',
            'Request-Method': 'POST',
            'Authorization': `TKPDROID AndroidApps:${auth}`,
            'X-Tkpd-App-Version': 'android-3.56',
            'X-Tkpd-App-Name': 'com.tokopedia.customerappp',
            'Date': 'Fri, 17 Jan 2020 12:10:16 +0700',
            'os_version': '22',
            'Content-MD5': md5,
            'X-APP-VERSION': '315600000',
            'X-Device': 'android-3.56',
            'Tkpd-SessionId': real,
            'Tkpd-UserId': '',
            'Fingerprint-Hash': fingerprint,
            'Accounts-Authorization': `N2VhOTE5MTgyZmY=${four}`,
            'Fingerprint-Data': realData,
            'X-GA-ID': gaid,
            'Content-Type': 'application/json; charset=UTF-8',
            'Content-Length': '369',
            'Host': 'gql.tokopedia.com',
            'Connection': 'Keep-Alive',
            'Accept-Encoding': 'gzip'
          }
      })
      .then(res => res.json())
      .then(result => {
          resolve(result);
      })
      .catch(err => reject(err))
  });

const functionFollow = (gaid, md5, auth, accessToken, UserID, real, fingerprint, realData) => new Promise((resolve, reject) => {
    const bodys = {
        "variables": {
          "input": {
            "shopID": "7348986",
            "action": ""
          }
        },
        "operationName": null,
        "query": "mutation followShop($input: ParamFollowShop!) {\n  followShop(input:$input){\n    success\n    message\n  }\n}\n"
      }
    
      fetch('https://gql.tokopedia.com/', { 
          method: 'POST', 
          body: JSON.stringify(bodys),
          headers: {
            "Content-Type": "application/json",
            'Cshld-SessionID': '',
            'X-Method': 'POST',
            'User-Agent': 'TkpdConsumer/3.56 (Android 5.1.1;)',
            'X-User-ID': UserID,
            'Request-Method': 'POST',
            'Authorization': `TKPDROID AndroidApps:${auth}`,
            'X-Tkpd-App-Version': 'android-3.56',
            'X-Tkpd-App-Name': 'com.tokopedia.customerappp',
            'Date': 'Fri, 17 Jan 2020 12:10:16 +0700',
            'os_version': '22',
            'Content-MD5': md5,
            'X-APP-VERSION': '315600000',
            'X-Device': 'android-3.56',
            'Tkpd-SessionId': real,
            'Tkpd-UserId': UserID,
            'Fingerprint-Hash': fingerprint,
            'Accounts-Authorization': `Bearer ${accessToken}`,
            'Fingerprint-Data': realData,
            'X-GA-ID': gaid,
            'Content-Type': 'application/json; charset=UTF-8',
            'Content-Length': '369',
            'Host': 'gql.tokopedia.com',
            'Connection': 'Keep-Alive',
            'Accept-Encoding': 'gzip'
          }
      })
      .then(res => res.json())
      .then(result => {
          resolve(result);
      })
      .catch(err => reject(err))
  });

  (async () => {
      const jumlah = readlineSync.question('[?] Jumlah: ')
      for (var i = 0; i < jumlah; i++) {
    try {
        const random = randomize('a', 15)
        const a = randomize('Aa0', 11)
        const b = randomize('Aa0', 92)
        const c = randomize('Aa0', 41)
        const forHex = randomize('Aa0', 3)
        const forFin = randomize('Aa0', 3)
        const real = `${a}:APA91b${b}-${c}`
        const request = await functionReqEmail(random)
        console.log(`[!] Email: ${request.email}`)
        const email = request.email
        const gaid = uuidv1()
        //const hex = gaid.split('-')[0]
        const md5 = md5Hex(forHex)
        const auth = randomize('Aa0', 27)
        const four = randomize('Aa0', 4)
        //const fin = gaid.split('-')[1]
        const fingerprint = md5Hex(forFin)
        const data = randomize('Aa0', 590)
        const realData = `eyJjYXJyaWVyIjoiSW5kb3NhdCBPb3JlZG9vIiwiY3VycmVudF9vcyI6IjUuMS4xIiwiZGV2aWNlX21hbnVmYWN0dXJlciI6In${data}=`
        const send = await functionSendOtp(email, gaid, md5, auth, real, fingerprint, realData)
        if (send.data.OTPRequest.success == true) {
            console.log('[+] OTP berhasil dikirim!')
        } else {
            console.log('[!] OTP gagal dikirim!')
        }
        await delay (5000)
        const getOtp = await functionGetOtp(email)
        const otp = getOtp[0].body_text.split('\n')[9]
        console.log(`[+] OTP ${otp}`)
        const verif = await functionVerifOtp(otp, email, gaid, md5, auth, real, fingerprint, realData)
        if (verif.data.OTPValidate.success == true) {
            console.log('[+] Validasi kode benar!')
        } else {
            console.log('[!] Validasi kode salah!')
        }
        const token = verif.data.OTPValidate.validateToken
        const name =  await functionName()
        const fullName = `${name.name} ${name.surname}`
        const fill = await functionfillForm(email, fullName, gaid, md5, token, auth, four, real, fingerprint, realData)
        if (fill.data.register.user_id != "") {
            console.log('[+] Sukses registrasi!')
        } else {
            console.log('[!] Gagal registrasi')
        }
        const accessToken = fill.data.register.access_token
        const UserID = fill.data.register.user_id
        const follow = await functionFollow(gaid, md5, auth, accessToken, UserID, real, fingerprint, realData)
        if (follow.data.followShop.success == true) {
            console.log('[+] Berhasil follow')
        } else {
            console.log('[!] Gagal follow!')
        }
        await fs.appendFile('akunToped.txt', `${UserID} | ${accessToken} | ${real} | ${gaid} | ${fingerprint}`+'\r\n', err => {
            if (err) throw err;
        })
        console.log('[+] SessiodID, Fingerprint Hash, Access Token, GA ID, User ID Berhasil disave akunToped.txt\n')
    } catch (e) {
        console.log(e)
    }
}
})()
