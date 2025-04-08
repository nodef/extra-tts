Generate speech audio from super long text through machine.
> Do you want to:
> - Share your ideas anonymously on YouTube?
> - Pretend on phone that you are not a kid (Home Alone)?
> - Learn good english pronunciation for a speech?
> - Make your computer read out your school notes?
> - Experiment with various voices from around the globe?
> - Or, [Upload Wikipedia TTS videos on YouTube]?

Sample: ["I want to order a stuffed crust pizza"](https://clyp.it/kje2yfdk).

<br>
<br>


## Setup

1. Run `npm install -g extra-tts` in **console**.
2. To install this as a package use `npm install extra-tts`.
3. Check setup for [Google TTS] and [Amazon TTS] separately.

<br>
<br>


## Console

```bash
tts "I want to order a stuffed crust pizza"
# out.mp3 created (yay!)

tts -t speech.txt -o speech.mp3
# speech.mp3 created from text in speech.txt

tts "Hello 911, my husband is in danger!" -vg female
# out.mp3 created with female voice

echo "Dead man walking." | tts -p amazon -vn Matthew --log
# out.mp3 created with different male voice through Aamzon TTS (log enabled)
```
> Available [Google TTS voices]?<br>
> Available [Amazon TTS voices]?


### Reference

```bash
tts [options] <text>
# text: input text

# Options:
# --help:        show this help
# -l, --log:     enable log
# -o, --output:  set output audio file (out.mp3)
# -t, --text:    set input text file
# -r, --retries: set speech synthesis retries (8)
# -a, --acodec:  set acodec (copy)
# -ae, --audio_encoding:  set audio encoding (MP3)
# -af, --audio_frequency: set audio frequency/sample rate
# -lc, --language_code:   set language code (en-US)
# -vn, --voice_name:      set voice name
# -vg, --voice_gender:    set voice gender (neutral)
# -vp, --voice_pitch:     set voice pitch change (0.0)
# -vr, --voice_rate:      set voice speaking rate (1.0)
# -vv, --voice_volume:    set voice volume gain in dB (0.0)
# -qb, --quote_break:        set quoted text break time (250)
# -qe, --quote_emphasis:     set quoted text emphasis level (moderate)
# -hb, --heading_break:      set heading text break time (4000)
# -hd, --heading_difference: set heading text break difference (250)
# -he, --heading_emphasis:   set heading text emphasis level (strong)
# -eb, --ellipsis_break:     set ellipsis break time (1500)
# -db, --dash_break:         set dash break time (500)
# -nb, --newline_break:      set newline break time (1000)
# -bs, --block_separator:    set block separator (.)
# -bl, --block_length:       set block length (5000)
# -c*, --config_*:           set provider config options (see below)
## (all times are in milliseconds)

# Environment variables:
$TTS_LOG      # enable log (0)
$TTS_OUTPUT   # set output audio file (out.mp3)
$TTS_TEXT     # set input text file
$TTS_RETRIES  # set speech synthesis retries (8)
$TTS_ACODEC   # set acodec (copy)
$TTS_PROVIDER # set provider (google)
$TTS_AUDIO_ENCODING     # set audio encoding (MP3)
$TTS_AUDIO_FREQUENCY    # set audio frequency/sample rate
$TTS_LANGUAGE_CODE      # set language code (en-US)
$TTS_VOICE_NAME         # set voice name
$TTS_VOICE_GENDER       # set voice gender (neutral)
$TTS_VOICE_PITCH        # set voice pitch change (0.0)
$TTS_VOICE_RATE         # set voice speaking rate (1.0)
$TTS_VOICE_VOLUME       # set voice volume gain in dB (0.0)
$TTS_QUOTE_BREAK        # set quoted text break time (250)
$TTS_QUOTE_EMPHASIS     # set quoted text emphasis level (moderate)
$TTS_HEADING_BREAK      # set heading text break time (4000)
$TTS_HEADING_DIFFERENCE # set heading text break difference (250)
$TTS_HEADING_EMPHASIS   # set heading text emphasis level (strong)
$TTS_ELLIPSIS_BREAK     # set ellipsis break time (1500)
$TTS_DASH_BREAK         # set dash break time (500)
$TTS_NEWLINE_BREAK      # set newline break time (1000)
$TTS_BLOCK_SEPARATOR    # set block separator (.)
$TTS_BLOCK_LENGTH       # set block length (5000)
... # see extra provider config options below
```
> See [Extra GCP Config] options.<br>
> See [Extra AWS Config] options.

<br>
<br>


## Package

```javascript
const tts = require('extra-tts');

await tts('out.mp3', 'I want to order a stuffed crust pizza');
// out.mp3 created (yay!)

const fs = require('fs');
var speech = fs.readFileSync('speech.txt', 'utf8');
await tts('speech.mp3', speech)
// speech.mp3 created from text in speech.txt

await tts('out.mp3', 'Hello 911, my husband is in danger!', {
  voice: {gender: 'FEMALE'}
});
// out.mp3 created with female voice

await tts('out.mp3', 'Dead man walking.', {
  voice: {name: 'Matthew'}, provider: 'amazon', log: true
});
// out.mp3 created with different male voice through Amazon TTS (log enabled)
```


### Reference

```javascript
const tts = require('extra-tts');

tts(output, text, options={})
// output:  output audio file
// text:    input text
// options: given below
// -> Promise <table of contents>

// Default options:
options = {
  stdio: [0, 1, 2], // set child process stdio
  log: false,       // enable log
  retries: 8,       // set speech synthesis retries
  acodec: 'copy',   // set audio acodec
  audio: {
    encoding: 'MP3',     // set audio encoding
    frequency: 0,        // set audio frequency/sample rate
  },
  language: {
    code: 'en-US'        // set language code
  },
  voice: {
    name: null,          // set voice name
    gender: 'NEUTRAL'    // set voice SSML gender
    pitch: 0.0,          // set voice pitch change
    rate: 1.0,           // set voice speaking rate
    volume: 0.0,         // set voice volume gain in dB
  }
  quote: {
    break: 250,          // set quoted text break time
    emphasis: 'moderate' // set quoted text emphasis level
  },
  heading: {
    break: 4000,         // set heading text break time
    difference: 250,     // set heading text break difference
    emphasis: 'strong',  // set heading text emphasis level
  },
  ellipsis: {
    break: 1500          // set ellipsis break time
  },
  dash: {
    break: 500           // set dash break time
  },
  newline: {
    break: 1000          // set newline break time
  },
  block: {
    separator: '.'       // set block separator
    length: 5000,        // set block length
  },
  config: null, // set GCP/AWS config
  params: null  // set synthesize speech parameters "directly"
}
```
> See [Extra GCP Config] options.<br>
> See [Extra AWS Config] options.

<br>
<br>


## Similar

Do you need anything similar?
- [extra-youtubeuploader] can upload videos with caption to YouTube.
- [extra-stillvideo] can generate video from audio and image.

Suggestions are welcome. Please [create an issue].

<br>
<br>


[![nodef](https://i.imgur.com/LPVfMny.jpg)](https://nodef.github.io)
> References: [Google TTS], [Amazon TTS].

[Upload Wikipedia TTS videos on YouTube]: https://www.youtube.com/results?search_query=wikipedia+audio+article

[Google TTS]: https://www.npmjs.com/package/extra-googletts
[Amazon TTS]: https://www.npmjs.com/package/extra-amazontts
[Google TTS voices]: https://cloud.google.com/text-to-speech/docs/voices
[Amazon TTS voices]: https://docs.aws.amazon.com/polly/latest/dg/voicelist.html
[Extra GCP Config]: https://www.npmjs.com/package/extra-gcpconfig
[Extra AWS Config]: https://www.npmjs.com/package/extra-awsconfig

![](https://ga-beacon.deno.dev/G-RC63DPBH3P:SH3Eq-NoQ9mwgYeHWxu7cw/github.com/nodef/extra-tts)

[extra-stillvideo]: https://www.npmjs.com/package/extra-stillvideo
[extra-youtubeuploader]: https://www.npmjs.com/package/extra-youtubeuploader
[create an issue]: https://github.com/nodef/extra-tts/issues
