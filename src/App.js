import RenderData from "./components/javascripts/renderData";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
      <div style={{overflow:'hidden'}}>
        <RenderData />
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
