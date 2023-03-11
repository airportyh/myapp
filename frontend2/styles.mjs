import el from './el.mjs';

const globalStyles = `
  body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
  }
  
  .info {
    color: #aaa;
  }
  
  * {
    box-sizing: border-box;
  }
  
  h1 {
    text-align: center;
    padding: 10px;
    margin: 0;
    overflow: auto;
  }
  
  .content {
    padding: 20px;
  }
  
  input[type=text],
  input[type=password],
  input[type=search],
  button,
  label,
  textarea {
    font-size: 2em;
    margin-bottom: 0.5em;
  }
  
  input[type=text],
  input[type=password],
  input[type=search],
  button,
  textarea {
    border: 1px solid black;
    display: block;
    width: 100%;
  }
  
  a.link {
    padding: 5px;
  }
  
  button.link {
    color: inherit;
    display: inline;
    border: 0 none;
    width: inherit;
    text-decoration: underline;
    font-size: 1em;
    padding: 0 6px;
  }
  
  /* Generic */
  
  a, a:visited {
    color: inherit;
  }
  
  .error {
    color: red;
  }
  
  .dirty {
    height: 5px;
    width: 100%;
    background-color: red;
    position: absolute;
    right: 0;
    top: 0;
  }
  
  .pull-right {
    float: right;
  }
  
  /* Notes Header */
  
  .header h1 {
    margin: 0;
    display: inline-block;
    text-shadow: 1px 1px 2px #ccc;
    font-size: 1.4em;
    font-weight: normal;
  }
  
  .header button.add-button {
    display: inline-block;
    width: inherit;
    float: right;
    font-weight: bold;
    margin: 0;
    padding: 0.1em 0.4em 0.2em 0.4em;
    border: 0 none;
    background-color: inherit;
  }
  
  /* Search Field */
  
  input.search-field {
    border-radius: 0;
    font-size: 1em;
    padding: 0.5em;
    margin: 0;
    border: 1px solid #ccc;
  }
  
  /* Note List */
  
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  
  ul.notes li {
    list-style: none;
    display: block;
    margin: 0;
  }
  
  ul.notes li a {
    text-decoration: none;
    display: block;
    color: black;
    padding: 12px;
    border-bottom: 1px solid #ccc;
    font-size: 1.2em;
  }
  
  ul.notes li:active {
    background-color: darkblue;
  }
  
  ul.notes li:active a {
    color: #fff;
  }
  
  /* Note Detail Screen */
  
  div.note {
    position: relative;
    height: 100vh;
  }
  
  div.note input.title-field {
    margin: 0;
    position: absolute;
    top: 5%;
    height: 6%;
    text-align: center;
    font-size: 1.3em;
    border-radius: 0;
    border: 0px none;
  }
  
  div.note textarea.note-text-field {
    padding: 0.5em;
    margin: 0;
    position: absolute;
    top: 11%;
    height: 89%;
    width: 100%;
    font-size: 1em;
    border-radius: 0;
    border: 0px none;
    border-top: 1px solid #ccc;
  }
  
  /* More Button */
  
  button.more {
    border: 0 none;
    background-color: inherit;
    color: inherit;
    text-decoration: underline;
    font-size: 1em;
  }
  
  .loading {
    text-align: center;
  }
  .loading img {
    width: 400px;
    height: 300px;
  }
`;

document.head.appendChild(el.style(globalStyles));
