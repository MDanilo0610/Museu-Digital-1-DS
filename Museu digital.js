const galerias = {
  Brasileira: {
    container: document.querySelector('#Brasileira .container'),
    imagens: document.querySelectorAll('#Brasileira .imagem.B'),
    index: 0
  },
  Indígena: {
    container: document.querySelector('#Indígena .container'),
    imagens: document.querySelectorAll('#Indígena .imagem.A'),
    index: 0
  },
  Autoretrato: {
    container: document.querySelector('#Autoretrato .container'),
    imagens: document.querySelectorAll('#Autoretrato .imagem.C'),
    index: 0
  },
  Musica: {
    container: document.querySelector('#Musica .container'),
    imagens: document.querySelectorAll('#Musica .imagem.D'),
    index: 0
  },
  Odisseia: {
    container: document.querySelector('#Odisseia .container'),
    imagens: document.querySelectorAll('#Odisseia .imagem.E'),
    index: 0
  }
};

const paginaInicial = {
  container: document.getElementById('paginaInicial'),
  seções: [document.getElementById('introdução'), document.getElementById('portas'), document.getElementById('containerCreditos')],
  index: 0
}

let galeriaAtual = 'Brasileira';

function atualizarBotoes() {
  const galeria = galerias[galeriaAtual];

  document.getElementById('voltar').style.opacity = galeria.index === 0 ? '0.3' : '1';
  document.getElementById('avançar').style.opacity = galeria.index === galeria.imagens.length - 1 ? '0.3' : '1';
}

function atualizarBotoesInicio() {
  const galeria = galerias[galeriaAtual];

  document.getElementById('Subir').style.opacity = paginaInicial.index === 0 ? '0.3' : '1';
  document.getElementById('Descer').style.opacity = paginaInicial.index === paginaInicial.seções.length - 1 ? '0.3' : '1';
}

function mostrar(pagina) {
  document.querySelectorAll('.pagina').forEach(div => div.classList.remove('show'));
  document.getElementById(pagina).classList.add('show');

  const controles = document.querySelector('.controles');
  const botoesInicio = document.querySelector('.botoesInicio')

  if (pagina === 'paginaInicial') {
    botoesInicio.classList.add('show');
    controles.classList.remove('show');
  } else {
    botoesInicio.classList.remove('show');
    controles.classList.add('show');
    galeriaAtual = pagina;
    galerias[galeriaAtual].index = 0;
    centralizarImagem();
    atualizarBotoes();
  }
}


function centralizarImagem() {
  const { container, imagens, index } = galerias[galeriaAtual];
  const containerWidth = window.innerWidth;
  const imagem = imagens[index];
  const imagemWidth = imagem.offsetWidth;
  const imagemCenter = imagem.offsetLeft + (imagemWidth / 2);
  const translateX = (containerWidth / 2) - imagemCenter;
  
  container.style.transform = `translateX(${translateX}px)`;
}

function centralizarImagemY() {
  const { container, seções, index } = paginaInicial;
  const containerHeight = window.innerHeight;
  const seção = seções[index];
  const seçãoHeight = seção.offsetHeight;
  const seçãoCenter = seção.offsetTop + (seçãoHeight / 2);
  const translateY = (containerHeight / 2) - seçãoCenter;

  container.style.transform = `translateY(${translateY}px)`;
}

document.getElementById('avançar').addEventListener('click', () => {
  const galeria = galerias[galeriaAtual];
  if (galeria.index < galeria.imagens.length - 1) {
    galeria.index++;
    centralizarImagem();
    atualizarBotoes();
  }
});

document.getElementById('voltar').addEventListener('click', () => {
  const galeria = galerias[galeriaAtual];
  if (galeria.index > 0) {
    galeria.index--;
    centralizarImagem();
    atualizarBotoes();
  }
});

document.getElementById('voltarMenu').addEventListener('click', () => {
  mostrar('paginaInicial');
});

window.addEventListener('keydown', (e) => {
  const galeria = galerias[galeriaAtual];
  if (e.key === 'ArrowRight' && galeria.index < galeria.imagens.length - 1) {
    galeria.index++;
    centralizarImagem();
    atualizarBotoes();
  } else if (e.key === 'ArrowLeft' && galeria.index > 0) {
    galeria.index--;
    centralizarImagem();
    atualizarBotoes();
  } else if (e.key === 'ArrowDown') {
    mostrar('paginaInicial');
  }
});

document.getElementById('Descer').addEventListener('click', () => {
  if (paginaInicial.index < paginaInicial.seções.length - 1){
  paginaInicial.index++
  centralizarImagemY();
  atualizarBotoesInicio();
  }
})

document.getElementById('Subir').addEventListener('click', () => {
  if (paginaInicial.index > 0){
  paginaInicial.index--
  centralizarImagemY();
  atualizarBotoesInicio();
  }
})

window.addEventListener('resize', () => centralizarImagem());
window.onload = () => {
  centralizarImagem();
  centralizarImagemY();
  atualizarBotoes();
  atualizarBotoesInicio();
}