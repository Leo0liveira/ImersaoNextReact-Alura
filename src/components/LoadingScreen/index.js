import Widget from '../Widget';
import {motion} from 'framer-motion';

function LoadingWidget() {
    return (
      <Widget
      as={motion.footer}
      transition={{ delay: 0.1, duration: 0.5 }}
      variants={{
       show: { opacity: 1, y: '0' },
       hidden: { opacity: 0, y: '100%' },
      }}
      initial="hidden"
      animate="show"
      >
        <Widget.Header>
        Aguarde por favor, estamos montando o tabuleiro.
        </Widget.Header>
        <Widget.Content>
        <img alt="GifLoading"
        style={{
          width: '100%',
          height: 'auto',
          objectFit: 'cover',
        }}
        src="https://media.giphy.com/media/l3q2XnJo1OVj2pgmQ/giphy.gif"
      />
        </Widget.Content>
      </Widget>
    );
  }

  export default LoadingWidget;