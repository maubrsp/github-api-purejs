import anime from 'animejs';

const getElement = element => {
  const values = {
    loader: document.getElementsByClassName('loader')[0],
    saveInfo: document.getElementsByClassName('save-modal')[0]
  };
  return element ? values[element] : values;
};

export function hideloader() {
  return new Promise((resolve, reject) => {
    const loader = getElement('loader');
    anime({
      targets: loader,
      duration: 450,
      elasticity: 0,
      opacity: [1, 0],
      delay: 900,
      complete: () => {
        loader.setAttribute('style', 'display: none; opacity: 0;');
        resolve();
      }
    });
  });
}

export function showloader() {
  return new Promise((resolve, reject) => {
    const loader = getElement('loader');
    loader.setAttribute('style', 'display: inline-block; opacity: 0;');
    anime({
      targets: loader,
      duration: 550,
      elasticity: 0,
      opacity: [0, 1],
      delay: 10,
      complete: () => {
        resolve();
      }
    });
  });
}
