import { render } from "@testing-library/react";
import { OrderDetailsProvider } from "../contexts/OrderDetails";

const customRender = (ui, options) => {
  return render(ui, { wrapper: OrderDetailsProvider, ...options });
};

// re-export
export * from "@testing-library/react";

// override render method
export { customRender as render };
