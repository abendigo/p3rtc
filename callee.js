

console.log('callee.js');

let peer = new RTCPeerConnection(null, null);

peer.onaddstream = event => {
  console.log('onaddstream', event);
}
peer.onconnection = event => {
  console.log('onconnection', event);
}
peer.onsignalingstatechange = event => {
  console.log('onsignalingstatechange', event);
}
peer.oniceconnectionstatechange = event => {
  console.log('oniceconnectionstatechange', event);
}
peer.onicegatheringstatechange = event => {
  console.log('onicegatheringstatechange', event);
}

peer.onicecandidate = event => {
  console.log('ICE candidate (pc2)', event)
  if (event.candidate == null) {
    // $('#localAnswer').html(JSON.stringify(pc2.localDescription))
    let answer = document.getElementById('localanswer');
    answer.value = JSON.stringify(peer.localDescription);
  }
}
peer.ondatachannel = event => {
  console.log('ondatachannel', event);
  let channel = event.channel;
  channel.send({message: 'woohoo'})

  channel.onopen = event => {
    console.log('onopen', event);
  }
  channel.onmessage = event => {
    console.log('onmessage', event);
  }
}

function handleClick(event) {
  console.log('handleClick', event)

  let element = document.getElementById('remoteoffer');
  console.log('element', element);
  console.log('remoteoffer', element.value);

  peer.setRemoteDescription(new RTCSessionDescription(JSON.parse(element.value)));
  peer.createAnswer().then(description => {
    peer.setLocalDescription(description);
    // let answer = document.getElementById('localanswer');
    // console.log('answer', answer);
    // answer.value = JSON.stringify(description);
  });
}
