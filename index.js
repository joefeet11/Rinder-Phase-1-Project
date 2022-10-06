const API = 'http://localhost:3000/people'
console.log('hi')
 
 //const backBtn
 profileArr = []
 
 
 
 let profileContainer = document.querySelector('#profileList')
function clearContainer(data){
    profileContainer.textContent = ""
    renderProfile(data)

}




const renderProfile = profile => {

    const profileCard = document.createElement('li')
    const profileContactInfo = document.createElement('p')
    const profileName = document.createElement('h3')
    const profileAboutMe = document.createElement('p')
    const profileRoomPref = document.createElement('p')
    const profilePropType = document.createElement('p')
    const profileCity = document.createElement('p')
    const profileImg = document.createElement('img')
    const profileLikes = document.createElement('p')
    const profileLikeBtn = document.createElement('button')

    
    
    
    

    
    
    
    


    profileCard.className = 'list-li'
    profileContactInfo.innerHTML = `<b>Contact Info:</b> ${profile.contactInfo}` 
    profileName.innerHTML = `${profile.name}`
    profileAboutMe.innerHTML = `<b>About Me:</b> ${profile.aboutMe}`
    profileRoomPref.innerHTML = `<b>Roomate Preferences:</b> ${profile.roomatePref}`
    profilePropType.innerHTML = `<b>Property Type:</b> ${profile.propertyType}`
    profileCity.innerHTML = `<b>City of Interest:</b> ${profile.city}`
    profileImg.src = profile.image
    profileLikes.innerHTML = `<b>Likes:</b> ${profile.likes}`
    profileLikeBtn.textContent = 'Like'
    
    profileCard.append(profileName, profileImg, profileCity, profilePropType, profileRoomPref, profileContactInfo, profileAboutMe, profileLikes, profileLikeBtn)


    

    profileContainer.appendChild(profileCard)


    profileLikeBtn.addEventListener('mouseenter',(e) => {
        e.target.style.backgroundColor = "white";
    
    })
    profileLikeBtn.addEventListener('mouseleave', (e) => {
        e.target.style.backgroundColor = ""
    })

    profileLikeBtn.addEventListener('click', (e) => {
        profile.likes += 1
        profileLikes.textContent = `Likes: ${profile.likes}`
        console.log(e)
        console.log(profile.likes)
        patchLikes(profile)
        
    })

     


}

document.querySelector('#inputForm').addEventListener('submit', createNewProfile);

function createNewProfile(e) {
    e.preventDefault();

    let newProfile = {
        
        name: e.target.name.value,
        image: e.target.imgUrl.value,
        contactInfo: e.target.contactInfo.value,
        likes: 0,
        aboutMe: e.target.aboutMe.value,
        roomatePref: e.target.roomatePref.value,
        propertyType: e.target.propType.value,
        city: e.target.city.value
    };
    console.log(newProfile)
    renderProfile(newProfile)
    postProfile(newProfile)
    .catch(console.log('did not work'))


    
}






function postProfile(data) {
    return fetch('http://localhost:3000/people',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

function patchLikes(data) {
    fetch(`http://localhost:3000/people/${data.id}`,{
    method: 'PATCH', 
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)

    })
    .then(res => res.json())
    .then(data => console.log(data))
}



const nextBtn = document.querySelector('#nextBtn')
const prevBtn = document.querySelector('#prevBtn')
function moveThroughProfiles(array) {
    let item = 1
    nextBtn.addEventListener("click", goNext)

    
    
    function goNext() {
        
    if(item< array.length){
        item ++
        fetchProfile()

        }
        else{alert("No more new profiles")}
    }
    
    prevBtn.addEventListener('click', goPrev)
        function goPrev() {
            
            if(item>1){
                item --
                fetchProfile()
            }

        }
        
        function fetchProfile(){
            fetch(`http://localhost:3000/people/${item}`)
            .then(resp => resp.json())
            .then(clearContainer)
            
        }
        fetchProfile()
        

}








//function fetchProfile(){
    //fetch(`http://localhost:3000/people/${item}`)
    //.then(resp => resp.json())
    //.then(renderProfile)
    
//}
//fetchProfile()

 function fetchFullProfile(){
    fetch(`http://localhost:3000/people`)
    .then(resp => resp.json())
    .then(moveThroughProfiles)

 }
 fetchFullProfile()


// will show the form when the butten is pressed and hide it again 
const btn = document.createElement('button');
btn.id = "formShowButton"
btn.textContent = "Hide Form"
const div1 = document.querySelector("div")
div1.append(btn)

btn.addEventListener('click', () => {
  const form = document.querySelector('form');

  if (form.style.display === 'none') {
    // SHOWS the form
    form.style.display = 'block';
    btn.textContent = 'Hide Form'
  } else {
    // HIDES the form
    form.style.display = 'none';
    btn.textContent = 'Show Form'
  }
});