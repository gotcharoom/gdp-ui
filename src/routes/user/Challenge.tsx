import {Route} from "react-router-dom";
import {JSX, lazy} from "react";

const SampleUserMain = lazy(() => import("@pages/sample/SampleUserMain.tsx"))

const Challenge: JSX.Element[] = [
        <Route path="/" element={<SampleUserMain />} state/>
];

export default Challenge;