import bounceIn from './animations/bounceIn';

let defaultSettings: Settings = {
  general: {
    timeBetween: 3,
    floor: 0,
    cor: 0.75,
  },
  animations: {
    bounceIn: { duration: 2, numberOfBounces: 3 },
  },
};

export let settings: Settings = defaultSettings;

const newKeyframeRule = (sheet: CSSStyleSheet, name: string): CSSRule => {
  const ruleIndex = sheet.insertRule(`@keyframes ${name} {}`, 0);
  return sheet.cssRules[ruleIndex];
};

const newClass = (sheet: CSSStyleSheet, name: string) => {
  sheet.insertRule(
    `.${name} {animation-duration: ${
      settings.animations[name as keyof Animations].duration
    }s; animation-name: ${name}; animation-fill-mode: forwards; }`,
    0
  );
};

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

const init = (props: Props = settings) => {
  let settings = settingsReducer(props);
  const style = document.createElement('style');
  document.head.appendChild(style);
  const sheet = style.sheet;
  if (!sheet) throw Error('We had trouble creating a style sheet for the bounce module.');
  Object.entries(settings.animations).forEach(([key, value]) => {
    if (!setupAnimation[key as keyof Animations])
      throw Error(`You are trying to set settings for ${key}, which is an invalid animation`);
    const emptyKeyframe = newKeyframeRule(sheet, key);
    newClass(sheet, key);
    setupAnimation[key as keyof Animations](settings, emptyKeyframe, value);
  });
};

const setupAnimation: AnimationSetupRoutines = {
  bounceIn: (settings, keyframe, props) => bounceIn.setup(settings, keyframe, props),
};

const animation: AnimationRunRoutines = {
  init: (props) => init(props),
  bounceIn: (elements) => bounceIn.animate(settings, elements),
};

export default animation;
