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
    fetch(`${url}/get-founder/${id}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("spinner").remove()
            if (data.status === "success") {
                console.log(data.data);
                if (data.data.appLink === "") {
                    data.data.appLink = "#"
                }
                if (data.data.openToMeeting === "") {
                    data.data.openToMeeting = "Yes"
                }
                if (data.data.linkToMeeting === "") {
                    data.data.linkToMeeting = "#"
                }
                grid.innerHTML = `<div class="col-lg-3 col-sm-10 profile-header d-flex flex-column text-center">
                    <img src=${imgs[Math.floor(Math.random() * imgs.length)]} class="card-img-top mt-2" alt="founder image">
                    <h2 class="card-title mt-3" style="font-size: 1.325rem;"><strong>${data.data.name}</strong></h2>
                    <h5 class="card-title mt-3" style="font-size: 1rem;"><strong>${data.data.company}</strong> - ${data.data.companyCategory}</h5>
                    <p class="text-secondary mt-3">${data.data.about}</p>
                    <div class="card-footer d-flex flex-column align-items-center justify-content-around">
                        <div class="card-cta row m-auto justify-content-around">
                            <a href="${data.data.linkedin}" class="col-5 btn btn-primary m-2 d-flex" style="vertical-align: middle;"><img src="../assets/imgs/linkedin.png" alt="linkedin" style="width: 1.5rem;" class="me-2">Connect</a>
                            <a href="tel:${data.data.mobile}" class="col-5 btn btn-primary m-2 d-flex" style="vertical-align: middle;"><img src="../assets/imgs/dial.png" alt="profile" style="width: 1.5rem;" class="me-2">Dial</a>
                            <a href="${data.data.linkToMeeting}" class="col-5 btn btn-primary m-2 d-flex" style="vertical-align: middle;"><img src="../assets/imgs/calendly.png" alt="linkedin" style="width: 1.5rem;" class="me-2">Calendly</a>
                            <a href="${data.data.appLink}" class="col-5 btn btn-primary m-2 d-flex" style="vertical-align: middle;"><img src="../assets/imgs/play.png" alt="profile" style="width: 1.5rem;" class="me-2">Download</a>
                        </div>
                    </div>
                </div>
                <div class="col-lg-9 col-sm-10 profile-info">
                    <div class="info-side m-2" id="core-competencies">
                        <h2 class="info-header">
                            Core Competencies
                        </h2>
                        ${arrayToPills(data.data.coreCompetencies)}
                        <hr>
                    </div>
                    <div class="info-side m-2">
                        <h2 class="info-header">
                            I can advice YOU about
                        </h2>
                        <p class="text-dark">${replaceBackN(data.data.adviceToOthers)}</p>
                        <hr>
                    </div>
                    <div class="info-side m-2">
                        <h2 class="info-header">
                            I NEED advice about
                        </h2>
                        <p class="text-dark">${replaceBackN(data.data.adviceFromOthers)}</p>
                        <hr>
                    </div>
                    <div class="info-side m-2">
                        <h2 class="info-header">
                            Open to Meetings?
                        </h2>
                        <span class="badge rounded-pill text-bg-success">${data.data.openToMeeting}</span>
                        <hr>
                    </div>
                    <div class="info-side m-2">
                        <h2 class="info-header">
                            Comments / Notes / Links
                        </h2>
                        <p class="text-dark">${replaceBackN(data.data.comments)}</p>
                        <hr>
                    </div>
                </div>`
            } else {
                grid.innerHTML = `<h1 class="text-center text-light">${data.message} - ${data.error}. Please try again in a few moments!</h1>`
            }
        })
})

function replaceBackN(str) {
    // replace \n with <br>
    return str.replace(/(?:\r\n|\r|\n)/g, '<br>');
}

function arrayToPills(arr) {
    let pills = ""
    arr.forEach(element => {
        pills += `<span class="badge rounded-pill text-bg-primary m-1">${element}</span>`
    });
    return pills
}