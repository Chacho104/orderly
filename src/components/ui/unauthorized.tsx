"use client";

const Unauthorized = () => {
  return (
    <div className="p-4 mr-2 mt-1 w-full shadow-sm dark:bg-blue-950/40">
      <h1 className="pb-2 text-3xl text-red">Access Denied!</h1>
      <p className="pb-2">
        You do not have the permission to view this page. Please contact site
        administrator!
      </p>
    </div>
  );
};

export default Unauthorized;
