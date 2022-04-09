import Animation from '../Animation';

class RollercoasterOut extends Animation implements SpecificAnimationClass {
  props: RollercoasterOutProps;

  constructor(elements: HTMLCollectionOf<Element>, general: GeneralSettings, props: RollercoasterOutProps) {
    super(elements, general);
    this.props = props;
    super.animationOptions = {
      duration: props.duration * 1000,
      iterations: 1,
      fill: 'forwards',
    };
  }

  setup() {
    const keyframe: RollercoasterOutKeyframe[] = [
      { offset: 0, bottom: `${this.settings.floor}%`, easing: 'ease-out' },
      { offset: 0.2, bottom: `${this.settings.floor - this.props.dipHeight}%`, easing: 'ease-in-out' },
      { offset: 0.3, bottom: `${this.settings.floor + this.props.riseHeight}%`, easing: 'ease-in-out' },
      { offset: 1, bottom: `${this.settings.floor - 80}%`, easing: 'ease-in' },
    ];
    super.keyframe = keyframe;
  }

  animate(cumulativeDuration: number) {
    super.animate(cumulativeDuration);
  }
}

export default RollercoasterOut;
