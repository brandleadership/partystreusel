import Plyr from 'plyr';
import Base from '../../_config/base';

class Embed extends Base {
  constructor(el) {
    super(el);

    const video = this.$el.querySelector('.embed__player');

    /* eslint-disable no-unused-vars */
    const player = new Plyr(video, {
      controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'settings', 'fullscreen'],
    });
    /* eslint-enable */
  }
}

Embed.className = 'Embed';
export default Embed;
