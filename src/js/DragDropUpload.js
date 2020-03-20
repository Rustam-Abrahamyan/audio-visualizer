function DragDropUpload() {
    const defaultSongs = [
        'Eminem - Lose Yourself.mp3',
    ];

    const dragdropUpload = {
        filename: null,
        init(audioAnalyser) {
            document.body.addEventListener('drop', drop_handler, false);
            document.body.addEventListener('dragover', dragover_handler, false);

            let audioname = document.createElement('div');
            audioname.setAttribute('id', 'audioname');
            document.body.appendChild(audioname);


            let instructions = document.createElement('div');
            instructions.setAttribute('id', 'instructions');

            let div_ = document.createElement('div');
            div_.innerText = 'drop an .m';
            instructions.appendChild(div_);

            let div__ = document.createElement('div');
            div__.setAttribute('id', 'defaultsong');
            div__.innerText = 'or play default';
            instructions.appendChild(div__);

            document.body.appendChild(instructions);

            document.getElementById('defaultsong').addEventListener('click', () => {
                let mp3name = defaultSongs[parseInt(Math.random() * defaultSongs.length)];
                let request = new XMLHttpRequest();

                request.open('GET', 'songs/' + mp3name, true);
                request.responseType = 'arraybuffer';

                audioname.innerText = '[ Loading ]';

                request.onload = () => {
                    audioname.innerText = mp3name.replace(/\.[^/.]+$/, "");

                    if (document.getElementById('instructions')) document.getElementById('instructions').remove();
                    if (document.getElementById('warning')) document.getElementById('warning').remove();

                    audioAnalyser.makeAudio(request.response);
                };

                request.send();
            });

            function drop_handler(e) {
                e.preventDefault();

                let droppedFiles = e.target.files || e.dataTransfer.files;

                audioname.innerText = droppedFiles[0].name.replace(/\.[^/.]+$/, "");

                let reader = new FileReader();

                reader.onload = function (fileEvent) {
                    if (document.getElementById('instructions')) document.getElementById('instructions').remove();
                    if (document.getElementById('warning')) document.getElementById('warning').remove();

                    let data = fileEvent.target.result;
                    audioAnalyser.makeAudio(data);
                };
                reader.readAsArrayBuffer(droppedFiles[0]);

            }

            function dragover_handler(e) {
                e.preventDefault();
            }
        }
    };

    return dragdropUpload;
}

export default DragDropUpload;
