const API = 'http://localhost:3000/people'
console.log('hi')





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
    profileContactInfo.textContent = profile.contactInfo 
    profileName.textContent = profile.name
    profileAboutMe.textContent = profile.aboutMe
    profileRoomPref.textContent = profile.roomatePref 
    profilePropType.textContent = profile.propertyType
    profileCity.textContent = profile.city
    profileImg.src = profile.image
    profileLikes.textContent = `Likes: ${profile.likes}`
    profileLikeBtn.textContent = 'Like'
    
    profileCard.append(profileName, profileImg, profileCity, profilePropType, profileRoomPref, profileContactInfo, profileAboutMe, profileLikes, profileLikeBtn)


    const profileContainer = document.querySelector('#profileList')
    profileContainer.appendChild(profileCard)

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


fetch(API)
.then (resp => resp.json())
.then(profile => profile.forEach(renderProfile))

