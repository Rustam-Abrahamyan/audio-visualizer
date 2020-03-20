function AudioAnalyser() {
    const audioAnalyser = {
        audioCtx: null,
        source: null,
        analyser: null,
        gainNode: null,
        hasNewSong: false,
        init() {
            audioAnalyser.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            audioAnalyser.analyser = audioAnalyser.audioCtx.createAnalyser();
            audioAnalyser.gainNode = audioAnalyser.audioCtx.createGain();
            audioAnalyser.gainNode.gain.value = 0.2;
        },
        makeAudio(data) {
            if (audioAnalyser.source) {
                audioAnalyser.source.stop(0);
            }

            audioAnalyser.source = audioAnalyser.audioCtx.createBufferSource();

            if (audioAnalyser.audioCtx.decodeAudioData) {
                audioAnalyser.audioCtx.decodeAudioData(data, function (buffer) {
                    audioAnalyser.source.buffer = buffer;
                    playAudio();
                });
            } else {
                audioAnalyser.source.buffer = audioAnalyser.audioCtx.createBuffer(data, false);
                playAudio();
            }

            audioAnalyser.hasNewSong = true;
        }
    };

    function playAudio() {
        audioAnalyser.source.connect(audioAnalyser.analyser);
        audioAnalyser.source.connect(audioAnalyser.gainNode);
        audioAnalyser.gainNode.connect(audioAnalyser.audioCtx.destination);
        audioAnalyser.source.start(0);
        audioAnalyser.hasNewSong = false;
    }

    return audioAnalyser;
}

export default AudioAnalyser;
