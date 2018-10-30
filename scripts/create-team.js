const url = 'http://localhost:3000'
let skillsToAdd = []

document.addEventListener('DOMContentLoaded', () => {
    // get event id via local storage

    // get all skills
    getAllSkills()
    // regex to autofill search/drop down
    // add button functionality
    const addButton = document.getElementById('add-button')
    const chipsDiv = document.getElementById('chipsDiv')
    addButton.addEventListener('click', () => {
        let skillInput = document.getElementById('skillsWanted')
        let skillAdded = document.getElementById('skillsWanted').value
        // create chip
        createChip(skillAdded, chipsDiv)
        // add value for submit
        skillsToAdd.push(skillAdded)
        skillInput.value = '' 
    })
    // on submit of form post team info 
    const postForm = document.getElementById('post-form')
    postForm.addEventListener('submit', (event) => {
        event.preventDefault()
        let formElements = event.target.elements
        for(let i = 0; i < formElements.length; i++){
            if(formElements[i].value){
                
            }
            
        }
    })
    // & for each skill value submited post for either association or add skill and association
    // add team user asscoiation

})

// Get all skills function
let getAllSkills = () => {
    axios.get(`${url}/skills`)
    .then((response) => {
        console.log(response.data)
    })
}

let postTeam = () => {
    // create object to send from submit
    axios.post(`${url}/teams`)
    .then((response) => {
        console.log(response)
    })
}

let createChip = (skillAdded, chipsDiv) => {
    let chipDiv = document.createElement('div')
        chipDiv.classList.add('chip')
        chipDiv.innerText = skillAdded
        chipDiv.setAttribute('id', skillAdded)
        chipsDiv.appendChild(chipDiv)
        let closeSpan = document.createElement('span')
        closeSpan.classList.add('closebtn')
        closeSpan.innerHTML = '&times;'
        chipDiv.appendChild(closeSpan)
        // add event listener to delete
        closeSpan.addEventListener('click', (event) => {
            let type = document.getElementById(skillAdded)
            type.parentNode.removeChild(type)
            skillsToAdd = skillsToAdd.filter((skill) => skill !== skillAdded)
        })
}