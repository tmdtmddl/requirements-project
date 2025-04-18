import { useEffect, useState } from "react";
import { AUTH } from "../../context/hooks";
import { db, FBCollection } from "../../lib/firebase";
import ProjectForm from "./ProjectForm";
import ProjectItem from "./ProjectItem";
const Project = () => {
  const { user } = AUTH.use();

  const [projects, setProjects] = useState<ProjectProps[]>([]);
  //파이어베이스에서 데이터를 읽어와서 담는 그릇에 set함수를 data로 바꾸는것 ???
  useEffect(() => {
    if (user) {
      const subProjects = db
        .collection(FBCollection.PROJECTS)
        .where("uid", "==", user?.uid)
        .onSnapshot((snap) => {
          const data = snap.docs.map(
            (doc) => ({ ...doc.data(), id: doc.id } as ProjectProps)
          );

          setProjects(data as ProjectProps[]);
        });

      subProjects;
      return subProjects;
    }
  }, [user]);

  const [isAdding, setIsAdding] = useState(false);
  const addHandler = () => setIsAdding((prev) => !prev);

  return user ? (
    <div className="pt-25 px-5">
      <title>{user ? "나의 프로젝트" : "프로젝트"}</title>
      <div className="flex max-w-300 items-center p-5 fixed top-[61px] left-[50%] w-full bg-white justify-between border-b border-border -translate-x-[50%]">
        <h1 className="font-black text-xl">{user.name}의 프로젝트들</h1>
        <button onClick={addHandler} className="button">
          추가
        </button>
        {isAdding && (
          <ProjectForm
            onCancel={addHandler}
            onSubmitEditing={() => {
              // console.log("프로젝트가 추가됨");
            }}
          />
        )}
      </div>
      <div className="max-w-300 mx-auto">
        <p>{projects.length}개의 프로젝트가 있습니다.</p>

        <ul className="col gap-y-2.5">
          {projects.map((project, index) => (
            <li key={project?.id}>
              <ProjectItem {...project} index={index + 1} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  ) : (
    <h1>No user</h1>
  );
};

export default Project;
