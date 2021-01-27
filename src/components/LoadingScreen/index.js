import Widget from '../Widget';

function LoadingWidget() {
    return (
      <Widget>
        <Widget.Header>
        Montando o tabuleiro
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