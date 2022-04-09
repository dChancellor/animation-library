import animation, { cumulativeDuration, setCumulativeDuration } from '../index';

let keyframe: Keyframe[];

const animate = (delay: number, duration: number, elements: HTMLCollectionOf<Element>) => {
  let currentElement = 0;
  let animate: Animation;
  setTimeout(() => {
    setInterval(() => {
      animate?.cancel();
      animate = elements[currentElement].animate(keyframe, {
        duration: duration * 1000,
        iterations: 1,
        fill: 'forwards',
      });
      currentElement = currentElement < elements.length - 1 ? (currentElement += 1) : 0;
    }, delay * 1000);
  }, cumulativeDuration * 1000);
  setCumulativeDuration(duration);
  return animation;
};

const setup = (floor: number, props: BounceOut) => {
  keyframe = [
    { offset: 0, bottom: `${floor}%`, easing: 'ease-out' },
    { offset: 0.2, bottom: `${floor - props.dipHeight}%`, easing: 'ease-in-out' },
    { offset: 0.3, bottom: `${floor + props.riseHeight}%`, easing: 'ease-in-out' },
    { offset: 1, bottom: `${floor - 80}%`, easing: 'ease-in' },
  ];
};

const bounceOut: ModuleFunction = {
  setup: (settings) => setup(settings.general.floor, settings.animations.bounceOut),
  animate: (settings, elements) =>
    animate(settings.general.timeBetween, settings.animations.bounceOut.duration, elements),
};

export default bounceOut;
