// Runs the real monthlyReport() from straatos/apps-script/Code.gs against the fake Google world with a made-up month of 12 enquiries,
// and saves the email it would send. Made-up data only.
import fs from 'node:fs';
const { world } = await import('/home/sojama/straatos/test/world.mjs');
const w = world();
const now = new Date();
const d = (day) => new Date(now.getFullYear(), now.getMonth() - 1, day, 10);
const rows = [
  ['COC certificate', 'Rylands', 'Won', 2], ['COC certificate', 'Rylands', 'Quote sent', 4], ['Fault finding', 'Athlone', 'Won', 5], ['DB board upgrade', 'Athlone', 'Lost', 7],
  ['COC certificate', 'Bellville', 'Contacted', 9], ['Fault finding', 'Rylands', 'New', 12], ['Solar', 'Bellville', 'Quote sent', 14], ['COC certificate', 'Rylands', 'Won', 16],
  ['Fault finding', 'Athlone', 'Lost', 19], ['COC certificate', 'Athlone', 'New', 21], ['DB board upgrade', 'Rylands', 'Quote sent', 24], ['Other', 'Other', 'New', 27],
];
const sh = w.sheets.Enquiries;
rows.forEach(([job, area, status, day], i) => {
  const r = i + 2;
  const v = new Array(15).fill('');
  v[0] = d(day); v[1] = 'Q-' + String(i + 1).padStart(4, '0'); v[2] = 'Test Person ' + (i + 1); v[3] = '0821234567'; v[5] = job; v[6] = area; v[9] = status; v[11] = d(day);
  sh.getRange(r, 1, 1, 15).setValues([v]);
});
const s = w.ctx.monthlyReport();
const m = w.mails[0];
const out = `To: ${m.to}\nFrom name: ${m.name}\nSubject: ${m.subject}\n\n${m.body}\n`;
fs.mkdirSync('/home/sojama/STRAAT-STUDIO/service-tests/evidence/batch-b', { recursive: true });
fs.writeFileSync('/home/sojama/STRAAT-STUDIO/service-tests/evidence/batch-b/03-monthly-report-email.txt', 'MADE-UP DATA, FAKE GOOGLE SERVICES. This is the email monthlyReport() produces for 12 made-up enquiries.\nNote: the month label here (2026-09) is a limit of the test fake, which formats dates in UTC. On real Google, Utilities.formatDate with MMMM yyyy gives the month name, for example October 2026.\n\n' + out);
console.log(out); console.log(JSON.stringify(s));
