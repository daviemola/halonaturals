import { useState } from "react";
import FirstStep from "../components/steps/FirstStep";
import SecondStep from "../components/steps/SecondStep";
import ThirdStep from "../components/steps/ThirdStep";
import Final from "../components/steps/Final";
import Layout from "../components/Layout/Layout";
import { useEffect } from "react";

function App() {
  //state for steps
  const [step, setstep] = useState(1);

  //state for form data
  const [formData, setFormData] = useState({
    product: "",
    datePurchased: "",
    satisfaction: "",
    seven_days_use: "",
    firstName: "",
    lastName: "",
    amazonOrderNo: "",
    email: "",
    streetAddress: "",
    city: "",
    state: "",
    zipcode: "",
    specialOffers: "",
    freeProduct: "",
    review: "",
  });

  useEffect(() => {
    const data = window.localStorage.getItem("values");
    if (data !== null) setFormData(JSON.parse(data));
  }, []);

  // function for going to next step by increasing step state by 1
  const nextStep = () => {
    setstep(step + 1);
  };

  // function for going to previous step by decreasing step state by 1
  const prevStep = () => {
    setstep(step - 1);
  };

  // handling form input data by taking onchange value and updating our previous form data state
  const handleInputData = (input) => (e) => {
    // input value from the form
    const { value } = e.target;

    //updating for data state taking previous state and then adding new value to create new object
    setFormData((prevState) => ({
      ...prevState,
      [input]: value,
    }));
  };

  // javascript switch case to show different form in each step
  switch (step) {
    // case 1 to show stepOne form and passing nextStep, prevStep, and handleInputData as handleFormData method as prop and also formData as value to the fprm
    case 1:
      return (
        <Layout>
          <FirstStep
            nextStep={nextStep}
            handleFormData={handleInputData}
            values={formData}
          />
        </Layout>
      );
    // case 2 to show stepTwo form passing nextStep, prevStep, and handleInputData as handleFormData method as prop and also formData as value to the fprm
    case 2:
      return (
        <Layout>
          <SecondStep
            nextStep={nextStep}
            prevStep={prevStep}
            handleFormData={handleInputData}
            values={formData}
          />
        </Layout>
      );

    case 3:
      return (
        <Layout>
          <ThirdStep
            nextStep={nextStep}
            prevStep={prevStep}
            handleFormData={handleInputData}
            values={formData}
          />
        </Layout>
      );

    // Only formData is passed as prop to show the final value at form submit
    case 4:
      return (
        <Layout>
          <Final values={formData} />
        </Layout>
      );
    // default case to show nothing
    default:
      return <div className="App"></div>;
  }
}

export default App;
