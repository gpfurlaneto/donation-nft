import Nullstack from 'nullstack';
import './Application.css';
import Home from './Home';
class Application extends Nullstack {

  renderHead() {
    return (
      <head>
        <link
          href="https://fonts.gstatic.com" rel="preconnect" />
        <link
          href="https://fonts.googleapis.com/css2?family=Crete+Round&family=Roboto&display=swap"
          rel="stylesheet" />
      </head>
    )
  }

  render() {
    return (
      <main>
        <Head>Test</Head>
        <Home route="/" />
      </main>
    )
  }

}

export default Application;