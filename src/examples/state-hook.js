import React, { Component, useEffect, useState } from "react";
import ReactDOM from "react-dom";

// class App extends Component {
//     render() {
//         return (
//             <div>
//                  class component
//             </div>
//         )
//     }
// }

const App = (props) => {
  const [count, setCount] = useState(props.count);
  const [text, setText] = useState(props.text);

  // component did mount karşılığı olur. ikinci parametre olarak [] verdiğimiz için
  useEffect(() => {
    console.log("componentdidmount");
    const countData = localStorage.getItem('count');
    if (countData) {
        setCount(Number(countData)); // String olarak gelecek numbera çevir
    }
  }, []);

  //count
  useEffect(() => {
    console.log("sadece count için çalışır");
    localStorage.setItem('count', count);
  }, [count]);

  //text
  useEffect(() => {
    console.log("text için");
    localStorage.setItem('text', text);
  }, [text]);

  //componentdidmount ve componentdidupdate özelliklerini sağlar
  useEffect(() => {
    console.log("componentdidmount - componentdidupdate");
  });

  return (
    <div>
      <p>Butona {count} kez tıkladınız</p>
      <p>Girilen text : {text}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
      <button onClick={() => setCount(props.count)}>Reset</button>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
};

// default parameter

App.defaultProps = {
  count: 5,
  text: "",
};

ReactDOM.render(<App />, document.getElementById("root"));
