import React from "react";
import { registerLicense } from '@syncfusion/ej2-base';
import ReactDOM from "react-dom/client";
import App from "./App";
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';

registerLicense('ORg4AjUWIQA/Gnt2XFhhQlJHfVpdXmNWfFN0QHNYfVRwfV9GZEwgOX1dQl9mSXpQdkVjW3ZbdXNVTmZXU00=');
Amplify.configure(awsExports);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
