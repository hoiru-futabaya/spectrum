const clickElem = document.createElement('div');
clickElem.textContent = 'Click to Start';
document.body.appendChild(clickElem);

let req = null;
console.log(req);

let clicked = false;
addEventListener('click', async () => {
  if (clicked) return;
  clicked = true;
  clickElem.remove();

  const audioCtx = new AudioContext();
  const stream = await navigator.mediaDevices.getUserMedia({audio: true});
  const input  = audioCtx.createMediaStreamSource(stream);
  const analyzer = audioCtx.createAnalyser();
  input.connect(analyzer);

  const canvas = document.createElement('canvas');
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  document.body.appendChild(canvas);

  const timeDomainArray = new Float32Array(analyzer.fftSize);
  const frequencyArray = new Float32Array(analyzer.frequencyBinCount);

  //let requestId = null;
  const render = () => {
    console.log('timeDomainArray:' + timeDomainArray);
    console.log('frequencyArray:' + frequencyArray);
    req = requestAnimationFrame(render);
  };
  req = requestAnimationFrame(render);

})
