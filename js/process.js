var output_format = null;
var file_name = null;
var file_size = null;
var csize = null;
var quality = null;
var pdff = null;
function readFile(evt) {
  var file = evt.target.files[0];
  var reader = new FileReader();
  reader.onload = function (event) {
    var i = document.getElementById('source_image');
    console.log(i);
    i.src = event.target.result;
    i.onload = function () {
      pdff = i.src;
      console.log('Image loaded');
    };
  };
  //    const selectedFile = document.getElementById('fileinput').files[0];
  const objectURL = window.URL.createObjectURL(file);
  console.log('FileUrl:' + objectURL);
  output_format = file.name.split('.').pop();
  file_name = file.name;
  console.log('Filename:' + file.name);
  console.log('Fileformat:' + output_format);
  console.log('Filesize:' + parseInt(file.size) / 1024 + ' Kb');
  file_size = parseInt(file.size) / 1024;
  console.log('Type:' + file.type);
  reader.readAsDataURL(file);
  $('#compress').show();
  return false;
}

var myslider = document.getElementById('myRange');
var output = document.getElementById('csize');
output.innerHTML = myslider.value;
var size_to_comp;
myslider.oninput = function () {
  quality = this.value;
  size_to_comp = (file_size * this.value) / 100; //making useless cause we'll use quality rather than size.
  output.innerHTML = quality; //replacing size_to_comp with qual due to above reasons
  console.log('qual' + quality);
  console.log('size' + size_to_comp);
};
// compress image
$('#compress').click(function () {
  var source_image = document.getElementById('source_image');
  if (source_image.src == '') {
    alert('You must load an image first!');
    return false;
  }

  /*    var quality = prompt("Enter Percentage upto which Image should be Compressed", "30");  // we can do this manually */
  // console.log("qualPre" + quality);
  quality = parseInt(quality);
  // console.log("qualPost" + quality);
  console.log('process start...');
  console.log('process start compress ...');
  compressed_image.src = jic.compress(source_image, quality, output_format).src;
  $('#download').show();
});
// download imange
$('#download').click(function () {
  var compressed_image = document.getElementById('compressed_image');
  if (compressed_image.src == '') {
    alert('You must compress image first!');
    return false;
  }

  var successCallback = function (response) {
    console.log('image downloaded successfully! :)');
    console.log(response);
  };

  var errorCallback = function (response) {
    console.log('image Filed to download! :)');
    console.log(response);
  };

  console.log('process start download ...');
  jic.download(
    compressed_image,
    'download.php',
    'file',
    file_name,
    successCallback,
    errorCallback
  );
});

document
  .getElementById('fileinput')
  .addEventListener('change', readFile, false);
