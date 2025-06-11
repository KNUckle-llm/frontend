import { FallbackProps } from "react-error-boundary";
import React from "react";

const ErrorBox = ({ error, resetErrorBoundary }: Partial<FallbackProps>) => {
  return (
    <div className="p-12 w-full h-full flex flex-col items-center justify-center">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <strong>예기치 않은 오류가 발생했습니다.</strong> {error}
      </div>
      <button
        className="mt-4 px-4 py-2 bg-green-800 text-white rounded hover:bg-green-700 cursor-pointer"
        onClick={resetErrorBoundary}
      >
        다시 시도하기
      </button>
    </div>
  );
};

export default ErrorBox;
