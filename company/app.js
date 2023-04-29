let url;
if (window.location.href.includes("localhost")) {
    url = "http://localhost:5000/api/v1";
} else {
    url = "https://yuvrajdagur.pythonanywhere.com/api/v1";
}

const grid = document.getElementById("info-main")
const imgs = [
    'https://media-public.canva.com/k8zHg/MAFAEVk8zHg/1/t.png',
    'https://media-public.canva.com/stDv8/MAFLWJstDv8/1/t.png',
    'https://media-public.canva.com/s_cfs/MAFbZbs_cfs/1/t.png'
]

document.addEventListener('DOMContentLoaded', () => {
    // get query params
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    const id = params.id;
    console.log(id);
    fetch(`${url}/get-company/${id}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("spinner").remove()
            if (data.status === "success") {
                console.log(data.data);
                grid.innerHTML = `<div class="col-lg-3 col-sm-10 profile-header d-flex flex-column text-center">
                <img src=${data.data.companyImg} class="card-img-top mt-2" alt="founder image">
                <h2 class="card-title mt-3" style="font-size: 1.5rem;"><strong>${data.data.company}</strong></h2>
                <h5 class="card-title mt-3" style="font-size: 1rem;"><strong>${data.data.companyCategory}</strong></h5>
                <p class="text-secondary mt-3">${data.data.companyAbout}</p>
                <div class="card-footer d-flex flex-column align-items-center justify-content-around">
                    <div class="card-cta row m-auto justify-content-around">
                        <a href="${data.data.appLink}" class="btn btn-primary m-2 d-flex " style="vertical-align: middle;"><img src="../assets/imgs/play.png" alt="profile" style="width: 1.5rem;" class="me-2">Download</a>
                    </div>
                </div>
            </div>
            <div class="col-lg-9 col-sm-10 profile-info">
                <div class="info-side m-2" id="core-competencies">
                    <h2 class="info-header text-center">
                        Founders
                    </h2>
                    <div class="row m-auto justify-content-center">
                    ${addFounderCards(data.data.founders)}
                    </div>
                    <hr>
                </div>
            </div>`
            } else {
                grid.innerHTML = `<h1 class="text-center text-dark">${data.message} - ${data.error}. Please try again in a few moments!</h1>`
            }
        })
})

function replaceBackN(str) {
    // replace \n with <br>
    return str.replace(/(?:\r\n|\r|\n)/g, '<br>');
}

function addFounderCards(arr) {
    let pills = ""
    arr.forEach(element => {
        pills += `<div class="card col-sm-12 col-lg-4 mx-2 my-4 text-center" style="width: 18rem; border-radius: 20px">
        <img src=${imgs[Math.floor(Math.random() * imgs.length)]} class="founder-card-img-top" alt="founder image">
        <div class="card-body d-flex flex-column align-items-center">
            <h2 class="card-title" style="font-size: 1.1rem;"><strong>${element.name}</strong></h2>
        </div>
        <div class="card-footer d-flex flex-column align-items-center justify-content-around">
            <div class="card-cta d-flex flex-row">
                <a href="/founder/?id=${element.email}" class="btn btn-outline-primary mx-2 d-flex" style="vertical-align: middle;"><img src="../assets/imgs/profile.png" alt="profile" style="width: 1.5rem;" class="me-2">Details</a>
            </div>
        </div>
    </div>`
    });
    return pills
}