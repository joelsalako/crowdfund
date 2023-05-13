import { useEffect, useState } from "react";
import { Button } from "../button/Button";

export const Modal = ({
  className,
  buttonTitle,
  modalTitle = "",
  children,
}) => {
  const [showModal, setShowModal] = useState(false);

  //   close modal if escape key is pressed
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setShowModal(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  });

  return (
    <>
      <Button onClick={() => setShowModal(true)}>
        {buttonTitle ? buttonTitle : "Open Modal"}
      </Button>
      {showModal ? (
        <>
          <div
            className={`justify-center items-start flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ease-linear transition-all duration-150 cursor-pointer items-center`}
          >
            <div
              className="fixed inset-0 w-full h-full bg-black/20"
              onClick={() => setShowModal(false)}
            ></div>
            <div className="relative w-auto my-2 mx-auto max-w-4xl cursor-default">
              {/*content*/}
              <div
                className={`border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none w-[30vw]  p-8 ${className} `}
              >
                {/*header*/}
                <div className="flex items-start justify-between py-3  rounded-t">
                  <h3 className="text-xl font-bold text-[#18181B]/900 flex justify-start flex-col gap-2">
                    <span>{modalTitle}</span>
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      X
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className={`relative pt-2 flex-auto`}>{children}</div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};
