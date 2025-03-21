import { useState } from "react";
import { progresses } from "../../lib/dummy";
import { db, FBCollection } from "../../lib/firebase";
import { useNavigate } from "react-router-dom";
import { AUTH } from "../../context/hooks";

const RequirementItme = (r: RProps) => {
  const { user } = AUTH.use;
  const { page, desc, function: f, managers, progress } = r;
  const [isHovering, setIsHovering] = useState(false);

  const ref = db.collection(FBCollection.REQUIREMENTS).doc(r.id);

  const navi = useNavigate();

  const move = () => {
    navi(r.id!);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className="border  rounded p-2.5 border-border hover:bg-lightgray col relative"
      onMouseEnter={() => {
        if (!user || user.uid === r.id) {
          return;
        }
        setIsHovering(true);
      }}
      onMouseLeave={() => setIsHovering(false)}
    >
      {isHovering && (
        <div className="flex gap-x-2.5 absolute bottom-2.5 right-2.5">
          <button className="button cancel" onClick={() => navi(r.id!)}>
            수정
          </button>
          <button
            className=""
            onClick={async () => {
              if (confirm("해당요구사항삭제?")) {
                try {
                  await ref.delete();
                  alert("");
                } catch (error: any) {
                  return alert(error.message);
                }
              }
            }}
          >
            삭제
          </button>
        </div>
      )}

      <div className="flex justify-between border-b border-border pb-2.5">
        <button
          className="font-bold flex-1 text-left cursor-pointer"
          onClick={move}
        >
          {page}/{f}
        </button>

        {user && user.uid === r.uid ? (
          <select
            value={progress}
            onChange={async (e) => {
              const ref = db.collection(FBCollection.REQUIREMENTS).doc(r.id);
              try {
                await ref.update({ progress: e.target.value });
              } catch (error: any) {
                return alert(error.message);
              }
            }}
          >
            {progresses.map((item) => (
              <option value="" key={item}>
                {item}
              </option>
            ))}
          </select>
        ) : (
          <p>{progress}</p>
        )}
      </div>
      <ul className="col p-2.5 gap-y-1">
        {desc.map((item, index) => (
          <li key={item} className="font-light">
            {index + 1}.{item}
          </li>
        ))}
      </ul>
      <ul className="flex flex-wrap gap-1">
        {managers.map((item) => (
          <li
            key={item}
            className="px-2 rounded bg-lightgray text-sm hover:bg-gray-100 py-1"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RequirementItme;
