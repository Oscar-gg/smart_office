import HashLoader from "react-spinners/HashLoader";

export const Loading = ({ pageName = "página" }: { pageName?: string }) => {
  return (
    <div className="mt-5 flex h-full flex-col items-center justify-center gap-y-8 align-middle">
      {/* <img src="/Cemex_logo.png" /> */}
      <h1 className="px-16 text-2xl font-extrabold text-[#0000B3]">
        {" "}
        Cargando {pageName}
      </h1>

      <HashLoader
        color={"#0000B3"}
        loading={true}
        // cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};
