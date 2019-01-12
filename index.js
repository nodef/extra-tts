#!/usr/bin/env node
var amazontts = null;
var googletts = null;


// Global variables
const E = process.env;
const OPTIONS = {
  provider: E['TTS_PROVIDER']||'google'
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
  var o = {};
  for(var i=2, I=a.length; i<I; i++)
    options(o, k, a, i);
  var pro = o.provider||OPTIONS.provider
  return load(pro).shell(a);
};
if(require.main===module) shell(process.argv);
