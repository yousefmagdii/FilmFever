function OrderBy() {
  return (
    <div className="p-1">
      <button className=" m-1 rounded-lg  border-2 bg-opacity-0  px-1 py-2 text-xs font-bold text-white   hover:bg-slate-100 hover:bg-opacity-30 hover:text-nfRed">
        Rating
      </button>
      <button className=" m-1 rounded-lg border-2 bg-opacity-0 px-1 py-2 text-xs font-bold text-white  hover:bg-slate-100 hover:bg-opacity-30 hover:text-nfRed">
        Date: New to old
      </button>
      <button className=" rounded-lg border-2 bg-opacity-0 px-1 py-2 text-xs font-bold text-white hover:bg-slate-100 hover:bg-opacity-30 hover:text-nfRed">
        Date: Old to new
      </button>
    </div>
  );
}

export default OrderBy;
