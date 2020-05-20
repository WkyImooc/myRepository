
export function getLocalStroge(name, isJson = false) {
  if(isJson){
    return JSON.parse(window.localStorage.getItem(name))
  } else
    return window.localStorage.getItem(name)
}

export function setLocalStroge(name, content) {
  if (typeof content === 'string'){
    window.localStorage.setItem(name, content)
  }else {
    window.localStorage.setItem(name, JSON.stringify(content));
  }
}

export function removeLocalStroge(name) {
  window.localStorage.removeItem(name)
}
