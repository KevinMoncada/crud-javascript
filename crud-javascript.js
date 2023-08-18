//Validar que no existan datos vacios por medio de una funcion
function validarDatos(){
    let id = document.querySelector('#id').value;
    let nombre = document.querySelector('#nombre').value;
    let profesion = document.querySelector('#profesion').value;
    let salario = document.querySelector('#salario').value;

    if(id === "" || nombre === "" || profesion === "" || salario === ""){
        alert("Todos los datos son requeridos");
        return false;
    }else{
        return true;
    }
}
//Funcion para agregar los datos 
function guardarDatos(){
    if(validarDatos() == true){
        let id = document.querySelector('#id').value;
        let nombre = document.querySelector('#nombre').value;
        let profesion = document.querySelector('#profesion').value;
        let salario = document.querySelector('#salario').value;

        let listaDatos;
        if(localStorage.getItem("peopleList")==null){
            listaDatos=[];
        }else{
            listaDatos=JSON.parse(localStorage.getItem("peopleList"));
        }
        listaDatos.push(
            {
                "id":id,
                "nombre":nombre,
                "profesion":profesion,
                "salario":salario

            }
        );
        localStorage.setItem("peopleList",JSON.stringify(listaDatos));
        //Limpiar datos de los input
        document.querySelector('#id').value="";
        document.querySelector('#nombre').value="";
        document.querySelector('#profesion').value="";
        document.querySelector('#salario').value="";
        mostrarDatos();
    }
}   
function mostrarDatos(){
    let listaDatos;
    if(localStorage.getItem("peopleList")==null){
        listaDatos = [];
    }else{
        listaDatos=JSON.parse(localStorage.getItem("peopleList"));
    }
    let html = "";

    listaDatos.forEach(function(clave,valor){
        html += "<tr>";
        html += "<td>" + clave.id + "</td>";
        html += "<td>" + clave.nombre + "</td>";
        html += "<td>" + clave.profesion + "</td>";
        html += "<td>" + clave.salario + "</td>";
        html += "<td><button onclick='actualizarDatos("+valor+")' class='btn btn-warning mt-2'>Editar</button></td>";
        html += "<td><button onclick = borrarDatos("+valor+") class='btn btn-danger mt-2'>Borrar</button></td>"
        html += "</tr>"
    });
    document.querySelector("#crudTable tbody").innerHTML=html;
}


//Mostrar siempre los datos cuando la pagina se recargue 

document.onload = mostrarDatos();

function borrarDatos(valor){
    let listaDatos;
    if (localStorage.getItem('peopleList')== null){
        listaDatos =[];
    } else{
        listaDatos=JSON.parse(localStorage.getItem('peopleList'));
    }
    listaDatos.splice(valor,1);
    localStorage.setItem("peopleList",JSON.stringify(listaDatos));
    mostrarDatos();
}

//funcion actualizar 


function actualizarDatos(valor){

    let listaDatos;
    if (localStorage.getItem('peopleList')== null){
        listaDatos =[];
    } else{
        listaDatos=JSON.parse(localStorage.getItem('peopleList'));
    }

    document.getElementById('id').value = listaDatos[valor].id;
    document.getElementById('nombre').value = listaDatos[valor].nombre;
    document.getElementById('profesion').value = listaDatos[valor].profesion;
    document.getElementById('salario').value = listaDatos[valor].salario;
   

    document.getElementById('actualizar').onclick = function (){

        if( validarDatos() == true){
        
            listaDatos[valor].id = document.getElementById('id').value; 
            listaDatos[valor].nombre = document.getElementByid('nombre').value; 
            listaDatos[valor].profesion = document.getElementById('profesion').value; 
            listaDatos[valor].salario = document.getElementById('salario').value; 

            localStorage.setItem('peopleList',JSON.stringify(listaDatos));
            mostrarDatos();

         
        }
    }
   
}