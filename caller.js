

console.log('caller.js');


let peer = new RTCPeerConnection(null, null);
let channel = peer.createDataChannel('send', null);

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
  console.log('ICE candidate (pc1)', event, JSON.stringify(peer.localDescription))
  if (event.candidate == null) {
    // $('#localOffer').html(JSON.stringify(pc1.localDescription))
    let element = document.getElementById('localoffer');
    element.value = JSON.stringify(peer.localDescription);
  }
}
channel.onopen = () => {
  console.log('onopen');
  channel.send('woohoo');
}
channel.onmessage = event => {
  console.log('onmessage', event)
}
channel.onclose = () => {
  console.log('oncose');
}


peer.createOffer().then(description => {
  console.log('got description', description.sdp)
  peer.setLocalDescription(description);
}, error => {
  console.log('error', error)
});


function handleClick(event) {
  console.log('handleClick', event);

  let answer = document.getElementById('remoteanswer');
  console.log('answer', answer);
  peer.setRemoteDescription(new RTCSessionDescription(JSON.parse(answer.value)));
}
