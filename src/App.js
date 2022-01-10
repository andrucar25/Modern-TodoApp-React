import React, {useState} from 'react';


import AddTask from './components/AddTask';
function App() {

  const [lightTheme, setLightTheme] = useState(false);

 


  return (
    <>  
      <section className="main__section">
         <AddTask
          lightTheme={lightTheme}
          setLightTheme={setLightTheme}
         >
          
          </AddTask>
         <div className={lightTheme ? "main__img__light" : "main__img"}></div>
        <div className={lightTheme ? "main__color__bot__light" : "main__color__bot"}></div>
        
      </section>
    </>
   
  );
}

export default App;
