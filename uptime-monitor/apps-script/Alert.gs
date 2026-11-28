/**
 * Straat Studio uptime alerts. A Google Apps Script web app that receives a POST from the Cloudflare Worker and sends the email.
 * Script properties (Project settings, Script properties): ALERT_SECRET (same value as the Worker), ALERT_TO (your email),
 * and optionally CLIENT_TO (a client email, added when set).
 * Deploy as a web app: Execute as me, access Anyone.
 */
function doPost(e) {
  var p;
  try { p = JSON.parse(e.postData.contents); } catch (err) { return out_({ ok: false, error: 'bad json' }); }
  var props = PropertiesService.getScriptProperties();
  var secret = props.getProperty('ALERT_SECRET');
  if (!secret || p.secret !== secret) return out_({ ok: false, error: 'not allowed' });
  var to = props.getProperty('ALERT_TO');
  if (!to) return out_({ ok: false, error: 'ALERT_TO not set' });
  var client = props.getProperty('CLIENT_TO');
  if (client) to = to + ',' + client;
  var site = String(p.site || 'a site').slice(0, 100), url = String(p.url || '').slice(0, 200), t = String(p.time || '');
  var prefix = p.test ? 'TEST: ' : '';
  var subject, body;
  if (p.type === 'up') {
    subject = prefix + 'Back up: ' + site;
    body = site + ' is back up.\n\nAddress: ' + url + '\nStatus: ' + p.status + '\nChecked: ' + t;
  } else {
    subject = prefix + 'DOWN: ' + site;
    body = site + ' did not answer correctly ' + p.fails + ' checks in a row (checks run every 5 minutes).\n\nAddress: ' + url + '\nStatus: ' + (p.status || 'no answer') + '\nProblem: ' + (p.error || '') + '\nChecked: ' + t +
      (p.test ? '\n\nThis is a test of the monitor using a deliberately broken address. Nothing is wrong with your site.' : '\n\nYou will get one more email when it is back up.');
  }
  MailApp.sendEmail({ to: to, subject: subject, body: body, name: 'Straat Studio uptime' });
  return out_({ ok: true });
}
function doGet() { return out_({ ok: true, service: 'straat-uptime-alerts' }); }
function out_(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
