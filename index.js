const buttons = document.querySelectorAll("button")
const tracks  = document.querySelector('.tracks')
console.log(tracks)
fetch("./data.json")
.then((res)=>res.json())
.then(data=> timeTrack(data))

function containsWhitespace(str) {
    return /\s/.test(str);
  }

const timeTrack = (data) =>{
  buttons.forEach((btn)=>{
      btn.addEventListener('click',(e)=>{
        const previous = document.getElementById("active")
        if(previous){
            previous.setAttribute("id", "")
        }
       
        e.target.setAttribute("id","active")
        const card = document.createElement('div')
        const attr = document.createAttribute("class")
        attr.value = "the-cards"
        card.setAttributeNode(attr)
         const frame = e.target.getAttribute("class")
        data.forEach((value)=>
            card.innerHTML +=` 
             <div class="card">
             <div class="top">
             <img src="./images/icon-${containsWhitespace(value.title) ? value.title.toLowerCase().replace(/\s/g, "-") : value.title.toLowerCase()}.svg" alt="">
         </div>
         <div class="bottom">
             <div class="todo">
                 <h3>${value.title}</h3>
                 <img src="./images/icon-ellipsis.svg" alt="">
             </div>
             <div class="time">
             <h3>${value.timeframes[frame].current}hrs</h3>
             <p>${frame === "daily" ? "Yesterday" : frame === "weekly" ? "Last-week" : "Last-month"} - ${value.timeframes[frame].previous}hrs </p>
             </div>
         </div>
             </div>
            `
        )
        tracks.innerHTML = ""
        tracks.appendChild(card)
      })
      
  })
}
