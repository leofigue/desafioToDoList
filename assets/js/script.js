var arrTareas = [
    {id: 1, tarea:'primera tarea', realizada: false},
    {id: 2, tarea:'segunda tarea', realizada: true},
    {id: 3, tarea:'tercera tarea', realizada: true}
]

const tBody = document.querySelector("tbody");
const btnAgregar = document.querySelector("#btnAgregar");
const nuevaTarea = document.querySelector("#nuevaTarea");
const total = document.querySelector("#total");
const realizadas = document.querySelector("#realizadas");

const traeNumeroTareasRealziadas=()=>{
    const tareasRealizadas = arrTareas.filter(
            (tarea) => tarea.realizada == true
        );
    return tareasRealizadas.length;
}

const actualiza = function(idSeleccionado, objCheckbox){
    const indexTarea = arrTareas.findIndex((tarea) => tarea.id == idSeleccionado);
    arrTareas[indexTarea].realizada = objCheckbox.checked;
    realizadas.innerHTML = traeNumeroTareasRealziadas();
}

/* recibe como parametro el ID del objeto seleccionado */
const borrar = function(idSeleccionado){
    const indexTarea = arrTareas.findIndex((tarea) => tarea.id == idSeleccionado);
    if(confirm(`Esta acción eliminará la tarea: ${idSeleccionado} - ${arrTareas[indexTarea].tarea}\n¿Desea continuar?`)){
        arrTareas.splice(indexTarea, 1)
        mostrarTareas();
    }
        
} 

const mostrarTareas = function() {
    let detalleTareas="";
    total.innerHTML = arrTareas.length;
    realizadas.innerHTML = traeNumeroTareasRealziadas();
    tBody.innerHTML = "";
    arrTareas.forEach((tarea) => {
    detalleTareas += `
    <tr>
    <td class='center'>${tarea.id}</td>
    <td>${tarea.tarea}</td>
    <td class='center'><input type='checkbox' onclick='actualiza(${tarea.id}, this)' ${tarea.realizada ? 'checked' : ''} ></td>
    <td class='center'><img src='./assets/img/delete_1.png' class='delete' onclick='borrar(${tarea.id})' title='Eliminar tarea ${tarea.id}' alt='acción para eliminar tareas'></td>
    </tr>`;
    });
    tBody.innerHTML=detalleTareas;
} 


document.addEventListener("DOMContentLoaded", mostrarTareas);    

btnAgregar.addEventListener("click", () => {
    if(nuevaTarea.value.trim()!=""){
        var newId = Number(arrTareas[arrTareas.length-1].id) + 1;
        arrTareas.push({id: newId, tarea: nuevaTarea.value, realizada: false})
        nuevaTarea.value = ""
        mostrarTareas();
    }
    else{
        alert("Atención!\nDebes ingresar una tarea.")
    }
    
    });
