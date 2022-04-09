import bounceIn from './bounceIn';
import bounceOut from './animations/bounceOut';
import spin from './animations/spin';

export let cumulativeDuration = 0;

export const setCumulativeDuration = (lastDuration: number) => {
  cumulativeDuration += cumulativeDuration + lastDuration;
};

let elements: HTMLCollectionOf<Element>;

let defaultSettings: Settings = {
  general: {
    timeBetween: 3,
    floor: 0,
    cor: 0.75,
  },
  animations: {
    bounceIn: { duration: 2, numberOfBounces: 3 },
    bounceOut: { duration: 2, dipHeight: 10, riseHeight: 20 },
    spin: { duration: 2 },
  },
};

export let settings: Settings = defaultSettings;

const settingsReducer = (props: Props) => {
  let combinedSettings = defaultSettings;
  combinedSettings.general = { ...combinedSettings.general, ...props.general };
  Object.entries(combinedSettings.animations).forEach(([key]) => {
    if (props.animations && props.animations[key as keyof Animations]) {
      combinedSettings.animations[key as keyof Animations] = props.animations[key as keyof Animations];
    }
  });
  return combinedSettings;
};

const init = (targets: HTMLCollectionOf<Element>, props: Props) => {
  elements = targets;
  let settings = settingsReducer(props);
  Object.entries(settings.animations).forEach(([key]) => {
    if (!setupAnimation[key as keyof Animations])
      throw Error(`You are trying to define settings for ${key}, which is an invalid animation`);
    setupAnimation[key as keyof Animations](settings);
  });
};

const setupAnimation: AnimationSetupRoutines = {
  bounceIn: (settings) => bounceIn.setup(settings),
  bounceOut: (settings) => bounceOut.setup(settings),
  spin: (settings) => spin.setup(settings),
};

const and = () => {
  return animation;
};
const then = () => {
  return animation;
};

const animation: AnimationRunRoutines = {
  init: (elements, props) => init(elements, props),
  and: () => and(),
  then: () => then(),
  bounceIn: () => bounceIn.animate(settings, elements),
  bounceOut: () => bounceOut.animate(settings, elements),
  spin: () => spin.animate(settings, elements),
};

export default animation;
