class Animation implements AnimationClass {
  settings: GeneralSettings;
  elements: HTMLCollectionOf<Element>;
  keyframe!: KeyframeOptions[];
  animationOptions!: KeyframeAnimationOptions;

  constructor(elements: HTMLCollectionOf<Element>, settings: GeneralSettings) {
    this.elements = elements;
    this.settings = settings;
  }

  animate(cumulativeDuration: number) {
    let animationTarget = 0;
    let animate: AnimationType;
    setTimeout(() => {
      setInterval(() => {
        animate?.cancel();
        animate = this.elements[animationTarget].animate(this.keyframe, this.animationOptions);
        animationTarget = animationTarget < this.elements.length - 1 ? (animationTarget += 1) : 0;
      }, this.settings.delay * 1000);
    }, cumulativeDuration * 1000);
  }
}

export default Animation;
