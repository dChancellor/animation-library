import Animation from '../Animation';

class BounceIn extends Animation implements SpecificAnimationClass {
  props: BounceInProps;

  constructor(elements: HTMLCollectionOf<Element>, general: GeneralSettings, props: BounceInProps) {
    super(elements, general);
    this.props = props;
    super.animationOptions = {
      duration: props.duration * 1000,
      iterations: 1,
      fill: 'forwards',
    };
  }

  #bounceReducer = (): BounceInKeyframe[] => {
    switch (this.props.numberOfBounces) {
      case 1:
        return [{ offset: 0.6, bottom: `${50 * this.settings.cor}%`, easing: 'ease-in' }];
      case 2:
        return [
          { offset: 0.466, bottom: `${50 * this.settings.cor}%`, easing: 'ease-in' },
          { offset: 0.732, bottom: `${this.settings.floor}%`, easing: 'ease-out' },
          { offset: 0.86, bottom: `${25 * this.settings.cor}%`, easing: 'ease-in' },
        ];
      default:
        return [];
    }
  };

  setup() {
    let keyframe: BounceInKeyframe[] = [
      { offset: 0, bottom: '100%', easing: 'ease-in' },
      { offset: 0.2, bottom: `${this.settings.floor}%`, easing: 'ease-out' },
    ];
    // 1 and 2 Bounces require hard coded math
    if (this.props.numberOfBounces === 1 || this.props.numberOfBounces === 2) {
      keyframe = [...keyframe, ...this.#bounceReducer()];
    } else {
      let previousKeyFramePercent = 20;
      for (let i = 0; i < this.props.numberOfBounces; i += 1) {
        let bounceLength = 80 / Math.pow(2, i + 1);
        const bounceUp: BounceInKeyframe = {
          offset: (previousKeyFramePercent + bounceLength / 2) / 100,
          bottom: `${bounceLength * this.settings.cor + this.settings.floor}%`,
          easing: 'ease-in',
        };
        const fallDown: BounceInKeyframe = {
          offset: (previousKeyFramePercent + bounceLength) / 100,
          bottom: `${this.settings.floor}%`,
          easing: 'ease-out',
        };
        keyframe = [...keyframe, bounceUp, fallDown];
        previousKeyFramePercent = previousKeyFramePercent + bounceLength;
      }
    }
    const atRest: BounceInKeyframe = { offset: 1, bottom: `${this.settings.floor}%`, easing: 'ease-out' };
    keyframe = [...keyframe, atRest];
    super.keyframe = keyframe;
  }

  animate(cumulativeDuration: number) {
    super.animate(cumulativeDuration);
  }
}

export default BounceIn;
