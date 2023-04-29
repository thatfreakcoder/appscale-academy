let url;
if (window.location.href.includes("localhost")) {
    url = "http://localhost:5000/api/v1";
} else {
    url = "https://yuvrajdagur.pythonanywhere.com/api/v1";
}

const grid = document.getElementById("founder-grid")
const imgs = [
    'https://media-public.canva.com/k8zHg/MAFAEVk8zHg/1/t.png',
    'https://media-public.canva.com/stDv8/MAFLWJstDv8/1/t.png',
    'https://media-public.canva.com/s_cfs/MAFbZbs_cfs/1/t.png'
]

document.addEventListener('DOMContentLoaded', () => {
    fetch(`${url}/get-all-founders`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("spinner").remove()
            if (data.status === "success") {
                data.data.forEach(element => {
                    grid.innerHTML += `<div class="card col-12 mx-2 my-4 text-center" style="width: 18rem;">
                    <img src=${imgs[Math.floor(Math.random() * imgs.length)]} class="card-img-top" alt="founder image">
                    <div class="card-body d-flex flex-column align-items-center">
                        <h2 class="card-title" style="font-size: 1.325rem;"><strong>${element.name}</strong></h2>
                        <h5 class="card-title">${element.company}</h5>
                        <p class="card-text">${element.about}</p>
                    </div>
                    <div class="card-footer d-flex flex-column align-items-center justify-content-around">
                        <div class="card-cta d-flex flex-row">
                            <a href="${element.linkedin}" target="_blank" class="btn btn-primary mx-2 d-flex" style="vertical-align: middle;"><img src="./assets/imgs/linkedin.png" alt="linkedin" style="width: 1.5rem;" class="me-2">Connect</a>
                            <a href="founder/?id=${element.id}" class="btn btn-outline-primary mx-2 d-flex" style="vertical-align: middle;"><img src="./assets/imgs/profile.png" alt="profile" style="width: 1.5rem;" class="me-2">Details</a>
                        </div>
                    </div>
                </div>`
                })
            } else {
                grid.innerHTML = `<h1 class="text-center text-light">${data.message} - ${data.error}. Please try again in a few moments!</h1>`
            }
        })
})

document.getElementById('sort-by-company').addEventListener('click', () => {
    document.getElementById('sort-title').innerHTML = `<strong>Companies</strong>`
    document.getElementById('sort-list').innerHTML = `<li><button class="dropdown-item" id="sort-by-founders"><h2>Founders</h2></button></li>
    <li><button class="dropdown-item" id="sort-by-category"><h2>Categories</h2></button></li>`
    grid.innerHTML = `<div class="spinner-border text-light m-5" id="spinner" role="status" style="width: 10rem; height: 10rem;">
    <span class="sr-only visually-hidden">Loading...</span>
</div>`
    fetch(`${url}/get-all-companies`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("spinner").remove()
            if (data.status === "success") {
                data.data.forEach(element => {
                    grid.innerHTML += `<div class="card col-12 mx-2 my-4 text-center" style="width: 18rem;">
                    <img src=${element.img} class="card-img-top" alt="founder image" style="width: 10rem!important">
                    <div class="card-body d-flex flex-column align-items-center">
                        <h2 class="card-title" style="font-size: 1.325rem;"><strong>${element.name}</strong></h2>
                        <h5 class="card-title">${element.category}</h5>
                        <p class="card-text">${element.about}</p>
                        <div class="card-cta d-flex flex-row">
                            <a href="${element.download}" target="_blank" class="btn btn-primary mx-2 d-flex" style="vertical-align: middle;"><img src="./assets/imgs/linkedin.png" alt="linkedin" style="width: 1.5rem;" class="me-2">Connect</a>
                            <a href="company/?id=${element.id}" class="btn btn-outline-primary mx-2 d-flex" style="vertical-align: middle;"><img src="./assets/imgs/profile.png" alt="profile" style="width: 1.5rem;" class="me-2">Details</a>
                        </div>
                    </div>
                </div>`
                })
            } else {
                grid.innerHTML = `<h1 class="text-center text-light">${data.message} - ${data.error}. Please try again in a few moments!</h1>`
            }
        })
})