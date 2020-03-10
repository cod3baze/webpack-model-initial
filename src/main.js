import api from './services/api'

const btnElement = document.querySelector('button#btn')
// const appElement = document.querySelector('div#App')
const ulElement = document.querySelector('ul')
const loadElement = document.querySelector('div#load')

async function handle_git() {
  const response = await api.get('/users/eliasallex');
  const { data } = response

  return data
}

const loader = (load = true) => {
  if(load) {
    loadElement.style.display = "block"
  }else {
    loadElement.style.display = "none"
  }
}

const create_elements = (user_data) => {
  if(!user_data) return false

  console.log(ulElement)
  const {  name, url, avatar_url, bio } = user_data

  const nodes = `
    <li id="node">
      <header>
        <img src="${avatar_url}" style="width: 50px; height: 50px; border-radius: 50%;">
        <strong>${name}</strong>
      </header>
      <div>
        <p>${bio}</p>
        <a href="${url}">github</a>
      </div>
    </li>`

  ulElement.innerHTML = nodes
}

async function handle_click() {

  loader(true)

  try { 
    const res = await handle_git()

    if (!res) {
      return false
    }else {
      const { name, url, avatar_url, bio } = res

      const user_data = {
        name,
        url,
        avatar_url,
        bio,
      }

      create_elements(user_data)

    }
    loader(false)

    return true 

  }catch(e) {
    console.log(e)
  }
}

window.onload = btnElement.addEventListener('click', handle_click)
window.onload = loadElement.style.display = "none"
// window.onloadstart = loadElement.style.display = "block"

