//import { custLib } from './custom_lib';

var message = 'Onload';
var outputFile = '';
const dateStr = new Date().toString();
var filename =
  'output_' + dateStr.substring(0, dateStr.indexOf('GMT') - 1) + '.csv';

console.log('filename', filename);
/*
//Add JS lib dynamically
[
  'https://code.jquery.com/jquery-3.4.1.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/exceljs/3.0.0/exceljs.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.26.0/polyfill.js'
  //'custom_lib.js'
].forEach(function(src) {
  var script = document.createElement('script');
  script.src = src;
  script.async = false;
  document.head.appendChild(script);
});
*/
//alert(message);

//Encode & Decode String (base64)
function encodeDecode() {
  var val = document.getElementById('input1').value;

  //set input value to span1
  document.getElementById('span1').textContent = val;

  //set encoded val to span2
  document.getElementById('span2').textContent = btoa(val);

  //decode the encoded val and set it to span3
  document.getElementById('span3').textContent = atob(
    document.getElementById('span2').textContent
  );

  //alert(document.getElementById('inputFile').value);
}

//Encode FIle (base64)
function encodeFile() {
  //Get access to file
  var file = document.getElementById('inputFile').files[0];
  //console.log('file', file);

  //File reader
  var reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = function() {
    //console.log(reader.result);
    document.getElementById('p1').textContent = reader.result.replace(
      /^data:.+;base64,/,
      ''
    );

    document.getElementById('p1').textContent = reader.result;

    //decode file
    //decodeFile(reader.result, CallBackFunction);
    decodeCSV(reader.result.replace(/^data:.+;base64,/, ''));
  };
  reader.onerror = function(error) {
    console.log('Error: ', error);
  };

  //console.log(atob(document.getElementById('p1').value));
}

//decode file from base64
function decodeFile(dataUrl, CallBackFunction) {
  var arr = dataUrl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  console.log('arr', arr);
  console.log('arr[0]', arr[0]);
  console.log('mime', mime);
  console.log('mime', mime);
  console.log('bstr', bstr);
  console.log('u8arr', u8arr);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  outputFile = new File([u8arr], filename, { type: 'text/plain' });
  //console.log('Output FIle', outputFile);

  //print encoded, content(decoded), encoded again
  /* document.getElementById('p2').textContent = outputFile;
  document.getElementById('p3').textContent = bstr;
  document.getElementById('p4').textContent = btoa(outputFile);*/

  //Again encode the file
  var reader = new FileReader();
  //reader.readAsDataURL(outputFile);
  reader.readAsText(outputFile, 'UTF-8');
  reader.onload = function(evt) {
    //console.log(reader.result);
    /*document.getElementById('p4').textContent = reader.result.replace(
      /^data:.+;base64,/,
      ''
    );*/
    //reader.readAsText(outputFile, 'UTF-8');
    //document.getElementById('p4').textContent = reader.result;
    //console.log('REader res', reader.result);
    CallBackFunction(evt.target.result);
  };
  reader.onerror = function(error) {
    console.log('Error: ', error);
  };
}
//download1();
// Download output file
function download1() {
  //JSON FIle
  //var jsonFile = getJSON();

  var a = document.getElementById('downloadFile1');
  //var file = new Blob([text], { type: type });
  a.href = URL.createObjectURL(outputFile);
  //a.href = URL.createObjectURL(jsonFile);
  a.download = fileName;
}

function downloadJSON() {
  //JSON FIle
  var jsonFile = getJSON();
  var a = document.getElementById('downloadFile2');
  a.href = URL.createObjectURL(jsonFile);

  //download file name
  a.download = 'JSON_Output.json';
}

//Custom Lib Function
//custLib();

var CallBackFunction = function(content) {
  console.log(content);
  //alert(content);
};

function sort2DArray() {
  var a = [
    [12, 'AAA', '1', 10],
    [58, 'BBB', '4', 20],
    [28, 'CCC', '3', 30],
    [18, 'DDD', '2', 40]
  ];

  var b = a.sort(function(a, b) {
    console.log('a', a);
    console.log('b', b);

    if (+a[2] === +b[2]) {
      return 0;
    } else {
      return +a[2] < +b[2] ? -1 : 1;
    }
  });

  console.log(b);
}
