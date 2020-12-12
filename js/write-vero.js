//------------------------------------------Codigo para Write-Post------------------------------------------------
let newPost = {}
let endpointPostData = "https://desafio-esp-js-default-rtdb.firebaseio.com/post/.json"

//--------Funciones para agregar un nuevo Post------------
//Listener de Inputs del Formulario
$("input, select, textarea").change(event => {
    let property = event.target.name
    let value = event.target.value
    newPost[property] = value
    console.log(newPost)
})

//Listener de Boton Publicar
$(".btn-publish").click(() => {
    postAjax(newPost)
    newPost = {}
})

//Request de POST   *****Cambiara al unir con main (hacer mi funcion all in one)
const postAjax = (theEntry) => {
    $.ajax({
        url: endpointPostData,
        method: "POST",
        data: JSON.stringify(theEntry),
        success: data => {
            console.log(data)
        },
        error: "",
    });
}

//--------Funciones para mostrar el Preview------------
//Llenado de datos en el Preview
const fillPreviewData = () => {
    let { title, username, date, tags, content, URL } = newPost
    $(".preview h1").text(title)
    $(".preview .p-user").text(username)
    $(".preview .p-date").text(date)
    $(".preview .p-tags").text(tags)
    $(".preview .p-post").text(content)
    $(".preview img").attr("src", URL)
}

//Listener de Boton Preview
$(".btn-preview").click(() => {
    $(".form-view").hide()
    $(".preview").show()
    fillPreviewData()
})

//Listener de Boton Edit
$(".btn-edit").click(() => {
    $(".form-view").show()
    $(".preview").hide()
})
//------------------------------------------Fin del Codigo para Write-Post------------------------------------------------