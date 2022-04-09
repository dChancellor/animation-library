import BounceIn from './animations/BounceIn';
import Spin from './animations/Spin';
import RollercoasterOut from './animations/RollercoasterOut';

const defaultSettings: Settings = {
  general: {
    delay: 5,
    floor: 0,
    cor: 0.75,
  },
  animations: {
    bounceIn: { duration: 2, numberOfBounces: 1 },
    rollercoasterOut: { duration: 2, dipHeight: 10, riseHeight: 20 },
    spin: { duration: 2 },
  },
};

class AnimationSequence implements AnimationSequenceClass {
  settings: Settings = defaultSettings;
  elements!: HTMLCollectionOf<Element>;
  cumulativeDuration: number = 0;
  lastDuration: number = 0;
  animations: AnimationClasses = {};
  bounceIn!: () => this;
  spin!: () => this;
  rollercoasterOut!: () => this;

  #getAnimationClass(animation: string) {
    switch (animation) {
      case 'bounceIn':
        return new BounceIn(this.elements, this.settings.general, this.settings.animations.bounceIn);
      case 'spin':
        return new Spin(this.elements, this.settings.general, this.settings.animations.spin);
      case 'rollercoasterOut':
        return new RollercoasterOut(this.elements, this.settings.general, this.settings.animations.rollercoasterOut);
      default:
        return;
    }
  }

  #setLongestDuration(): void {
    this.lastDuration =
      this.settings.animations.bounceIn.duration > this.lastDuration
        ? this.settings.animations.bounceIn.duration
        : this.lastDuration;
  }

  init(elements: HTMLCollectionOf<Element>, userSettings?: Props) {
    this.elements = elements;
    if (userSettings) this.#settingsReducer(userSettings);

    const keys = ['bounceIn', 'spin', 'rollercoasterOut'];
    keys.forEach((key: string) => {
      this.animations[key as keyof AnimationClasses] = this.#getAnimationClass(key);
      this.animations[key as keyof AnimationClasses]?.setup();
      this[key as keyof AnimationClasses] = () => {
        this.#setLongestDuration();
        this.animations[key as keyof AnimationClasses]?.animate(this.getCumulativeDuration);
        return this;
      };
    });
  }

  get getCumulativeDuration() {
    return this.cumulativeDuration;
  }

  and() {
    return this;
  }

  then() {
    this.#addToCumulativeDuration(this.lastDuration);
    return this;
  }

  #addToCumulativeDuration(durationToAdd: number) {
    this.cumulativeDuration = this.cumulativeDuration + durationToAdd;
  }

  #settingsReducer(userSettings: Props) {
    this.settings.general = { ...this.settings.general, ...userSettings.general };
    // TODO - Implement a better settings reducer here
  }
}

export default AnimationSequence;
