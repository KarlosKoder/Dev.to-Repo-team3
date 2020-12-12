let endpointPostData = "https://desafio-esp-js-default-rtdb.firebaseio.com/post/.json"
let containerPost = ".container-cards"

//Listener Filtros de Barra Fechas
$(".filters li").click((event) => {
    let value = $(event.target).text()
    getTheJson(value)
})


//Request de GET a AJAX
const getTheJson = criteria => {
    $.ajax({
        url: endpointPostData,
        method: "GET",
        success: data => {
            switchingCriteria(data, criteria)
           // fillDataToCards(data, criteria)
        },
        error: error => {
            console.log(error)
        },
    });
}

const switchingCriteria = (theJson, criteria) => {
    let today = new Date()
    let diffDate = 0
    switch (criteria) {
        case "Feed":
            diffDate = 0
            break
        case "Week":
            const week = 518400000
            diffDate = today - week
            break
        case "Month":
            const month = 2592000000
            diffDate = today - month
            break
        case "Year":
            const year = 31622400000
            diffDate = today - year
            break
        case "Infinity":
            diffDate = 0
            break
        case "Latest":
            diffDate = 0
            break
    }
    console.log(new Date(diffDate))
    fillDataByCriteria(theJson,criteria,diffDate)
}

const fillDataByCriteria = (theJson, filter, criteria) => {
    $(containerPost).empty()
    let i = 0
    let flag = true
    for (key in theJson) {
        let object = theJson[key]
        let { title, username, datetime, tags, URL } = object
        tags = tags.split(",")
        let firstPost = `
        <div class="class">
            <img class="img-fluid" src="${URL}" alt=""/>
        </div>`
        i === 0 ? firstPost = firstPost : firstPost = ""
        let date = new Date(datetime)
        if (date >= criteria && flag === true) {
            let newCard = `
            <section class="card rounded main-noticia">
                ${firstPost}
                <!-- aqui termina la imagen principal -->
                <!-- aqui empieza el usuario e imagen de usuario, nombre y fecha -->
                <div class="container bg-white">
                    <div class="row">
                        <div class="col mt-3">
                            <a class="htext hover d-flex">
                                <img class="imag-user3 img-fluid rounded-circle" src="https://picsum.photos/200/300" alt="" />
                                <div class="etimain mb-1 ml-2">
                                    <h6 class="eti4 mb-0">${username}</h6>
                                    <span class="eti3">${datetime}</span>
                                </div>
                            </a>
                        </div>
                    </div>
                    <!-- aqui termina el usuario e imagen de usuario, nombre y fecha -->
                    <!-- aqui empieza la parte media card principal -->
                    <div class="row">
                        <div class="container">
                            <div class="row">
                                <div class="col mb-3">
                                    <a class="etimain hover d-flex">
                                        <div class=" mb-1">
                                            <h2 class="eti4 margn1">${title}</h2>
                                        </div>
                                    </a>
                                    <div class="etimain margn1">
                                        <a class="eti1 pr-2 rounded mr-1" href="#">${tags[0]}</a>
                                        <a class="eti2 pr-2 rounded mr-1" href="#">${tags[1]}</a>
                                        <a class="eti3 pr-2 rounded" href="#">${tags[2]}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- aqui termina la parte media card principal -->
                    <!-- aqui empieza el footer card principal -->
                    <div class="container ml-4">
                        <div class="row">
                            <div class="container botonesm1 d-flex mr-4 mb-3">
                                <div class="col-6 p-0">
                                    <button type="button" class="margin1 boton1 mr-2 btn btn-light">12
                                        reactions</button>
                                    <button type="button" class="margin1 boton1 btn btn-light ">3
                                        comments</button>
                                </div>
                                <div class="col-6 d-flex justify-content-end p-0">
                                    <div>
                                        <span class="h6i mr-2 align-middle">15 min read</span>
                                    </div>
                                    <button type="button"
                                        class="botonsave btn btn-outline-secondary" data-entry-key=${key}>Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            `
            $(containerPost).append(newCard)
            i++
            filter === "Latest" && i === 10 ? flag = false : flag = true
        }
    }
    $(containerPost).html() === "" ? $(containerPost).html(`<p class="p-3 font-weight-bold w-100">No results match that query.</p>`) : addBtnListener()
}


//Llenado de Cards
const fillDataToCards = (theJson,criteria) => {
    $(containerPost).empty()
    let i = 0
    for (key in theJson) {
        let object = theJson[key]
        let { title, username, datetime, tags, URL } = object
        tags = tags.split(",")
        let firstPost = `
        <div class="class">
            <img class="img-fluid" src="${URL}" alt=""/>
        </div>`
        i === 0 ? firstPost = firstPost : firstPost = ""
        if (title.includes(criteria)) {
            let newCard = `
            <section class="card rounded main-noticia">
                ${firstPost}
                <!-- aqui termina la imagen principal -->
                <!-- aqui empieza el usuario e imagen de usuario, nombre y fecha -->
                <div class="container bg-white">
                    <div class="row">
                        <div class="col mt-3">
                            <a class="htext hover d-flex">
                                <img class="imag-user3 img-fluid rounded-circle" src="https://picsum.photos/200/300" alt="" />
                                <div class="etimain mb-1 ml-2">
                                    <h6 class="eti4 mb-0">${username}</h6>
                                    <span class="eti3">${datetime}</span>
                                </div>
                            </a>
                        </div>
                    </div>
                    <!-- aqui termina el usuario e imagen de usuario, nombre y fecha -->
                    <!-- aqui empieza la parte media card principal -->
                    <div class="row">
                        <div class="container">
                            <div class="row">
                                <div class="col mb-3">
                                    <a class="etimain hover d-flex">
                                        <div class=" mb-1">
                                            <h2 class="eti4 margn1">${title}</h2>
                                        </div>
                                    </a>
                                    <div class="etimain margn1">
                                        <a class="eti1 pr-2 rounded mr-1" href="#">${tags[0]}</a>
                                        <a class="eti2 pr-2 rounded mr-1" href="#">${tags[1]}</a>
                                        <a class="eti3 pr-2 rounded" href="#">${tags[2]}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- aqui termina la parte media card principal -->
                    <!-- aqui empieza el footer card principal -->
                    <div class="container ml-4">
                        <div class="row">
                            <div class="container botonesm1 d-flex mr-4 mb-3">
                                <div class="col-6 p-0">
                                    <button type="button" class="margin1 boton1 mr-2 btn btn-light">12
                                        reactions</button>
                                    <button type="button" class="margin1 boton1 btn btn-light ">3
                                        comments</button>
                                </div>
                                <div class="col-6 d-flex justify-content-end p-0">
                                    <div>
                                        <span class="h6i mr-2 align-middle">15 min read</span>
                                    </div>
                                    <button type="button"
                                        class="botonsave btn btn-outline-secondary" data-entry-key=${key}>Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            `
            $(containerPost).append(newCard)
            i++
        }
    }
    $(containerPost).html() === "" ? $(containerPost).html(`<p class="p-3 font-weight-bold w-100">No results match that query.</p>`) : addBtnListener()
}

const savePost = savedPosts => {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           // Typical action to be performed when the document is ready:
           //xhttp.responseText;
           let response = JSON.parse(xhttp.response);
           console.log(response)
           /*getItems()*/
        }
    };
    // xhttp.open("POST", "https://ajaxclass-1ca34.firebaseio.com/carlosv/koders/.json ",true);
    xhttp.open("POST", "https://desafio-esp-js-default-rtdb.firebaseio.com/readinglist/.json ",true);
    xhttp.send( JSON.stringify( savedPosts ) );
}

const addBtnListener = () => {
    let buttons = document.querySelectorAll(".botonsave")
    console.log(buttons)
    buttons.forEach( button => {
        button.addEventListener("click", event => {
            console.log(event)
            console.log(event.target)
            console.log(event.target.dataset)
            console.log(event.target.dataset.entryKey)
        
            let entryKey = event.target.dataset.entryKey
            savePost(entryKey)
        })
    })
}


//Listener Search
$(".input-search").change((event) => {
    event.preventDefault()
    let value = event.target.value
    getTheJson(value)
})

getTheJson(0)




















