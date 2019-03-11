import '../../styles/index.less';
import { initResize } from '../core/resize';
import anime from 'animejs';
import { activateRoutes } from '../core/shortcuts';

window.app.ready = false;
window.app.main = document.getElementsByTagName('main')[0];

window.scrollTo(0, 0);

const bootstrapApp = () => {
  return new Promise((resolve, reject) => {
    resolve();
  });
};

bootstrapApp()
  .then(result => {
    initResize();
    activateRoutes();
  })
  .catch(error => {
    // TODO tratamento de erros.
    console.log(error);
  });
