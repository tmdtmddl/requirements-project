// import React from "react";
// import { db } from "./lib/firebase";

// const App = () => {
//   return (
//     <div className="text-red-500 font-black text-6xl">
//       <button
//         onClick={async () => {
//           const snap = db.collection("requirement").get();
//           const data = (await snap).docs.map((doc) => ({
//             ...doc.data(),
//             id: doc.id,
//           }));
//           console.log(data);
//         }}
//       >
//         DB
//       </button>
//     </div>
//   );
// };

// export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AuthPage from "./pages/Auth";
import Project from "./pages/Project/Project";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="signin" Component={AuthPage} />
        <Route path="project" Component={Project} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
