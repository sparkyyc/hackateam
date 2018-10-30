const url = 'http://localhost:3000'
let skillsToAdd = []

document.addEventListener('DOMContentLoaded', () => {
    // get event id via local storage
    let event_id = 1
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
    // checkbox functionality
    let checkBox = document.getElementById('has-idea')
        checkBox.addEventListener('click', () => {
            if(checkBox.classList.contains('false')) {
                checkBox.classList.add('true')
                checkBox.classList.remove('false')
            } else {
                checkBox.classList.add('false')
                checkBox.classList.remove('true')
            }
        })
    // on submit of form post team info 
    const postForm = document.getElementById('post-form')
    postForm.addEventListener('submit', (event) => {
        event.preventDefault()
        let formElements = event.target.elements
        formElements[0].value = skillsToAdd
        // create object to send from submit
        checkBox = document.getElementById('has-idea')
        let ideaBool 
        if(checkBox.classList.contains('false')){
            ideaBool = false
        } else {
            ideaBool = true
        }
        let teamInfo = {
            "event_id": event_id,
            "has_idea": ideaBool
        }
        
        for(let i = 0; i < formElements.length; i++){
            if(formElements[i].value){
                teamInfo[formElements[i].name] = formElements[i].value
                console.log(formElements[i].value)
            }
            // "team_size_limit": req.body.team_size_limit,
            // "has_idea": req.body.idea,
            // "description": req.body.description
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

let postTeam = (teamInfo) => {
    
    axios.post(`${url}/teams`, teamInfo)
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