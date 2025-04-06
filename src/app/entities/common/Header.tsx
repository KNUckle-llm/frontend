import React, { ReactNode } from "react";
import { ChevronLeft } from "lucide-react";

interface HeaderProps {
  title: string;
  subTitle?: string;
  icon?: ReactNode;
  onBackClick?: () => void;
  hideBackButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  title,
  subTitle,
  icon = <ChevronLeft size={20} />,
  onBackClick,
  hideBackButton = false,
}) => {
  return (
    <header className="border-b border-gray-100 p-4">
      <div className="flex items-center">
        {!hideBackButton && (
          <button
            className="w-8 h-8 flex items-center justify-center mr-2 hover:bg-gray-100 rounded-full"
            onClick={onBackClick}
          >
            {icon}
          </button>
        )}
        <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
        {subTitle && (
          <span className="text-sm text-neutral-500 ml-2">{subTitle}</span>
        )}
      </div>
    </header>
  );
};

export default Header;
