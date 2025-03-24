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

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AuthPage from "./pages/Auth";
import Project from "./pages/Project/Project";
import RequirementPage from "./pages/Requirement/RequirementPage";
import RDetailPage from "./pages/RDetail/RDetailPage";
import Layout from "./components/Layout";
import { AUTH } from "./context/hooks";
import NotFound from "./components/ui/NotFound";

const App = () => {
  const { user } = AUTH.use();
  return (
    <BrowserRouter basename="/requirements-project">
      <Routes>
        <Route
          path="*"
          element={
            <NotFound
              message="접근할 수 없는 페이지입니다."
              to={user ? "/project" : "/"}
            />
          }
        />
        <Route path="/" Component={Layout}>
          <Route index Component={Home} />
          {!user && <Route path="signin" Component={AuthPage} />}
          <Route path="project">
            <Route index Component={Project} />
            <Route path=":projectId">
              <Route index Component={RequirementPage} />
              <Route path=":rid" Component={RDetailPage} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
