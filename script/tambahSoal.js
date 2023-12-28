const tambahSoal = document.getElementById("tambahSoal")
tambahSoal.addEventListener("click",function(){
    const boxTambahSoal = document.getElementById("boxTambahSoal")
    const boxMain = document.getElementById("main");
    
    boxTambahSoal.classList.toggle("sembunyi");
    boxMain.classList.toggle("sembunyi");

    if(boxMain.style.gridArea=="main"){
        boxTambahSoal.style.gridArea = "main"
        boxMain.style.gridArea = "";
    }else{
        boxTambahSoal.style.gridArea = ""
        boxMain.style.gridArea = "main";
    };
})


function ambilSoal(){
    const linkInput = document.getElementById("linkInput");
    const pertanyaanInput = document.getElementById("pertanyaanInput");
    const jawabanInput1 = document.getElementById("jawabanInput1");
    const jawabanInput2 = document.getElementById("jawabanInput2");
    const jawabanInput3 = document.getElementById("jawabanInput3");
    const jawabanBenarInput = document.getElementById("jawabanBenarInput");

    let tmp =     
    {   
        image:`url('${linkInput.value}')`, 
        pertanyaan:pertanyaanInput.value,
        listJawaban:[jawabanInput1.value,jawabanInput2.value,jawabanInput3.value], 
        jawaban:jawabanBenarInput.value
    };

    list.push(tmp);
}


const simpanSoal = document.getElementById("simpanSoal");
simpanSoal.addEventListener("click",function(){
    ambilSoal();
    const boxTambahSoal = document.getElementById("boxTambahSoal")
    const boxMain = document.getElementById("main");
    boxTambahSoal.classList.toggle("sembunyi");
    boxMain.classList.toggle("sembunyi");

    boxTambahSoal.style.gridArea = ""
    boxMain.style.gridArea = "main";
})