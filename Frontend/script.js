let url = "http://localhost:3000/";

getAllTareas();

let guardarId = null;
let tableBody = document.getElementById('tablaBody');
let nuevaTarea = document.getElementById('nuevaTarea');
let buttonActualizar = document.getElementById('buttonActualizar');

const modalCrear = document.getElementById('modalCrear')
const modalActualizar = document.getElementById('modalActualizar')
nuevaTarea.addEventListener('click',() => crearTarea())

//Eventos Modal

modalCrear.addEventListener('hidden.bs.modal', () => {
    document.getElementById('tituloTarea').value = "";
    document.getElementById('descripcionTarea').value = "";
    document.getElementById('estadoTarea').value = "0";
})

buttonActualizar.addEventListener('click', () => actualizarTarea(guardarId))

//Funciones Api

function getAllTareas(){
    const requestOptions = {
        method: "GET",
        redirect: "follow"
      };
      
    fetch(url+"tasks", requestOptions).then((response) => response.text()).then((result) => {
        let resultJson = JSON.parse(result);
    
        resultJson.data.map((obj, ind) => {

            //console.log(obj);

            let id = `<td id="idTareaFor${obj.id}">${obj.id}</td>`;
            let titulo = `<td id="tituloTareaFor${obj.id}">${obj.titulo}</td>`;
            let descripcion = `<td id="descripcionTareaFor${obj.id}">${obj.descripcion}</td>`;
            let estado = `<td id="estadoTareaFor${obj.id}">${obj.estado}</td>`;

            tableBody.innerHTML += 
            `<tr>
                ${id + titulo + descripcion + estado} 
                <td>
                    <button type="button" class="btn btn-outline-success btn-sm" data-bs-toggle="modal" data-bs-target="#modalActualizar" onclick="onModalActualizar(${obj.id})">Ver</button>
                    <button type="button" class="btn btn-outline-danger btn-sm" onclick="eliminarTarea(${obj.id})">Borrar</button>
                </td> 
            </tr>
            `;
            //console.log("buttonActualizar", buttonActualizar);
            //console.log("idTareaFor", `{idTareaFor${obj.id}}`);
            //console.log("resultJson.data", resultJson.data[ind]);
            //console.log("Actualiza: ", obj.id === resultJson.data[ind].id ? actualizarTarea(resultJson.data[ind].id) : "No son iguales")

            buttonActualizar.addEventListener('click', () => { obj.id === resultJson.data[ind].id ? guardarId : null })
        })
    })
    .catch((error) => console.error(error));
}

function getUnaTarea(id){
    const requestOptions = {
        method: "GET",
        redirect: "follow"
      };
      
      fetch(url+`task/${id}`, requestOptions).then((response) => response.text()).then((result) => {
        let resultJson = JSON.parse(result);
        if(resultJson.status === 200){
           console.log("Tengo result: ", resultJson);

           document.getElementById('tituloTareaActualizar').value = resultJson.data.titulo;
           document.getElementById('descripcionTareaActualizar').value = resultJson.data.descripcion;
           document.getElementById('estadoTareaActualizar').value = resultJson.data.estado;

        } else {
            alert(resultJson.data);
        }
    })
    .catch((error) => console.error(error));
}

function crearTarea(){
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "titulo": document.getElementById('tituloTarea').value,
        "descripcion": document.getElementById('descripcionTarea').value,
        "estado": document.getElementById('estadoTarea').value
    });

    const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
    };

    console.log("DatosRaw: ", raw);

    fetch(url+"tasks", requestOptions).then((response) => response.text()).then((result) => {
        let resultJson = JSON.parse(result);
        if(resultJson.status === 200){
            alert(resultJson.data);
            location.reload();
        } else {
            alert(resultJson.data);
        }
    })
    .catch((error) => console.error(error));
}

function actualizarTarea(id){

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "titulo": document.getElementById('tituloTareaActualizar').value,
        "descripcion": document.getElementById('descripcionTareaActualizar').value,
        "estado":  document.getElementById('estadoTareaActualizar').value
    });

    const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    console.log("tengo id en Actualizar: ", id);

    fetch(url+"task/"+id, requestOptions).then((response) => response.text()).then((result) => {
        let resultJson = JSON.parse(result);
        if(resultJson.status === 200){
            alert("Se ah actualizado correctamente");
            location.reload();
        } else {
            alert(resultJson.data);
        }
    })
    .catch((error) => console.error(error));

}

function eliminarTarea(id){
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "titulo": "Crear vistas",
        "descripcion": "Hay que crear unas vistas para una pagina",
        "estado": "En curso"
    });

    const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    console.log(id)

    fetch(url+"task/"+id, requestOptions).then((response) => response.text()).then((result) => {
        let resultJson = JSON.parse(result);
        if(resultJson.status === 200){
            alert("Se ah eliminado correctamente");
            location.reload();
        } else {
            alert(resultJson.data);
        }
    })
    .catch((error) => console.error(error));
}

//Funciones de Modal

function onModalActualizar(id){

    getUnaTarea(id);
    guardarId = id;

}