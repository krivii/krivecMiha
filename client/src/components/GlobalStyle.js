import {createGlobalStyle} from 'styled-components';


const GlobalStyle = createGlobalStyle`


    html {
        @media (max-width: 1500px) {
            font-size: 75%;
        }

        @media (max-width: 1300px) {
        }
    }

    body {
        background: #1b1b1b;
        font-family: 'Roboto', sans-serif;
        overflow-x: hidden;
    }

   

    

    h2 {
        font-weight: lighter;
        font-size: 3rem;
    }

    h3 {
        color: white;
    }

    h4 {
        font-size: 2rem;
        font-weight: bold;
    }

    a {
        font-size: 1.1rem;
    }

    span {
        font-weight: bold;
        color: #800080;
    }

    p {
        color: #ccc;
        padding: 3rem 0;
        font-size: 1.4rem;
        line-height: 150%;
    }

`


export default GlobalStyle;