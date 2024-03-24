import logo from "./logo.svg";
import "./App.css";
import Main from "./components/main";
function App() {
  return (
    <div>
      <img className="float-right h-[297px] w-[235px]" src="blob1.svg" alt="" />
      <div className="flex w-full flex-col items-center justify-center "></div>
      <Main />
      <img
        src="blob2.svg"
        className="bottom-0 float-left h-[297px] w-[235px] "
        alt=""
      />
    </div>
  );
}

export default App;
