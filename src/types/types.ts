interface AnimationSequenceClass {
  settings: Settings;
  elements: HTMLCollectionOf<Element>;
  cumulativeDuration: number;
  lastDuration: number;
  animations: AnimationClasses;
  init: (elements: HTMLCollectionOf<Element>, props: Props) => void;
  and: () => AnimationSequenceClass;
  then: () => AnimationSequenceClass;
  bounceIn: () => this;
}
interface GeneralSettings {
  delay: number;
  floor: number;
  cor: number;
}
interface Props {
  general?: GeneralSettings;
  animations?: AllAnimationProps;
}
interface Settings {
  general: GeneralSettings;
  animations: AllAnimationProps;
}
interface AllAnimationProps {
  bounceIn: BounceInProps;
  spin: SpinProps;
  rollercoasterOut: RollercoasterOutProps;
}

type AnimationProp = BounceInProps | SpinProps | RollercoasterOutProps;

interface AnimationClass {
  animate: (asdf: number) => void;
}

interface SpecificAnimationClass extends AnimationClass {
  setup: () => void;
}

interface AnimationClasses {
  bounceIn?: SpecificAnimationClass;
  spin?: SpecificAnimationClass;
  rollercoasterOut?: SpecificAnimationClass;
}

type AnimationName = 'bounceIn' | 'spin' | 'rollercoasterOut';

interface AnimationParameters {
  keyframe: Keyframe[];
  options?: KeyframeAnimationOptions;
}
type AnimationType = Animation;

type Easing = 'ease-in' | 'ease-out' | 'ease-in-out';

interface BounceInProps {
  duration: number;
  numberOfBounces: number;
}
interface RollercoasterOutProps {
  duration: number;
  dipHeight: number;
  riseHeight: number;
}
interface SpinProps {
  duration: number;
}
interface BounceInKeyframe extends Keyframe {
  offset: number;
  bottom: string;
  easing: Easing;
}
interface SpinKeyframe extends Keyframe {
  offset: number;
  transform: string;
  easing: Easing;
}
interface RollercoasterOutKeyframe extends Keyframe {
  offset: number;
  bottom: string;
  easing: Easing;
}
type KeyframeOptions = BounceInKeyframe | SpinKeyframe | RollercoasterOutKeyframe;
