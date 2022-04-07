interface GeneralSettings {
  timeBetween: number;
  floor: number;
  cor: number;
}
interface BounceIn {
  duration: number;
  numberOfBounces: number;
}

interface BounceOut {
  duration: number;
  numberOfBounces: number;
}

interface Animations {
  bounceIn: BounceIn;
}

type Modules = BounceIn | BounceOut;

interface ModuleFunction {
  setup: (settings: Settings, keyframe: CSSRule, props: Modules) => void;
  animate: (settings: Settings, elements: HTMLCollectionOf<Element>) => void;
}

type Easing = 'ease-in' | 'ease-out' | 'ease-in-out';

interface BounceKeyframe {
  offset?: number;
  bottom?: number;
  easing?: Easing;
}

interface AnimationSetupRoutines {
  bounceIn: (settings: Settings, keyframe: CSSRule, props: BounceIn) => void;
}

interface AnimationRunRoutines {
  init: (props: Props) => void;
  bounceIn: (elements: HTMLCollectionOf<Element>) => void;
}

interface Props {
  general?: GeneralSettings;
  animations?: Animations;
}

interface Settings {
  general: GeneralSettings;
  animations: Animations;
}
type SettingObject = Settings;
