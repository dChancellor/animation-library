import './style.css'
import animation from './index';

animation.init({
  general: {
    timeBetween: 5,
    floor: 20,
    cor: .75
  },
  animations: {
    bounceIn: { duration: 3, numberOfBounces: 3 },
  },
});

const items = document.getElementsByClassName('bouncers');
animation.bounceIn(items);
