let myLeads=[]
const buttonEl=document.getElementById("input-btn")
const inputEl=document.getElementById("input-el")
const ulEL=document.getElementById("ul-el")
const deleteEL=document.getElementById("delete-btn")
const tabEL=document.getElementById("tab-btn")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

tabEL.addEventListener("click", function(){
    // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    // })
    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })

    
})

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEL.innerHTML = listItems
}

deleteEL.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

buttonEl.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    render(myLeads)
})