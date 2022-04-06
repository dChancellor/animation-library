const bounceReducer = (bounceCount: number, { cor, floor }: GeneralSettings) => {
  switch (bounceCount) {
    case 1:
      return [`60% {bottom: ${50 * cor}%; animation-timing-function: ease-in;}`];
    case 2:
      return [
        `46.6% {bottom: ${50 * cor}%;animation-timing-function: ease-in; }`,
        `73.2%{bottom:${floor}%; animation-timing-function: ease-out;}`,
        `86% {bottom:${25 * cor}%; animation-timing-function: ease-in;}`,
      ];
    default:
      return;
  }
};

const animate = (settings: Settings, elements: HTMLCollectionOf<Element>) => {
  let currentElement = -1;
  setInterval(() => {
    elements[currentElement]?.classList.remove('bounceIn');
    currentElement = currentElement < elements.length - 1 ? (currentElement += 1) : 0;
    elements[currentElement].classList.add('bounceIn');
  }, settings.general.timeBetween * 1000);
};

// ele.animate(
//   [
//     {  opacity: 0.8, transform: 'rotateY(0deg)' },
//     { opacity: 0, transform: 'rotateY(24deg)' },
//   ],
//   {
//     duration: 2000,
//     iterations: Infinity,
//     delay: delay * 1000,
//     easing: 'ease-in-out',
//   }
// );

const setup = (settings: Settings, keyframe: CSSRule, props: BounceIn): void => {
  //@ts-ignore
  keyframe.appendRule(`0% {bottom: 100%; animation-timing-function: ease-in;}`);
  //@ts-ignore
  keyframe.appendRule(`20% {bottom: ${settings.general.floor}%; animation-timing-function: ease-out;} `);

  // 1 and 2 Bounces require hard coded math
  if (props.numberOfBounces === 1 || props.numberOfBounces === 2) {
    const rules = bounceReducer(props.numberOfBounces, settings.general);
    if (rules)
      rules.forEach((rule: string) => {
        //@ts-ignore
        keyframe.appendRule(rule);
      });
  } else {
    let lastKeyFramePercent = 20;
    for (let i = 0; i < props.numberOfBounces; i += 1) {
      let bounceLength = 80 / Math.pow(2, i + 1);
      //@ts-ignore
      keyframe.appendRule(
        `${lastKeyFramePercent + bounceLength / 2}% {bottom: ${
          bounceLength * settings.general.cor + settings.general.floor
        }%; animation-timing-function: ease-in;}`
      );
      //@ts-ignore
      keyframe.appendRule(
        `${lastKeyFramePercent + bounceLength}% {bottom: ${
          settings.general.floor
        }%; animation-timing-function: ease-out;}`
      );
      lastKeyFramePercent = lastKeyFramePercent + bounceLength;
    }
  }
  //@ts-ignore
  keyframe.appendRule(`100% {bottom: ${settings.general.floor}%; animation-timing-function: ease-out;}`);
};

const bounceIn: ModuleFunction = {
  setup: (settings, keyframe, props) => setup(settings, keyframe, props),
  animate: (settings, elements) => animate(settings, elements),
};

export default bounceIn;
