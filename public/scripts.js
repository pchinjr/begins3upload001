const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(localMediaStream => {
      console.log(localMediaStream);

      video.srcObject = localMediaStream;
      video.play();
    })
    .catch(err => {
      console.error(`OH NO!!!`, err);
    });
}

function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
    // take the pixels out
    let pixels = ctx.getImageData(0, 0, width, height);
    ctx.globalAlpha = 0.8;
    // put them back
    ctx.putImageData(pixels, 0, 0);
  }, 16);
}

function takePhoto() {
  // take the data out of the canvas
  const data = canvas.toDataURL('image/jpeg');
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'handsome');
  link.innerHTML = `<img src="${data}" alt="Handsome Man" />`;
  strip.insertBefore(link, strip.firstChild);
}

function uploadPhoto() {
  // take the data out of the canvas
  const data = canvas.toDataURL();
  console.log(`clientside - ${data}`)
  fetch('/upload', {
    method: "POST",
    body: JSON.stringify({data}),
    // body: JSON.stringify({ "data": data }),
    headers: {
      "content-type":"application/json"
    }
  })
  .then(blob => blob.json())
  .then(res => console.log(`serverside - ${res}`))
  .catch(err => console.error(err))
}

getVideo();

video.addEventListener('canplay', paintToCanvas);
