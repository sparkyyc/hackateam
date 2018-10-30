const url = 'http://localhost:3000'

function getFormData() {
  let formData = {}

  formData.first_name = document.getElementById('inputFirstName').value
  formData.last_name = document.getElementById('inputLastName').value
  formData.skills = document.getElementById('skills').value
  formData.portfolio_url = document.getElementById('inputURL').value
  formData.email = document.getElementById('inputEmail').value

  return formData
}

function submitHandler(ev) {
  ev.preventDefault()

  // how do we get user id?
  axios.put(`/users/${id}`, getFormData())
    .then(() => { window.location.href = `{url}/html/dashboard.html` })
    .catch((err) => { console.log(err) })
}

document.addEventListener('DOMContentLoaded', () => {
  // get existing user info from database and fill in form
  // again we need user id
  axios.get(`/users/${id}`)
    .then(response => {
      let user = response.data[0]

      // populate form with current user data
      document.getElementById('inputFirstName').value = user.first_name
      document.getElementById('inputLastName').value = user.last_name
      // document.getElementById('skills').value = user.
      document.getElementById('inputURL').value = user.portfolio_url
      document.getElementById('inputEmail').value = user.email
    })
    .catch((err) => { console.log(err) })

  // on submit, get info out of form and update user in database
  document.getElementById('editProfileForm').addEventListener('submit', submitHandler)
})
