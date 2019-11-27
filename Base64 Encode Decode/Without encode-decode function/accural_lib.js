//Global object
/**
 *
 *  Base64 encode / decode
 *  http://www.webtoolkit.info/
 *
 **/

var Base64 = {
  // private property
  _keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',

  // public method for encoding
  encode: function(input) {
    var output = '';
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;

    input = Base64._utf8_encode(input);

    while (i < input.length) {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);

      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;

      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }

      output =
        output +
        this._keyStr.charAt(enc1) +
        this._keyStr.charAt(enc2) +
        this._keyStr.charAt(enc3) +
        this._keyStr.charAt(enc4);
    }

    return output;
  },

  // public method for decoding
  decode: function(input) {
    var output = '';
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;

    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');

    while (i < input.length) {
      enc1 = this._keyStr.indexOf(input.charAt(i++));
      enc2 = this._keyStr.indexOf(input.charAt(i++));
      enc3 = this._keyStr.indexOf(input.charAt(i++));
      enc4 = this._keyStr.indexOf(input.charAt(i++));

      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;

      output = output + String.fromCharCode(chr1);

      if (enc3 != 64) {
        output = output + String.fromCharCode(chr2);
      }
      if (enc4 != 64) {
        output = output + String.fromCharCode(chr3);
      }
    }

    output = Base64._utf8_decode(output);

    return output;
  },

  // private method for UTF-8 encoding
  _utf8_encode: function(string) {
    string = string.replace(/\r\n/g, '\n');
    var utftext = '';

    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n);

      if (c < 128) {
        utftext += String.fromCharCode(c);
      } else if (c > 127 && c < 2048) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      } else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }
    }

    return utftext;
  },

  // private method for UTF-8 decoding
  _utf8_decode: function(utftext) {
    var string = '';
    var i = 0;
    var c = (c1 = c2 = 0);

    while (i < utftext.length) {
      c = utftext.charCodeAt(i);

      if (c < 128) {
        string += String.fromCharCode(c);
        i++;
      } else if (c > 191 && c < 224) {
        c2 = utftext.charCodeAt(i + 1);
        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
        i += 2;
      } else {
        c2 = utftext.charCodeAt(i + 1);
        c3 = utftext.charCodeAt(i + 2);
        string += String.fromCharCode(
          ((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63)
        );
        i += 3;
      }
    }

    return string;
  }
};

const ukEmpList = {
    'andreea.goncearenco@robinhood.com': true,
    'james.herriotts@robinhood.com': true,
    'samantha.kattalia@robinhood.com': true,
    'katerina.main@robinhood.com': true,
    'wander.rutgers@robinhood.com': true,
    'shiho.sakai@robinhood.com': true
  },
  colIndex = {
    userIndex: 1,
    repTitleIndex: 3,
    reimbIndex: 7,
    compIndex: 10,
    deptIndex: 11,
    accIndex: 13,
    icoIndex: 15,
    amtIndex: 19,
    descrIndex: 20
  };

const reportTitle = 'credit card',
  reimburse = 'no',
  user = 'robinhood.com',
  accNum631 = '631',
  companyCode110 = '110',
  deptCode170 = '170',
  ico000 = '000',
  ico110 = '110';

var finalColCount = 0;

//decode csv
function decodeCSV(dataUrl1) {
  var bstr = Base64.decode(dataUrl1),
    dataRows = bstr.split(/\r?\n|\r/),
    rowColumns = '',
    sumAmount = 0;

  //console.log(JSON.stringify(dataRows[1].split(',')));
  //console.log('One Row', dataRows[1]);
  console.log('Initial ROws', dataRows.length);
  //console.log('One Row Sample', dataRows[1]);

  //csv rows/columns iteration - all operation
  for (var r = 1; r < dataRows.length - 1; r++) {
    rowColumns = dataRows[r].split(',');

    //report title - if contains 'credit card, remove row
    try {
      if (containString(rowColumns[colIndex.repTitleIndex], reportTitle)) {
        //508
        dataRows.splice(r, 1);
        //dataRows.pop();
        r--;

        //Reimbursable - if 'No', remove row
      } else if (containString(rowColumns[colIndex.reimbIndex], reimburse)) {
        //300
        dataRows.splice(r, 1);
        r--;

        //USER - if in 'UK Employees list', remove row
      } else if (isInList(rowColumns[colIndex.userIndex])) {
        //268
        dataRows.splice(r, 1);
        r--;

        //If current row is not deleted - execute update/edit operation
      } else {
        dataRows[r] = updateCurrentRow(dataRows[r]);
        sumAmount += parseInt(rowColumns[colIndex.amtIndex]);
      }
    } catch (e) {
      console.log(e, r);
    }
  }

  //Append new columns name in header
  dataRows[0] = dataRows[0].concat(',', 'Short Description');

  //final column count
  finalColCount = dataRows[0].split(',').length;

  console.log('final Rows', dataRows.length);
  console.log('Amount Sum', sumAmount);
  console.log('finalColCount', finalColCount);

  //Add Total Amount Sum - New Row
  dataRows.push(getTotalAmountRow(sumAmount));
  console.log('final Rows2', dataRows.length);

  //getEncodedData
  //console.log(getEncodedData(dataRows));
  //document.getElementById('p1').textContent = getEncodedData(dataRows);
  //document.getElementById('p2').textContent = btoa(getEncodedData(dataRows));
  /* document.getElementById('p3').textContent = atob(
  btoa(getEncodedData(dataRows))
);*/

  var encodedOutput = btoa(getEncodedData(dataRows));

  //return encodedOutput;

  //functions list
  function getEncodedData(dataArr) {
    var allDataStr = '';
    //console.log(dataArr.toString());
    for (var row = 0; row < dataArr.length; row++) {
      allDataStr = allDataStr.concat(dataArr[row], '\n');
    }

    allDataStr = Base64.encode(allDataStr);
    console.log(allDataStr);
    return allDataStr;
    //return btoa(allDataStr);
  }

  function getTotalAmountRow(sum) {
    var amountSumRow = [];

    for (var s = 0; s < finalColCount; s++) {
      if (s != colIndex.amtIndex) {
        amountSumRow[s] = '';
      } else {
        amountSumRow[s] = sum.toString();
      }
    }

    console.log('amountSumRow', amountSumRow);

    return amountSumRow.toString();
  }

  //check if string has some substring
  function containString(string, toFind) {
    if (string === '' || string === undefined) {
      return false;
    } else if (string.toLowerCase().indexOf(toFind.toLowerCase()) >= 0) {
      return true;
    }
    return false;
  }

  //check if some string is available in a list of strings
  function isInList(str) {
    if (str === '' || str === undefined) {
      return false;
    } else if (ukEmpList[str.toLowerCase()]) {
      return true;
    }
    return false;
  }

  function startsWith(str, start) {
    if (
      str !== '' &&
      str !== undefined &&
      start !== '' &&
      start !== undefined
    ) {
      if (start === str.substring(0, start.length)) {
        return true;
      }
    }
    return false;
  }

  function updateCurrentRow(str) {
    var columnsArr;
    //try {
    if (str !== '' && str !== undefined) {
      columnsArr = str.split(',');

      //if Account No. starts with 631XXX then set company code = 110
      if (startsWith(columnsArr[colIndex.accIndex], accNum631)) {
        columnsArr[colIndex.compIndex] = companyCode110;
      }

      //if does NOT matches 'user', update “company” code = 110 and “department” code = 170
      if (!containString(columnsArr[colIndex.userIndex], user)) {
        columnsArr[colIndex.compIndex] = companyCode110;
        columnsArr[colIndex.deptIndex] = deptCode170;
      }

      //if company code is 110, ICO code should be '000' else '110'
      if (columnsArr[colIndex.compIndex] === companyCode110) {
        columnsArr[colIndex.icoIndex] = ico000;
      } else {
        columnsArr[colIndex.icoIndex] = ico110;
      }

      //add short descr column
      if (
        columnsArr[colIndex.descrIndex] !== '' &&
        columnsArr[colIndex.descrIndex] !== undefined
      ) {
        columnsArr.push(columnsArr[colIndex.descrIndex].substring(0, 150));
      } else {
        columnsArr.push('');
      }
    }
    //} catch (e) {}

    return columnsArr.toString();
  }
}
