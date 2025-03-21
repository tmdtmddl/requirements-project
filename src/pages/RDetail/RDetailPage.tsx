import React, { useEffect, useState } from "react";
import { AUTH } from "../../context/hooks";
import { Link, useNavigate, useParams } from "react-router-dom";
import { db, FBCollection } from "../../lib/firebase";
import NotFound from "../../components/ui/NotFound";
import { signOut } from "firebase/auth";
import RequirementItme from "../Requirement/RequirementItme";
import RequirementForm from "../Requirement/RequirementForm";

const RDetailPage = () => {
  const [r, setR] = useState<RProps | null>(null);
  const { user, signout } = AUTH.use();
  const { rid, projectId } = useParams<{ projectId: string; rid: string }>();

  useEffect(() => {
    const subR = db
      .collection(FBCollection.REQUIREMENTS)
      .doc(rid)
      .onSnapshot((doc) => {
        const data = { ...(doc.data() as RProps), id: doc.id };
        if (!data.function) {
          setR(null);
        } else {
          setR(data);
        }
      });
    subR;
    return subR;
  }, [rid]);

  const navi = useNavigate();
  const back = () => {
    navi(`/project/${projectId}`);
  };

  if (!r) {
    return <NotFound message="존재하지 않는 페이지입니다." />;
  }
  if (r.isSharable && (!user || user.uid !== r.uid)) {
    return (
      <div className="p-5">
        <RequirementItme {...r} />
      </div>
    );
  }

  return (
    <div>
      <div className="flex">
        <div className="flex gap-x-1 items-center ">
          <Link to={`/project`} className="p-2.5 hover:text-theme">
            프로젝트
          </Link>
          <p>{">"}</p>
          <Link to={`/project/${projectId}`} className="p-2.5 hover:text-theme">
            요구사항
          </Link>
        </div>
      </div>
      <RequirementForm
        payload={r}
        onCancel={() => {
          console.log();
        }}
        projectId={r.projectId}
        uid={r.uid}
      />
    </div>
  );
};

export default RDetailPage;
