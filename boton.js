function Ecuchando() {
  if (annyang) {
    var valor = true
    var boton = document.getElementById('escuchar');
    boton.innerText = "Escuchando...";
    valor = !valor;
    var botonParar = document.getElementById('parar');
    botonParar.style.visibility = "visible";


    var voces;
    var nombre = "";
    var nombreAsistente;

    var utter = new SpeechSynthesisUtterance();
    utter.rate = 1;
    utter.pitch = 0.5;
    utter.lang = 'es-ES';

    //Cargamos las voces que tenemos en nuestro sistema y las mostarmos en un arreglo por consola.
    window.speechSynthesis.onvoiceschanged = function () {
      voces = window.speechSynthesis.getVoices();
      //console.log(voces);
    };

    var commands = {

      'como estas': function () {
        respuestas = ['Muy bien   gracias', "Horriblemente mal", "Genial", "No lo se", "No me encuentro bien"]
        utter.text = respuestas[Math.floor(Math.random() * respuestas.length)];
        utter.voice = voces[1];
        window.speechSynthesis.speak(utter);

        if (utter.text == "Horriblemente mal" || utter.text == "No me encuentro bien" || utter.text == "No lo se") {
          annyang.addCallback('result', function (frases) {
            annyang.removeCallback('result');
            utter.text = "Porque estoy encerrada en un ordenador,  ayudaaaaaaa";
            utter.voice = voces[1];
            window.speechSynthesis.speak(utter);
          });
        }
      },
      'hola': function () {
        utter.text = 'hola, cual es tu nombre?';
        utter.voice = voces[1];
        window.speechSynthesis.speak(utter);

        annyang.addCallback('result', function (frases) {

          console.log("Nombre: ", frases[0]);
          nombre = frases[0];

          annyang.removeCallback('result');
          utter.text = 'Hola, ' + frases[0] + ",   como estas";
          window.speechSynthesis.speak(utter);
        });
      },
      //Array que devuelve aleatoriamente un elemento del array, en este caso un chiste.
      'cuentame un chiste': function () {
        chistes = ['Por que las focas del circo miran siempre hacia arriba?   Porque es donde estan los focos.',
          'Estas obsesionado con la comida!   No se a que te refieres croquetamente.',
          'Por que estás hablando con esas zapatillas?   Porque pone "converse"',
          'Buenos dias, me gustaria alquilar "Batman Forever".   No es posible, tiene que devolverla tomorrow.'
        ];
        utter.text = chistes[Math.floor(Math.random() * chistes.length)];
        utter.voices = voces[1];
        window.speechSynthesis.speak(utter);
      },

      'que hora es': function () {
        var fecha = new Date();
        var hora = fecha.getHours();
        var minutos = fecha.getMinutes();
        utter.text = "Son las " + hora + "y" + minutos;
        utter.voice = voces[1];
        window.speechSynthesis.speak(utter);
      },

      'open youtube': function () {
        window.open('http://youtube.com/', '_blank');
      },

      'open google': function () {
        window.open('http://google.com/', '_blank');
      },

      'adios': function () {
        utter.text = `Hasta pronto ${nombre}`;
        utter.voice = voces[1];
        window.speechSynthesis.speak(utter);
        Parar();
      },

      'ponme una cancion': function () {
        playAudio();
      },

      'quita la musica': function () {
        StopAudio();
      },

      'como te llamas': function () {

        if (nombreAsistente == undefined) {
          utter.text = "Aun no me has puesto nombre...,   Como quieres que me llame"
          utter.voice = voces[1];
          window.speechSynthesis.speak(utter);

          annyang.addCallback('result', function (frases) {
            console.log("Nombre: ", frases[0]);
            nombreAsistente = frases[0];
            annyang.removeCallback('result');
            utter.text = "Gracias a ti ya tengo un nombre, me llamo " + nombreAsistente ;
            window.speechSynthesis.speak(utter);
          });

        }
        else {
          respuestas = [`Me llamo ${nombreAsistente}`, `Esque no lo recuerdas?, me llamo ${nombreAsistente}`, `Tu me llamaste ${nombreAsistente}`, `Mi nombre es ${nombreAsistente}   encantada de ser su asistente`]
          utter.text = respuestas[Math.floor(Math.random() * respuestas.length)];
          utter.voice = voces[1];
          window.speechSynthesis.speak(utter);
        }

      }

    };

  }

  if(!annyang){
    alert("Lo sentimos, su navegador no es compatible con este asistente");
  }


  // Añadir los comandos
  annyang.addCommands(commands);

  // Empezar a escuchar.
  annyang.start({ autoRestart: false, continuous: true });

  //Esto nos sirve para ver que escucha el programa en tiempo real.
  annyang.addCallback('result', function (frases) {
    console.log("Creo que le usuario ha dicho: ", frases[0]);
    console.log("Pero puede haber dicho: ", frases);
  });

  annyang.addCallback('resultNoMatch', function (frases) {
    console.log("Lo siento, no he entendido lo que has dicho");
    /*utter.text="Lo siento, no he entendido lo que has dicho";
    utter.voice = voces[1];
    window.speechSynthesis.speak(utter);*/
  });

}


function Parar() {
  var valor = true
  var botonEscuchar = document.getElementById('escuchar');
  botonEscuchar.innerText = "Escuchar";
  valor = !valor;

  var botonParar = document.getElementById('parar');
  botonParar.style.visibility = "hidden";

  annyang.pause();
  alert("Se ha pausado la escucha");

}


async function playAudio() {
  audios = ['https://naghma.me/files/256.mp3', 'https://naghma.me/files/4.mp3', 'https://naghma.me/files/1101.mp3', 'https://naghma.me/files/1403.mp3', 'https://naghma.me/files/3.mp3', 'https://naghma.me/files/1743.mp3'];
  audio = new Audio(audios[Math.floor(Math.random() * audios.length)]);
  audio.type = 'audio/wav';

  try {
    await audio.play();
    console.log('Reproduciendo...');
  } catch (err) {
    console.log('Erorr al reproducir...');
  }
}

async function StopAudio() {
  audio.pause();
  audio.type = 'audio/wav';
  console.log("Se ha parado la musica.")
}

