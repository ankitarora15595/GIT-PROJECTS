const allowedChars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

function encodeBase62(hexVal)
{
    let num = BigInt('0x'+hexVal);
    let res = '';
    while(num>0)
    {
        res = allowedChars[num%62n]+res;
        num = num/62n;
    }    
    return res || '0';
}

module.exports = {encodeBase62};