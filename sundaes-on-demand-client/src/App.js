import Options from "./pages/entry/Options";
import OrderSummary from "./pages/summary/OrderSummary";

function App() {
  return (
    <div className="App">
      <OrderSummary />
      <Options optionType="scoops" />
      <Options optionType="toppings" />
    </div>
  );
}

export default App;
