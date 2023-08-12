const inputEl = document.querySelector('#input-el')
const saveBtn = document.querySelector('#save-btn')
const saveTabBtn = document.querySelector('#save-tab-btn')
const deleteAllBtn = document.querySelector('#delete-all-btn')
const ulEl = document.querySelector('#ul-el')

let myLeads = []

const getLocalLeads = JSON.parse(localStorage.getItem('myLeads'))

if (getLocalLeads) {
   myLeads = getLocalLeads
   renderLeads()
}

saveBtn.addEventListener('click', function () {
   const inputValue = inputEl.value
   inputEl.value = ''
   myLeads.push(inputValue)
   localStorage.setItem('myLeads', JSON.stringify(myLeads))
   renderLeads()
})

saveTabBtn.addEventListener('click', function () {
   chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
      myLeads.push(tabs[0].url)
      localStorage.setItem('myLeads', JSON.stringify(myLeads))
      renderLeads()
   })
})

deleteAllBtn.addEventListener('click', function () {
   localStorage.clear() 
   myLeads = []
   renderLeads()
})

function renderLeads() {
   let listLeads = ''
   for (let i = 0; i < myLeads.length; i++) {
      listLeads += `
         <li>
            <a target = '_blank' href='${myLeads[i]}'>
               ${myLeads[i]}
            </a>   
         </li>
      `
   }
   ulEl.innerHTML = listLeads
}