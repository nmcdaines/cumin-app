function Logo() {
  return (
    <div className="flex">
      <img
        src="https://cdn-icons-png.flaticon.com/512/4788/4788121.png"
        alt=""
        className="h-8 w-8"
      />
      <span className="ml-3 my-auto text-gray-100">Cumin App</span>
    </div>
  );
}

function LogoDark() {
  return (
    <div className="flex justify-center">
      <img
        src="https://cdn-icons-png.flaticon.com/512/4788/4788121.png"
        alt=""
        className="h-8 w-8"
      />
      <span className="ml-3 my-auto text-gray-700">Cumin App</span>
    </div>
  );
}

export { Logo, LogoDark };
