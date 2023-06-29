import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import userStore from "../../store/userStore/userStore";
import { toast } from "react-toastify";
import UserVerify from "../../components/verify/UserVeriy";
import UserVerifyError from "../../components/verify/UserVerifyError";

function VerifyPage() {
  const { code } = useParams();
  const [load, setLoad] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const userData = userStore((state) => state);

  useEffect(() => {
    if (code) {
      userData
        .verifyUser(code)
        .then((response) => {
          if (response.error) {
            setError(true);
            toast.error(response.error);
          } else toast.success(response.response);
          setLoad(false);
        })
        .catch((error: unknown | any) => {
          setError(true);
          toast.error("Ocurri un error al realizar la peticion.");
          setLoad(false);
        });
    }
  }, []);

  return (
    <div className="pt-20 h-screen">
      {load && (
        <div className="h-full w-full flex justify-center items-center">
          <img src="/load-anim.svg" alt="load-animation" />
        </div>
      )}
      {!load && !error ? <UserVerify /> : <UserVerifyError />}
    </div>
  );
}

export default VerifyPage;
