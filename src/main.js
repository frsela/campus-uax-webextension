'use strict';

function getMoodleFrame() {
  return document.getElementById('iFrameID');
}

function getMoodleCards(moodleFrame) {
  console.log(moodleFrame);
  return Promise.resolve(moodleFrame.getElementsByTagName('md-card'));
}

function hideNoClassCards(cards) {
  for (let i = 0; i < cards.length; i++) {
    let card = cards[i];
    if (card.getElementsByTagName('button').length === 0)
      card.style.display = 'none';
  }
}

function main() {
/*
  let iframe = getMoodleFrame();
  if (!iframe) {
    console.log('Error getting Campus (Moodle) Frame');
    return;
  }

  iframe.onload =  () => {
    console.log('hi');
    let moodleContent = iframe.contentDocument;
    moodleContent.body.onload = () => {
      console.log('hi2');
      getMoodleCards(moodleContent)
      .then(cards => hideNoClassCards(cards));
    };
  };
 */

  document.onload = () => {
    console.log('hi2');
    getMoodleCards(document)
    .then(cards => hideNoClassCards(cards));
  }
}

main();

setTimeout(() => {
/*
  let iframe = getMoodleFrame();
  if (!iframe) {
    console.log('Error getting Campus (Moodle) Frame');
    return;
  }
*/
  getMoodleCards(document)
  .then(cards => hideNoClassCards(cards));
}, 2000);

getMoodleCards(document)
.then(cards => hideNoClassCards(cards));
