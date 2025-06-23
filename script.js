function mostrarCadastro() {
  document.getElementById('login').classList.add('hidden');
  document.getElementById('cadastro').classList.remove('hidden');
}

function mostrarLogin() {
  document.getElementById('cadastro').classList.add('hidden');
  document.getElementById('login').classList.remove('hidden');
}

function fazerCadastro() {
  const nome = document.getElementById('cadNome').value;
  const email = document.getElementById('cadEmail').value;
  const senha = document.getElementById('cadSenha').value;

  if (!nome || !email || senha.length < 6) {
    alert('Preencha todos os campos corretamente.');
    return;
  }

  const usuario = { nome, email, senha };
  localStorage.setItem('usuario', JSON.stringify(usuario));
  alert('Cadastro feito!');
  mostrarLogin();
}

function fazerLogin() {
  const email = document.getElementById('loginEmail').value;
  const senha = document.getElementById('loginSenha').value;
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  if (usuario && usuario.email === email && usuario.senha === senha) {
    document.getElementById('login').classList.add('hidden');
    document.getElementById('painel').classList.remove('hidden');
    carregarUsuarios();
  } else {
    alert('Login inválido');
  }
}

function logout() {
  document.getElementById('painel').classList.add('hidden');
  document.getElementById('login').classList.remove('hidden');
}

function criarUsuario() {
  const nome = document.getElementById('novoNome').value;
  if (!nome) return;

  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  usuarios.push(nome);
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  carregarUsuarios();
  document.getElementById('novoNome').value = '';
}

function carregarUsuarios() {
  const lista = document.getElementById('listaUsuarios');
  lista.innerHTML = '';
  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

  usuarios.forEach((nome, index) => {
    const li = document.createElement('li');
    li.innerHTML = `${nome} 
      <button onclick="editarUsuario(${index})">✏</button> 
      <button onclick="excluirUsuario(${index})">🗑</button>`;
    lista.appendChild(li);
  });
}

function editarUsuario(index) {
  const novoNome = prompt("Novo nome:");
  if (novoNome) {
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios[index] = novoNome;
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    carregarUsuarios();
  }
}

function excluirUsuario(index) {
  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  usuarios.splice(index, 1);
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  carregarUsuarios();
}
