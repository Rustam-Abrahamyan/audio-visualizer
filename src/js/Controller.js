import Visualizer_1 from './visualizers/Visualizer_1';
import Visualizer_2 from './visualizers/Visualizer_2';
import Visualizer_3 from './visualizers/Visualizer_3';

function Controller() {
    let analyser;
    let view;
    let scene;

    let controller = {
        visualizers: {
            'Theme-1': new Visualizer_1(),
            'Theme-2': new Visualizer_2(),
            'Theme-3': new Visualizer_3(),
        },
        activeViz: null,
        init: function (AudioAnalyser, View) {
            analyser = AudioAnalyser;
            view = View;
            scene = View.scene;

            let selector = document.createElement('div');

            selector.setAttribute('id', 'selector');

            document.body.appendChild(selector);

            let list = document.createElement('ul');

            selector.appendChild(list);

            let vizkeys = Object.keys(controller.visualizers);

            for (let i = 0; i < vizkeys.length; i++) {
                let li = document.createElement('li');

                li.innerText = vizkeys[i];

                li.setAttribute('id', 'vis_' + vizkeys[i]);
                li.setAttribute('class', 'visualizer');

                list.appendChild(li);
            }

            document.querySelectorAll('.visualizer').forEach((visualizer) => {
                if (controller.visualizers.hasOwnProperty(visualizer.innerText)) {
                    controller.visualizers[visualizer.innerText].init(analyser, view);
                }

                visualizer.addEventListener('click', () => {
                    [...visualizer.parentElement.children].forEach(sib => sib.classList.remove('active'));

                    visualizer.classList.add('active');

                    let name = visualizer.innerText;
                    if (!controller.activeViz || controller.activeViz.name != name) {
                        if (controller.visualizers.hasOwnProperty(name)) {
                            if (controller.activeViz) {
                                controller.activeViz.destroy();
                            }
                            controller.activeViz = controller.visualizers[name];
                            controller.activeViz.make();
                            View.renderVisualization = controller.activeViz.render;
                        }
                    }
                });
            });

            document.getElementById('vis_Theme-1').click();

        }
    };

    return controller;

}

export default Controller;
