import animation, { cumulativeDuration, setCumulativeDuration } from '../index';

let keyframe: Keyframe[];

const animate = (delay: number, duration: number, elements: HTMLCollectionOf<Element>) => {
  let currentElement = 0;
  let animate: Animation;
  setInterval(() => {
    console.log('here', keyframe);

    animate = elements[currentElement].animate(keyframe, {
      duration: duration * 1000,
      iterations: 1,
      fill: 'forwards',
    });
    currentElement = currentElement < elements.length - 1 ? (currentElement += 1) : 0;
  }, delay * 1000);
  return animation;
};

const setup = (floor: number, props: BounceOut) => {
  keyframe = [
    { offset: 0, transform: 'rotate(0turn)', easing: 'ease-out' },
    { offset: 1, transform: 'rotate(1turn)', easing: 'ease-out' },
  ];
};

const bounceOut: ModuleFunction = {
  setup: (settings) => setup(settings.general.floor, settings.animations.bounceOut),
  animate: (settings, elements) =>
    animate(settings.general.timeBetween, settings.animations.bounceOut.duration, elements),
};

export default bounceOut;
