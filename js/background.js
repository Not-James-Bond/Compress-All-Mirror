var jic = {
  compress: function (source_img_obj, quality, output_format) {
    const selectedFile = document.getElementById('fileinput').files[0];
    var mime_type;
    if (output_format === 'pdf') {
      mime_type = 'application/pdf';
    } else if (output_format === 'png') {
      mime_type = 'image/png';
    } else if (output_format === 'webp') {
      mime_type = 'image/webp';
    } else {
      mime_type = 'image/jpeg';
    }
    //  if (mime_type = "application/pdf"){
    //     compresspdf(pdff);
    //  }
    //  else {
    var cvs = document.createElement('canvas');
    cvs.width = source_img_obj.naturalWidth;
    cvs.height = source_img_obj.naturalHeight;
    var ctx = cvs.getContext('2d').drawImage(source_img_obj, 0, 0);
    var newImageData = cvs.toDataURL(mime_type, quality / 100);
    var result_image_obj = new Image();
    result_image_obj.src = newImageData;
    return result_image_obj;
    //  }
  },

  download: function (compressed_img_obj, filename) {
    if (XMLHttpRequest.prototype.sendAsBinary === undefined) {
      XMLHttpRequest.prototype.sendAsBinary = function (string) {
        var bytes = Array.prototype.map.call(string, function (c) {
          return c.charCodeAt(0) & 0xff;
        });
        this.send(new Uint8Array(bytes).buffer);
      };
    }

    var type;
    if (filename.substr(-4).toLowerCase() === '.png') {
      type = 'image/png';
    } else if (filename.substr(-5).toLowerCase() === '.webp') {
      type = 'image/webp';
    } else {
      type = 'image/jpeg';
    }

    var data = compressed_img_obj.src;
    data = data.replace('data:' + type + ';base64,', '');

    var data = compressed_img_obj.src;
    console.log('data' + data);
    console.log(compressed_img_obj.src);
    data = data.replace('data:' + type + ';base64,', '');
    var a = document.createElement('a');
    a.href = compressed_img_obj.src;
    a.download = 'compressed.jpg'; //+output_format;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  },
};
