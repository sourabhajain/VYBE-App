function BaseWrapper({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F2EDD4] to-[#F6F5F3]">
      {children}
    </div>
  );
}

export default BaseWrapper;
