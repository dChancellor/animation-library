import './style.css';
import AnimationSequence from './Sequence';

const elements = document.getElementsByClassName('bouncers');
const elements2 = document.getElementsByClassName('bouncers2');


const bounceInAndOut = new AnimationSequence();
const animation = new AnimationSequence();

bounceInAndOut.init(elements);
animation.init(elements2);

bounceInAndOut.bounceIn().and().spin().then().spin();
animation.bounceIn().then().spin();
