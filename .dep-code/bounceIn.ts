import animation, { cumulativeDuration, setCumulativeDuration } from './index';

let keyframe: Keyframe[];

const bounceReducer = (bounceCount: number, { cor, floor }: GeneralSettings): Keyframe[] => {
  switch (bounceCount) {
    case 1:
      return [{ offset: 0.6, bottom: `${50 * cor}%`, easing: 'ease-in' }];
    case 2:
      return [
        { offset: 0.466, bottom: `${50 * cor}%`, easing: 'ease-in' },
        { offset: 0.732, bottom: `${floor}%`, easing: 'ease-out' },
        { offset: 0.86, bottom: `${25 * cor}%`, easing: 'ease-in' },
      ];
    default:
      return [];
  }
};

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

const setup = (settings: Settings) => {
  const props = settings.animations.bounceIn;
  keyframe = [
    { offset: 0, bottom: '100%', easing: 'ease-in' },
    { offset: 0.2, bottom: `${settings.general.floor}%`, easing: 'ease-out' },
  ];
  // 1 and 2 Bounces require hard coded math
  if (props.numberOfBounces === 1 || props.numberOfBounces === 2) {
    keyframe = [...keyframe, ...bounceReducer(props.numberOfBounces, settings.general)];
  } else {
    let previousKeyFramePercent = 20;
    for (let i = 0; i < props.numberOfBounces; i += 1) {
      let bounceLength = 80 / Math.pow(2, i + 1);
      const bounceUp = {
        offset: (previousKeyFramePercent + bounceLength / 2) / 100,
        bottom: `${bounceLength * settings.general.cor + settings.general.floor}%`,
        easing: 'ease-in',
      };
      const fallDown = {
        offset: (previousKeyFramePercent + bounceLength) / 100,
        bottom: `${settings.general.floor}%`,
        easing: 'ease-out',
      };
      keyframe = [...keyframe, bounceUp, fallDown];
      previousKeyFramePercent = previousKeyFramePercent + bounceLength;
    }
  }
  const atRest = { offset: 1, bottom: `${settings.general.floor}%`, easing: 'ease-out' };
  keyframe = [...keyframe, atRest];
};

const bounceIn: ModuleFunction = {
  setup: (settings) => setup(settings),
  animate: (settings, elements) =>
    animate(settings.general.timeBetween, settings.animations.bounceIn.duration, elements),
};

export default bounceIn;
