#!/usr/bin/nodejs
/* This is a super hacky bit of code that takes a specially formatted SVG file
and creates an Espruino vector font from it.

npm install extract-svg-path

*/

// SVG contents from http://forum.espruino.com/conversations/347368/#comment15288563
var polyImg = [
  "ZDRiNWQ2ZjZnN2c5ZjpkOmQ8ZjxoO2k5aTdoNWY0",
  "ZDBiMWEzYTliO2Q8ZDpjOWM3ZDZjNWMzZDJmMmYw",
  "JDAkMiYyJzMnNCY1IjghOiE8KTwpOiM6IzskOSg2KTQpMygxJjA=",
  "IUAhTCNMI0A=",
  "I0ImQidDJ0QmRSNFI0cnRyhIKEknSiNKI0wnTClLKkkqSClGKEUoRilEKUMoQSZAI0A=",
  "Q0JFQkdDSEVIR0dJRUpDSkNMRkxIS0lKSkhKRElCSEFGQENA",
  "Q0BBQEFMQ0w=",
  "WUxZSlNKU0dXR1dFU0VTQllCWUBRQFFM",
  "YUBhTGNMY0dnR2dFY0VjQmlCaUA=",
  "E0wRTBVAF0A=",
  "F0AWQxhJGUwbTA==",
  "FWYUZhNnE2kUahVqF2sVbBRsEmsRaRFnEmUUZBVkF2U=",
  "FmUWZBhkGGwWbBZrFWoWaRZnFWY=",
  "NWQ3ZThnNmc1Zg==",
  "NWw0bDJrMWkxZzJlNGQ1ZDVmNGYzZzNpNGo1ag==",
  "NWo2aThpN2s1bA==",
  "JGYlZiZnJmklaiRqImskbCVsJ2soaShnJ2UlZCRkImU=",
  "I2UjYCFgIWwjbCNrJGojaSNnJGY=",
  "VGRVZFdlWGdYaVNpU2dWZ1VmVGY=",
  "VGZTZ1NpVGpWaldrVWxUbFJrUWlRZ1JlVGQ=",
  "YmxiZmFmYWRiZGJjY2FlYGZgZmJlYmRjZGRmZGZmZGZkbA==",
  "9Wb0ZvNn82n0avVq9Wz0bPJr8WnxZ/Jl9GT1ZA==",
  "dW10bXNscWxybnRvdW93bnhseGN2Y3ZkdWV2ZnZodWl2anZs",
  "dWV0ZXNmc2h0aXVpd2p1a3RrcmpxaHFmcmR0Y3Vjd2Q=",
  "gUCBTINMg0eIR4hFg0WDQA==",
  "iECKQIpMiEw=",
  "kkCRQJFCkkKSSpFKkUyVTJVKlEqUQpVClUCUQA==",
  "p0ykTKJLoUmjSKRKo0mlSqZK",
  "sUCxTLNMs0i1RrNGs0A=",
  "uECzRrhMuky1RrpA",
  "wUDBTMlMyUrDSsNA",
  "0UDTQNNM0Uw=",
  "3EDaQNpM3Ew=",
  "4UDjQONM4Uw=",
  "6EzoSONA40Q=",
  "6kDoQOhM6kw=",
  "1krXStdI00DTRA==",
  "10rWSNpA2kQ=",
  "AVABXANcA1A=",
  "A1IGUgdTB1UGVgNWA1gGWAhXCVUJUwhRBlADUA==",
  "GFAXUhlTGlUaVxlZF1oYXBpeHF0aWxtaHFgcVBtSGlE=",
  "IVAhXCNcI1A=",
  "NFAyUTFTMVQyVjRXNlc3WDdZNlo0WjRcNlw4WzlZOVg4VjZVNFUzVDNTNFI2UjZQ",
  "M1k0WjRcMlsxWQ==",
  "N1M2UjZQOFE5Uw==",
  "I1ImUidTJ1UmViNWI1gmWChXKVUpUyhRJlAjUA==",
  "QVBBUkVSRVxHXEdSS1JLUA==",
  "WFBYWFdaWFlWWldcWVtaWVpQ",
  "V1xUXFJbUVlRUFNQU1hUWlNZVVpWWg==",
  "ZVxnXGNQYVA=",
  "Z1xlXGlQa1A=",
  "dFx2XHNQcVA=",
  "fFx7WH1Qf1A=",
  "elx8XHlQeFQ=",
  "dlx1WHdQeVA=",
  "gVCJXItcg1A=",
  "i1CDXIFciVA=",
  "m1CXV5dclVyVV5lQ",
  "oVCpUKlSo1qpWqlcoVyhWqdSoVI=",
  "F1IWUhRTE1UTVxRZFloXWhhcFVwTWxJaEVgRVBJSE1EVUBhQ",
  "90L2QvRD80XzR/RJ9kr3SvhM9UzzS/JK8UjxRPJC80H1QPhA",
  "90L5Q/pF+kf5SfdK+Ez6S/tK/Ej8RPtC+kH4QA==",
  "d0J2QnRDc0VzR3RJdkp3SnhMdUxzS3JKcUhxRHJCc0F1QHhA",
  "d0J5Q3tCekF4QA==",
  "d0p5SXlId0h3RntGe0p6S3hM",
  "N0I2QjRDM0UzRzRJNko3SjhMNUwzSzJKMUgxRDJCM0E1QDhA",
  "N0o4TDpLO0o5SQ==",
  "N0I4QDpBO0I5Qw==",
  "hGaFZoZnhmyIbIhnh2WFZIRkgmU=",
  "g2WDYIFggWyDbINnhGY=",
  "kWSTZJNskWw=",
  "kWCTYJNikWI=",
  "qkCqSalLp0ymSqhJp0qoSKhA",
  "pWSlbKRuom+hb6Ftom2jbKNk",
  "o2ClYKVio2I=",
  "sWCxbLNss2q1aLNos2A=",
  "tmSzaLZsuGy1aLhk",
  "wWDDYMNswWw=",
  "1GbVZtZn1mzYbNhn2WbVZNRk0mU=",
  "02XTZNFk0WzTbNNn1GY=",
  "2WbaZttn22zdbN1n3GXaZNlk12U=",
  "5GblZuZn5mzobOhn52XlZORk4mU=",
  "42XjZOFk4WzjbONn5GY=",
  "9Wb2Z/Zp9Wr1bPdr+Gn4Z/dl9WQ=",
  "RWZEZkNnQ2lEakVqR2tFbERsQmtBaUFnQmVEZEVkR2U=",
  "RmVGYEhgSGxGbEZrRWpGaUZnRWY=",
  "BHoFegZ5BncFdgR2AnUEdAV0B3UIdwh5B3sFfAR8Ans=",
  "A3sDfwF/AXQDdAN1BHYDdwN5BHo=",
  "FXoUehN5E3cUdhV2F3UVdBR0EnURdxF5EnsUfBV8F3s=",
  "FnsWfxh/GHQWdBZ1FXYWdxZ5FXo=",
  "JHYldiZ3KHYndSV0JHQidQ==",
  "I3UjdCF0IXwjfCN3JHY=",
  "NXw3ezh5N3g1dzR3M3YzdzR2NXY3dzh2N3U1dDR0MnUxdzJ4NHk1eTZ6Nnk1ejR6MnkxejJ7NHw=",
  "QnBCdEF0QXZCdkJ5Q3tFfEZ8RnpFekR5RHZGdkZ0RHREcA==",
  "VXpUelN5U3RRdFF5UntUfFV8V3s=",
  "VntWfFh8WHRWdFZ5VXo=",
  "ZHxmfGN0YXQ=",
  "ZnxkfGd0aXQ=",
  "gXSDdIl8h3w=",
  "iXSHdIF8g3w=",
  "mnSWfJV+k3+Sf5J9k32UfJh0",
  "kXSVfJZ6k3Q=",
  "oXSodKh2pHqoeqh8oXyheqV2oXY=",
  "BDwGPAg7CTkJMwgxBjAEMAQyBjIHMwc5BjoEOg==",
  "BDwCOwE5ATMCMQQwBDIDMwM5BDo=",
  "NDI2MjczNzQ2NTQ1NDc2Nzc4Nzk2OjQ6NDw2PDg7OTk5ODg2OTQ5MzgxNjA0MA==",
  "IjEhMyMzJDIkMA==",
  "MjExMzMzNDI0MA==",
  "MjsxOTM5NDo0PA==",
  "FDAUOhE6ETwZPBk6FjoWMA==",
  "RjBGN0E3QTlGOUY8SDxIOUk5STdIN0gw",
  "QTdDN0gwRjA=",
  "UzdRN1EwWTBZMlMyUzVUNg==",
  "UjVUNFY0WDVZN1k5WDtWPFQ8VDpWOlc5VzdWNlQ2",
  "UjtROVM5VDpUPA==",
  "aDFpM2czZjJmMA==",
  "cTBxMncyczx1PHkyeTA=",
  "hDCCMYEzgTSCNoE4gTmCO4Q8hjyGOoQ6gzmDOIQ3hjeGNYQ1gzSDM4QyhjKGMA==",
  "hjCGMoczhzSGNYY3hziHOYY6hjyIO4k5iTiINok0iTOIMQ==",
  "ljiYN5Y2lDaTNZMzlDKWMpYwlDCSMZEzkTWSN5Q4",
  "ljyYO5k5mTOYMZYwljKXM5c1ljaXN5c5ljqUOpQ8",
  "kjuROZM5lDqUPA==",
  "ETIUMBQyETQ=",
  "kVCVV5dXk1A=",
  "dHx2fHN0cXQ=",
  "dnx0fHZ0eHQ=",
  "eHx6fHh0dnQ=",
  "enx4fHt0fXQ=",
  "ESoTKhMsESw=",
  "ESATIBMoESg=",
  "ISAjICMkISQ=",
  "JCAmICYkJCQ=",
  "NCA2IDQsMiw=",
  "OCA6IDgsNiw=",
  "MCc7JzspMCk=",
  "MSM8IzwlMSU=",
  "WSBbIFQsUiw=",
  "UCNRIVMgUyJSI1MkUyZRJQ==",
  "ViNVIVMgUyJUI1MkUyZVJQ==",
  "VylYJ1omWihZKVoqWixYKw==",
  "XSlcJ1omWihbKVoqWixcKw==",
  "QyhEKUQrQipBKA==",
  "RiRFI0UhRyJIJA==",
  "RCBFIEUsRCw=",
  "RCFCIkEkQiZEJ0QlQyREIw==",
  "RSVFJ0YoRSlFK0cqSChHJg==",
  "ZiZoJWkjaCFmIGYiZyNmJA==",
  "ZipkKmMpYyhkJ2YmZiRkJWImYShhKWIrZCxmLA==",
  "ZixoK2kqayZpJmgoZio=",
  "ZiBkIWMjZCVpLGssZiVlI2Yi",
  "cSBzIHMkcSQ=",
  "hiKEJIMmgymEK4Ythi+ELoIsgSmBJoIjhCGGIA==",
  "kSKTJJQmlCmTK5EtkS+TLpUslimWJpUjkyGRIA==",
  "tCK0JbElsSe0J7Qqtiq2J7knuSW2JbYi",
  "0SXXJdcn0Sc=",
  "pCimKKYgpCA=",
  "pCKiIaEjoyShJaInpCY=",
  "piKoIakjpySpJagnpiY=",
  "wS7DLsQsxCrCKsIs",
  "4SrjKuMs4Sw=",
  "+CD6IPMu8S4=",
  "oTSjNKM2oTY=",
  "oTqjOqM8oTw=",
  "sT6zPrQ8tDqyOrI8",
  "sjS0NLQ2sjY=",
  "yTLBNsk6yTjFNsk0",
  "0TPZM9k10TU=",
  "0TfZN9k50Tk=",
  "4TLpNuE64TjlNuE0",
  "8jHxM/Mz9DL0MA==",
  "9DD0MvYy9zP3NPY19TX0NvQ49jj2N/g2+TT5M/gx9jA=",
  "9Dr2OvY89Dw=",
  "sVCxX7Zftl2zXbNStlK2UA==",
  "1lDWX9Ff0V3UXdRS0VLRUA==",
  "w1DBUMheyl4=",
  "5VDhVuNW5VM=",
  "8V35Xflf8V8=",
  "tnC0cbNzs3Wyd7N2sXexeLN5snizerN8tH62f7d/t322fbV8tXq0eLN3s3i0d7V1tXO2crdyt3A=",
  "wXDDcMN/wX8=",
  "0nDUcdVz1XXWd9V213fXeNV51njVetV81H7Sf9F/0X3SfdN803rUeNV31XjUd9N103PSctFy0XA=",
  "5HPidOF24Xfjd+N25HU=",
  "5HPkdeV25njoeeh353bmdA==",
  "6XXpduh36HnqeOt263U=",
  "AWADYAZkBGQ=",
  "CEYHRgZHBkgHSQhJCkoISwdLBUoESARHBUUHRAhECkU=",
  "C0QLSAxJC0sISQlICUcIRglFCUQ=",
  "Ck8GTwROAkwBSQFGAkMEQQZACkAJQgdCBUMERANGA0kESwVMB00JTQ==",
  "CU0LTA1NDE4KTw==",
  "CkAMQQ5DD0UPSA5KDEsLSwxJDUgNRgxEC0MJQg==",
  "JVcoXCpcJ1c=",
  "FEcTSRlJGEc=",
  "5VDpVudW5VM="
];

var charData = [];
var firstChar=255, lastChar=0;
var maxPolyLen = 0;
polyImg.forEach(function(polyb64) {
  let buf = new Buffer(polyb64, 'base64');
  var minx=1000,maxx=-1,miny=1000,maxy=-1;
  var poly = [];
  for (var i=0;i<buf.length;i+=2) {
    var x = buf.readUInt8(i);
    var y = buf.readUInt8(i+1);
    if (x<minx) minx=x;
    if (y<miny) miny=y;
    if (x>maxx) maxx=x;
    if (y>maxy) maxy=y;
    poly.push((x&15)+((y&15)<<4));
  }
  if (poly.length > maxPolyLen)
    maxPolyLen = poly.length;
  var cx = minx>>4;
  var cy = miny>>4;
  var dx = maxx>>4;
  var dy = maxy>>4;
  if (cx!=dx || cy!=dy) console.log("Char straddles boundary!");
  var charNumber = cx + (cy*16);
  if (charNumber > lastChar) lastChar = charNumber;
  if (charNumber < firstChar) firstChar = charNumber;

  if (charData[charNumber]===undefined)
    charData[charNumber] = [];
  charData[charNumber].push(poly);
});


var vector_font_c = `/*
 * This file is part of Espruino, a JavaScript interpreter for Microcontrollers
 *
 * Copyright (C) 2020 Gordon Williams <gw@pur3.co.uk>
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * ----------------------------------------------------------------------------
 * Machine geneated vector font header (by build_vector_font.sh)
 * ----------------------------------------------------------------------------
 */

#ifndef NO_VECTOR_FONT
#include "graphics.h"

const uint8_t vfFirstChar = ${firstChar};
#define VF_END_OF_POLY 0xFE
#define VF_END_OF_CHAR 0xFF
static const uint8_t vfPolys[] IN_FLASH_MEMORY = {
`;
for (var c=firstChar;c<=lastChar;c++) {
  var char = charData[c];
  if (!char) continue;
  vector_font_c += `// ${c}\n`;
  char.forEach((poly,n) => {
    var last = n == char.length-1;
    vector_font_c += poly.join(",")+
      ","+(last?"VF_END_OF_CHAR":"VF_END_OF_POLY")+",\n";
  });
  if (char.length == 0)
    vector_font_c += "VF_END_OF_CHAR,\n";
}
vector_font_c += `};

int vfGetCharOffset(char ch) {
  if (ch<vfFirstChar) return -1;
  if (ch==vfFirstChar) return 0;
  int charCounter = ((uint8_t)ch) - vfFirstChar;
  for (int p=0;p < sizeof(vfPolys);p++) {
    if (vfPolys[p] == VF_END_OF_CHAR) {
      charCounter--;
      if (charCounter==0)
        return p+1;
    }
  }
  return -1; // we went past the end
}

// returns the width of a character
unsigned int graphicsVectorCharWidth(JsGraphics *gfx, unsigned int size, char ch) {
  int p = vfGetCharOffset(ch);
  if (p<0) return size/2;
  int w = 0;
  while (vfPolys[p]!=VF_END_OF_CHAR) {
    if (vfPolys[p]!=VF_END_OF_POLY) {
      uint8_t vertex = vfPolys[p];
      int vx = vertex&15;
      if (vx>w) w=vx;
    }
    p++;
  }
  return ((w+1)*size+7)>>4;
}

// prints character, returns width
unsigned int graphicsFillVectorChar(JsGraphics *gfx, int x1, int y1, int size, char ch) {
  int p = vfGetCharOffset(ch);
  if (p<0) return size/2;
  short poly[${maxPolyLen*2}];
  int polyLen = 0;
  int w = 0;
  while (vfPolys[p]!=VF_END_OF_CHAR) {
    if (vfPolys[p]==VF_END_OF_POLY) {
      graphicsFillPoly(gfx, polyLen, poly);
      polyLen = 0;
    } else {
      uint8_t vertex = vfPolys[p];
      int vx = vertex&15;
      int vy = vertex>>4;
      if (vx>w) w=vx;
      poly[polyLen*2  ] = (short)(x1 + ((vx*size+8)>>4));
      poly[polyLen*2+1] = (short)(y1 + ((vy*size+8)>>4));
      polyLen++;
    }
    p++;
  }
  graphicsFillPoly(gfx, polyLen, poly);
  return ((w+1)*size+7)>>4;
}

#endif
`;

var vector_font_h = `/*
 * This file is part of Espruino, a JavaScript interpreter for Microcontrollers
 *
 * Copyright (C) 2020 Gordon Williams <gw@pur3.co.uk>
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * ----------------------------------------------------------------------------
 * Machine geneated vector font header (by build_vector_font.sh)
 * ----------------------------------------------------------------------------
 */

#ifndef NO_VECTOR_FONT
#include "graphics.h"

// returns the width of a character
unsigned int graphicsVectorCharWidth(JsGraphics *gfx, unsigned int size, char ch);
// prints character, returns width
unsigned int graphicsFillVectorChar(JsGraphics *gfx, int x1, int y1, int size, char ch);
#endif
`;


require("fs").writeFileSync(__dirname + "/../libs/graphics/vector_font.c", vector_font_c);
require("fs").writeFileSync(__dirname + "/../libs/graphics/vector_font.h", vector_font_h);
