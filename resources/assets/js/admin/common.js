function slugify(text){
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}


function escapeHtml(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
 }




 var CryptoJSAesJson = {
     stringify: function (cipherParams) {
         var j = {ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64)};
         if (cipherParams.iv) j.iv = cipherParams.iv.toString();
         if (cipherParams.salt) j.s = cipherParams.salt.toString();
         return JSON.stringify(j);
     },
     parse: function (jsonStr) {
         var j = JSON.parse(jsonStr);
         var cipherParams = CryptoJS.lib.CipherParams.create({ciphertext: CryptoJS.enc.Base64.parse(j.ct)});
         if (j.iv) cipherParams.iv = CryptoJS.enc.Hex.parse(j.iv);
         if (j.s) cipherParams.salt = CryptoJS.enc.Hex.parse(j.s);
         return cipherParams;
     }
 }