let list = [
    {   
        image:"url('aset/spons.jpg')", 
        pertanyaan:'Apakah hubungan diantara mereka?',
        listJawaban:['Keluarga','Musuh Bebuyutan', 'Tetangga Baik'], 
        jawaban:'Tetangga Baik'
    },
    {
        image:"url('aset/jarjit.jpeg')", 
        pertanyaan:'Apakah ciri khasnya?', 
        listJawaban:['Suka Ayam Goreng','Banyak Uang', 'Pantun'], 
        jawaban:'Pantun'
    },
    {
        image:"url('aset/rudy.jpg')", 
        pertanyaan:'Apa nama serial kartunnya?', 
        listJawaban:['Dora the Explore','Dragon Ball', 'Chalk Zone'], 
        jawaban:'Chalk Zone'
    },
    {
        image:"url('aset/boboboi.jpg')", 
        pertanyaan:'Elemen yang tidak dimiliki?', 
        listJawaban:['Kematian','Halilintar', 'Angin'], 
        jawaban:'Kematian'
    },
    {
        image:"url('aset/casper.jpg')", 
        pertanyaan:'Dia adalah hantu yang?', 
        listJawaban:['Jahat','Menyeramkan', 'Baik Hati'], 
        jawaban:'Baik Hati'
    },
];

// JSON.stringify()
// JSON.parse()

// acak pertanyaan pertama
let counterPertanyaan = Math.floor(Math.random()*list.length)
let counterSoal = 0;
let score = 0;
let listScore = [
    {
        nama:'Dummy',
        score:10
    },
];
let apakahSedangMain = true;
const pilihan1 = document.getElementById("pilihan1");
const pilihan2 = document.getElementById("pilihan2");
const pilihan3 = document.getElementById("pilihan3");
const question = document.getElementById("question");
const gambar = document.getElementById("img-quiz");
const leaderBoard = document.getElementById("leaderBoard");
const namaUser = document.getElementById("userName");

function gantiSoal(){
    let perSoal = list[counterPertanyaan];
    let {image,pertanyaan,listJawaban} = perSoal;

    gambar.style.backgroundImage = image;
    pilihan1.value = listJawaban[0]
    pilihan2.value = listJawaban[1]
    pilihan3.value = listJawaban[2]
    question.innerHTML = pertanyaan;

    if(counterPertanyaan==list.length-1){
        counterPertanyaan = 0
    }else{
        counterPertanyaan++
        counterSoal++
    };

    if(counterSoal == list.length){
        apakahSedangMain = false;
        const boxMain = document.getElementById("main");
        const gameBerakhir = document.getElementById("gameBerakhir");

        boxMain.style.display = "none";
        boxMain.style.gridArea = "";
        gameBerakhir.style.display = "";
        gameBerakhir.style.gridArea = "main";
    };
}

function catatScore(){
    // reset lederboard
    leaderBoard.innerHTML = '';
    // siapkan elemen baru
    for(let i=0 ; i< listScore.length ; i++){
        const divBaru = document.createElement("div");
        const spanBaru = document.createElement("span");
        const labelBaru = document.createElement("label");
        divBaru.style.display = "flex";
        divBaru.style.justifyContent = "space-between";
        let perScore = listScore[i];

        if(i<3){
            spanBaru.innerHTML = `${i+1}.${perScore.nama}`;
            labelBaru.innerHTML = perScore.score;
            divBaru.appendChild(spanBaru);
            divBaru.appendChild(labelBaru);
            leaderBoard.appendChild(divBaru);
        };
    };
}

function masukkanScore(score){
    listScore.push({nama:namaUser.value,score:score});
}

function reset(){
    namaUser.value = '';
}

function setPeringkat(){
    for(let i=0 ; i<listScore.length-1 ; i++){
        for(let j=i+1 ; j<listScore.length ; j++){
            console.log(listScore[i].score,listScore[j].score)
            if(listScore[i].score<listScore[j].score){
                let tmp = listScore[i];
                listScore[i] = listScore[j];
                listScore[j] = tmp;
            };
            console.log(listScore);
        };
    };
};

const mainLagi = document.getElementById("mainLagi");
mainLagi.addEventListener("click",function(){
    const boxMain = document.getElementById("main");
    const gameBerakhir = document.getElementById("gameBerakhir");

    console.log(listScore,'sebelu mklik main lagi');
    if(namaUser.value == ''){
        alert("Input Nama Kamu")
    }else{
        boxMain.style.display = ''
        boxMain.style.gridArea = "main"
        gameBerakhir.style.display = "none"
        gameBerakhir.style.gridArea = ""
        masukkanScore(score);
        setPeringkat(); // urutkan score dari yang tertinggi
        catatScore(score); // tampilkan score di leaderboard
        reset();
        score = 0;
        counterSoal = 0;
    };
})

function cekJawaban(soal,userJawaban,list){
    for(let i=0 ; i<list.length ; i++){
        let perSoal = list[i];
        if(perSoal.pertanyaan==soal){
            if(perSoal.jawaban==userJawaban){
                score += 10
            };
        };
    };
}

let optionAnswer = document.getElementById("options-answer");
optionAnswer.addEventListener("click", function(el){
    if(el.target.id=="pilihan1" || el.target.id=="pilihan2" || el.target.id=="pilihan3"){
        let jawaban = ''
        let soal = question.innerHTML;
        if(el.target.id=="pilihan1"){
            jawaban = pilihan1.value;
        }else if(el.target.id=="pilihan2"){
            jawaban = pilihan2.value;
        }else if(el.target.id=="pilihan3"){
            jawaban = pilihan3.value;
        }
        console.log(listScore,'sebelum cek jawaban')
        cekJawaban(soal,jawaban,list)
        gantiSoal();
    };
});

function gameStart(){
    let soalPertama = list[counterPertanyaan];
    gambar.style.backgroundImage = soalPertama.image;
    question.innerHTML = soalPertama.pertanyaan;
    pilihan1.value = soalPertama.listJawaban[0];
    pilihan2.value = soalPertama.listJawaban[1];
    pilihan3.value = soalPertama.listJawaban[2];

    gantiSoal();
}

gameStart();

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


function tampilkanListSoal(dataSoal){
    let boxListSoal = document.getElementById("listSoal");
    boxListSoal.innerHTML = '';

    /*
    
    {   
        image:"url('aset/spons.jpg')", 
        pertanyaan:'Apakah hubungan diantara mereka?',
        listJawaban:['Keluarga','Musuh Bebuyutan', 'Tetangga Baik'], 
        jawaban:'Tetangga Baik'
    }
    
    */

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
