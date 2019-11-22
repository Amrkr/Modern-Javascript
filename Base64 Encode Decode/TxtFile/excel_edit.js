var message = 'Onload';
var outputFile = '';

//alert(message);

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

function encodeFile() {
  //Get access to file
  var file = document.getElementById('inputFile').files[0];
  console.log('file', file);

  //File reader
  var reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = function() {
    console.log(reader.result);
    document.getElementById('p1').textContent = reader.result.replace(
      /^data:.+;base64,/,
      ''
    );

    //decode file
    decodeFile(reader.result);
  };
  reader.onerror = function(error) {
    console.log('Error: ', error);
  };

  //console.log(atob(document.getElementById('p1').value));
}

//encode file
function decodeFile(dataUrl) {
  var arr = dataUrl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n),
    filename = 'output.txt';
  /*
  console.log('arr', arr);
  console.log('arr[0]', arr[0]);
  console.log('mime', mime);
  console.log('mime', mime);
  console.log('bstr', bstr);
  console.log('u8arr', u8arr);
  */
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  outputFile = new File([u8arr], filename, { type: mime });
  //console.log('Output FIle', outputFile);

  document.getElementById('p2').textContent = outputFile;
  document.getElementById('p3').textContent = bstr;
  document.getElementById('p4').textContent = btoa(outputFile);

  //Again encode the file
  var reader = new FileReader();
  reader.readAsDataURL(outputFile);

  reader.onload = function() {
    console.log(reader.result);
    document.getElementById('p4').textContent = reader.result.replace(
      /^data:.+;base64,/,
      ''
    );
  };
  reader.onerror = function(error) {
    console.log('Error: ', error);
  };
}

// Download output file
function download1() {
  var a = document.getElementById('downloadFile1');
  //var file = new Blob([text], { type: type });
  a.href = URL.createObjectURL(outputFile);
  a.download = 'myfilename.txt';
}
