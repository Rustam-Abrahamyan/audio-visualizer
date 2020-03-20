import AudioAnalyser from './AudioAnalyser';
import DragDropUpload from './DragDropUpload';
import View from './View';
import Controller from './Controller';

const webGLSupport = () => {
    try {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

        return !!(window.WebGLRenderingContext && context);
    } catch (e) {
        return false;
    }
};

if (webGLSupport()) {
    const audioAnalyser = new AudioAnalyser();
    const dragDropUpload = new DragDropUpload();
    const view = new View();
    const controller = new Controller();

    audioAnalyser.init();
    dragDropUpload.init(audioAnalyser);
    view.init(audioAnalyser);
    controller.init(audioAnalyser, view);
} else {
    alert("Your browser doesn't appear to support the HTML5 canvas element.")
}
