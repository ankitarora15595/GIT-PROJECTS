const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

function encodeBase62(hexStr) {
  let num = BigInt('0x' + hexStr);
  let result = '';
  while (num > 0) {
    result = chars[num % 62n] + result;
    num = num / 62n;
  }
  return result || '0';
}

module.exports = { encodeBase62 };
