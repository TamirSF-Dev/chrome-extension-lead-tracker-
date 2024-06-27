let myLeads = []
let i = 0
const inputEl = document.getElementById("input-el")
const ulel = document.querySelector("#ul-el")
let listitems = ""
const clearbtn = document.getElementById("clear-btn")
const deletebtn = document.getElementById("delete-btn")
const tabbtn = document.getElementById("tab-btn")

const inputbtn = document.querySelector("#input-btn")

const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads"))

tabbtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){

        /*let activetab = tabs[0];
        let activetabid = activetab.id;*/
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    });
})

if(leadsFromLocalStorage)
{
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

inputbtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    console.log(myLeads)
    inputEl.value = null
    //myLeads = JSON.stringify(myLeads)
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    //console.log(typeof myLeads)

    render(myLeads)

    console.log(localStorage.getItem("myLeads"))
})

clearbtn.addEventListener("dblclick", function() {
    console.log("double clicked")
    localStorage.clear()
    myLeads = []
    console.log(myLeads)
    render(myLeads)
})

deletebtn.addEventListener("click", function(){
    console.log("button clicked")
    localStorage.clear()
    //localStorage.setItem("myLeads", JSON.stringify(myLeads))
    //renderleads()
    if(leadsFromLocalStorage)
    {
        myLeads = leadsFromLocalStorage
        myLeads.shift()
        render(myLeads)
    }
})

function render(leads){
    listitems = ""
    for (let i=0; i < leads.length; i++) {
        listitems += `
        <li>
        <a href="${leads[i]}" target='blank'>${leads[i]}</a>
        </li>`
        /*const li = document.createElement("li")
        li.textContent = myLeads[i]
        ulel.append(li)*/
        console.log(listitems)
    }
    ulel.innerHTML = listitems
}
