interface Props {
  label: string;
  placeholder: string;
  buttonText: string;
  isDelete: boolean;
  onClick: () => void;
  isLabelOutside: boolean;
}

export const ProfileInput = ({
  label,
  placeholder,
  buttonText,
  isDelete,
  onClick,
  isLabelOutside,
}: Props) => {
  return (
      <div
          className={`relative flex w-full flex-col
     ${isLabelOutside ? 'gap-[8px]' : ''}`}>
          {isLabelOutside && <label className='text-[16px] font-medium text-[#121212]'>{label}</label>}
          <div className={`relative h-full w-full ${!isLabelOutside && 'gap-2px flex flex-col rounded-lg bg-[#F7F7F7] px-[16px] py-[14px]'}`}>
              {!isLabelOutside && <label className='text-[16px] font-medium text-[#121212]'>{label}</label>}
              <input
                  className={`w-full ${isLabelOutside ? 'rounded-lg bg-[#F7F7F7] px-[16px] py-[12px]' : 'bg-transparent'} outline-none placeholder:text-[15px] placeholder:font-medium placeholder:text-[#8b8b8b]`}
                  placeholder={placeholder}
                  disabled={true}
              />
              {buttonText && (
                  <button
                      className={`absolute right-3.5 top-1/2 translate-y-[-50%] text-[14px] font-medium ${isDelete ? 'text-error' : 'text-primary'} hover:underline`}
                      onClick={onClick}>
                      {buttonText}
                  </button>
              )}
          </div>
      </div>
  );
};
