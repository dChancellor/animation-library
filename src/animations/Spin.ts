import Animation from '../Animation';

class Spin extends Animation implements SpecificAnimationClass {
  props: SpinProps;

  constructor(elements: HTMLCollectionOf<Element>, general: GeneralSettings, props: SpinProps) {
    super(elements, general);
    this.props = props;
    super.animationOptions = {
      duration: props.duration * 1000,
      iterations: 1,
      fill: 'forwards',
    };
  }

  setup() {
    // TODO - Customize to number of spins requested in SpinProps
    super.keyframe = [
      { offset: 0, transform: 'rotate(0turn)', easing: 'ease-in-out' },
      { offset: 1, transform: 'rotate(1turn)', easing: 'ease-in' },
    ];
  }

  animate(cumulativeDuration: number) {
    super.animate(cumulativeDuration);
  }
}

export default Spin;
