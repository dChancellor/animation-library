// interface GeneralSettings {
//   timeBetween: number;
//   floor: number;
//   cor: number;
// }
// interface BounceIn {
//   duration: number;
//   numberOfBounces: number;
// }
// interface BounceInType {
//   duration: number;
//   numberOfBounces: number;
// }
// interface BounceOut {
//   duration: number;
//   dipHeight: number;
//   riseHeight: number;
// }

// interface Spin {
//   duration: number;
// }
// interface Animations {
//   bounceIn: BounceIn;
//   bounceOut: BounceOut;
//   spin: Spin;
// }

// type Modules = BounceIn | BounceOut | Spin;
// type Module = BounceInType | BounceOut | Spin;

// interface ModuleFunction {
//   setup: (settings: Settings) => void;
//   animate: (settings: Settings, elements: HTMLCollectionOf<Element>) => AnimationRunRoutines;
// }

// type Easing = 'ease-in' | 'ease-out' | 'ease-in-out';

// interface BounceKeyframe {
//   offset?: number;
//   bottom?: number;
//   easing?: Easing;
// }

// interface AnimationSetupRoutines {
//   bounceIn: (settings: Settings) => void;
//   bounceOut: (settings: Settings) => void;
//   spin: (settings: Settings) => void;
// }

// interface AnimationRunRoutines {
//   init: (elements: HTMLCollectionOf<Element>, props: Props) => void;
//   and: () => AnimationRunRoutines;
//   then: () => AnimationRunRoutines;
//   bounceIn: () => AnimationRunRoutines;
//   bounceOut: () => AnimationRunRoutines;
//   spin: () => AnimationRunRoutines;
// }

// interface Props {
//   general?: GeneralSettings;
//   animations?: Animations;
// }

// interface Settings {
//   general: GeneralSettings;
//   animations: Animations;
// }

// type SettingObject = Settings;

// interface AnimationSequences {
//   settings: Settings;
//   elements: HTMLCollectionOf<Element>;
//   cumulativeDuration: number;
//   animations: AnimationRunRoutines;
// }
