#!/usr/bin/env node
const getStdin = require('get-stdin');
const boolean = require('boolean');
const cp = require('child_process');
const path = require('path');
const fs = require('fs');
var amazontts = null;
var googletts = null;


// Global variables
const E = process.env;
const STDIO = [0, 1, 2];
const OPTIONS = {
  log: boolean(E['TTS_LOG']||'0'),
  output: E['TTS_OUTPUT']||'out.mp3',
  text: E['TTS_TEXT']||null,
  provider: E['TTS_PROVIDER']||'google'
};


function name(pro) {
  if(/amazon|aws/i.test(pro)) return 'extra-amazontts';
  else return 'extra-googletts';
};

function load(pro) {
  if(/amazon|aws/i.test(pro)) return amazontts=amazontts||require('extra-amazontts');
  else return googletts=googletts||require('extra-googletts');
};

function tts(out, txt, o) {
  o = o||{};
  var pro = o.provider||OPTIONS.provider;
  return load(pro)(out, txt, o);
};

function options(o, k, a, i) {
  var e = k.indexOf('='), v = null, str = () => a[++i];
  if(e>=0) { v = k.substring(e+1); str = () => v; k = k.substring(o, e); }
  o.argvs = o.argvs||{};
  if(k==='-p' || k==='--provider') o.provider = str();
  else if(i<a.length-2) { o.argvs.push({k, a, i}); return i+1; }
  var pro = o.provider||OPTIONS.provider, fn = load(pro).options;
  for(var {k, a, i} of o.argvs)
    fn(o, k, a, i);
  return i+1;
};

tts.options = options;
module.exports = tts;


// Run on shell.
function shell(a) {
  var o = {argv: getStdin()};
  for(var i=2, I=a.length; i<I; i++)
    options(o, k, a, i);
  var pro = o.provider||OPTIONS.provider;
  var dir = path.dirname(require.resolve(name(pro)));
  if(o.help) return cp.execSync('less README.md', {cwd: dir, stdio: STDIO});
  var out = o.output||OPTIONS.output;
  var txt = o.text? fs.readFileSync(o.text, 'utf8'):o.argv||'';
  var toc = await load(pro)(out, txt, o);
  if(o.log || OPTIONS.log) return;
  for(var c of toc)
    if(c.title) console.log(c.time+' '+c.title);
};
if(require.main===module) shell(process.argv);
