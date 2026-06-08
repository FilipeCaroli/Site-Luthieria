/* ── images ── */
const GUITAR_IMGS = {
	"especial_pine_front": "/images/guitars/especial_pine_front.png",
	"especial_pine_back": "/images/guitars/especial_pine_back.png",
	"especial_cedar_front": "/images/guitars/especial_cedar_front.png",
	"especial_cedar_back": "/images/guitars/especial_cedar_back.png",
	"master_pine_front": "/images/guitars/master_pine_front.png",
	"master_pine_back": "/images/guitars/master_pine_back.png",
	"master_cedar_front": "/images/guitars/master_cedar_front.png",
	"master_cedar_back": "/images/guitars/master_cedar_back.png"
};

const CAATINGA_IMGS = {
	"caatinga_pine_front": "/images/guitars/caatinga_pine_front.png",
	"caatinga_pine_back": "/images/guitars/caatinga_pine_back.png",
	"caatinga_cedar_front": "/images/guitars/caatinga_cedar_front.png",
	"caatinga_cedar_back": "/images/guitars/caatinga_cedar_back.png",
};


function gImg(model, wood, side) {
	if (model === 'caatinga') {
		const k = 'caatinga_' + wood + '_' + side;
		const src = CAATINGA_IMGS[k];
		const wN = wood === 'cedar' ? '<strong>Cedro Canadense</strong>' : '<strong>Pinho Alemão</strong>';
		const dN = side === 'front' ? 'Vista frontal — tampo de ' + wN : 'Vista do verso — fundo em <strong>Louro Canela</strong>';
		return `<img src="${src}" alt="Caatinga: ${dN}" style="height:260px;width:auto;object-fit:contain;display:block;filter:drop-shadow(0 10px 28px rgba(0,0,0,.65));"/>`;
	}
	const s = (model === 'master') ? 'especial' : 'master';
	const k = s + '_' + wood + '_' + side;
	const src = GUITAR_IMGS[k];
	const sN = s === 'especial' ? 'Série Especial' : 'Linha Master';
	const wN = wood === 'cedar' ? '<strong>Cedro Canadense</strong>' : '<strong>Pinho Alemão</strong>';
	const dN = side === 'front'
		? 'Vista frontal — tampo de ' + wN
		: 'Vista do verso — fundo em ' + (s === 'especial' ? '<strong>Jacarandá da Bahia</strong>' : '<strong>Imbuia brasileira</strong>');
	return `<img src="${src}" alt="${sN}: ${dN}"
          style="height:260px;width:auto;object-fit:contain;display:block;
                 filter:drop-shadow(0 10px 28px rgba(0,0,0,.65));"/>`;
}

function render(id, model, wood) {
	const el = document.getElementById('d-' + id);
	if (!el) return;
	const sN = id === 'master' ? 'Série Especial' : id === 'esp' ? 'Linha Master' : 'Caatinga';
	const wN = wood === 'cedar' ? '<strong>Cedro Canadense</strong>' : '<strong>Pinho Alemão</strong>';
	el.setAttribute('aria-label', sN + ' — tampo ' + wN + '. Passe o cursor para ver o verso.');
	el.innerHTML = `
    <div class="flip"
         role="button" tabindex="0"
         aria-label="Ver verso do violão ${sN}"
         ontouchend="flipT(event,this)"
         onkeydown="flipK(event,this)">
      <div class="flip-inner" aria-hidden="true">
        <div class="flip-f">${gImg(model, wood, 'front')}</div>
        <div class="flip-b">${gImg(model, wood, 'back')}</div>
      </div>
    </div>`;
}

function flipT(e, el) {
	e.preventDefault();
	const on = el.classList.toggle('on');
	el.setAttribute('aria-pressed', on);
	el.setAttribute('aria-label', on
		? 'Mostrando verso — toque para ver a frente'
		: 'Mostrando frente — toque para ver o verso');
}
function flipK(e, el) {
	if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flipT(e, el); }
}

function setWood(cid, wood, btn) {
	btn.parentElement.querySelectorAll('.tw').forEach(b => {
		b.classList.remove('on'); b.setAttribute('aria-pressed', 'false');
	});
	btn.classList.add('on'); btn.setAttribute('aria-pressed', 'true');
	const m = cid === 'master' ? 'master' : cid === 'esp' ? 'especial' : 'caatinga';
	render(cid, m, wood);
}

if (document.getElementById('d-master')) {
	render('master', 'master', 'cedar');
	render('esp', 'especial', 'cedar');
	render('caat', 'caatinga', 'cedar');
}

/* ── pages ── */
function showPg(id) {
	const pg = document.getElementById(id);
	if (!pg) return;
	document.querySelectorAll('.page').forEach(p => {
		p.classList.remove('active');
		p.setAttribute('aria-hidden', 'true');
	});
	pg.classList.add('active');
	pg.removeAttribute('aria-hidden');
	window.scrollTo(0, 0);
	const m = pg.querySelector('[tabindex="-1"]');
	if (m) { setTimeout(() => m.focus(), 80); }
}
function showHome() { window.location.href = '/'; }
function goForm() { window.location.href = '/contato'; }
function goto(sec) {
	if (!document.getElementById(sec)) {
		window.location.href = '/#' + sec;
		return;
	}
	setTimeout(() => {
		const el = document.getElementById(sec);
		if (!el) return;
		el.scrollIntoView({ behavior: 'smooth', block: 'start' });
		el.setAttribute('tabindex', '-1'); el.focus();
	}, 120);
}

/* ── masks ── */
function formatarCPF(el) {
	let v = el.value.replace(/\D/g, '').slice(0, 11);
	if (v.length > 9) v = v.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4');
	else if (v.length > 6) v = v.replace(/(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3');
	else if (v.length > 3) v = v.replace(/(\d{3})(\d{0,3})/, '$1.$2');
	el.value = v;
}
function mTel(el) {
	let v = el.value.replace(/\D/g, '').slice(0, 11);
	console.log(v)

	if (v.length > 10) v = v.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
	else if (v.length > 9) v = v.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
	else if (v.length > 6) v = v.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
	else if (v.length > 2) v = v.replace(/(\d{2})(\d{0,4})/, '($1) $2');
	el.value = v;
}

/* ── cpf ── */
function validarCPF(cpf) {
	cpf = cpf.replace(/\D/g, '');
	if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
		return false
	}
	else {
		let soma = 0;
		for (let i = 0; i < 9; i++) {
			soma += cpf[i] * (i + 1)
		}
		let sobra = soma % 11;
		if (sobra >= 10) {
			sobra = 0;
		}
		if (sobra != cpf[9]) {
			return false
		}
		else {
			soma = 0;
			for (let i = 0; i < 9; i++) {
				soma += cpf[i] * (9 - i);
			}
			sobra = soma % 11;
			if (sobra >= 10) {
				sobra = 0;
			}
			return (sobra == cpf[10]);
		}
	}
}

/* ── form ── */
function doSubmit() {
	const fs = [
		{ id: 'fn', check: v => v.trim().length > 1, msg: 'Por favor, informe seu nome completo.' },
		{ id: 'fe', check: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()), msg: 'Informe um e-mail válido.' },
		{ id: 'fm', check: v => v !== '', msg: 'Selecione o instrumento de interesse.' },
		{ id: 'fmsg', check: v => v.trim().length >= 10, msg: 'Por favor, escreva uma mensagem mais detalhada.' },
	];
	// reset
	fs.forEach(f => {
		const el = document.getElementById(f.id);
		const er = document.getElementById(f.id + '-e');
		if (el) { el.classList.remove('err-i', 'ok-i'); }
		if (er) er.textContent = '';
	});
	document.getElementById('fc').classList.remove('err-i', 'ok-i');
	document.getElementById('fc-e').textContent = '';

	let ok = true; let first = null;
	fs.forEach(f => {
		const el = document.getElementById(f.id);
		const er = document.getElementById(f.id + '-e');
		if (!el || !er) return;
		if (!f.check(el.value)) {
			er.textContent = f.msg; el.classList.add('err-i');
			if (!first) first = el; ok = false;
		}
	});
	// cpf
	const cpf = document.getElementById('fc');
	const cpfe = document.getElementById('fc-e');
	if (!validarCPF(cpf.value)) {
		cpfe.textContent = 'CPF inválido. Verifique os dígitos.';
		cpf.classList.add('err-i'); if (!first) first = cpf; ok = false;
	} else { cpf.classList.add('ok-i'); }

	if (ok) {
		document.getElementById('fw').style.display = 'none';
		const s = document.getElementById('succ');
		s.style.display = 'block'; s.focus();
	} else if (first) { first.focus(); }
}

/* ── init ── */
document.querySelectorAll('.page:not(.active)').forEach(p => p.setAttribute('aria-hidden', 'true'));

const nav = document.querySelector('nav');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.getElementById('nav-menu');

function closeNavMenu() {
	if (!nav || !navToggle) return;
	nav.classList.remove('menu-open');
	navToggle.setAttribute('aria-expanded', 'false');
	navToggle.setAttribute('aria-label', 'Abrir menu');
}

function openNavMenu() {
	if (!nav || !navToggle) return;
	nav.classList.add('menu-open');
	navToggle.setAttribute('aria-expanded', 'true');
	navToggle.setAttribute('aria-label', 'Fechar menu');
}

if (nav && navToggle && navMenu) {
	navToggle.addEventListener('click', () => {
		if (nav.classList.contains('menu-open')) closeNavMenu();
		else openNavMenu();
	});

	navMenu.querySelectorAll('a').forEach(link => {
		link.addEventListener('click', closeNavMenu);
	});

	document.addEventListener('keydown', event => {
		if (event.key === 'Escape') closeNavMenu();
	});

	document.addEventListener('click', event => {
		if (!nav.contains(event.target)) closeNavMenu();
	});
}
