
const currUser= JSON.parse(localStorage.getItem("user"))
let createplaylsit =document.getElementById("create_playlsit")

createplaylsit.addEventListener("click",()=>{
  window.location.href="./user.html"
})

let homepage=document.getElementById("signup-button")

homepage.addEventListener("click",()=>{
  window.location.href="./index.html"
})

const url = `https://www.omdbapi.com/?i=tt3896198&apikey=b9e84ac1&s=`

async function fetchData(movieName,pageNo=1){
      try{
         let res = await fetch(`${url}${movieName}&page=${pageNo}`)
         res = await res.json()
      
         displaydata(res)
         paginate(res.totalResults)
    
        console.log(res)
      }catch(err){
           console.log(err)
      }
}

window.addEventListener("load",()=>{
    fetchData("dil")
})


let searchInput = document.getElementById("search-input");
let searchButton = document.getElementById("searchbtn")

searchButton.addEventListener("click", () => {
  const searchTerm = searchInput.value;
  
   fetchData(searchTerm);
  
});

const paginationContainer=document.getElementById("paginationcont")

function paginate(length) {
	const numOfBtns = Math.ceil(length/10)
	paginationContainer.innerHTML=null
	for(let i=1;i<=numOfBtns;i++){
		const btn = document.createElement("button")
    btn.style.cssText = "background-color: crimson; color: white; padding:5px; border: none; border-radius: 5px; cursor: pointer;margin-left:4px";
		btn.textContent = i
	
			btn.addEventListener("click", ()=>{
				
				fetchData(searchInput.value, i)
			})
		
		
		paginationContainer.append(btn)
	}
}




















let token =localStorage.getItem("token")
let div = document.getElementById("movie")

function displaydata(data){
  div.innerHTML=""

data.Search.forEach((ele)=>{


  let card = document.createElement("div")
  let image = document.createElement("img")
  let type = document.createElement("p")
  let title = document.createElement("h5")
  let year = document.createElement("p")
  let btnplaylist = document.createElement("button");

  image.src=ele.Poster
  type.textContent=ele.Type
 title.textContent=ele.Title
 year.textContent=ele.Year
 btnplaylist.innerText = "Playlsit"
btnplaylist.style.cssText ="background-color:crimson"

btnplaylist.addEventListener("click",()=>{
  fetchplyname(currUser._id)
          
            })

  card.append(image,title,year,type,btnplaylist)
  div.append(card)
})
// console.log(data)
}
function fetchplyname(id){
  fetch(`http://localhost:3000/play/playlist/${id}`,{
    headers :  {
      Authorization : token
    }
  })
  .then((res)=> res.json())
  .then((res)=>{
    console.log(res)
  })
}




//createplaylist

let createplaylist = document.getElementById("create_playlsit")
   

const popupForm = document.getElementById("popupForm");

createplaylist.addEventListener("click", () => {
    popupForm.style.display = "block"; // Show the popup
});

popupForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form submission
    
    // Handle form submission here
    
    popupForm.style.display = "none"; // Hide the popup after submission
});


let createplaylistbtn = document.getElementById("createplaylistbtn")


createplaylistbtn.addEventListener("click",()=>{
  
})

const onAdd = () => {
  const payload = {
    userid:currUser._id,
    title: document.getElementById("title").value,
    desc: document.getElementById("desc").value,
  
  };

  fetch("http://localhost:3000/play/create", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: localStorage.getItem("token")
    },
    body: JSON.stringify(payload)
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res);
    
      const newItem = document.createElement("div");
      newItem.innerHTML = `
        <div >
            <h5>Task</h5> 
          <p>Name: ${res.title}</p>
          <p>Notes: ${res.desc}</p>
     
            <button onclick="deletetodo('${res._id}')">delete</button>
       
        </div>
      `;
     window.location.href="./user.html"
      const parent = document.getElementById("cont");
      parent.appendChild(newItem);
      alert("play")
    })
    .catch((err) => {
      console.log(err);
    });
};




