// Connexion au projet Supabase de l'église (l'URL et la clé "anon" sont publiques par conception)
const sb = supabase.createClient(
  'https://tloicqvixmmdudzizmbu.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRsb2ljcXZpeG1tZHVkeml6bWJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgzMjk0MjIsImV4cCI6MjA5MzkwNTQyMn0.r4_bPNoF4_jsSH-x2jI27LH7bV580f3_11GFuvgSTB8'
);
const $ = s => document.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const MENT = ['EX', 'TB', 'B', 'AB', 'À refaire'];
const badge = m => `<span class="m m-${MENT.indexOf(m)}">${esc(m)}</span>`;
const meta = (type, duree, n) => `<p class="meta"><span class="chip">${esc(type)}</span><span class="chip">${duree} min</span><span class="chip">${n} question${n > 1 ? 's' : ''}</span></p>`;
const full = x => `${x.prenom} ${x.nom} ${x.postnom || ''}`.trim();
const sortP = a => [...a].sort((x, y) => full(x).localeCompare(full(y), 'fr'));
const ERR = {
  code_invalide: 'Code inconnu, ou vous n’êtes pas dans la session active.',
  trop_d_essais: 'Trop d’essais. Réessayez dans 10 minutes.',
  indisponible: 'Cette évaluation n’est pas disponible.',
  deja_passe: 'Vous avez déjà passé cette évaluation.',
  erreur_reseau: 'Problème de connexion. Réessayez.',
  non_autorise: 'Accès refusé.'
};
async function rpc(f, a) {
  const { data, error } = await sb.rpc(f, a || {});
  if (error) { console.error(f, error); return { ok: false, raison: 'erreur_reseau' }; }
  return data;
}
function toast(t) {
  const x = $('#toast'); x.textContent = t; x.classList.add('on');
  clearTimeout(x._t); x._t = setTimeout(() => x.classList.remove('on'), 3200);
}
