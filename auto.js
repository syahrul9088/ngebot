const fetch = require('node-fetch');
const readlineSync = require('readline-sync');

const functionReff = (reff) => new Promise((resolve, reject) => {

    fetch(`https://www.bitay.com/referral/join/85591448764/${reff}`, { 
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


(async () => {
    const reff = readlineSync.question('[?] Reff kode: ')
    for (var i = 0; i < 51; i++) {
    try {
       const get = await functionReff(reff)
       if (get.ready == true) {
        console.log('[+] Sukses!')
       } else {
        console.log('[!] Gagal!')
       }
    } catch (e) {
        console.log(e)
}
    }
})()
