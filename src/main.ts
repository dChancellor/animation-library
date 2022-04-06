import './style.css'
import animation from './index';

animation.init({
  general: {
    timeBetween: 3,
    floor: 20,
    cor: .75
  },
  animations: {
    bounceIn: { duration: 1, numberOfBounces: 1 },
  },
});

const items = document.getElementsByClassName('bouncers');
animation.bounceIn(items);
