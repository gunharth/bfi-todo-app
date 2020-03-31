if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
}
import { Controller } from "./controller";

let controller = new Controller();
