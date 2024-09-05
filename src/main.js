'use strict';

const MOODLE_APP_SRC = 'app/1005'

function monitorIframe() {
  let contentWrapper = document.getElementsByClassName('content-wrapper')
  if (!contentWrapper || contentWrapper.length === 0) {
    return
  }

  let observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      let iframe = mutation.target.getElementsByTagName('iframe')
      if (!iframe || iframe.length === 0) {
        return
      }

      if (iframe[0].src.endsWith(MOODLE_APP_SRC)) {
        console.log('Moodle activado !')
        iframe[0].addEventListener('load', () => onMoodleEnabled(iframe[0]))
      }
    })
  })

  let config = {
    childList: true,
  }

  observer.observe(contentWrapper[0], config)
}

function onMoodleEnabled(moodleFrame) {
  if (!moodleFrame) {
    return
  }

  let checkIfLoadedInterval = setInterval(() => {
    if (moodleFrame.contentDocument.getElementsByTagName('md-card').length > 0) {
      clearInterval(checkIfLoadedInterval)

      onMoodleLoaded(moodleFrame.contentDocument)
    }
  },100)
}

function onMoodleLoaded(moodleDocument) {
  hideJEcards(moodleDocument)
  hideEQcards(moodleDocument)
}

// Ocultar tarjetas de jefatura de estudios
function hideJEcards(moodleDocument) {
  let je = moodleDocument.getElementsByClassName('card_asig_je')
  for (let i = 0; i < je.length; i++) {
    je[i].style.display = 'none'
  }
  console.log('Ocultadas ' + je.length + ' tarjetas de Jefatura de estudios')
}

// Ocultar tarjetas de cursos equivalentes (duplicados)
function hideEQcards(moodleDocument) {
  let asig = moodleDocument.getElementsByClassName('card_asig')

  for (let i = 0; i < asig.length; i++) {
    // Cada tarjeta contiene un elemento con el código del curso y un hijo con un enlace al curso equivalente o a sí misma
    let curricular = asig[i].getElementsByClassName('curricular')
    if (!curricular || curricular.length === 0) {
      continue
    }

    let thisCourseCode = curricular[0]
    let eqCourseCode = thisCourseCode.getElementsByTagName('span')[0].title

    if (!eqCourseCode.startsWith(thisCourseCode.textContent.match(/\(([^)]+)\)/)[1])) {
      console.log('Ocultada asignatura duplicada: ' + thisCourseCode.textContent + ' que está cubierta en ' + eqCourseCode)
      asig[i].style.display = 'none'
    }
  }
}

monitorIframe()
