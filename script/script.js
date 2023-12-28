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
        image:"url('aset/casper.jpg')", 
        pertanyaan:'Dia adalah hantu yang?', 
        listJawaban:['Jahat','Menyeramkan', 'Baik'], 
        jawaban:'Baik'
    },
    {
        image:"url('aset/boboboi.jpg')", 
        pertanyaan:'Elemen yang tidak dimiliki?', 
        listJawaban:['Kematian','Halilintar', 'Angin'], 
        jawaban:'Kematian'
    },
];

let listScore = [];

/*
    note:
        - untuk mengubah arary of object menjadi string --> JSON.stringify()
        - sebaliknya --> JSON.parse()
*/

// fungsi acak pertanyaan
const acakSoal = function(){
    return Math.floor(Math.random()*list.length);
}

let indexSoal = acakSoal()
let tmpScore = 0;
let jumlahSoal = 0;

// flag kalau sedang bermain fitur button tidak berfungsi
let apakahSedangMain = true;

const reset = function(){
    const namaUser = document.getElementById("userName");
    namaUser.value = '';
    jumlahSoal = 0;
}

const gantiSoal = function(){
    // console.log(jumlahSoal,'<< jumlaSoal',indexSoal,'<<index',tmpScore,'<<score')
    let perSoal = list[indexSoal];
    let {image,pertanyaan,listJawaban} = perSoal;
    
    const gambar = document.getElementById("img-quiz");
    const pilihan1 = document.getElementById("pilihan1");
    const pilihan2 = document.getElementById("pilihan2");
    const pilihan3 = document.getElementById("pilihan3");
    const question = document.getElementById("question");
    
    gambar.style.backgroundImage = image;
    pilihan1.value = listJawaban[0];
    pilihan2.value = listJawaban[1];
    pilihan3.value = listJawaban[2];
    question.innerHTML = pertanyaan;
    
    if(jumlahSoal==list.length){
        // console.log('game over',jumlahSoal,list.length);
        reset();
        apakahSedangMain = false;
        const boxMain = document.getElementById("main");
        const gameBerakhir = document.getElementById("gameBerakhir");
        boxMain.style.display = "none";
        boxMain.style.gridArea = "";
        gameBerakhir.style.display = "";
        gameBerakhir.style.gridArea = "main";
    };

    if(indexSoal==list.length-1){
        indexSoal = 0
        jumlahSoal++
    }else{
        indexSoal++
        jumlahSoal++
    };
}

function catatScore(){
    // reset lederboard
    const leaderBoard = document.getElementById("leaderBoard");
    leaderBoard.innerHTML = '';

    // siapkan elemen baru
    for(let i=0 ; i< listScore.length ; i++){
        const divBaru = document.createElement("div");
        const spanBaru = document.createElement("span");
        const labelBaru = document.createElement("label");
        divBaru.style.display = "flex";
        divBaru.style.justifyContent = "space-between";
        let perScore = listScore[i];

        if( i < 3 ){
            spanBaru.innerHTML = `${i+1}. ${perScore.nama}`;
            labelBaru.innerHTML = perScore.score;
            divBaru.appendChild(spanBaru);
            divBaru.appendChild(labelBaru);
            leaderBoard.appendChild(divBaru);
        };
    };
}

function masukkanScore(score){
    const namaUser = document.getElementById("userName");
    listScore.push({nama:namaUser.value,score:score});
}

function setPeringkat(){
    for(let i=0 ; i<listScore.length-1 ; i++){
        for(let j=i+1 ; j<listScore.length ; j++){
            if(listScore[i].score<listScore[j].score){
                let tmp = listScore[i];
                listScore[i] = listScore[j];
                listScore[j] = tmp;
            };
        };
    };
};

const mainLagi = document.getElementById("mainLagi");
mainLagi.addEventListener("click",function(){
    const boxMain = document.getElementById("main");
    const gameBerakhir = document.getElementById("gameBerakhir");
    const namaUser = document.getElementById("userName");

    if(namaUser.value == ''){
        alert("Input Nama Kamu!!!")
    }else{
        boxMain.style.display = ''
        boxMain.style.gridArea = "main"
        gameBerakhir.style.display = "none"
        gameBerakhir.style.gridArea = ""
        masukkanScore(tmpScore);
        setPeringkat(); // urutkan score dari yang tertinggi
        catatScore(tmpScore); // tampilkan score di leaderboard
        tmpScore = 0;
    };
})

function cekJawaban(soal,userJawaban,list){
    for(let i=0 ; i<list.length ; i++){
        let perSoal = list[i];
        if(perSoal.pertanyaan==soal){
            if(perSoal.jawaban==userJawaban){
                // console.log('jawaban benar')
                tmpScore += 10
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

        // console.log(soal,jawaban)
        cekJawaban(soal,jawaban,list)
        gantiSoal();
    };
});

gantiSoal();  // tampilkan soal dan pertanyaan saat reload