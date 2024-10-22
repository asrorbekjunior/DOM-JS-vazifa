 // Elementlarni chaqirib olish
 const total = document.getElementById('total');
 const start = document.getElementById('start');
 const end = document.getElementById('end');
 const time = document.getElementById('time');
 const ochko = document.getElementById('ochko');
 const hisoblash = document.getElementById('hisoblash');
 const restart = document.getElementById('restart');
 const result = document.getElementById('result');
 const operationDiv = document.getElementById('operation');
 const gameContainer = document.getElementById('game-container');
 const levelSelection = document.getElementById('level-selection');
 const win = new Audio('./audio/win.wav');
 const lost = new Audio('./audio/lost.wav');
 const WIN_GAME = new Audio('./audio/win-game.wav');
 const LOST_GAME = new Audio('./audio/lost-game.wav');

 let defaultTime = 10;
 let defaultTotal = 10;
 let defaultOchko = 6;
 let interval;
 let level = '';
 let operation = '+';

 // O'yinni boshlash
 function startGame() {
     interval = setInterval(function () {
         if (defaultOchko == 0) {
             endGame("Siz yutqazdingiz 🤢🤢🤢");
         }
         if (defaultOchko == 10) {
             endGame("Siz yutdingiz 😍😍😍");
         }
         if (defaultTime == 10) {
             defaultTime = 0;  // Vaqtni 0 ga qaytarish
             time.innerHTML = defaultTime + " soniya";
             lost.play();
             generateProblem();
             if (start.value == '' || end.value == '') {
                 defaultOchko -= 1;
                 ochko.innerHTML = defaultOchko + " ochko";
                 lost.play();
             } else {
                 defaultOchko -= 1;
                 ochko.innerHTML = defaultOchko + " ochko";
                 lost.play();
             }
         }
         defaultTime += 1;
         time.innerHTML = defaultTime + " soniya";
     }, 1000);
 }



 // O'yinni tugatish
 function endGame(message) {
     clearInterval(interval);
     result.innerHTML = message;
     result.style.display = "block";
     hisoblash.style.display = "none";
     restart.style.display = "block";
     if (message.includes("yutdingiz")) {
         WIN_GAME.play();
     } else {
         LOST_GAME.play();
     }
 }

 // Sonlarni tozalash va yangi muammo yaratish
 function generateProblem() {
     start.value = '';
     end.value = '';
     if (level === 'easy') {
         // Oson daraja - faqat qo'shish va ayirish
         operation = Math.random() > 0.5 ? '+' : '-';
         if (operation === '+') {
             defaultTotal = Math.floor(Math.random() * 10);
         } else {
             defaultTotal = Math.floor(Math.random() * 10) + 10; // Ayirishda manfiy sonlar bo'lmasligi uchun
         }
     } else if (level === 'medium') {
         // O'rta daraja - qo'shish va ayirish, tasodifiy tanlash
         operation = Math.random() > 0.5 ? '+' : '-';
         defaultTotal = Math.floor(Math.random() * 20);
     } else if (level === 'hard') {
         // Qiyin daraja - faqat ko'paytirish
         operation = '*';
         defaultTotal = Math.floor(Math.random() * 10) * 2; // Juft sonlar
     }
     total.innerHTML = defaultTotal;
     operationDiv.innerHTML = `Amal: ${operation}`;
 }

 // Darajani tanlash
 document.getElementById('easy').addEventListener('click', function () {
     level = 'easy';
     levelSelection.style.display = 'none';
     gameContainer.style.display = 'flex';
     generateProblem();
     startGame();
 });

 document.getElementById('medium').addEventListener('click', function () {
     level = 'medium';
     levelSelection.style.display = 'none';
     gameContainer.style.display = 'flex';
     generateProblem();
     startGame();
 });

 document.getElementById('hard').addEventListener('click', function () {
     level = 'hard';
     levelSelection.style.display = 'none';
     gameContainer.style.display = 'flex';
     generateProblem();
     startGame();
 });

 // Hisoblash
 hisoblash.addEventListener('click', function () {
     hisobla();
 });

 // Enter tugmasini bosganda hisoblash
 window.addEventListener('keypress', function (event) {
     if (event.key === 'Enter') {
         hisobla();
     }
 });
 // Hisoblash logikasi
 function hisobla() {
     if (start.value == '' || end.value == '') {
         defaultOchko -= 1;
         ochko.innerHTML = defaultOchko + " ochko";
         lost.play();
         generateProblem();
     } else {
         const startValue = parseInt(start.value);
         const endValue = parseInt(end.value);
         let expectedTotal = eval(`${startValue} ${operation} ${endValue}`);

         if (expectedTotal == defaultTotal) {
             win.play();
             defaultOchko += 1;
             ochko.innerHTML = defaultOchko + " ochko";
         } else {
             lost.play();
             defaultOchko -= 1;
             ochko.innerHTML = defaultOchko + " ochko";
         }

         // Inputlarni tozalash
         start.value = '';
         end.value = '';
         
         // Yangi muammo yaratish
         defaultTime = 0;  // Hisoblagandan keyin vaqtni 0 ga qaytarish
         generateProblem();
     }
 }

 // Restart o'yin
 restart.addEventListener('click', function () {
     location.reload();
 });