#!/usr/bin/env node
const cp = require('child_process');
const fs = require('fs');
const boolean = require('boolean').boolean;
var getStdin  = null;
var amazontts = null;
var googletts = null;




// Global variables
const E       = process.env;
const STDIO   = [0, 1, 2];
const OPTIONS = {
  log: boolean(E['TTS_LOG']      || '0'),
  output:      E['TTS_OUTPUT']   || 'out.mp3',
  text:        E['TTS_TEXT']     || null,
  provider:    E['TTS_PROVIDER'] || 'google'
};




// ES modules dependency loader :).
async function importDependencies() {
  if (getStdin!=null) return;
  var $ = await Promise.all([
    import('get-stdin'),
  ]);
  getStdin = $[0].default;
}




// Get package name from provider.
function name(pro) {
  if(/amazon|aws/i.test(pro)) return 'extra-amazontts';
  else return 'extra-googletts';
}

// Get package export from provider.
function load(pro) {
  if(/amazon|aws/i.test(pro)) return amazontts=amazontts||require('extra-amazontts');
  else return googletts=googletts||require('extra-googletts');
}




/**
 * Generate speech audio from super long text through machine.
 * @param {string} out Output audio file.
 * @param {string} txt Input text.
 * @param {object} o Options
 * @returns {Promise} Table of contents.
 */
function tts(out, txt, o) {
  o = o||{};
  var pro = o.provider||OPTIONS.provider;
  return load(pro)(out, txt, o);
}

// Get options from arguments.
function options(o, k, a, i) {
  var e = k.indexOf('='), v = null, str = () => a[++i];
  if(e>=0) { v = k.substring(e+1);  str = () => v; k = k.substring(o, e); }
  if(!o.provider) {
    for(var j=i, J=a.length; j<J; j++)
      if(a[j]==='-p' || a[j]==='--provider') { o.provider = a[++j]; break; }
    o.provider = o.provider||OPTIONS.provider;
  }
  if(k==='-p' || k==='--provider') o.provider = str();
  else return load(o.provider).options(o, k, a, i);
  return i+1;
}
tts.options = options;
module.exports = tts;




// Run on shell.
async function shell(a) {
  await importDependencies();
  var o = {argv: getStdin()};
  for(var i=2, I=a.length; i<I; i++)
    options(o, a[i], a, i);
  if(o.help) return cp.execSync('less README.md', {cwd: __dirname, stdio: STDIO});
  var out = o.output||OPTIONS.output;
  var txt = o.text? fs.readFileSync(o.text, 'utf8'):o.argv||'';
  var pro = o.provider||OPTIONS.provider;
  var toc = await load(pro)(out, txt, o);
  if(o.log || OPTIONS.log) return;
  for(var c of toc)
    if(c.title) console.log(c.time+' '+c.title);
}
if(require.main===module) shell(process.argv);
