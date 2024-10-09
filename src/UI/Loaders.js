import { Bars } from "react-loader-spinner";
import dynamic from "next/dynamic";

export function LoaderBar() {
  return (
    <>
      <Bars
        height="50"
        width="70"
        color={`var(--primary-color)`}
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </>
  );
}
export function DialogLoader(props) {
  const Dialog = dynamic(() =>
    import("primereact/dialog").then((d) => d.Dialog),
  );
  const ThreeDots = dynamic(() =>
    import("react-loader-spinner").then((e) => e.ThreeDots),
  );

  return (
    <Dialog closable={false} visible={props.visible} modal={true}>
      <div className="text-primary">
        <ThreeDots
          visible={true}
          height="80"
          width="80"
          color={`var(--primary-color)`}
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    </Dialog>
  );
}
export const LoaderBarDiv = () => {
  return (
    <div className="w-full flex justify-content-center align-items-center p-4 h-screen">
      <LoaderBar />
    </div>
  );
};
