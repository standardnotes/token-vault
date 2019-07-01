const base32chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
export const secretPattern = `^[${base32chars}]{16,}$`;

export function hexToBytes(hex) {
  var bytes = [];
  for (var c = 0, C = hex.length; c < C; c += 2) {
    bytes.push(parseInt(hex.substr(c, 2), 16));
  }
  return bytes;
}

export function decToHex(s) {
  return (s < 15.5 ? '0' : '') + Math.round(s).toString(16);
}

export function bufToHex(buf) {
  return Array.prototype.map
    .call(new Uint8Array(buf), x => ('00' + x.toString(16)).slice(-2))
    .join('');
}

export function hextoBuf(hex) {
  var view = new Uint8Array(hex.length / 2);

  for (var i = 0; i < hex.length; i += 2) {
    view[i / 2] = parseInt(hex.substring(i, i + 2), 16);
  }

  return view.buffer;
}

export function base32ToHex(base32) {
  var bits, chunk, hex, i, val;
  bits = '';
  hex = '';
  i = 0;
  while (i < base32.length) {
    val = base32chars.indexOf(base32.charAt(i).toUpperCase());
    bits += leftpad(val.toString(2), 5, '0');
    i++;
  }
  i = 0;
  while (i + 4 <= bits.length) {
    chunk = bits.substr(i, 4);
    hex = hex + parseInt(chunk, 2).toString(16);
    i += 4;
  }
  return hex;
}

export function leftpad(str, len, pad) {
  if (len + 1 >= str.length) {
    str = Array(len + 1 - str.length).join(pad) + str;
  }
  return str;
}
