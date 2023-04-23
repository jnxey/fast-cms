import { ref } from 'vue'

export const current = ref(null)
export const slider = { el: null }
export const position = { x: 0, y: 0 }

export function gestureStart(e, config, dom) {
  current.value = config
  position.x = e.pageX
  position.y = e.pageY
  slider.el = dom
  document.body.appendChild(slider.el)
  _setSliderPosition(position.x, position.y)
}

export function gestureInit() {
  document.body.addEventListener('mousemove', _gestureMove)
  document.body.addEventListener('mouseup', _gestureEnd)
}

export function gestureDestroy() {
  document.body.removeEventListener('mousemove', _gestureMove)
  document.body.removeEventListener('mouseup', _gestureEnd)
}

function _setSliderPosition(x, y) {
  slider.el.style.position = 'fixed'
  slider.el.style.zIndex = '100'
  slider.el.style.top = y + 'px'
  slider.el.style.left = x + 'px'
  slider.el.style.boxShadow = '0px 0px 10px rgba(0,0,0,0.3)'
}

function _gestureMove(e) {
  if (!current.value) return
  position.x = e.pageX
  position.y = e.pageY
  _setSliderPosition(position.x, position.y)
}

function _gestureEnd(e) {
  if (!current.value) return
  document.body.removeChild(slider.el)
  current.value = null
  slider.el = null
}
