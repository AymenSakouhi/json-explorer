import JSONViewer from "./components/JSONViewer";
import { JsonData } from "./models/json-data.model";

const jsonData: JsonData = {
  date: "2021-10-27T07:49:14.896Z",
  hasError: false,
  fields: [
    {
      id: "4c212130",
      prop: "iban",
      value: "DE81200505501265402568",
      hasError: false,
    },
    {
      id: Math.random().toString(26).slice(2),
      prop: "I am a test for multiple",
      value: Math.random().toString(36).slice(2),
      hasError: true,
    },
  ],
  test: {
    text: "I am a text",
    number: 10011011,
    boolean: true,
  },
};

const App = () => {
  return (
    <>
      <JSONViewer res={jsonData} />
    </>
  );
};

export default App;
