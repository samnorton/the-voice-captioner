window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const voiceRecognition = new SpeechRecognition();
voiceRecognition.interimResults = true;

let paragraph = document.createElement('p');
const caption = document.querySelector('.caption');
caption.appendChild(paragraph);


voiceRecognition.addEventListener('result', e => {
   let transcript = [...e.results[0]].map(result => result.transcript).join('');
   transcript = `${transcript.charAt(0).toUpperCase()}${transcript.slice(1).toLowerCase()}.`
   paragraph.innerHTML = transcript;


   if(e.results[0].isFinal){
     paragraph = document.createElement('p');
     caption.appendChild(paragraph);
   }
});

voiceRecognition.addEventListener('end', voiceRecognition.start);
voiceRecognition.start();

const copyToClipboard = (containerid) => {
   if (document.selection) {
     let range = document.body.createTextRange();
     range.moveToElementText(document.getElementById(containerid));
     range.select().createTextRange();
     document.execCommand("copy");
   } else if (window.getSelection) {
     let range = document.createRange();
     range.selectNode(document.getElementById(containerid));
     window.getSelection().addRange(range);
     document.execCommand("copy");
   }
 }

