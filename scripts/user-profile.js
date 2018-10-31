const url = 'http://localhost:3000'

// temporarily hardcoding a user id of 1
const id = 1

let skillsToAdd = []

function getFormData() {
  let formData = {}

  formData.first_name = document.getElementById('inputFirstName').value
  formData.last_name = document.getElementById('inputLastName').value
  formData.skills = document.getElementById('skills').value
  formData.portfolio_url = document.getElementById('inputURL').value

  return formData
}

function submitHandler(ev) {
  ev.preventDefault()

  axios.put(`${url}/users/${id}`, getFormData())
    .then(() => { window.location.href = `http://localhost:3001/html/dashboard.html` })
    .catch((err) => { console.log(err) })
}

let createChip = (skillAdded, isExistingSkill, chipsDiv) => {
  let chipDiv = document.createElement('div')
  chipDiv.classList.add('chip')
  chipDiv.innerText = skillAdded
  chipDiv.setAttribute('id', skillAdded)
  let closeSpan = document.createElement('span')
  closeSpan.classList.add('closebtn')
  closeSpan.innerHTML = '&times;'
  chipDiv.appendChild(closeSpan)
  chipsDiv.appendChild(chipDiv)

  // add event listener to delete
  closeSpan.addEventListener('click', (event) => {
    let type = document.getElementById(skillAdded)
    type.parentNode.removeChild(type)

    // if existing skill, remove from database when you remove the chip
    if (isExistingSkill) {
      axios.delete(`${url}/skills/${id}`, { data: { user_id: id } })
        .catch(err => { console.log(err) })
    }
    // if newly added skill, remove from list of skills to add when you remove chip
    else {
      skillsToAdd = skillsToAdd.filter((skill) => skill !== skillAdded)
    }
  })
}

document.addEventListener('DOMContentLoaded', () => {
  const addButton = document.getElementById('add-button')
  const chipsDiv = document.getElementById('chipsDiv')

  // get existing user info from database and fill in form
  axios.get(`${url}/users/${id}`)
    .then(response => {
      let user = response.data

      // populate form with current user data
      document.getElementById('inputFirstName').value = user.first_name
      document.getElementById('inputLastName').value = user.last_name
      document.getElementById('inputURL').value = user.portfolio_url
      document.getElementById('inputEmail').value = user.email
      // grab skills data
    })
    .catch((err) => { console.log(err) })

  // get all current skills for user and make chips for them
  axios.get(`${url}/users/${id}/skills`)
    .then(response => {
      response.data.forEach(skill => { createChip(skill.type, true, chipsDiv) })
    })

  // get list of all possible skills and append to datalist
  axios.get(`${url}/skills`)
    .then(response => {
      let skillsDatalist = document.getElementById('skills')
      response.data.forEach(skill => {
        let option = document.createElement('option')
        option.setAttribute('value', skill.type)
        skillsDatalist.appendChild(option)
      })
    })

  addButton.addEventListener('click', () => {
    let skillInput = document.querySelector(`[list='skills']`)
    let skillAdded = skillInput.value

    createChip(skillAdded, false, chipsDiv)
    // add value for submit
    skillsToAdd.push(skillAdded)
    skillInput.value = ''
  })

  // on submit, get info out of form and update user in database
  document.getElementById('editProfileForm').addEventListener('submit', submitHandler)
})
