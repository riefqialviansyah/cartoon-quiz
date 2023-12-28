
function tampilkanListSoal(dataSoal){
    let boxListSoal = document.getElementById("listSoal");
    boxListSoal.innerHTML = '';

    for(let i=0 ; i<dataSoal.length ; i++){
        let perData = dataSoal[i];
        let {pertanyaan} = perData;    
    
        const divBaru = document.createElement("div")
        const spanBaru = document.createElement("span")
        const spanBaruid = document.createElement("span")
        const buttonBaru = document.createElement("button");

        spanBaru.innerHTML = pertanyaan;
        spanBaruid.innerHTML = i+1;

        spanBaruid.setAttribute("note","id")
        spanBaruid.style.marginRight = "15px"
        buttonBaru.innerHTML = 'Hapus';
        buttonBaru.style.backgroundColor = "red";
        buttonBaru.style.fontWeight = "bold";
        buttonBaru.style.borderRadius = "5px";
        buttonBaru.style.padding = "4px"
        buttonBaru.style.alignSelf = 'end'

        divBaru.style.display = "flex";
        divBaru.style.justifyContent = "start";
        divBaru.style.margin = "5px"

        divBaru.appendChild(spanBaruid);
        divBaru.appendChild(spanBaru);
        divBaru.appendChild(buttonBaru);
        boxListSoal.appendChild(divBaru);
    }
}

const  hapusSoal = document.getElementById("hapusSoal");
hapusSoal.addEventListener("click",function(){

    const boxHapusSoal = document.getElementById("boxHapusSoal")
    const boxMain = document.getElementById("main");

    boxHapusSoal.classList.toggle("sembunyi");
    boxMain.classList.toggle("sembunyi");

    if(boxMain.style.gridArea=="main"){
        boxHapusSoal.style.gridArea = "main"
        boxMain.style.gridArea = "";
        tampilkanListSoal(list);
    }else{
        boxHapusSoal.style.gridArea = ""
        boxMain.style.gridArea = "main";
    };
})

const boxHapusSoal = document.getElementById("boxHapusSoal")
boxHapusSoal.addEventListener("click",function(e){
    console.log(e.target.previousSibling.previousSibling.innerHTML)
    console.log(e.target.previousSibling.previousSibling)
    console.log(e.target.previousSibling.previousSibling.hasAttribute("note"));

    if(e.target.previousSibling.previousSibling.hasAttribute("note")){
        let idHapus = e.target.previousSibling.previousSibling.innerHTML - 1;
        // console.log(idHapus);
        list.splice(idHapus,1);
        tampilkanListSoal(list);
    };
})
